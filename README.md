# Digital Lesson Generator

Digital Lesson Generator is a Next.js application that turns short lesson prompts into interactive teaching modules. It streams status updates while an OpenAI model writes a TypeScript React component, saves the result in Supabase, and renders the generated lesson immediately inside the browser.

## What’s Inside
- **Prompt-to-lesson workflow:** Submit a learning topic, watch real-time progress updates over Server-Sent Events, and store the finished result in Supabase.
- **Interactive lesson viewer:** Browse previously generated lessons, open any lesson to render the AI-authored React component, or inspect the raw source without leaving the page.
- **Starter content:** Quickly seed new prompts using curated lesson ideas grouped by subject and skill level.
- **Realtime updates:** Supabase Realtime triggers refresh the lesson list whenever a generation finishes.
- **Dark/light themes & UI primitives:** Tailwind CSS with Radix UI components, plus a theme switcher powered by `next-themes`.

## Tech Stack
- Next.js (App Router) & React 19
- Tailwind CSS & Radix UI
- Redux Toolkit for client state
- Supabase (Postgres + Realtime)
- OpenAI API (`gpt-4o-mini`) for lesson generation
- TypeScript throughout

## Prerequisites
- Node.js 18.18+ (Node 20 recommended for React 19 support)
- npm 9+
- A Supabase project with a `lessons` table
- OpenAI API key with access to `gpt-4o-mini`

## Environment Variables
Create an `.env.local` file in the project root and define:

```bash
OPEN_AI_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=public-anon-key
```

These variables are required both for the API route (`OPEN_AI_API_KEY`) and the client-side Supabase SDK (`NEXT_PUBLIC_*` values). Optional variables such as `VERCEL_URL` are automatically picked up when deploying.

## Supabase Setup
1. In Supabase, create a table named `lessons` with at least the following columns:
   - `id`: `uuid` (default `uuid_generate_v4()`), primary key
   - `lesson`: `text`
   - `status`: `text` with default `'pending'`
   - `generated_code`: `text`
   - `created_at`: `timestamp` with default `now()`
2. Enable Realtime for the `lessons` table so UI updates trigger automatically.
3. (Optional) Add Row Level Security policies that allow inserts/updates from your anonymous client key or restrict access as needed.

## Run Locally
```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`. The default dev script runs with Turbopack; append `--no-turbo` if you prefer the classic webpack pipeline.

## Usage Flow
1. Enter a topic on the homepage form and submit.
2. The app streams back generation steps while the `/api/generate` route:
   - stores the prompt in Supabase,
   - calls OpenAI to create a Tailwind-styled React component,
   - writes the generated code back to the same lesson row.
3. The lesson list refreshes in real time. Open any lesson to render the generated React component, or view the source code inside a modal.
4. Delete lessons directly from the list when they are no longer needed.

## Project Structure
- `app/page.tsx` – Landing page wiring the generator form and lesson list.
- `app/api/generate/route.ts` – Server-Sent Events endpoint orchestrating Supabase inserts and OpenAI streaming.
- `app/lessons/[id]/page.tsx` – Compiles and renders saved lesson components on-demand.
- `components/` – UI elements, generator form, listings, and Redux provider.
- `utils/` – Supabase client helpers, lesson data access, and streaming utility.
- `lib/config.ts` – App title and curated lesson suggestions.

## Helpful Scripts
- `npm run dev` – Start the development server.
- `npm run build` – Create a production build.
- `npm run start` – Serve the production build.
- `npm run lint` – Run ESLint across the project.

## Deployment Notes
- Ensure the same environment variables are configured in your hosting platform.
- When deploying on Vercel, set Supabase URL/key and OpenAI key in the project settings.
- Supabase Realtime requires the table to be enabled in the production project as well.

You now have everything needed to explore, extend, or deploy the Digital Lesson Generator. Happy hacking!
