"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { blogArticles } from "@/lib/blogData";
import { ArrowLeft, Clock, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogArticleDetail({ params }: BlogArticlePageProps) {
  const { slug } = use(params);
  const article = blogArticles.find((a) => a.slug === slug);

  useEffect(() => {
    document.documentElement.classList.add("v2");
    document.documentElement.classList.add("dark");
  }, []);

  if (!article) {
    notFound();
  }

  // Pure custom renderer to parse the structured content beautifully
  const renderContent = (rawContent: string) => {
    const blocks = rawContent.split("\n\n");
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H3 Headers
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-2xl md:text-3.5xl font-black tracking-tight text-white mt-12 mb-6"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      // H4 Headers
      if (trimmed.startsWith("#### ")) {
        return (
          <h4
            key={idx}
            className="text-xl font-bold text-primary tracking-tight mt-8 mb-4 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {trimmed.replace("#### ", "")}
          </h4>
        );
      }

      // Horizontal Rules
      if (trimmed === "---") {
        return <hr key={idx} className="my-10 border-white/5" />;
      }

      // Bullet Lists
      if (trimmed.includes("\n- ") || trimmed.startsWith("- ")) {
        const items = trimmed.split("\n");
        return (
          <ul key={idx} className="space-y-4 my-6 pl-2">
            {items.map((item, itemIdx) => {
              const cleanItem = item.replace("- ", "").trim();
              if (!cleanItem) return null;

              // Support inline bold **text** parsing
              const parts = cleanItem.split("**");
              return (
                <li key={itemIdx} className="flex items-start gap-3.5 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <CheckCircle2 size={20} className="text-primary shrink-0 mt-1" />
                  <span>
                    {parts.map((part, partIdx) =>
                      partIdx % 2 === 1 ? (
                        <strong key={partIdx} className="font-bold text-foreground">{part}</strong>
                      ) : (
                        part
                      )
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard Paragraphs
      return (
        <p key={idx} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 font-medium">
          {trimmed.split("**").map((part, partIdx) =>
            partIdx % 2 === 1 ? (
              <strong key={partIdx} className="font-bold text-foreground">{part}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 pt-32 pb-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-mesh opacity-50 -z-10" />

      <div className="container-custom max-w-4xl relative z-10">
        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Strategy Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <header className="mb-12 border-b border-white/5 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-wider mb-6"
          >
            <span className="glass px-3 py-1 rounded-full border-primary/20">{article.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock size={12} /> {article.readTime}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5.5xl lg:text-6.5xl font-black tracking-tighter leading-[1] mb-8"
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <Calendar size={14} />
            <span>Published on {article.date} by <strong>Tudor Crișan</strong></span>
          </motion.div>
        </header>

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert max-w-none mb-24"
        >
          {renderContent(article.content)}
        </motion.div>

        {/* BIG Fat Call To Action (Bottom) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-12 md:p-16 rounded-[3rem] border-primary/20 text-center relative overflow-hidden bg-black/40 shadow-2xl shadow-primary/5"
        >
          {/* Decorative mesh inside the card */}
          <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none -z-10" />
          
          <h2 className="text-3xl md:text-5.5xl font-black tracking-tighter mb-6 leading-[1.05]">
            Ready to decouple your <span className="text-primary-gradient v2-glow">operations</span> from technical bottleneck risk?
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-medium">
            Let&apos;s design a high-performance system roadmap and deploy a vetted execution team. Transition your startup to a highly profitable, self-sustaining commercial model safely.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={personalInfo.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4.5 rounded-full bg-primary text-primary-foreground font-black text-lg cta-glow-button"
            >
              Book a Strategy Session
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <Link
              href="/blog"
              className="px-8 py-4.5 rounded-full glass font-black text-lg hover:bg-white/5 transition-colors border-white/10"
            >
              View More Insights
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
