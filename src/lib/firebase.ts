import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDocFromServer, query, orderBy, limit, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let _app: any = null;
let _db: any = null;

export function getDb() {
  if (!_db) {
    if (!_app) {
      _app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    }
    _db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
      ? getFirestore(_app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(_app);
  }
  return _db;
}

// Target the specific Firestore database provisioned for this project (lazy getter proxy)
export const db = new Proxy({} as any, {
  get(_target, prop) {
    const firestore = getDb();
    const value = firestore[prop];
    if (typeof value === 'function') {
      return value.bind(firestore);
    }
    return value;
  }
});

// Connection test - can be invoked when testing integrations rather than at module load
export async function testConnection() {
  try {
    const firestore = getDb();
    await getDocFromServer(doc(firestore, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client offline check:', error.message);
    }
  }
}

export interface FirebaseInquiry {
  name: string;
  phone: string;
  email?: string;
  plan?: string;
  message?: string;
  createdAt?: any;
}

export interface FirebaseFreeTrial {
  name: string;
  phone: string;
  preferredTime?: string;
  fitnessGoal?: string;
  createdAt?: any;
}

export interface FirebaseBMILog {
  gender: string;
  age?: number;
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: string;
  targetWeight?: number;
  createdAt?: any;
}

// Firestore rejects documents containing `undefined` values (addDoc throws), which silently
// dropped every submission with an optional field left blank. Strip them before writing.
function stripUndefined<T extends Record<string, any>>(data: T): T {
  return Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)) as T;
}

export async function addInquiryToFirestore(data: FirebaseInquiry) {
  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...stripUndefined(data),
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding inquiry to Firestore:', error);
    return { success: false, error };
  }
}

export async function addFreeTrialToFirestore(data: FirebaseFreeTrial) {
  try {
    const docRef = await addDoc(collection(db, 'free_trial_passes'), {
      ...stripUndefined(data),
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding free trial pass to Firestore:', error);
    return { success: false, error };
  }
}

export async function addBMILogToFirestore(data: FirebaseBMILog) {
  try {
    const docRef = await addDoc(collection(db, 'bmi_logs'), {
      ...stripUndefined(data),
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding BMI log to Firestore:', error);
    return { success: false, error };
  }
}

export interface FirebaseWebhookEvent {
  source: string;
  eventType?: string;
  payload?: any;
  status?: string;
  ip?: string;
  userAgent?: string;
  createdAt?: any;
  receivedAt?: string;
}

export async function addWebhookEventToFirestore(data: FirebaseWebhookEvent) {
  try {
    const docRef = await addDoc(collection(db, 'webhook_events'), {
      ...data,
      createdAt: serverTimestamp(),
      receivedAt: data.receivedAt || new Date().toISOString(),
      status: data.status || 'received'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error logging webhook event to Firestore:', error);
    return { success: false, error };
  }
}

export async function getRecentWebhookEvents(maxResults: number = 25) {
  try {
    const q = query(collection(db, 'webhook_events'), orderBy('receivedAt', 'desc'), limit(maxResults));
    const snapshot = await getDocs(q);
    const events: any[] = [];
    snapshot.forEach((docSnap) => {
      events.push({ id: docSnap.id, ...docSnap.data() });
    });
    return events;
  } catch (error) {
    console.error('Error fetching webhook events:', error);
    return [];
  }
}

