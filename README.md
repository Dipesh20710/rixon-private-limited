# RIXON PRIVATE LIMITED — Single-page 3D agency website

A responsive single-page digital studio website built with Next.js 15, React 19 and TypeScript. The public website is one continuous scroll experience with anchor navigation: Home, Services, Work, About, Contact and Project Booking. The private admin dashboard remains at `/admin`.

The homepage also includes lightweight Framer Motion reveals, a reduced-motion-aware particle field, interactive concept previews, an indicative project estimator, project status lookup, and FAQs. The supplied RIXON logo remains the hero and loading-screen brand asset.

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally (Windows PowerShell)
1. Extract the ZIP.
2. Open the `rixon-platform` folder in VS Code (the folder containing `package.json`).
3. In the VS Code terminal run:

```powershell
npm.cmd install
Copy-Item .env.example .env.local
```

4. Open `.env.local` and set `ADMIN_PASSWORD` and `SESSION_SECRET` to your own strong values.
5. Start the development server:

```powershell
npm.cmd run dev
```

6. Visit `http://localhost:3000`.

## Pages and sections
- `/` — complete single-page website, including services, concept portfolio, about, contact and booking form
- `/#services`, `/#work`, `/#about`, `/#estimate`, `/#track`, `/#faq`, `/#contact`, `/#booking` — scroll destinations
- `/admin/login` — private admin sign-in
- `/admin` — private enquiry dashboard

## Customer project tracking
Customers can look up an enquiry using both its booking reference and the email address provided at booking time. The tracking API returns only the reference, current status, service type, and submission date; it does not expose the enquiry brief or contact details. Tracking uses the existing booking store and does not require a database migration.

The homepage estimator is an indicative planning tool, not a quotation.

## Booking storage
By default, local development stores bookings in `data/bookings.json`. This is suitable for local testing only; local filesystem storage is not durable on serverless hosting or multiple instances.

For production on Vercel, create a Supabase project and run `supabase-schema.sql` in its SQL editor. Configure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel's server-side Environment Variables. Do not rely on local JSON storage in production: serverless filesystems are not durable. Configure `ADMIN_PASSWORD` and a unique `SESSION_SECRET` of at least 32 characters as server-side environment variables. The application no longer accepts a fallback session secret.

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Keep the service-role key private. Never put it in a `NEXT_PUBLIC_` variable.

## Email notifications (optional)
The project supports Resend notifications. Set:

```env
RESEND_API_KEY=YOUR_RESEND_API_KEY
NOTIFICATION_EMAIL=rixonprivatelimited@gmail.com
FROM_EMAIL=RIXON <your-verified-sender-domain>
```

Verify your sender domain with Resend before relying on production email delivery. Without these settings, bookings are still stored but no email is sent.

## Brand assets
The supplied Stitch export is preserved in `stitch-source/original-export`. The official logo is included at `public/images/rixon-logo.png` and used throughout the website. The single-page public design uses RIXON's dark navy and electric-blue palette with CSS perspective, depth, floating panels and hover interactions.

## Before launch
- Replace concept portfolio examples with genuine completed work.
- Set a unique admin password and a cryptographically random `SESSION_SECRET` of at least 32 characters. Add durable login rate limiting at the hosting/edge layer before exposing `/admin/login` publicly.
- Configure Supabase and test a real booking.
- Configure and verify the email sender.
- Add your privacy policy and terms if collecting customer data publicly.
- Deploy the Next.js app to a host that supports Next.js server routes (e.g. Vercel); a static-only host will not run the booking API/admin dashboard.
