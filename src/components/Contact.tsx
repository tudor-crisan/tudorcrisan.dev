"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="container-custom">
        <div className="glass p-12 md:p-24 rounded-[3rem] relative overflow-hidden flex flex-col items-center text-center">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
              Let's build something <span className="text-primary-gradient">extraordinary</span> together.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Ready to take your project to the next level? I'm currently available for freelance opportunities and consultations.
            </p>

            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a
                  href={personalInfo.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-black text-lg transition-all hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95 v2:v2-border-glow"
                >
                  Book a meeting
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
