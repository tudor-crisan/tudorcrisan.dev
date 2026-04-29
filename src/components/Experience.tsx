"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col gap-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Work <span className="text-primary-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            A journey through 12 years of building scalable web applications and leading frontend teams.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-12">
            {personalInfo.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-primary rounded-full -translate-x-1/2 mt-8 z-10 hidden md:block shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

                <div className="w-full md:w-1/2 px-0 md:px-12">
                  <div className="glass p-8 rounded-3xl glass-hover">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <Briefcase size={18} />
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {exp.period}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">
                      {exp.company}
                    </h3>
                    <p className="text-lg font-bold text-foreground mb-4">
                      {exp.role}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    <a 
                      href={exp.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-all group"
                    >
                      View Website
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </div>
                </div>
                
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
