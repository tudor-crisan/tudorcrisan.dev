"use client";

import { motion } from "framer-motion";
import { blogArticles } from "@/lib/blogData";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { personalInfo } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

export default function BlogIndex() {
  // Ensure the page registers the high-impact V2 style tokens
  useEffect(() => {
    document.documentElement.classList.add("v2");
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 pt-32 pb-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-mesh opacity-50 -z-10" />

      {/* Pulsating Cool Background Decorative Elements */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 w-full max-w-2xl h-full opacity-20 pointer-events-none select-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary blur-[100px] rounded-full opacity-50" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Hero Area */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-primary/20 mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Strategic Insights</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8"
          >
            The <span className="text-primary-gradient v2-glow">Sovereign</span> Founder <span className="v2-glow">Blog.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium"
          >
            Direct strategy blueprints on risk governance, technical team building, SaaS modernization, and releasing founders from execution gridlock.
          </motion.p>
        </div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {blogArticles.map((article) => (
            <motion.article
              key={article.slug}
              variants={cardVariants}
              className="glass rounded-[2rem] border-white/5 overflow-hidden flex flex-col justify-between group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,229,255,0.08)] bg-black/20"
            >
              <div className="p-8">
                {/* Meta Row */}
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
                  <span className="text-primary font-black">{article.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>

                <h2 className="text-2xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="p-8 pt-0 border-t border-white/5 mt-auto flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <Calendar size={12} /> {article.date}
                </span>

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform duration-300"
                >
                  Read Strategy <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Big Fat Call To Action (Bottom) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-12 md:p-20 rounded-[3rem] border-primary/20 text-center relative overflow-hidden bg-black/40 shadow-2xl shadow-primary/5"
        >
          {/* Decorative mesh inside the card */}
          <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none -z-10" />
          
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95]">
            Solve your technical <span className="text-primary-gradient v2-glow">bottleneck</span> today.
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium">
            Stop losing enterprise deals to fragile prototypes and spending operational hours micromanaging developer execution. Get a safe, low-effort path from your current situation to your desired growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={personalInfo.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-black text-xl cta-glow-button"
            >
              Book a Strategy Call
              <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            
            <Link
              href="/#problems"
              className="px-10 py-5 rounded-full glass font-black text-xl hover:bg-white/5 transition-colors border-white/10 flex items-center justify-center"
            >
              Review Case Studies
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
