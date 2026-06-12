# Kalakshetra — Product Requirements Document

> **Version:** 1.0.0 | **Last Updated:** June 2026 | **Status:** Production-Ready Demo

---

## 1. Vision & Mission

**Kalakshetra** ("Temple of Arts") is a premium marketplace connecting traditional Indian artisans directly with global customers — cutting out middlemen, preserving craft heritage, and using modern tech (AR preview, real-time chat, analytics) to give buyers confidence and artisans visibility.

### Core Value Propositions

| Stakeholder | Value |
|---|---|
| **Buyers** | Authentic handcrafted products, direct artisan connection, AR home preview, transparent pricing |
| **Artisans** | Zero middlemen, 100% craft value, global reach, analytics dashboard, direct messaging |
| **Heritage** | Digital preservation of traditional crafts, artisan storytelling, cultural documentation |

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18 + TypeScript | UI with type safety |
| **Bundler** | Vite 5 | Fast HMR dev server, optimized builds |
| **Styling** | Tailwind CSS 3.4 + `tailwindcss-animate` | Utility-first styling with animation classes |
| **Components** | Radix UI Primitives (Avatar, Tabs, Toast, Slot) | Accessible headless components |
| **Variants** | `class-variance-authority` (CVA) | Component variant management |
| **Animations** | Framer Motion 11 | Page transitions, hover effects, spring physics |
| **State** | Zustand 4 + `persist` middleware | Cart, auth, theme, wishlist — persists to `localStorage` |
| **Routing** | React Router v6 | SPA routing with animated transitions |
| **Charts** | Recharts 2 | Dashboard analytics (area, pie charts) |
| **Icons** | Lucide React | Consistent icon library |
| **Utilities** | `clsx` + `tailwind-merge` | Conditional class merging |

---

## 3. Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `clay` | `#C2683B` | Primary terracotta — CTAs, accents, active states |
| `saffron` | `#E0A75E` | Secondary warm gold — dark mode accent, badges |
| `ink` | `#2B2118` | Near-black brown — text, dark backgrounds |
| `parchment` | `#F8F1E7` | Light background, hero text |
| `sage` | `#7A8C6F` | Success states, ratings, online indicators |
| `rust` | `#8B3A2B` | Deep accent — hover states, warnings |

### Typography

| Role | Font | Weight Range |
|---|---|---|
| Display/Headings | Fraunces (serif) | 300–700 |
| Body/UI | Inter (sans-serif) | 300–800 |
| Prices/Data | JetBrains Mono | 400–600 |

### Signature Elements

- **Thread Divider**: Hand-drawn SVG wave pattern representing weaving — used as section separators and active nav underlines
- **Glassmorphism**: `backdrop-blur-md bg-white/10 border-white/20` used in cards and overlays
- **Warm Shadows**: `shadow-warm` (terracotta-tinted) for elevated card hover states
- **Dark Mode**: Ink-based dark theme (`class="dark"` on `<html>`) with saffron accents replacing clay

---

## 4. Project Structure

