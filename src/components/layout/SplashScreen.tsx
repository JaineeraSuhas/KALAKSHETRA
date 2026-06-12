import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep splash screen visible for 2.2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
              <Dithering
                colorBack="#00000000" // Transparent
                colorFront="#C2683B"  // Kalakshetra Clay Accent
                shape="warp"
                type="4x4"
                speed={0.4}
                className="w-full h-full"
                minPixelRatio={1}
              />
            </div>
          </Suspense>

          <div className="relative z-10 px-6 text-center">
            {/* Kalakshetra Logo/Name */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest text-foreground uppercase mb-4 leading-tight">
                Kalakshetra
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-clay dark:text-saffron font-semibold tracking-[0.3em] uppercase text-sm md:text-base"
              >
                Temple of Arts
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
