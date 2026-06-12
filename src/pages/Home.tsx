import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles, Shield, Truck, MessageCircle, Star, TrendingUp, Users, Package, Shirt, Gem, TreePine, Hammer, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ThreadDivider } from "@/components/shared/ThreadDivider";
import { RatingStars } from "@/components/shared/RatingStars";
import { GlassCard } from "@/components/shared/GlassCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { testimonials } from "@/data/testimonials";
import { artisans } from "@/data/artisans";
import { products } from "@/data/products";
import { formatCompactINR } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="w-6 h-6" />, Gem: <Gem className="w-6 h-6" />,
  TreePine: <TreePine className="w-6 h-6" />, Hammer: <Hammer className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />, Amphora: <span className="text-2xl">🏺</span>,
};

const stats = [
  { label: "Artisans", value: "1,200+", icon: <Users className="w-5 h-5" /> },
  { label: "Products", value: "8,500+", icon: <Package className="w-5 h-5" /> },
  { label: "Customers", value: "42,000+", icon: <Star className="w-5 h-5" /> },
  { label: "States", value: "28", icon: <Sparkles className="w-5 h-5" /> },
];

const features = [
  { icon: <Shield className="w-6 h-6" />, title: "100% Authentic", desc: "Every product verified and directly sourced from the artisan." },
  { icon: <Truck className="w-6 h-6" />, title: "Free Shipping", desc: "Complimentary shipping on orders above ₹2,000 across India." },
  { icon: <MessageCircle className="w-6 h-6" />, title: "Direct Chat", desc: "Talk to artisans, request customizations, track your craft." },
  { icon: <Sparkles className="w-6 h-6" />, title: "AR Preview", desc: "See products in your home via augmented reality before buying." },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  const trendingProducts = products.filter((p) => p.trending).slice(0, 4);
  const featuredArtisans = artisans.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/marketplace${searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : ""}`);
  };

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80" alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/60 to-rust/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-saffron/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-clay/20 blur-3xl" />
        <div className="relative z-10 container text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <Badge className="mb-6 bg-saffron/20 text-saffron border border-saffron/30 text-xs tracking-widest uppercase">✦ Temple of Arts</Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }} transition={{ duration: 0.8, delay: 0.25 }} className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-parchment leading-tight text-balance mb-6">
            Handcrafted India,<br /><span className="text-saffron">Direct from Artisans</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-parchment/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover 8,500+ authentic handcrafted products — from Kanjeevaram silk to Dhokra brass. Buy directly from master artisans, no middlemen.
          </motion.p>
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }} transition={{ duration: 0.8, delay: 0.55 }} onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search sarees, pottery, jewelry..." id="hero-search" className="pl-12 h-12 bg-white/95 dark:bg-ink/80 border-transparent text-base backdrop-blur-sm" />
            </div>
            <Button type="submit" size="lg" className="h-12 px-6 shrink-0">Search <ArrowRight className="w-4 h-4" /></Button>
          </motion.form>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-wrap justify-center gap-2">
            {["Kanjeevaram Sarees", "Blue Pottery", "Pashmina Shawls", "Dhokra Art"].map((tag) => (
              <button key={tag} onClick={() => navigate(`/marketplace?q=${encodeURIComponent(tag)}`)} className="px-3 py-1 rounded-full bg-white/10 text-parchment/70 border border-white/20 hover:bg-white/20 transition-colors text-xs backdrop-blur-sm">{tag}</button>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-parchment/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-0.5 h-8 bg-gradient-to-b from-parchment/30 to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-clay dark:bg-rust/80 py-12">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center gap-2">
              <span className="text-saffron">{s.icon}</span>
              <p className="font-mono font-bold text-3xl text-white">{s.value}</p>
              <p className="text-parchment/70 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container py-20">
        <SectionHeading tag="Browse by craft" title="Explore Indian Traditions" subtitle="From the silk looms of Kanchipuram to the pottery wheels of Jaipur — every craft tells a story." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <Link to={`/marketplace?cat=${encodeURIComponent(cat.name)}`} id={`cat-${cat.id}`} className="group flex flex-col items-center gap-3 p-3 rounded-2xl border border-border bg-card hover:border-clay/40 hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">{iconMap[cat.icon] ?? <span className="text-2xl">🎨</span>}</div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-foreground leading-tight">{cat.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{cat.count} items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <ThreadDivider />

      {/* TRENDING */}
      <section className="container pb-20">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading tag="Hot right now" title="Trending Crafts" className="mb-0" />
          <Button variant="outline" asChild className="shrink-0 hidden sm:flex">
            <Link to="/marketplace?trending=true">View All <TrendingUp className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ARTISANS */}
      <section id="artisans" className="bg-parchment dark:bg-ink/40 py-20">
        <div className="container">
          <SectionHeading tag="The makers" title="Meet Featured Artisans" subtitle="Behind every product is a craftsperson with decades of mastery and a story worth knowing." center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtisans.map((artisan, i) => {
              const bgColors = ["bg-[#e8ecef]", "bg-[#f3e8eb]", "bg-[#e5efe9]", "bg-[#f0ece1]", "bg-[#ebe8f3]", "bg-[#e5eff3]"];
              const randomBg = bgColors[i % bgColors.length];
              return (
              <motion.div key={artisan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/artisan/${artisan.id}`} id={`artisan-card-${artisan.id}`}>
                  <GlassCard hover glow className="text-center overflow-hidden p-0">
                    <div className={`h-20 w-full ${randomBg} dark:opacity-30`} />
                    <div className="p-5 pt-0 relative">
                      <div className="relative inline-block mb-3 -mt-10">
                        <Avatar className="w-20 h-20 mx-auto border-4 border-white dark:border-ink shadow-sm relative z-10 bg-white dark:bg-ink">
                          <AvatarImage src={artisan.avatar} alt={artisan.name} />
                          <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {artisan.online && <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-sage border-2 border-white dark:border-ink z-20" />}
                      </div>
                      <h3 className="font-display font-semibold text-base">{artisan.name}</h3>
                      <p className="text-xs text-clay dark:text-saffron font-medium mt-0.5">{artisan.craft}</p>
                      <p className="text-xs text-muted-foreground mt-1">{artisan.location}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <RatingStars rating={artisan.rating} size="sm" />
                        <span className="text-xs font-mono text-muted-foreground">{artisan.rating}</span>
                      </div>
                      <div className="flex justify-around mt-4 pt-4 border-t border-border">
                        <div><p className="font-mono font-bold text-sm text-clay dark:text-saffron">{artisan.yearsExperience}y</p><p className="text-[10px] text-muted-foreground">Exp.</p></div>
                        <div><p className="font-mono font-bold text-sm text-clay dark:text-saffron">{artisan.totalProductsSold}</p><p className="text-[10px] text-muted-foreground">Sold</p></div>
                        <div><p className="font-mono font-bold text-sm text-clay dark:text-saffron">{formatCompactINR(artisan.revenueGenerated)}</p><p className="text-[10px] text-muted-foreground">Revenue</p></div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20">
        <SectionHeading tag="Why Kalakshetra" title="The Artisan-Direct Difference" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-border hover:border-clay/40 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-clay/10 dark:bg-clay/20 flex items-center justify-center text-clay dark:text-saffron">{f.icon}</div>
              <div><h3 className="font-display font-semibold text-base mb-1">{f.title}</h3><p className="text-sm text-muted-foreground">{f.desc}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      <ThreadDivider />

      {/* TESTIMONIALS */}
      <section className="bg-parchment dark:bg-ink/40 py-20">
        <div className="container">
          <SectionHeading tag="Customer stories" title="Loved by Craft Enthusiasts" center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="p-6 flex flex-col gap-4 h-full">
                  <RatingStars rating={t.rating} size="md" />
                  <p className="text-sm leading-relaxed text-foreground/80 flex-1 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <Avatar className="h-10 w-10"><AvatarImage src={t.avatar} alt={t.name} /><AvatarFallback>{t.name.charAt(0)}</AvatarFallback></Avatar>
                    <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1600&q=80" alt="Artisan at work" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-rust/70" />
        </div>
        <div className="relative z-10 container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-parchment mb-6 text-balance">Every Purchase Preserves a Tradition</h2>
            <p className="text-parchment/70 text-lg max-w-xl mx-auto mb-8">When you buy directly from artisans, 100% of craft value reaches them. No showroom markups. No middlemen.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="xl" asChild><Link to="/marketplace">Explore the Marketplace</Link></Button>
              <Button size="xl" variant="glass" asChild className="border-white/30 text-white hover:bg-white/20"><Link to="/signup">Join as an Artisan</Link></Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