```
kalakshetra/
├── PRD.md                    # This document
├── ENHANCEMENTS.md           # Future roadmap
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite + @ alias
├── tailwind.config.ts        # Design tokens
├── postcss.config.js         # Tailwind/PostCSS pipeline
├── index.html                # Entry HTML + Google Fonts
├── public/
│   └── favicon.svg           # Devanagari "क" favicon
└── src/
    ├── main.tsx              # React 18 entry
    ├── App.tsx               # Routes + AnimatePresence + theme sync
    ├── index.css             # CSS variables (light/dark), utilities
    ├── types/index.ts        # All TypeScript interfaces
    ├── data/                 # Mock data layer
    │   ├── artisans.ts       # 6 artisans
    │   ├── products.ts       # 16 products (unique images each)
    │   ├── categories.ts     # 6 craft categories
    │   ├── testimonials.ts   # 5 customer testimonials
    │   ├── orders.ts         # 5 orders + analytics data
    │   └── chats.ts          # 4 chat threads with messages
    ├── lib/
    │   ├── api.ts            # Mock API with simulated latency
    │   └── utils.ts          # cn(), formatINR(), formatCompactINR()
    ├── context/
    │   └── store.ts          # Zustand global store (persisted)
    ├── hooks/
    │   └── use-toast.ts      # Event-based toast notification system
    ├── components/
    │   ├── ui/               # Primitives (button, card, input, badge, avatar, tabs, toast, toaster)
    │   ├── layout/           # Navbar, Footer
    │   └── shared/           # GlassCard, RatingStars, PriceTag, SectionHeading, ProductCard, ThreadDivider
    └── pages/
        ├── Home.tsx          # Hero, stats, categories, trending, artisans, features, testimonials, CTA
        ├── Marketplace.tsx   # Filter drawer, sort, search, responsive product grid
        ├── ProductDetail.tsx # 3D tilt gallery, qty picker, reviews, similar products
        ├── ArtisanProfile.tsx# Cover photo, bio, stats, products, feedback
        ├── ARPreview.tsx     # Simulated camera, drag-to-place, rotate/scale/capture
        ├── Chat.tsx          # Thread list, message view, product sharing, auto-reply
        ├── Dashboard.tsx     # Orders, cart, wishlist, Recharts analytics
        ├── Login.tsx         # Split-screen, buyer/artisan toggle, demo hint
        └── Signup.tsx        # Split-screen, role-based fields, perks panel
```

---

## 5. Pages & Features

### 5.1 Home Page (`/`)

| Section | Description |
|---|---|
| Hero | Full-bleed image, animated headline, search bar with quick tag filters |
| Stats Bar | 4 metrics (artisans, products, customers, states) on clay background |
| Categories | 6 craft category cards with images, links to filtered marketplace |
| Trending | Top 4 trending products with ProductCard hover actions |
| Artisans | 4 featured artisan GlassCards with ratings, stats, online indicator |
| Features | 4-card grid: Authentic, Free Shipping, Direct Chat, AR Preview |
| Testimonials | 3 customer quotes in GlassCards |
| CTA | Full-bleed parallax image with dual action buttons |

### 5.2 Marketplace (`/marketplace`)

- Full 16-product responsive grid (1–4 columns)
- **Filter drawer** (slide-in): category checkboxes, price range inputs, minimum rating
- **Sort dropdown**: Featured, Price ↑↓, Top Rated, Newest
- **Search**: URL param-based (`?q=...`), synced with sidebar
- **Active filter chips** with clear-all
- **Skeleton loading** during simulated API fetch
- **Empty state** with clear CTA

### 5.3 Product Detail (`/product/:id`)

- **3D Tilt Gallery**: Mouse-tracked parallax with spring physics
- Thumbnail strip, category/trending badges, stock warning
- Artisan link with avatar
- Rating stars, price with discount %, materials badges
- **Quantity picker** (1 to stock limit)
- **Buy Now** (adds to cart → navigates to dashboard)
- **Add to Cart** with toast confirmation
- **Wishlist toggle**, **Share** (clipboard), **Ask Artisan** (→ chat)
- Trust badges: Authenticity, Free Shipping, Easy Returns
- Customer reviews with avatars, dates, ratings
- "You Might Also Like" similar products grid

### 5.4 Artisan Profile (`/artisan/:id`)

- Full-width cover photo with gradient overlay
- Avatar with online indicator, verified badge
- Bio in GlassCard, 4-stat grid (experience, sold, revenue, rating)
- Products by this artisan
- Customer feedback from their product reviews
- Message and Follow buttons

### 5.5 AR Preview (`/ar/:id`)

- Simulated camera feed (Unsplash room photo)
- AR grid overlay + scanning animation
- Corner bracket markers
- **Place Product** button → product appears as draggable overlay
- Rotate left/right, zoom in/out controls
- Screenshot capture button (toast notification)
- Remove and re-place
- Full-screen immersive UI (no navbar/footer)

### 5.6 Chat (`/chat`)

- **Thread list**: avatar, name, last message, unread count, online dot
- **Message view**: bubble layout, timestamps
- **Product sharing cards**: embedded image, name, price, "View Product" CTA
- **Auto-reply**: artisan responds 1.5s after user sends message
- Search conversations
- Image attach button (placeholder toast)

### 5.7 Dashboard (`/dashboard`)

