"use client";

import Link from "next/link";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/40">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-lg font-black tracking-tighter text-gradient">TC.</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/#problems" className="hover:text-foreground transition-colors">
              Problems Solved
            </Link>
            <a 
              href="https://www.zidy.fun" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-foreground transition-colors"
            >
              Case Study
            </a>
            <a 
              href={personalInfo.meetingUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors text-primary font-black"
            >
              Book a Call
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-start gap-6 pt-8 border-t border-border/10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
