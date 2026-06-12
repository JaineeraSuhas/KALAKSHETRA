import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types";

interface User { name: string; email: string; }

interface AppState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      cart: [],
      addToCart: (product, quantity = 1) =>
        set((s) => {
          const existing = s.cart.find((i) => i.product.id === product.id);
          if (existing) return { cart: s.cart.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i) };
          return { cart: [...s.cart, { product, quantity }] };
        }),
      removeFromCart: (productId) => set((s) => ({ cart: s.cart.filter((i) => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((s) => ({ cart: s.cart.map((i) => i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i) })),
      clearCart: () => set({ cart: [] }),
      cartTotal: () => get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
      wishlist: [],
      toggleWishlist: (product) =>
        set((s) => {
          const exists = s.wishlist.find((p) => p.id === product.id);
          return { wishlist: exists ? s.wishlist.filter((p) => p.id !== product.id) : [...s.wishlist, product] };
        }),
      isWishlisted: (productId) => !!get().wishlist.find((p) => p.id === productId),
    }),
    { name: "kalakshetra-store" }
  )
);
