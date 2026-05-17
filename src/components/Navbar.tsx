"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/#home", external: false },
  { name: "Problems", href: "/#problems", external: false },
  { name: "BLOG", href: "/blog", external: false },
  { name: "Case Study", href: "https://www.zidy.fun", external: true },
  { name: "Book a Call", href: personalInfo.meetingUrl, external: true, highlight: true }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <nav
        className={`
          flex items-center justify-between w-full max-w-3xl px-6 py-3 rounded-full 
          transition-all duration-500 pointer-events-auto
          ${scrolled ? "glass shadow-2xl shadow-primary/10" : "bg-transparent"}
        `}
      >
        <a href="/#home" className="flex items-center gap-2 group">
          <span className="text-lg font-black tracking-tighter text-gradient">TC.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`
                text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center
                ${link.highlight 
                  ? "px-4 py-2 rounded-full bg-primary text-primary-foreground cta-glow-button hover:scale-105 active:scale-95" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-4 pointer-events-auto">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-6 top-24 z-40 md:hidden glass rounded-3xl p-8 flex flex-col gap-6 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  text-xl font-bold tracking-tight transition-all duration-300
                  ${link.highlight 
                    ? "px-6 py-3 rounded-full bg-primary text-primary-foreground text-center cta-glow-button block" 
                    : "text-foreground hover:text-primary"
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
