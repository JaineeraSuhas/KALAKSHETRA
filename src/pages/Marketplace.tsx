import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { categories } from "@/data/categories";
import { products as allProducts } from "@/data/products";
import { Product } from "@/types";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="rounded-2xl bg-muted aspect-[4/3] mb-3" />
      <div className="space-y-2 px-0.5">
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 40000]);
  const [minRating, setMinRating] = useState(0);

  const qParam = searchParams.get("q") ?? "";
  const catParam = searchParams.get("cat") ?? "";
  const trendingParam = searchParams.get("trending") === "true";

  useEffect(() => {
    if (catParam && !selectedCats.includes(catParam)) {
      setSelectedCats([catParam]);
    }
  }, [catParam]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (trendingParam) list = list.filter((p) => p.trending);
    if (selectedCats.length > 0) list = list.filter((p) => selectedCats.includes(p.category));
    if (qParam) {
      const q = qParam.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.artisanName.toLowerCase().includes(q)
      );
    }
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [products, selectedCats, qParam, priceRange, minRating, sort, trendingParam]);

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setPriceRange([0, 40000]);
    setMinRating(0);
    setSearchParams({});
  };

  const hasFilters = selectedCats.length > 0 || priceRange[0] > 0 || priceRange[1] < 40000 || minRating > 0 || qParam;

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <SectionHeading
            title={trendingParam ? "Trending Products" : qParam ? `Results for "${qParam}"` : "All Products"}
            tag={`${filtered.length} products`}
            className="mb-0"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)} className="gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-clay" />}
          </Button>
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 px-4 h-9 text-sm border border-border rounded-lg bg-card hover:border-clay/40 transition-colors"
              id="sort-btn"
            >
              {SORT_OPTIONS.find((o) => o.value === sort)?.label}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-border bg-card shadow-warm z-20 p-1">
                  {SORT_OPTIONS.map((o) => (
                    <button key={o.value} onClick={() => { setSort(o.value); setSortOpen(false); }} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${sort === o.value ? "bg-clay/10 text-clay font-semibold" : "hover:bg-muted"}`}>{o.label}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {qParam && <Badge variant="secondary" className="gap-1.5">{qParam} <button onClick={() => setSearchParams({})}><X className="w-3 h-3" /></button></Badge>}
          {selectedCats.map((c) => <Badge key={c} variant="secondary" className="gap-1.5">{c} <button onClick={() => toggleCat(c)}><X className="w-3 h-3" /></button></Badge>)}
          {minRating > 0 && <Badge variant="secondary" className="gap-1.5">★ {minRating}+ <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button></Badge>}
          <button onClick={clearFilters} className="text-xs text-clay underline underline-offset-2">Clear all</button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.length > 0
            ? filtered.map((p) => <ProductCard key={p.id} product={p} />)
            : (
              <div className="col-span-full text-center py-20">
                <p className="text-4xl mb-4">🎨</p>
                <p className="font-display text-xl text-foreground mb-2">No products found</p>
                <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters or search terms</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )
        }
      </div>

      {/* Filter Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25 }} className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-card border-r border-border overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-lg">Filters</h2>
                <div className="flex items-center gap-2">
                  {hasFilters && <button onClick={clearFilters} className="text-xs text-clay">Clear all</button>}
                  <Button variant="ghost" size="icon-sm" onClick={() => setSidebarOpen(false)}><X className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Search in sidebar */}
              <div className="mb-6">
                <label className="text-sm font-semibold mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue={qParam} placeholder="Search products..." className="pl-9" id="sidebar-search"
                    onChange={(e) => {
                      const v = e.target.value.trim();
                      if (v) setSearchParams({ q: v }); else setSearchParams({});
                    }}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="text-sm font-semibold mb-3 block">Category</label>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedCats.includes(cat.name)} onChange={() => toggleCat(cat.name)} className="accent-clay rounded" />
                      <span className="text-sm group-hover:text-clay transition-colors">{cat.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{cat.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-semibold mb-3 block">Price Range</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Min" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} className="text-sm" />
                    <Input type="number" placeholder="Max" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} className="text-sm" />
                  </div>
                  <p className="text-xs text-muted-foreground">₹{priceRange[0].toLocaleString("en-IN")} – ₹{priceRange[1].toLocaleString("en-IN")}</p>
                </div>
              </div>

              {/* Min Rating */}
              <div className="mb-8">
                <label className="text-sm font-semibold mb-3 block">Minimum Rating</label>
                <div className="flex flex-wrap gap-2">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button key={r} onClick={() => setMinRating(r)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${minRating === r ? "bg-clay text-white border-clay" : "border-border hover:border-clay/40"}`}>
                      {r === 0 ? "All" : `★ ${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={() => setSidebarOpen(false)}>Apply Filters</Button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
