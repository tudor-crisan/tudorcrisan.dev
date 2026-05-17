"use client";

import { motion } from "framer-motion";
import { blogArticles } from "@/lib/blogData";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function LatestBlog() {
  // Take the 3 most recent articles
  const latestArticles = blogArticles.slice(0, 3);

  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden bg-black/10">
      <div className="container-custom relative z-10">
        
        {/* Subtle Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">
              Publications
            </span>
            <h3 className="text-2xl md:text-3.5xl font-black tracking-tighter text-white">
              Latest Technical Strategy Insights
            </h3>
          </div>
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 group mt-2 md:mt-0"
          >
            Explore All Articles
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article, idx) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  <span className="text-primary/80 font-black">{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {article.readTime}
                  </span>
                </div>

                <h4 className="text-lg font-black tracking-tight text-white/90 group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3">
                  {article.title}
                </h4>
                
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>
              </div>

              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground group-hover:text-white transition-colors duration-300"
              >
                Read Strategy <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
