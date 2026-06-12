# Kalakshetra — Enhancements & Production Integration Roadmap

> **Version:** 2.0 Planning | **Created:** June 2026 | **Status:** Proposed

---

## Overview

This document outlines the complete roadmap for evolving Kalakshetra from its current demo state (mock data, simulated auth, client-only) into a fully production-grade marketplace with real data, authentication, payments, and scalable infrastructure.

---

## Phase 1: Authentication & User Management (Week 1–2)

### 1.1 Auth Provider Integration

| Option | Pros | Cons |
|---|---|---|
| **Firebase Auth** | Quick setup, Google/phone/email OTP, free tier | Google lock-in |
| **Supabase Auth** | Open-source, PostgreSQL-backed, row-level security | Smaller community |
| **Auth0** | Enterprise-grade, SSO, social login | Pricing at scale |
| **NextAuth.js** | If migrating to Next.js, full-stack auth | Requires Next.js |

**Recommended:** Supabase Auth (pairs with Supabase DB)

### 1.2 Implementation Tasks

```
□ Set up Supabase project + auth configuration
□ Replace simulated api.login() / api.signup() with real auth calls
□ Implement email/password signup with email verification
□ Add Google & phone OTP social login
□ Create protected routes (Dashboard, Chat require login)
□ Implement JWT token storage + refresh cycle
□ Add password reset flow
□ Role-based access control (buyer vs artisan)
□ Artisan onboarding flow with craft verification
□ Profile management (avatar upload, bio edit, address)
□ Session persistence across tabs/devices
```

### 1.3 Security Measures

- CSRF protection on all form submissions
- Rate limiting on auth endpoints (5 attempts/min)
- Password strength requirements (min 8 chars, mixed case, number)
- Email verification before account activation
- Account lockout after failed attempts
- Secure cookie settings (HttpOnly, SameSite, Secure)

---

## Phase 2: Real Database & API Layer (Week 2–4)

### 2.1 Database Schema

**Recommended:** Supabase (PostgreSQL) or PlanetScale (MySQL)

```sql
-- Core tables
users (id, email, name, role, avatar_url, phone, created_at)
artisans (id, user_id FK, craft, location, bio, years_exp, verified, cover_url)
products (id, artisan_id FK, name, slug, category, price, original_price, description, materials[], stock, trending, created_at)
product_images (id, product_id FK, url, position, alt_text)
categories (id, name, slug, icon, image_url)
reviews (id, product_id FK, user_id FK, rating, comment, created_at)

-- Commerce
orders (id, user_id FK, status, total, shipping_address, created_at)
order_items (id, order_id FK, product_id FK, quantity, price_at_purchase)
cart_items (id, user_id FK, product_id FK, quantity)
wishlist (id, user_id FK, product_id FK, created_at)

-- Messaging
chat_threads (id, buyer_id FK, artisan_id FK, created_at)
chat_messages (id, thread_id FK, sender_id FK, text, product_id FK, created_at)

-- Analytics
page_views (id, product_id FK, user_id, timestamp)
search_logs (id, query, results_count, user_id, timestamp)
```

### 2.2 API Layer Migration

Replace `src/lib/api.ts` mock functions with real API calls:

```typescript
// Before (mock):
async getProducts(): Promise<Product[]> {
  await delay(500);
  return products;
}

// After (real):
async getProducts(params: { page: number; limit: number; category?: string; sort?: string }): Promise<PaginatedResponse<Product>> {
  const res = await fetch(`${API_URL}/products?${new URLSearchParams(params)}`);
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json();
}
```

### 2.3 Backend Options

| Option | Stack | Best For |
|---|---|---|
| **Supabase** | PostgreSQL + Edge Functions + Realtime | Fastest to production |
| **Express + Prisma** | Node.js + PostgreSQL | Full control |
| **Next.js API Routes** | Serverless functions | If migrating to Next.js |
| **tRPC** | End-to-end type safety | TypeScript-first teams |

---

## Phase 3: Payment Integration (Week 4–5)

### 3.1 Payment Gateway

**Recommended:** Razorpay (India-first) or Stripe (global)

### 3.2 Implementation Tasks

```
□ Integrate Razorpay/Stripe SDK
□ Create checkout page with order summary
□ Implement payment intent creation (server-side)
□ Handle payment success/failure callbacks
□ Generate order confirmation with invoice
□ Implement refund flow for cancelled orders
□ Add UPI, cards, net banking, wallets as payment methods
□ Set up webhook for payment status updates
□ Implement COD (Cash on Delivery) option
□ Tax calculation (GST) integration
□ Shipping cost calculation by pincode
```

