import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Package, TrendingUp, MessageCircle, ArrowLeft, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/shared/RatingStars";
import { ProductCard } from "@/components/shared/ProductCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { ThreadDivider } from "@/components/shared/ThreadDivider";
import { formatCompactINR } from "@/lib/utils";
import { api } from "@/lib/api";
import { Artisan, Product } from "@/types";

export default function ArtisanProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([api.getArtisanById(id), api.getArtisanProducts(id)]).then(([a, prods]) => {
      setArtisan(a ?? null);
      setArtisanProducts(prods);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="animate-pulse">
      <div className="h-72 bg-muted" />
      <div className="container -mt-16 relative z-10"><div className="w-32 h-32 rounded-full bg-muted border-4 border-background" /></div>
    </div>
  );

  if (!artisan) return (
    <div className="container py-20 text-center">
      <p className="font-display text-2xl mb-4">Artisan not found</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );

  const stats = [
    { label: "Years of Experience", value: `${artisan.yearsExperience}`, unit: "years", icon: <Star className="w-5 h-5" /> },
    { label: "Products Sold", value: artisan.totalProductsSold.toString(), unit: "pieces", icon: <Package className="w-5 h-5" /> },
    { label: "Revenue Generated", value: formatCompactINR(artisan.revenueGenerated), unit: "", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Customer Rating", value: artisan.rating.toFixed(1), unit: "/ 5.0", icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <div>
      {/* Cover */}
      <div className={`relative h-72 sm:h-96 overflow-hidden ${!artisan.cover ? 'bg-clay dark:bg-rust' : ''}`}>
        {artisan.cover && <img src={artisan.cover} alt={artisan.name} className="w-full h-full object-cover" />}
        <div className={`absolute inset-0 ${artisan.cover ? 'bg-gradient-to-t from-background via-background/30 to-transparent' : ''}`} />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 flex items-center gap-2 text-sm text-white/80 hover:text-white bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="container relative">
        {/* Avatar + Name */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-background shadow-warm">
              <AvatarImage src={artisan.avatar} alt={artisan.name} />
              <AvatarFallback className="text-4xl font-display">{artisan.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {artisan.online && (
              <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-sage border-3 border-background" />
            )}
          </div>
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-3xl font-semibold">{artisan.name}</h1>
              <BadgeCheck className="w-6 h-6 text-clay" />
              {artisan.online ? (
                <Badge variant="sage" className="bg-sage/15 text-sage text-xs">● Online</Badge>
              ) : (
                <Badge variant="outline" className="text-xs">Offline</Badge>
              )}
            </div>
            <p className="text-clay dark:text-saffron font-medium mt-1">{artisan.craft}</p>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" /> {artisan.location}
            </div>
          </div>
          <div className="flex gap-3 pb-2">
            <Button asChild className="gap-2" id={`chat-artisan-${artisan.id}`}>
              <Link to="/chat"><MessageCircle className="w-4 h-4" /> Message</Link>
            </Button>
            <Button variant="outline">Follow</Button>
          </div>
        </div>

        {/* Rating summary */}
        <div className="flex items-center gap-2 mb-8">
          <RatingStars rating={artisan.rating} size="lg" />
          <span className="font-mono font-bold text-xl text-clay dark:text-saffron">{artisan.rating}</span>
          <span className="text-muted-foreground text-sm">({artisan.totalProductsSold} sales)</span>
        </div>

        {/* Bio */}
        <GlassCard className="p-6 mb-10">
          <h2 className="font-display text-lg font-semibold mb-3">About the Artisan</h2>
          <p className="text-muted-foreground leading-relaxed">{artisan.bio}</p>
        </GlassCard>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="p-5 text-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-clay/10 dark:bg-clay/20 text-clay dark:text-saffron mb-3">{s.icon}</span>
                <div className="font-mono font-bold text-2xl text-clay dark:text-saffron">{s.value}<span className="text-sm font-normal text-muted-foreground ml-1">{s.unit}</span></div>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <ThreadDivider />

        {/* Products */}
        <section className="py-8">
          <h2 className="font-display text-2xl font-semibold mb-6">Products by {artisan.name.split(" ")[0]}</h2>
          {artisanProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {artisanProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No products listed yet.</p>
            </div>
          )}
        </section>

        {/* Feedback */}
        <section className="py-8 pb-16">
          <h2 className="font-display text-2xl font-semibold mb-6">Customer Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artisanProducts.flatMap((p) => p.reviews).slice(0, 4).map((r) => (
              <GlassCard key={r.id} className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-9 w-9"><AvatarImage src={r.avatar} /><AvatarFallback>{r.author.charAt(0)}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{r.author}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
                  </div>
                  <RatingStars rating={r.rating} size="sm" />
                </div>
                <p className="text-sm text-muted-foreground italic">"{r.comment}"</p>
              </GlassCard>
            ))}
            {artisanProducts.flatMap((p) => p.reviews).length === 0 && (
              <p className="text-muted-foreground text-sm col-span-2">No reviews yet for this artisan.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
