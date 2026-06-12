import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star, TrendingUp } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/store";
import { toast } from "@/hooks/use-toast";
import { PriceTag } from "./PriceTag";
import { RatingStars } from "./RatingStars";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const isWishlisted = useStore((s) => s.isWishlisted);
  const wishlisted = isWishlisted(product.id);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({ title: "Added to cart!", description: product.name, variant: "success" });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast({
      title: wishlisted ? "Removed from wishlist" : "Saved to wishlist",
      description: product.name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative", className)}
    >
      <div onClick={() => navigate(`/product/${product.id}`)} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/3]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.style.display = "none";
              const placeholder = document.createElement("div");
              placeholder.className = "w-full h-full flex items-center justify-center bg-clay/10 text-clay";
              placeholder.innerHTML = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="tapestry" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/><circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.3"/></pattern></defs><rect width="100%" height="100%" fill="url(#tapestry)"/></svg>`;
              target.parentElement?.appendChild(placeholder);
            }}
          />
          {/* Overlay actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.trending && (
              <Badge variant="trending" className="gap-1">
                <TrendingUp className="w-2.5 h-2.5" /> Trending
              </Badge>
            )}
            {product.originalPrice && (
              <Badge variant="sage">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleWishlist}
              id={`wishlist-${product.id}`}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-ink/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart
                className={cn("w-4 h-4 transition-colors", wishlisted ? "fill-clay text-clay" : "text-ink dark:text-parchment")}
              />
            </button>
            <Link
              to={`/ar/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-ink/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Eye className="w-4 h-4 text-ink dark:text-parchment" />
            </Link>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            id={`add-to-cart-${product.id}`}
            className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-clay text-white text-sm font-semibold translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rust"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <p className="text-xs text-clay dark:text-saffron font-medium mb-1">{product.artisanName}</p>
          <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
            <div className="flex items-center gap-1">
              <RatingStars rating={product.rating} size="sm" />
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          </div>
          {product.stock <= 5 && (
            <p className="text-xs text-rust mt-1 font-medium">Only {product.stock} left!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
