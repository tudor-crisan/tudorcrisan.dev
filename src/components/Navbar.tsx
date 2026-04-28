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
        <Link href="/" className="font-bold text-lg tracking-tighter">TUDOR</Link>
        <div className="flex items-center gap-1 md:gap-2 text-[13px] font-semibold">
          <Link href="#experience" className="px-3 py-1.5 rounded-full text-muted hover:text-foreground hover:bg-white/5 transition-all">Experience</Link>
          <Link href="#skills" className="px-3 py-1.5 rounded-full text-muted hover:text-foreground hover:bg-white/5 transition-all">Skills</Link>
          <Link href="#contact" className="ml-2 px-5 py-1.5 rounded-full bg-foreground text-background font-bold transition-all hover:opacity-90 active:scale-[0.98]">Contact</Link>
        </div>
      </div>
    </motion.nav>
  );
}
