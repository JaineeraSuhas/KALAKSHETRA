import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Camera, RotateCw, ZoomIn, ZoomOut, Download, X, Move, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { toast } from "@/hooks/use-toast";

export default function ARPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [placed, setPlaced] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (!id) return;
    api.getProductById(id).then((p) => { setProduct(p ?? null); setLoading(false); });
  }, [id]);

  const handleCapture = async () => {
    toast({ title: "Screenshot saved!", description: "AR preview captured to your gallery.", variant: "success" });
  };

  const handlePlace = () => {
    setPlaced(true);
    setShowInfo(false);
    toast({ title: "Product placed!", description: "Drag to reposition, use controls to rotate & scale." });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-pulse text-white text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p>Loading AR Preview...</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-center">
      <div><p className="text-xl mb-4">Product not found</p><Button onClick={() => navigate(-1)}>Go Back</Button></div>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Simulated camera feed */}
      <div ref={canvasRef} className="flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80"
          alt="Room background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* AR grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Scanning lines effect */}
        <motion.div
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-saffron/60 to-transparent"
          style={{ top: 0 }}
        />

        {/* Corner brackets */}
        {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-8 h-8 border-2 border-saffron/70`} style={{
            borderRight: i % 2 === 0 ? "none" : undefined,
            borderLeft: i % 2 === 1 ? "none" : undefined,
            borderBottom: i < 2 ? "none" : undefined,
            borderTop: i >= 2 ? "none" : undefined,
          }} />
        ))}

        {/* Info overlay */}
        <AnimatePresence>
          {showInfo && !placed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute inset-x-0 bottom-32 flex justify-center">
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl px-6 py-4 text-white text-center max-w-xs">
                <Move className="w-8 h-8 mx-auto mb-2 text-saffron" />
                <p className="font-semibold mb-1">Position your product</p>
                <p className="text-sm text-white/70">Tap "Place" to put the product in your space, then drag to reposition.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placed product */}
        <AnimatePresence>
          {placed && (
            <motion.div
              drag
              dragControls={dragControls}
              dragMomentum={false}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{ left: "30%", top: "25%", rotate: rotation, scale }}
            >
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain drop-shadow-2xl rounded-xl"
                  draggable={false}
                />
                {/* Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/30 blur-md rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product info card */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-2xl px-4 py-2 text-white text-center">
          <p className="text-xs text-saffron font-medium">AR PREVIEW</p>
          <p className="text-sm font-semibold truncate max-w-[200px]">{product.name}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10" id="ar-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setScale((s) => Math.max(0.3, s - 0.15))} className="text-white hover:bg-white/10 bg-white/10" id="ar-zoom-out">
              <ZoomOut className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setRotation((r) => r - 30)} className="text-white hover:bg-white/10 bg-white/10" id="ar-rotate-left">
              <RotateCw className="w-5 h-5 scale-x-[-1]" />
            </Button>
            {!placed ? (
              <Button size="lg" onClick={handlePlace} className="px-8 bg-clay hover:bg-rust" id="ar-place">
                Place Product
              </Button>
            ) : (
              <Button size="lg" onClick={() => setPlaced(false)} variant="outline" className="border-white/30 text-white hover:bg-white/10" id="ar-remove">
                Remove
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setRotation((r) => r + 30)} className="text-white hover:bg-white/10 bg-white/10" id="ar-rotate-right">
              <RotateCw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setScale((s) => Math.min(3, s + 0.15))} className="text-white hover:bg-white/10 bg-white/10" id="ar-zoom-in">
              <ZoomIn className="w-5 h-5" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={handleCapture} className="text-white hover:bg-white/10" id="ar-capture">
            <Camera className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
