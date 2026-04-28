"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section-padding border-t border-border">
      <div className="container-custom">
        <h2 className="text-muted uppercase text-sm font-bold tracking-[0.2em] mb-16">Work History</h2>
        
        <div className="flex flex-col gap-16 md:gap-24">
          {personalInfo.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-border pb-12 md:pb-16 flex flex-col gap-8"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <a 
                  href={exp.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl lg:text-2xl font-black tracking-tight hover:text-primary transition-colors cursor-pointer"
                >
                  {exp.company}
                </a>
                <span className="inline-block text-[10px] font-black text-muted uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-full border border-white/10 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
              
              <div className="max-w-3xl flex flex-col gap-4">
                <p className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                  {exp.role}
                </p>
                <p className="text-muted text-lg md:text-xl leading-[1.6] font-medium italic">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
