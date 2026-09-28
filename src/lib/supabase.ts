import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase project credentials
export const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://tdllxiresvvucorpmqzn.supabase.co';
export const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_P7QW1ywoNuu0PIJQa8Rw4w_OSalnWpf';

let _supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_supabaseClient) {
    _supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return _supabaseClient;
}

// Transparent Proxy so existing imports of `supabase` don't break, while deferring instantiation
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const val = (client as any)[prop];
    if (typeof val === 'function') {
      return val.bind(client);
    }
    return val;
  }
});

/**
 * Staff sign-in (Supabase Auth). Only these emails may open the admin console. Override with
 * VITE_ADMIN_EMAILS="a@x.com,b@y.com". NOTE: this gates the UI only - never put real customer data
 * behind /ads-hub without server-side checks (Supabase RLS policies keyed to these users).
 */
const ADMIN_EMAILS: string[] = (
  ((import.meta as any).env?.VITE_ADMIN_EMAILS as string | undefined) ||
  'dhanusgoldfitness@gmail.com,prashanthdgf@gmail.com'
)
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function adminRoleFor(user: { email?: string | null; app_metadata?: Record<string, any> } | null | undefined): string | null {
  const email = user?.email?.toLowerCase();
  if (!email || !ADMIN_EMAILS.includes(email)) return null;
  const role = user?.app_metadata?.role;
  return role === 'Owner' || role === 'Admin' || role === 'Marketing' ? role : 'Owner';
}

export interface InquiryData {
  name: string;
  phone: string;
  email?: string;
  plan?: string;
  message?: string;
  createdAt?: string;
}

export interface FreeTrialData {
  name: string;
  phone: string;
  preferredTime?: string;
  fitnessGoal?: string;
  createdAt?: string;
}

export interface BMILogData {
  gender: string;
  age?: number;
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: string;
  targetWeight?: number;
  createdAt?: string;
}

/**
 * Runs the Supabase and Firestore writes in parallel and reports whether AT LEAST ONE stored the record.
 * The old code always returned success (even when every backend failed), so the forms told visitors
 * "sent!" while the lead was silently lost.
 */
async function persistLead(
  label: string,
  supabaseWrite: () => Promise<boolean>,
  firestoreWrite: () => Promise<boolean>
): Promise<boolean> {
  const results = await Promise.allSettled([supabaseWrite(), firestoreWrite()]);
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.warn(`${label}: ${i === 0 ? 'Supabase' : 'Firestore'} write failed`, r.reason);
  });
  return results.some((r) => r.status === 'fulfilled' && r.value === true);
}

function saveLocalBackup(key: string, record: Record<string, unknown>) {
  try {
    const local = JSON.parse(localStorage.getItem(key) || '[]');
    local.unshift({ ...record, id: Date.now() });
    localStorage.setItem(key, JSON.stringify(local.slice(0, 50)));
  } catch {
    /* storage unavailable (private mode / quota) - ignore */
  }
}

/** Save user inquiry / contact form submission to Supabase and Firestore */
export async function submitInquiry(data: InquiryData): Promise<{ success: boolean }> {
  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    plan: data.plan || 'general',
    message: data.message || '',
    created_at: new Date().toISOString(),
  };

  const ok = await persistLead(
    'Inquiry',
    async () => {
      // No .select(): with insert-only RLS policies the read-back is rejected and reports a false error.
      const { error } = await getSupabaseClient().from('inquiries').insert([payload]);
      if (error) console.warn('Supabase inquiry insert error:', error.message);
      return !error;
    },
    async () => {
      const { addInquiryToFirestore } = await import('./firebase');
      const r = await addInquiryToFirestore({
        name: data.name,
        phone: data.phone,
        email: data.email,
        plan: data.plan,
        message: data.message,
      });
      return r.success;
    }
  );

  if (!ok) saveLocalBackup('dhanus_inquiries', payload);
  return { success: ok };
}

/** Save free trial pass registration to Supabase and Firestore */
export async function submitFreeTrialPass(data: FreeTrialData): Promise<{ success: boolean }> {
  const payload = {
    name: data.name,
    phone: data.phone,
    preferred_time: data.preferredTime || 'morning',
    fitness_goal: data.fitnessGoal || 'general_fitness',
    created_at: new Date().toISOString(),
  };

  const ok = await persistLead(
    'Free trial',
    async () => {
      const { error } = await getSupabaseClient().from('free_trial_passes').insert([payload]);
      if (error) console.warn('Supabase free trial insert error:', error.message);
      return !error;
    },
    async () => {
      const { addFreeTrialToFirestore } = await import('./firebase');
      const r = await addFreeTrialToFirestore({
        name: data.name,
        phone: data.phone,
        preferredTime: data.preferredTime,
        fitnessGoal: data.fitnessGoal,
      });
      return r.success;
    }
  );

  if (!ok) saveLocalBackup('dhanus_trial_passes', payload);
  return { success: ok };
}

/** Save BMI calculation log to Supabase and Firestore (analytics only - never blocks the UI) */
export async function submitBMILog(data: BMILogData): Promise<{ success: boolean }> {
  const payload = {
    gender: data.gender,
    age: data.age ?? null,
    height_cm: data.heightCm,
    weight_kg: data.weightKg,
    bmi: data.bmi,
    category: data.category,
    target_weight: data.targetWeight ?? null,
    created_at: new Date().toISOString(),
  };

  const ok = await persistLead(
    'BMI log',
    async () => {
      const { error } = await getSupabaseClient().from('bmi_logs').insert([payload]);
      if (error) console.warn('Supabase BMI insert error:', error.message);
      return !error;
    },
    async () => {
      const { addBMILogToFirestore } = await import('./firebase');
      const r = await addBMILogToFirestore({
        gender: data.gender,
        age: data.age,
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        bmi: data.bmi,
        category: data.category,
        targetWeight: data.targetWeight,
      });
      return r.success;
    }
  );
  return { success: ok };
}
