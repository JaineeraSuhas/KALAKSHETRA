import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Heart, Eye, Share2, MapPin, Star, ChevronLeft, ChevronRight, Package, Truck, Shield, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RatingStars } from "@/components/shared/RatingStars";
import { PriceTag } from "@/components/shared/PriceTag";
import { ProductCard } from "@/components/shared/ProductCard";
import { ThreadDivider } from "@/components/shared/ThreadDivider";
import { useStore } from "@/context/store";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { Product } from "@/types";

function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-1, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="w-full h-full rounded-2xl overflow-hidden cursor-pointer">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null;
          target.style.display = "none";
          const ph = document.createElement("div");
          ph.className = "w-full h-full flex items-center justify-center bg-gradient-to-br from-clay/20 to-saffron/20 text-clay text-6xl";
          ph.textContent = "🏺";
          target.parentElement?.appendChild(ph);
        }}
      />
    </motion.div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const isWishlisted = useStore((s) => s.isWishlisted);
  const wishlisted = product ? isWishlisted(product.id) : false;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setActiveImg(0);
    Promise.all([api.getProductById(id), api.getProductById(id).then((p) => p ? api.getSimilarProducts(p) : [])]).then(([p, sim]) => {
      setProduct(p ?? null);
      setSimilar(sim);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="container py-12">
      <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-2xl bg-muted" />
        <div className="space-y-4"><div className="h-8 bg-muted rounded w-3/4" /><div className="h-4 bg-muted rounded w-1/2" /><div className="h-12 bg-muted rounded" /></div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="container py-20 text-center">
      <p className="text-4xl mb-4">🎨</p>
      <p className="font-display text-2xl mb-4">Product not found</p>
      <Button onClick={() => navigate("/marketplace")}>Back to Marketplace</Button>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast({ title: "Added to cart!", description: `${qty}× ${product.name}`, variant: "success" });
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate("/dashboard");
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast({ title: wishlisted ? "Removed from wishlist" : "Saved to wishlist!", description: product.name });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!", description: "Share this product with friends." });
    } catch { toast({ title: "Couldn't copy link" }); }
  };

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted" style={{ perspective: "800px" }}>
            <TiltImage src={product.images[activeImg]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${activeImg === i ? "border-clay" : "border-transparent hover:border-saffron/50"}`} id={`gallery-thumb-${i}`}>
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* AR Button */}
          <Link to={`/ar/${product.id}`} id={`ar-preview-${product.id}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-clay/40 text-clay dark:text-saffron text-sm font-medium hover:bg-clay/5 transition-colors">
            <Eye className="w-4 h-4" /> Preview in your space with AR
          </Link>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="default">{product.category}</Badge>
              {product.trending && <Badge variant="trending">Trending</Badge>}
              {product.stock <= 5 && <Badge className="bg-rust/15 text-rust">Only {product.stock} left</Badge>}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-3">{product.name}</h1>
            <Link to={`/artisan/${product.artisanId}`} className="flex items-center gap-2 text-sm text-clay dark:text-saffron hover:underline w-fit">
              <Avatar className="h-6 w-6"><AvatarImage src={`https://i.pravatar.cc/100?img=${product.artisanId.slice(1)}`} /><AvatarFallback>{product.artisanName.charAt(0)}</AvatarFallback></Avatar>
              {product.artisanName}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <RatingStars rating={product.rating} size="md" />
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          <PriceTag price={product.price} originalPrice={product.originalPrice} size="xl" />

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Materials */}
          <div>
            <p className="text-sm font-semibold mb-2">Materials</p>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((m) => <Badge key={m} variant="outline">{m}</Badge>)}
            </div>
          </div>

          {/* Qty + Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-lg" id="qty-dec">−</button>
              <span className="w-10 text-center font-mono font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-lg" id="qty-inc">+</button>
            </div>
            <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" onClick={handleBuyNow} className="flex-1" id={`buy-now-${product.id}`}>Buy Now</Button>
            <Button size="lg" variant="outline" onClick={handleAddToCart} className="flex-1 gap-2" id={`add-cart-${product.id}`}><ShoppingCart className="w-5 h-5" />Add to Cart</Button>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" size="sm" onClick={handleWishlist} className="gap-2" id={`wishlist-btn-${product.id}`}>
              <Heart className={`w-4 h-4 ${wishlisted ? "fill-clay text-clay" : ""}`} /> {wishlisted ? "Wishlisted" : "Save"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
            <Button variant="ghost" size="sm" asChild className="gap-2"><Link to={`/chat`}><MessageCircle className="w-4 h-4" /> Ask Artisan</Link></Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
            {[
              { icon: <Shield className="w-4 h-4" />, text: "Authenticity Guaranteed" },
              { icon: <Truck className="w-4 h-4" />, text: "Free Shipping ₹2000+" },
              { icon: <Package className="w-4 h-4" />, text: "Easy Returns" },
            ].map((b) => (
              <div key={b.text} className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-muted/50">
                <span className="text-clay dark:text-saffron">{b.icon}</span>
                <p className="text-xs text-muted-foreground leading-tight">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ThreadDivider />

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((r) => (
              <div key={r.id} className="p-5 rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-9 w-9"><AvatarImage src={r.avatar} /><AvatarFallback>{r.author.charAt(0)}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-semibold text-sm">{r.author}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  <RatingStars rating={r.rating} size="sm" className="ml-auto" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar Products */}
      {similar.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-semibold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similar.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
