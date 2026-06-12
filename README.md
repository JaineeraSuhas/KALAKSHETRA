# Kalakshetra — Temple of Arts 🏺✨

> **A premium, modern React marketplace connecting traditional Indian artisans directly with global customers.**

Kalakshetra eliminates the middlemen, preserving craft heritage while leveraging modern web technologies to provide an immersive, highly performant shopping experience.

![Kalakshetra Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer)

## 🚀 Key Features

- **Immersive UI/UX**: Full Framer Motion page transitions, custom dithering shaders, and glassmorphism elements.
- **Offline Assets**: All high-fidelity product imagery is fully localized for immediate, offline-ready deployment.
- **Artisan Ecosystem**: Direct messaging (simulated), dedicated artisan profile pages, and transparent analytics dashboards.
- **Advanced Product Views**: Interactive 3D tilt-card galleries and a simulated AR (Augmented Reality) room previewer.
- **Robust State Management**: Zustand + persisted storage handles carts, wishlists, dark mode, and auth state cleanly.
- **Dark Mode**: A beautiful, custom 'ink' and 'saffron' themed dark mode built directly into the UI.

## 💻 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + Radix UI Primitives + Lucide Icons
- **Animation**: Framer Motion + `@paper-design/shaders-react`
- **State Management**: Zustand
- **Routing**: React Router v6
- **Data Visualization**: Recharts

---

## 🛠️ How to Run Locally

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Quick Start Guide

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/JaineeraSuhas/KALAKSHETRA.git
   cd KALAKSHETRA
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the Application**:
   Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)** to see the app running live!

---

## 📦 Building for Production

To generate an optimized, minified bundle ready for deployment:

```bash
npm run build
```

This will output all static files into the `dist/` directory.

### Deployment 

The `dist/` folder can be deployed to any static hosting provider.
- **Vercel**: Simply run `vercel --prod` (Vercel automatically detects Vite apps).
- **Netlify**: Set the Build Command to `npm run build` and the Publish Directory to `dist`.
- **GitHub Pages**: You can use the `gh-pages` npm package or set up a GitHub Action to deploy the `dist/` folder.

---

## 🏗️ Project Structure

```text
src/
├── components/
│   ├── layout/        # Navbar, Footer, SplashScreen
│   ├── shared/        # Reusable UI (ProductCards, GlassCards, RatingStars)
│   └── ui/            # Base Tailwind/Radix UI primitives
├── context/           # Zustand global store configuration
├── data/              # Mock databases (artisans, products, chats, orders)
├── hooks/             # Custom React hooks (e.g., use-toast)
├── lib/               # Utility functions and mock API layer
├── pages/             # Core route pages (Home, Marketplace, Dashboard, etc.)
├── types/             # Global TypeScript interfaces
└── App.tsx            # Main router and layout orchestrator
```

---

*Built with ♥ for India's artisans.*
