# ⚖️ LexBooks India — Supreme Court Legal Library & Treatises

A modern, production-grade legal commentary and law book platform engineered for Supreme Court advocates, High Court practitioners, and institutional legal research. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **PWA** capabilities.

---

## 🌟 Key Features

### 1. 📖 Secure Interactive Legal Reader
- **2-Page Free Preview**: Non-purchased books strictly allow reading pages 1 and 2 freely.
- **Dynamic Paywall Gate**: Navigating to page 3 or beyond instantly activates the paywall with blurred backdrop and an action modal.
- **Monetization Tiers**:
  - **Option 1: Buy & Read Online** (Instant in-browser access across devices).
  - **Option 2: Buy & Download PDF** (Online access + offline DRM-free courtroom copy).
- **Courtroom Toolbar**: Zoom controls, rapid page navigation pill, running legal headers, and chapter indexing.

### 2. 🏛️ Supreme Court Credibility & Practice Focus
- Modern prestige styling: Deep Navy (`#1B2A4A`), Gold (`#C9A84C`), and Cream (`#FAFAF8`).
- Comprehensive mock catalog of 12 authoritative treatises covering:
  - Constitutional Law (Supreme Court Article 32, 141, and 226 commentaries)
  - Criminal Law (Bharatiya Nyaya Sanhita 2023 & IPC transition commentaries)
  - Civil Procedure & Commercial Disputes
  - Corporate & Tax Jurisprudence
  - Family Law and Succession

### 3. 🔍 Search Engine Optimization (SEO) & Schema.org
- Pre-rendered Server-Side Generation (SSG) for all book routes.
- Schema.org JSON-LD `Book` and `Organization` structured data for rich Google search snippets.
- Dynamic `sitemap.xml` and standard `robots.txt`.
- OpenGraph and Twitter card metadata for legal citations shared on social platforms.

### 4. 📱 Progressive Web App (PWA) — App Potential
- Web Manifest configured (`/manifest.json`) for **"Add to Home Screen"** on iOS and Android.
- Standalone app-like viewport and navigation.
- Automatic Service Worker generation via `next-pwa` (`/sw.js`) for offline caching of stylesheets, fonts, and pages.

### 5. 💳 Indian Monetization & Payments
- Native **Razorpay** checkout integration configured (`src/lib/payment.ts`) supporting:
  - UPI (Google Pay, PhonePe, Paytm, BHIM)
  - Credit & Debit Cards (RuPay, Visa, Mastercard)
  - Netbanking across all major Indian banks
- Instant mock verification mode enabled out-of-the-box for development and live testing.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18.x or 20.x
- npm / pnpm / yarn

### Installation & Run

```bash
# 1. Navigate to the project directory
cd /Users/joy/.gemini/antigravity/scratch/lawbooks-india

# 2. Start the development server
npm run dev

# 3. Or build and run production server
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment & Payment Configuration

To connect live Razorpay payments, set your environment variables in `.env.local`:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_actual_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
NEXT_PUBLIC_APP_URL=https://yourlawfirm.com
```

---

## 📂 Project Structure

```
lawbooks-india/
├── public/
│   ├── manifest.json        # PWA Web App Manifest
│   ├── robots.txt           # Search Engine crawler rules
│   ├── sw.js                # Auto-generated PWA Service Worker
│   └── icons/               # Scalable SVG brand assets
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout + Global metadata & JSON-LD
│   │   ├── page.tsx         # Home page (Supreme Court firm hero & catalog)
│   │   ├── books/           # Filterable book catalog & search
│   │   │   └── [slug]/      # Individual book detail & preview reader
│   │   │       └── read/    # 2-Page preview & gated paywall reader
│   │   ├── pricing/         # Chamber subscription tiers & FAQ
│   │   ├── about/           # Chamber history, advocates & credentials
│   │   ├── contact/         # Consultation & treatise dispatch desk
│   │   ├── auth/            # Advocate login & registration
│   │   ├── dashboard/       # Advocate chamber desk & downloads
│   │   ├── api/books/       # REST API endpoints for legal catalog
│   │   └── sitemap.ts       # Dynamic sitemap generator
│   ├── components/
│   │   ├── books/           # BookCard, BookGrid
│   │   ├── layout/          # Glassmorphism Navbar, 4-column Footer
│   │   ├── payment/         # PricingCard
│   │   └── ui/              # Button, Input, Modal, Badge
│   ├── context/
│   │   └── AuthContext.tsx  # User session, purchases & subscription
│   ├── lib/
│   │   ├── books-data.ts    # 12 Supreme Court treatises
│   │   ├── payment.ts       # Razorpay integration & UPI support
│   │   └── utils.ts         # Formatting helpers (INR ₹, cn, slugs)
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── next.config.js           # PWA & Next.js config
├── tailwind.config.ts       # Navy & Gold prestige theme
└── tsconfig.json            # Path aliases (@/*)
```

---

## ⚖️ Built for Supreme Court Law Practice Excellence
Designed with speed, authoritative typography, and bulletproof conversion funnels.
