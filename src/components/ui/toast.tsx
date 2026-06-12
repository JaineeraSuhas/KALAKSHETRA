import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toast } from "@/hooks/use-toast";
import React from "react";

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const variantConfig = {
  default: { icon: <Info className="w-4 h-4" />, cls: "border-saffron/30 text-saffron" },
  success: { icon: <CheckCircle className="w-4 h-4" />, cls: "border-sage/40 text-sage" },
  destructive: { icon: <AlertCircle className="w-4 h-4" />, cls: "border-destructive/40 text-destructive" },
};

export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const cfg = variantConfig[toast.variant ?? "default"];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl shadow-warm border",
        "bg-card/95 backdrop-blur-sm text-card-foreground min-w-[300px]",
        cfg.cls
      )}
    >
      <span className={cfg.cls}>{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        {toast.title && <p className="font-semibold text-sm text-foreground">{toast.title}</p>}
        {toast.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
