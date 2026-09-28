# Dhanus Gold Fitness – website audit & fixes

I reviewed the code by reading it; I could not run the site (npm installs were blocked in my environment). Please run `npm install && npm run lint && npm run build` once on your side to confirm.

## DO THESE YOURSELF (I can't from here)
1. **Rotate the Google Maps key** `AQ.Ab8RN6…` – it is hard-coded in `public/locator.html` (still there) and was in `GymGoogleMap.tsx`. Create a new key, restrict it to your domain (HTTP referrers) + Maps JS API only, then put it in `VITE_GOOGLE_MAPS_API_KEY` and in locator.html.
2. **Change the admin login.** `/login` accepts owner / admin / marketing with password `dhanusgold` – checked in the browser, so anyone can read it in the JS bundle. Replace with real auth (e.g. Firebase Auth) before storing anything real behind `/ads-hub`.
3. **Firestore rules – `webhook_events` is `read: true`**, so anyone can read leads/WhatsApp payloads straight from Firestore. Fix properly by writing/reading webhook events from the server with the Firebase Admin SDK and setting `read, write: if false`. (I didn't change this rule because doing so breaks the current events reader.)
4. Set `WEBHOOK_VERIFY_TOKEN`, `ADMIN_API_KEY`, `VITE_SUPABASE_ANON_KEY` in your host's environment. Change the default webhook token `dhanus_gold_webhook_token` (it was public).
5. Decide which is correct and make them match everywhere: Google Place ID (`.env.example` vs `data.ts` differ – your "write a review" link may be wrong), map coordinates (`index.html` 12.9174/77.4836 vs app 12.9247/77.4855), Instagram handle (`dhanush_gold_fitness` ×19 vs `dhanus_goldfitness` ×3), and the LinkedIn link in `data.ts` (points to Facebook).
6. Deployment: it is an Express server, not a static site – it needs a Node host (not static hosting / plain Vercel).

## FIXED IN THE PATCHED ZIP
**Lost leads (most serious)**
- Training, Trainers and Contact page forms did `setTimeout` → "Success" and sent nothing. Now saved to Supabase/Firestore, with an error message if saving fails.
- Home-page inquiry form and all forms always said "sent" even if every backend failed. Now honest.
- Firestore writes crashed silently whenever an optional field was blank (`undefined` values) – free-trial and BMI records were never stored. Fixed.
- Supabase `.insert().select()` fails under insert-only security rules; removed the read-back.

**SEO / pages unreachable**
- Server 301-redirected `/personal-training-kengeri`, `/weight-loss-training-kengeri`, `/bodybuilding-gym-kengeri`, `/strength-training-kengeri`, `/body-transformations`, `/gym-services-kengeri`, `/contact-gym-kengeri` to other pages, so those pages could never load on a fresh visit or from Google, yet they were in the sitemap. Removed the conflicting redirects.
- Sitemap listed redirected/alias URLs, private `/integrations` + `/webhooks`, and `?lang=kn` URLs that canonicalise to English. Now 16 clean canonical URLs.
- Unknown URLs returned 200 with the home page and home canonical. Now a real 404 page + HTTP 404 + noindex.
- `/login`, `/ads-hub`, `/integrations`, `/webhooks` now noindex and disallowed in robots.txt.
- Server meta injection now escapes quotes, handles aliases and trailing slashes.
- Removed the fake `google-site-verification-placeholder` tag (real one still injected from `VITE_GOOGLE_SITE_VERIFICATION`).

**Security / server**
- Webhook verify token was shown publicly by `/api/webhook`, `/api/integrations/config` and the Integrations page – removed.
- `/api/webhook/events` returned lead PII to anyone – now redacted unless `x-admin-key` matches `ADMIN_API_KEY`.
- Paid Gemini endpoints (`/api/ai/*`) were open to anyone with a 50 MB body limit – added per-IP rate limit (20/min) and 10 MB limit.
- Removed pre-filled password on login and fake Twilio credentials in `AdsHubPage.tsx`.
- Removed open `test` collection from `firestore.rules`.

**Bugs / UI**
- BMI boundaries: 24.9 and 29.9 fell in the wrong category; fixed to <25 and <30. Stopped logging a made-up age of 25.
- Whole site had `select-none`, so visitors couldn't copy your phone number or address. Removed.
- Keyless Google Maps fallback; the old embed URL was a fake placeholder.
- `navigate()` was called during render for `/services-4` (React anti-pattern) – removed (server redirects it).
- ~90 uses of `zinc-550/750/850` don't exist in Tailwind (borders rendered wrong) – defined them in `index.css`.
- Server `PORT` now respects the host's `PORT`; video download checks response status.
- Removed `public/test.txt`, duplicate `vite` dependency, package name `react-example`.

## NOT CHANGED – worth knowing
- `AIStudio.tsx`, `ThreeDBackground.tsx`, `SocialLinksBar.tsx` are never used (~2,000 lines of dead code).
- `AdsHubPage` numbers (campaigns, leads, "Twilio healthy") are hard-coded demo data.
- Claims such as "4,000+ members", "4.9★", "guaranteed results" – make sure they're true; "guaranteed" claims can be a legal risk.
- Both `package-lock.json` and `bun.lock` exist – keep one. `extracted_items.json`, `firebase-blueprint.json` look like leftovers.
- Gemini model names (e.g. `gemini-3.5-flash`) I couldn't verify – test the AI features.
- Analytics loads without a cookie/consent banner.
