import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { ThreadDivider } from "@/components/shared/ThreadDivider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/marketplace" },
    { label: "Textiles & Sarees", href: "/marketplace?cat=Textiles%20%26%20Sarees" },
    { label: "Pottery & Ceramics", href: "/marketplace?cat=Pottery%20%26%20Ceramics" },
    { label: "Jewelry", href: "/marketplace?cat=Jewelry" },
    { label: "Trending Now", href: "/marketplace?trending=true" },
  ],
  Artisans: [
    { label: "Meet Artisans", href: "/#artisans" },
    { label: "Become an Artisan", href: "/signup" },
    { label: "Artisan Dashboard", href: "/dashboard" },
    { label: "Success Stories", href: "/" },
  ],
  Support: [
    { label: "Track Order", href: "/dashboard" },
    { label: "Returns Policy", href: "/" },
    { label: "Authenticity Guarantee", href: "/" },
    { label: "AR Preview Guide", href: "/" },
    { label: "Contact Us", href: "/chat" },
  ],
};

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-ink dark:bg-black/60 text-parchment/80">
      <ThreadDivider className="bg-ink dark:bg-black/60 text-saffron my-0 py-4" />

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-clay flex items-center justify-center text-white font-display font-bold text-lg">
                क
              </div>
              <div>
                <p className="font-display font-semibold text-xl text-parchment">Kalakshetra</p>
                <p className="text-xs text-saffron/70 tracking-widest uppercase">Temple of Arts</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-parchment/60 max-w-xs">
              Connecting traditional Indian artisans directly with global customers — preserving
              heritage, empowering craft communities, one handmade piece at a time.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-parchment mb-2">Get craft stories in your inbox</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  placeholder="your@email.com"
                  type="email"
                  id="footer-email"
                  className="bg-white/10 border-white/20 text-parchment placeholder:text-parchment/40 focus-visible:ring-saffron"
                />
                <Button size="sm" className="bg-clay hover:bg-rust shrink-0">Subscribe</Button>
              </form>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-clay hover:border-clay transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-parchment mb-4 text-sm tracking-wide">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-parchment/55 hover:text-saffron transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact + Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-parchment/40">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Bengaluru, India
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> hello@kalakshetra.in
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" /> +91 80 1234 5678
            </span>
          </div>
          <p className="text-xs text-parchment/30 text-center">
            © {new Date().getFullYear()} Kalakshetra. All rights reserved. Made with ♥ for India's artisans.
          </p>
        </div>
      </div>
    </footer>
  );
}
