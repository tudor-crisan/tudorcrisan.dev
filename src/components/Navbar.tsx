"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container-custom h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tighter">TUDOR</Link>
        <div className="flex items-center gap-8 text-sm font-medium text-muted">
          <Link href="#experience" className="hover:text-foreground transition-colors">Experience</Link>
          <Link href="#skills" className="hover:text-foreground transition-colors">Skills</Link>
          <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
      </div>
    </motion.nav>
  );
}
