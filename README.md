# Handcrafted Haven

A ready-to-submit full‑stack Next.js app that meets the project requirements:

- Seller profiles with authenticated dashboard
- Product listings with images, descriptions, categories, pricing
- Catalog browsing + search/filtering
- Reviews & ratings for products (any signed-in user)
- Accessibility (WCAG-minded), SEO, responsive layout
- Tech: Next.js (App Router), Prisma + PostgreSQL, NextAuth (Credentials), Vercel-ready

## Quick Start (Local)

1. **Install** dependencies:
   ```bash
   npm install
   ```

2. **Configure env**: copy `.env.example` to `.env` and set `DATABASE_URL` to a **Postgres** database (Neon/Render/Railway). Also set `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`).

3. **Prisma**: create tables and seed demo data:
   ```bash
   npx prisma db push
   npm run prisma:seed
   ```

4. **Run**:
   ```bash
   npm run dev
   ```

5. **Sign in** at `/auth/signin` with:
   - Seller: `seller@haven.test` / `seller123`
   - Buyer: `buyer@haven.test` / `buyer123`

## Deploy to Vercel

1. Create a new project from this repo in Vercel.
2. Add **Environment Variables** in Vercel Project Settings:
   - `DATABASE_URL` (Postgres connection string, e.g., Neon)
   - `NEXTAUTH_SECRET` (long random string)
   - `NEXTAUTH_URL` (your Vercel URL, e.g., `https://handcrafted-haven.vercel.app`)
3. In Vercel, set **Build Command** to `npm run build` and **Install Command** to `npm install`.
4. After first deploy, run `npx prisma db push` and `npm run prisma:seed` from a local terminal with your production `DATABASE_URL` to provision the DB.

## Accessibility & Quality

- Semantic HTML, skip link, labeled controls, keyboard-focus styles
- `next/image` for optimized images
- Metadata / OpenGraph for SEO
- Responsive CSS grid (no external CSS framework)

## Project Management

See [`docs/PROJECT_BOARD.md`](docs/PROJECT_BOARD.md) for a GitHub Boards template and issue list.

## License

MIT — for educational use.
