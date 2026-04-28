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
              className="p-16 border-r border-b border-border hover:bg-white/[0.02] transition-colors"
            >
              <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-12">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-x-10 gap-y-6">
                {skillGroup.items.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="text-3xl font-bold tracking-tighter text-foreground/70 hover:text-foreground transition-all cursor-default"
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
