# Dhanus Gold Fitness – website

React + Vite front end with an Express server (SEO meta injection, Gemini AI endpoints, webhook intake).
Hosted on Vercel (`api/index.js` serves the pre-bundled Express app, static files come from `dist/`).

## Run locally
```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

## Build / deploy
`npm run build:web` (used by Vercel) generates the sitemap, builds the site and bundles the server into
`dist/server.cjs`. Pushing to `main` deploys to production.

## Environment variables
| Name | Purpose |
|---|---|
| `GEMINI_API_KEY` | AI features (server only) |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Lead storage + staff login (Supabase project "DGF claude app") |
| `VITE_GOOGLE_MAPS_API_KEY` | Interactive map (restrict the key to your domain) |
| `VITE_GOOGLE_ANALYTICS_ID` | Analytics; only loads after cookie consent |
| `VITE_GOOGLE_SITE_VERIFICATION` | Search Console verification |
| `VITE_ADMIN_EMAILS` | Comma-separated staff emails allowed into `/ads-hub` |
| `WEBHOOK_VERIFY_TOKEN`, `ADMIN_API_KEY` | Webhook handshake / admin-only API access |
| `SITE_URL` | `https://www.dhanusgoldfitness.com` |

## Where leads go
Forms save to Supabase (`inquiries`, `free_trial_passes`, `bmi_logs`, insert-only RLS) and Firestore.
Read them in the Supabase dashboard.

See `REPORT.md` for the audit notes.
