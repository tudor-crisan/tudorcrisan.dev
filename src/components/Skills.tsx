"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Code, Palette, Database, Terminal } from "lucide-react";

const icons = {
  "Core": <Code size={24} />,
  "Styling": <Palette size={24} />,
  "State & Logic": <Database size={24} />,
  "Tools & Backend": <Terminal size={24} />
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="container-custom">
        <div className="flex flex-col gap-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Technical <span className="text-primary-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            A comprehensive set of tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalInfo.skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass p-8 rounded-3xl glass-hover flex flex-col gap-6 ${
                index === 0 || index === 3 ? "md:col-span-1 lg:col-span-2" : "md:col-span-1"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  {icons[skillGroup.category as keyof typeof icons] || <Code size={24} />}
                </div>
                <h3 className="text-xl font-bold">{skillGroup.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-primary/20 hover:border-primary/30 transition-all cursor-default"
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