### 3.3 Checkout Flow

```
Cart → Address Entry → Shipping Method → Payment → Order Confirmation → Email Receipt
```

---

## Phase 4: Real-Time Features (Week 5–6)

### 4.1 Live Chat

Replace simulated auto-reply with real WebSocket-based messaging:

```
□ Supabase Realtime subscriptions OR Socket.io server
□ Real-time message delivery with read receipts
□ Typing indicators
□ Push notifications (browser + mobile)
□ File/image sharing in chat
□ Chat history pagination
□ Online/offline status via presence channels
□ Unread message count sync
```

### 4.2 Live Notifications

```
□ Order status change notifications
□ New message notification badges
□ Price drop alerts for wishlisted items
□ Back-in-stock notifications
□ Review reply notifications
```

---

## Phase 5: Image & Media Infrastructure (Week 6–7)

### 5.1 Image Management

Replace Unsplash URLs with self-hosted, optimized images:

| Service | Purpose |
|---|---|
| **Cloudinary** | Upload, transform, CDN delivery, auto-format (WebP/AVIF) |
| **Supabase Storage** | S3-compatible, integrated with auth |
| **Imgix** | Real-time image processing CDN |

### 5.2 Implementation Tasks

```
□ Image upload component for artisans (product photos)
□ Automatic image optimization (resize, compress, WebP)
□ Responsive images with srcset/sizes
□ Lazy loading with blur-up placeholder (LQIP)
□ CDN-served images with cache headers
□ User avatar upload (crop + resize)
□ Product image gallery management (reorder, delete, add)
□ Cover photo upload for artisan profiles
```

---

## Phase 6: AR Preview Enhancement (Week 7–8)

### 6.1 Real AR Implementation

Replace simulated camera feed with actual device camera:

```
□ WebXR API integration for AR-capable browsers
□ model-viewer web component for 3D product models
□ Camera access with MediaDevices API fallback
□ Surface detection for product placement
□ Product 3D model upload pipeline (.glb/.gltf)
□ Real-time lighting estimation
□ Screenshot capture to device gallery
□ Social sharing of AR screenshots
□ Measurement overlay (actual product dimensions)
```

### 6.2 3D Asset Pipeline

```
Artisan photos → Photogrammetry → 3D mesh → .glb export → CDN → model-viewer
```

---

## Phase 7: Search & Discovery (Week 8–9)

### 7.1 Full-Text Search

```
□ Algolia or Meilisearch integration
□ Instant search with typeahead suggestions
□ Faceted filtering (category, price, rating, material, location)
□ Search analytics (popular queries, zero-result tracking)
□ Fuzzy matching + synonym support
□ Multi-language search (Hindi, Tamil, etc.)
□ Recently viewed products
□ Personalized recommendations (collaborative filtering)
```

### 7.2 SEO & SSR

```
□ Migrate to Next.js for server-side rendering
□ Dynamic meta tags per product/artisan page
□ Structured data (JSON-LD) for products
□ Sitemap generation
□ Open Graph + Twitter Card meta
□ Canonical URLs
□ Breadcrumb structured data
```

---

## Phase 8: Admin & Artisan Dashboard (Week 9–11)

### 8.1 Artisan Portal

```
□ Product CRUD (create, edit, delete, archive)
□ Order management (view, update status, print shipping labels)
□ Revenue analytics (daily/weekly/monthly, by product)
□ Customer messages inbox
□ Inventory management (stock alerts)
□ Payout tracking (bank transfer history)
□ Profile & store customization
□ Promotional tools (discounts, featured products)
```

### 8.2 Admin Portal

```
□ Artisan verification & approval workflow
□ Product moderation queue
□ Platform-wide analytics dashboard
□ User management
□ Category management
□ Content management (banners, featured sections)
□ Dispute resolution panel
□ Commission & payout management
□ System health monitoring
```

---

## Phase 9: Mobile & Performance (Week 11–13)

### 9.1 Progressive Web App

```
□ Service worker for offline support
□ App manifest for Add to Home Screen
□ Push notification support
□ Background sync for cart/wishlist
□ Offline product browsing (cached)
□ Install banner
```

### 9.2 Performance Optimization

