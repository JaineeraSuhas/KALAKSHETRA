import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/context/store";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"buyer" | "artisan">("buyer");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast({ title: "Please fill all fields", variant: "destructive" }); return; }
    setLoading(true);
    try {
      const user = await api.login(email, password);
      login(user);
      toast({ title: `Welcome back, ${user.name}! 🎉`, variant: "success" });
      navigate(role === "artisan" ? "/dashboard" : "/marketplace");
    } catch {
      toast({ title: "Login failed", description: "Please check your credentials.", variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img src="/signin-tapestry.jpg" alt="Handcrafted tapestry" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/60" />
        <div className="absolute bottom-12 left-8 right-8 text-white">
          <p className="font-display text-3xl font-semibold mb-2">Every thread tells a story.</p>
          <p className="text-white/70">Sign in to discover authentic Indian craftsmanship from master artisans.</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-full bg-clay flex items-center justify-center text-white font-display font-bold">क</div>
            <span className="font-display font-semibold text-lg">Kalakshetra</span>
          </Link>

          <h1 className="font-display text-3xl font-semibold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          {/* Role Toggle */}
          <div className="flex gap-1 p-1 rounded-xl bg-muted mb-8">
            {(["buyer", "artisan"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${role === r ? "bg-background shadow-sm text-clay" : "text-muted-foreground hover:text-foreground"}`}
                id={`role-${r}`}
              >
                {r === "buyer" ? "🛍 Buyer" : "🏺 Artisan"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block" htmlFor="login-email">Email</label>
              <Input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium" htmlFor="login-password">Password</label>
                <button type="button" className="text-xs text-clay hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Input id="login-password" type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="pr-10" />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full gap-2 mt-2" disabled={loading} id="login-submit">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-clay font-medium hover:underline">Create one</Link>
          </p>

          <div className="mt-8 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Demo credentials</p>
            <p>Enter any email and password — the demo accepts all credentials.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
