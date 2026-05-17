"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-mesh"
    >
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text and Actions Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8"
            >
              <Zap size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Proprietary Software Development
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] mb-8"
            >
              Solving <span className="text-primary-gradient v2:v2-glow">painful</span>, <br />
              <span className="text-primary-gradient v2:v2-glow">urgent</span> and <br />
              <span className="text-primary-gradient v2:v2-glow">expensive</span> problems.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="https://www.zidy.fun"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold cta-glow-button"
              >
                View Case Study
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={personalInfo.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full glass font-bold transition-all hover:bg-white/10 active:scale-95 v2:border-primary/30 cta-glow-button"
              >
                Book a Call
              </a>
            </motion.div>
          </div>

          {/* Profile Picture Column */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Outer Neon Glow Layer */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[2.5rem] opacity-30 blur-2xl animate-pulse pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              whileHover={{ scale: 1.03, rotate: 0.5 }}
              className="relative p-1.5 rounded-[2.2rem] bg-gradient-to-tr from-primary/30 to-secondary/30 border border-white/15 backdrop-blur-md max-w-[360px] md:max-w-[400px] w-full"
            >
              <img
                src="/profile.jpg"
                alt="Tudor Crișan"
                className="w-full h-auto object-cover rounded-[1.8rem] aspect-[4/5] shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full max-w-2xl h-full opacity-20 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary blur-[100px] rounded-full opacity-50 v2:block hidden" />
      </div>
    </section>
  );
}

