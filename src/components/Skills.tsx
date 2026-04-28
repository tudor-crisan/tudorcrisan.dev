"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section-padding border-t border-border">
      <div className="container-custom">
        <h2 className="text-muted uppercase text-sm font-bold tracking-[0.2em] mb-16">Expertise</h2>
        
        <div className="grid md:grid-cols-2 border-l border-t border-border overflow-hidden">
          {personalInfo.skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="py-12 px-6 md:py-24 md:px-16 border-r border-b border-border hover:bg-white/[0.02] transition-colors"
            >
              <h3 className="text-[10px] md:text-xs font-black text-muted uppercase tracking-[0.2em] mb-8">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6">
                {skillGroup.items.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="text-base md:text-lg lg:text-xl font-bold tracking-tight text-foreground/60 hover:text-foreground transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
