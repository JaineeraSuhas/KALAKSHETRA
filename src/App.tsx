import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/context/store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import ProductDetail from "@/pages/ProductDetail";
import ArtisanProfile from "@/pages/ArtisanProfile";
import ARPreview from "@/pages/ARPreview";
import Chat from "@/pages/Chat";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { SplashScreen } from "@/components/layout/SplashScreen";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  const isAR = location.pathname.startsWith("/ar/");

  return (
    <>
      <ScrollToTop />
      {!isAR && <Navbar />}
      <main className={isAR ? "" : "flex-1"}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/marketplace" element={<PageWrapper><Marketplace /></PageWrapper>} />
            <Route path="/product/:id" element={<ProtectedRoute><PageWrapper><ProductDetail /></PageWrapper></ProtectedRoute>} />
            <Route path="/artisan/:id" element={<ProtectedRoute><PageWrapper><ArtisanProfile /></PageWrapper></ProtectedRoute>} />
            <Route path="/ar/:id" element={<ProtectedRoute><ARPreview /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><PageWrapper><Chat /></PageWrapper></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAR && <Footer />}
      <Toaster />
    </>
  );
}

export default function App() {
  const theme = useStore((s) => s.theme);
  const [showSplash, setShowSplash] = React.useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <AppRoutes />
        )}
      </div>
    </BrowserRouter>
  );
}
