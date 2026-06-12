import { useEffect, useState, useCallback } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

type ToastListener = (toast: Toast) => void;
const listeners = new Set<ToastListener>();

export function toast(options: Omit<Toast, "id">) {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
  const t: Toast = { id, duration: 4000, ...options };
  listeners.forEach((fn) => fn(t));
  return id;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener: ToastListener = (t) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, t.duration ?? 4000);
    };
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, dismiss };
}
