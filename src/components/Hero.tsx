"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center overflow-hidden py-32 md:py-0"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-12 md:gap-[120px]"
        >
          <div>
            <span
              className="inline-flex items-center gap-4 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.4em] px-6 py-3 md:px-10 md:py-5"
            >
              <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
              Active: {personalInfo.yearsOfExperience} Years Experience
            </span>
          </div>

          <h1 className="text-gradient leading-[1.1] text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter">
            {personalInfo.name}
          </h1>

          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-lg md:text-2xl lg:text-3xl text-foreground font-black tracking-tighter leading-none">
              {personalInfo.title}
            </p>

            <p className="text-base md:text-lg text-muted max-w-xl leading-[1.6] font-medium">
              {personalInfo.bio}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Contact Me <ArrowRight size={16} className="ml-2" />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-border text-foreground text-sm font-bold transition-all hover:bg-white/5 active:scale-[0.98]"
            >
              Resume <Download size={16} className="ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