```
□ Code splitting per route (already via React.lazy)
□ Image lazy loading with Intersection Observer
□ Virtual scrolling for large product lists
□ Preload critical fonts
□ CDN for static assets
□ Lighthouse audit → target 90+ scores
□ Bundle analysis and tree shaking
□ API response caching (SWR/React Query)
```

### 9.3 React Native App (Optional)

```
□ Shared business logic via shared TypeScript modules
□ React Native UI with platform-native navigation
□ Camera-based AR with ARKit/ARCore
□ Push notifications via Firebase Cloud Messaging
□ App Store / Play Store submission
```

---

## Phase 10: Advanced Features (Week 13+)

### 10.1 AI / ML Features

```
□ Visual search — upload photo, find similar products
□ AI product descriptions — assist artisans with copywriting
□ Smart recommendations — "Customers who bought X also liked Y"
□ Chatbot for buyer support (FAQ, order tracking)
□ Craft authenticity verification via image analysis
□ Dynamic pricing suggestions based on demand
```

### 10.2 Social & Community

```
□ Artisan stories / blog posts
□ Video of craft process (short-form, TikTok-style)
□ Buyer collections (public wishlists)
□ Gift registry
□ Referral program
□ Social sharing with attribution
```

### 10.3 Logistics & Operations

```
□ Shipping partner integration (Delhivery, Shiprocket)
□ Real-time order tracking with map
□ Return/exchange management
□ Packaging guidelines for artisans
□ Quality control checkpoints
□ Insurance for high-value items
□ International shipping (customs, duties calculation)
```

---

## Infrastructure & DevOps

### Hosting

| Component | Service | Why |
|---|---|---|
| Frontend | Vercel / Netlify | Edge CDN, auto-deploy from Git |
| Backend | Supabase / Railway | Managed PostgreSQL + Edge Functions |
| Images | Cloudinary | Auto-optimize, CDN, transformations |
| Search | Meilisearch Cloud | Self-hosted search engine |
| Monitoring | Sentry + Vercel Analytics | Error tracking + Web Vitals |

### CI/CD Pipeline

```
Push to main → GitHub Actions → Lint + Type Check → Build → Preview Deploy → E2E Tests → Production Deploy
```

### Environment Variables

```env
# Auth
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Payments
VITE_RAZORPAY_KEY_ID=rzp_live_xxxx
RAZORPAY_KEY_SECRET=xxxx  # Server-side only

# Images
VITE_CLOUDINARY_CLOUD_NAME=your-cloud

# Search
VITE_MEILISEARCH_HOST=https://search.kalakshetra.in
VITE_MEILISEARCH_KEY=xxxx

# Analytics
VITE_SENTRY_DSN=https://xxxx@sentry.io/xxxx
```

---

## Migration Priority Matrix

| Priority | Enhancement | Effort | Impact |
|---|---|---|---|
| 🔴 P0 | Real Authentication | 1 week | Unlocks all user features |
| 🔴 P0 | Database + Real API | 2 weeks | Makes app functional |
| 🟡 P1 | Payment Integration | 1 week | Enables commerce |
| 🟡 P1 | Image Hosting | 3 days | Removes external dependency |
| 🟡 P1 | Real-time Chat | 1 week | Core differentiator |
| 🟢 P2 | Search (Algolia/Meili) | 3 days | Better product discovery |
| 🟢 P2 | SSR / SEO (Next.js) | 1 week | Organic traffic |
| 🟢 P2 | Artisan Dashboard | 2 weeks | Artisan self-service |
| 🔵 P3 | Real AR (WebXR) | 2 weeks | Premium feature |
| 🔵 P3 | AI Recommendations | 2 weeks | Engagement boost |
| 🔵 P3 | Mobile App | 4 weeks | Broader reach |

---

## Estimated Timeline

| Phase | Duration | Milestone |
|---|---|---|
| Phase 1–2 | Weeks 1–4 | Auth + Database → **Functional MVP** |
| Phase 3–4 | Weeks 4–6 | Payments + Realtime → **Revenue-Ready** |
| Phase 5–7 | Weeks 6–9 | Media + AR + Search → **Premium Experience** |
| Phase 8–9 | Weeks 9–13 | Admin + Performance → **Scale-Ready** |
| Phase 10 | Week 13+ | AI + Social + Logistics → **Market Leader** |

---

*From demo to deployment — one craft at a time.* 🏺