- **Summary cards**: Total Orders, Wishlist Items, Cart Items, Total Spent
- **Tabs**:
  - **Orders**: 5 orders with status badges (Delivered/Shipped/Processing/Cancelled)
  - **Cart**: quantity controls, remove, total summary, checkout button
  - **Wishlist**: product cards with working Add to Cart and Remove buttons
  - **Analytics**: Recharts area chart (monthly spend) + pie chart (category breakdown)

### 5.8 Auth (`/login`, `/signup`)

- Split-screen layout: craft image + form
- **Buyer/Artisan role toggle**
- Artisan signup adds "Your Craft" field
- Password visibility toggle
- Demo credential hint (accepts any email/password)
- Auto-login → redirect to marketplace (buyer) or dashboard (artisan)
- Toast success notifications

---

## 6. Global Features

| Feature | Details |
|---|---|
| **Dark Mode** | Toggle in navbar, persists via Zustand → `localStorage`. Applies `dark` class to `<html>` |
| **Cart** | Add/remove/update quantity, total calculation, persisted |
| **Wishlist** | Toggle any product, persisted, reflected in ProductCard hearts |
| **Auth** | Simulated login/signup, user state persisted, navbar adapts |
| **Toast Notifications** | Bottom-right stack, 3 variants (default/success/destructive), auto-dismiss 4s |
| **Page Transitions** | Framer Motion fade-up on route change with `AnimatePresence` |
| **Scroll to Top** | Automatic on every route navigation |
| **Responsive** | Mobile sheet drawer nav, responsive grids (1→2→3→4 cols), touch-friendly |
| **Accessible** | Focus rings, `aria-label` on icon buttons, `prefers-reduced-motion` support |
| **Image Fallbacks** | All images have `onError` handlers showing gradient placeholders |

---

## 7. How to Run

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (comes with Node)

### Quick Start

```bash
# 1. Navigate to the project
cd kalakshetra

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

The app opens at **http://localhost:5173/**

### Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev Server | `npm run dev` | Starts Vite dev server with HMR on port 5173 |
| Type Check + Build | `npm run build` | Runs `tsc -b` then `vite build` → outputs to `dist/` |
| Preview Build | `npm run preview` | Serves the production build locally |

### Build for Production

```bash
npm run build
```

This outputs an optimized static bundle in `dist/`. Deploy it to any static host:

| Platform | Command |
|---|---|
| **Vercel** | `vercel --prod` (auto-detects Vite) |
| **Netlify** | Set build command to `npm run build`, publish dir to `dist` |
| **GitHub Pages** | Use `gh-pages` package or Actions to deploy `dist/` |
| **AWS S3 + CloudFront** | Upload `dist/` to S3, serve via CloudFront |
| **Docker** | `FROM nginx:alpine` → `COPY dist/ /usr/share/nginx/html/` |

### Environment Notes

- No environment variables needed — all data is mocked locally
- No backend required — the app runs entirely client-side
- Google Fonts loaded via CDN in `index.html`
- All product/artisan images from Unsplash (public, no API key)

---

## 8. Data Model Summary

| Entity | Count | Key Fields |
|---|---|---|
| `Product` | 16 | id, name, category, price, images[], artisanId, materials[], reviews[] |
| `Artisan` | 6 | id, name, craft, location, rating, yearsExperience, revenue, online |
| `Category` | 6 | name, icon, count, image |
| `Testimonial` | 5 | name, role, quote, rating |
| `Order` | 5 | productId, status, date, price, quantity |
| `ChatThread` | 4 | artisanId, messages[], unread, online |

---

## 9. Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari / Chrome on iOS/Android

---

## 10. Known Limitations (Demo)

1. **No real backend** — all API calls return local mock data with simulated delays
2. **Auth is simulated** — any email/password works, no validation
3. **Checkout is placeholder** — shows "coming soon" toast
4. **AR is simulated** — uses a static room photo, not actual camera/WebXR
5. **Chat is simulated** — auto-reply with fixed message, no WebSocket
6. **Images from Unsplash** — external dependency, may load slowly on poor connections
7. **No SSR/SEO** — single-page app, requires prerendering for SEO

---

*Built with ♥ for India's artisans.*
