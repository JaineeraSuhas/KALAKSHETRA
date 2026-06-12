import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Package, Heart, BarChart3, ShoppingCart, Truck, CheckCircle, Clock, XCircle, Trash2, Eye } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GlassCard } from "@/components/shared/GlassCard";
import { PriceTag } from "@/components/shared/PriceTag";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useStore } from "@/context/store";
import { orders, monthlySpend, categorySpend } from "@/data/orders";
import { formatINR, formatCompactINR } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  Delivered: { icon: <CheckCircle className="w-4 h-4" />, color: "text-sage bg-sage/10" },
  Shipped: { icon: <Truck className="w-4 h-4" />, color: "text-blue-500 bg-blue-500/10" },
  Processing: { icon: <Clock className="w-4 h-4" />, color: "text-saffron bg-saffron/10" },
  Cancelled: { icon: <XCircle className="w-4 h-4" />, color: "text-destructive bg-destructive/10" },
};

export default function Dashboard() {
  const user = useStore((s) => s.user);
  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const cartTotal = useStore((s) => s.cartTotal());

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "orders";

  const totalSpend = monthlySpend.reduce((s, m) => s + m.amount, 0);

  const summaryCards = [
    { label: "Total Orders", value: orders.length, icon: <Package className="w-5 h-5" />, color: "text-clay dark:text-saffron" },
    { label: "Wishlist Items", value: wishlist.length, icon: <Heart className="w-5 h-5" />, color: "text-rose-500" },
    { label: "Cart Items", value: cart.reduce((s, i) => s + i.quantity, 0), icon: <ShoppingCart className="w-5 h-5" />, color: "text-sage" },
    { label: "Total Spent", value: formatCompactINR(totalSpend), icon: <BarChart3 className="w-5 h-5" />, color: "text-saffron" },
  ];

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <SectionHeading title={user ? `Welcome back, ${user.name}` : "My Dashboard"} tag="Customer Portal" className="mb-0" />
        </div>
        {!user && (
          <Button asChild><Link to="/login">Sign In</Link></Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {summaryCards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <GlassCard className="p-5">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-current/10 mb-3 ${c.color}`} style={{ backgroundColor: "currentColor" }}>
                <span className={c.color}>{c.icon}</span>
              </div>
              <p className="font-mono font-bold text-2xl text-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setSearchParams({ tab: v })}>
        <TabsList className="mb-6">
          <TabsTrigger value="orders" id="tab-orders"><Package className="w-4 h-4 mr-1.5" /> Orders</TabsTrigger>
          <TabsTrigger value="cart" id="tab-cart"><ShoppingCart className="w-4 h-4 mr-1.5" /> Cart ({cart.length})</TabsTrigger>
          <TabsTrigger value="wishlist" id="tab-wishlist"><Heart className="w-4 h-4 mr-1.5" /> Wishlist ({wishlist.length})</TabsTrigger>
          <TabsTrigger value="analytics" id="tab-analytics"><BarChart3 className="w-4 h-4 mr-1.5" /> Analytics</TabsTrigger>
        </TabsList>

        {/* ORDERS */}
        <TabsContent value="orders">
          <div className="space-y-4">
            {orders.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              return (
                <motion.div key={order.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:shadow-sm transition-shadow">
                  <img src={order.image} alt={order.productName} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{order.productName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Order #{order.id} · {new Date(order.date).toLocaleDateString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-bold text-sm text-clay dark:text-saffron">{formatINR(order.price * order.quantity)}</p>
                    <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>
                      {cfg.icon} {order.status}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        {/* CART */}
        <TabsContent value="cart">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="font-display text-xl mb-2">Your cart is empty</p>
              <Button asChild className="mt-4"><Link to="/marketplace">Shop Now</Link></Button>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card">
                    <Link to={`/product/${item.product.id}`}>
                      <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover shrink-0 hover:opacity-80 transition-opacity" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`} className="font-semibold text-sm hover:text-clay transition-colors line-clamp-1">{item.product.name}</Link>
                      <p className="text-xs text-muted-foreground">{item.product.artisanName}</p>
                      <PriceTag price={item.product.price} size="sm" className="mt-1" />
                    </div>
                    <div className="flex items-center border border-border rounded-lg overflow-hidden shrink-0">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted text-lg">−</button>
                      <span className="w-8 text-center text-sm font-mono">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted text-lg">+</button>
                    </div>
                    <Button variant="ghost" size="icon-sm" onClick={() => { removeFromCart(item.product.id); toast({ title: "Removed from cart" }); }}>
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
              <GlassCard className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total ({cart.reduce((s, i) => s + i.quantity, 0)} items)</p>
                  <p className="font-mono font-bold text-2xl text-clay dark:text-saffron">{formatINR(cartTotal)}</p>
                </div>
                <Button size="lg" onClick={() => toast({ title: "Checkout coming soon!", description: "Payment integration in next release." })}>Proceed to Checkout</Button>
              </GlassCard>
            </div>
          )}
        </TabsContent>

        {/* WISHLIST */}
        <TabsContent value="wishlist">
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="font-display text-xl mb-2">Your wishlist is empty</p>
              <Button asChild className="mt-4"><Link to="/marketplace">Discover Products</Link></Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map((product) => (
                <div key={product.id} className="flex gap-3 p-4 rounded-2xl border border-border bg-card">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-xl object-cover shrink-0 hover:opacity-80 transition-opacity" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.id}`} className="font-semibold text-sm hover:text-clay transition-colors line-clamp-2">{product.name}</Link>
                    <p className="text-xs text-muted-foreground">{product.artisanName}</p>
                    <PriceTag price={product.price} size="sm" className="mt-1" />
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="text-xs h-7 px-3" onClick={() => { useStore.getState().addToCart(product); toast({ title: "Added to cart!", description: product.name, variant: "success" }); }}>Add to Cart</Button>
                      <Button size="icon-sm" variant="ghost" onClick={() => toggleWishlist(product)}>
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ANALYTICS */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GlassCard className="p-6">
                <h3 className="font-display font-semibold text-lg mb-6">Monthly Spending</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={monthlySpend}>
                    <defs>
                      <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C2683B" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#C2683B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                    <Tooltip formatter={(v: number) => formatINR(v)} />
                    <Area type="monotone" dataKey="amount" stroke="#C2683B" strokeWidth={2.5} fill="url(#spendGrad)" dot={{ fill: "#C2683B", r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </GlassCard>
            </div>
            <div>
              <GlassCard className="p-6 h-full">
                <h3 className="font-display font-semibold text-lg mb-6">Spend by Category</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={categorySpend} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {categorySpend.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatINR(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {categorySpend.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                        <span className="text-muted-foreground">{c.name}</span>
                      </div>
                      <span className="font-mono font-semibold">{formatINR(c.value)}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
