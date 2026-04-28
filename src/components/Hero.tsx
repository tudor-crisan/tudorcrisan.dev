"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section 
      id="home" 
      className="pb-32 overflow-hidden"
      style={{ paddingTop: 'calc(var(--header-height) + 120px)' }}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-12">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            Active: {personalInfo.yearsOfExperience} Years Experience
          </span>
          
          <h1 className="text-gradient mb-12 leading-[0.9]">
            {personalInfo.name}
          </h1>
          
          <p className="text-2xl md:text-3xl text-foreground font-medium mb-10 max-w-2xl">
            {personalInfo.title}
          </p>
          
          <p className="text-lg md:text-xl text-muted mb-12 max-w-2xl leading-relaxed">
            {personalInfo.bio}
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-foreground text-background font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Contact Me <ArrowRight size={20} strokeWidth={3} />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              className="px-8 py-4 rounded-full border border-border font-bold flex items-center gap-2 hover:bg-white/5 transition-all"
            >
              Resume <Download size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
