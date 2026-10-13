# Tagde Nutrition — Full E-commerce Store

Premium nutritional supplements e-commerce website built with Next.js, Neon (Postgres), Razorpay, and Vercel.

## Features

- Product catalog with categories & filters
- Product detail pages (benefits, ingredients, usage)
- Shopping cart (Zustand + localStorage)
- Checkout with Razorpay (India)
- Order creation & storage
- Admin dashboard (stats + recent orders)
- Fully responsive, modern UI
- Free shipping over ₹999

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Database**: Neon (PostgreSQL) + Prisma
- **Payments**: Razorpay
- **State**: Zustand
- **Deploy**: Vercel + GitHub

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd tagde-nutrition
npm install
```

### 2. Set up Neon Database

1. Create a free project at [neon.tech](https://neon.tech)
2. Copy the connection string
3. Create `.env` file:

```bash
cp .env.example .env
```

Paste your `DATABASE_URL`.

### 3. Push Schema & Seed Data

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 4. (Optional) Razorpay Keys

Add your Razorpay test/live keys to `.env`:

```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push the code to GitHub
2. Import the repo in Vercel
3. Add all environment variables (especially `DATABASE_URL`)
4. Deploy

Vercel will automatically run `prisma generate` via the `postinstall` script.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── shop/                 # Product listing
│   ├── product/[slug]/       # Product detail
│   ├── cart/                 # Cart
│   ├── checkout/             # Checkout + Razorpay
│   ├── admin/                # Admin dashboard
│   ├── about/                # About page
│   └── api/checkout/         # Order + Razorpay API
├── components/               # UI components
├── lib/                      # db, utils
├── store/                    # Zustand cart
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

## Admin Access

Visit `/admin` for the dashboard.  
(For production, protect this route with Clerk or a simple password.)

## Notes

- Prices are stored in **paise** (₹1 = 100 paise)
- Free shipping threshold: ₹999
- Product images currently use Unsplash placeholders — replace with your own product photos in the seed file or admin
- Auth is currently demo-mode (no Clerk required to start). You can add Clerk later for proper user accounts.

## Next Steps You Can Add

- Full Clerk authentication
- Order tracking page
- Product reviews
- Admin product CRUD UI
- Inventory management
- Email order confirmations

---

Built for **Tagde Nutrition** 💪
