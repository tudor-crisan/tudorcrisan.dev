"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section-padding border-t border-border">
      <div className="container-custom">
        <h2 className="text-muted uppercase text-sm font-bold tracking-[0.2em] mb-16">Work History</h2>
        
        <div className="space-y-0">
          {personalInfo.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative grid md:grid-cols-[1fr_2fr] gap-12 py-24 border-b border-border hover:bg-white/[0.01] transition-colors"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">{exp.period}</span>
                <h3 className="text-3xl font-black">{exp.company}</h3>
              </div>
              
              <div>
                <p className="text-3xl font-bold text-foreground mb-6 leading-tight">{exp.role}</p>
                <p className="text-muted text-xl max-w-xl leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
