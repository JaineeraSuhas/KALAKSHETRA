import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/context/store";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const buyerPerks = ["Browse 8,500+ handcrafted products", "AR preview in your home", "Direct chat with artisans", "Order tracking & wishlist"];
const artisanPerks = ["Reach global buyers directly", "Zero middlemen — full price to you", "Analytics dashboard & earnings", "Direct messaging with customers"];

export default function Signup() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const [role, setRole] = useState<"buyer" | "artisan">("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast({ title: "Please fill all fields", variant: "destructive" }); return; }
    if (password.length < 6) { toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" }); return; }
    setLoading(true);
    try {
      const user = await api.signup(name, email, password);
      login(user);
      toast({ title: `Welcome to Kalakshetra, ${user.name}! 🎉`, variant: "success" });
      navigate(role === "artisan" ? "/dashboard" : "/marketplace");
    } catch {
      toast({ title: "Signup failed", variant: "destructive" });
    } finally { setLoading(false); }
  };

  const perks = role === "buyer" ? buyerPerks : artisanPerks;

  return (
    <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Perks */}
      <div className="hidden lg:flex flex-col justify-center relative overflow-hidden bg-ink dark:bg-black p-12">
        <img src="https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=1000&q=80" alt="Handcrafted pattern" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-clay flex items-center justify-center text-white font-display font-bold text-2xl mb-8">क</div>
          <h2 className="font-display text-4xl font-semibold text-parchment mb-4 leading-tight">
            {role === "buyer" ? "Discover authentic Indian crafts." : "Sell your craft to the world."}
          </h2>
          <p className="text-parchment/60 mb-8 leading-relaxed">
            {role === "buyer"
              ? "Join thousands of buyers who've discovered the beauty of direct-from-artisan shopping."
              : "Join 1,200+ artisans who have grown their business through Kalakshetra."}
          </p>
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3 text-parchment/80">
                <CheckCircle className="w-5 h-5 text-sage shrink-0" />
                <p className="text-sm">{perk}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-full bg-clay flex items-center justify-center text-white font-display font-bold">क</div>
            <span className="font-display font-semibold text-lg">Kalakshetra</span>
          </Link>

          <h1 className="font-display text-3xl font-semibold mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Join the community of craft enthusiasts</p>

          {/* Role Toggle */}
          <div className="flex gap-1 p-1 rounded-xl bg-muted mb-8">
            {(["buyer", "artisan"] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${role === r ? "bg-background shadow-sm text-clay" : "text-muted-foreground hover:text-foreground"}`} id={`signup-role-${r}`}>
                {r === "buyer" ? "🛍 Buyer" : "🏺 Artisan"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="signup-name">{role === "artisan" ? "Full Name / Artisan Name" : "Full Name"}</label>
              <Input id="signup-name" placeholder="Lakshmi Devi" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="signup-email">Email</label>
              <Input id="signup-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>
            {role === "artisan" && (
              <div>
                <label className="text-sm font-medium mb-1.5 block" htmlFor="signup-craft">Your Craft</label>
                <Input id="signup-craft" placeholder="e.g. Handloom Weaving, Blue Pottery..." />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="signup-password">Password</label>
              <div className="relative">
                <Input id="signup-password" type={showPass ? "text" : "password"} placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required className="pr-10" />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">By joining, you agree to our Terms of Service and Privacy Policy.</p>
            <Button type="submit" size="lg" className="w-full gap-2" disabled={loading} id="signup-submit">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-clay font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
