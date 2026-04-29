"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, MessageCircle, Globe, ExternalLink, User } from "lucide-react";

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
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background font-black text-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Mail size={24} />
                  Send an Email
                </a>
                <a
                  href={personalInfo.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-10 py-5 rounded-full glass font-black text-lg transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={24} />
                  WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-4">
                {Object.entries(personalInfo.socials)
                  .filter(([name]) => name !== 'whatsapp')
                  .map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl glass glass-hover text-foreground/60 hover:text-primary transition-all flex items-center justify-center"
                    title={name}
                  >
                    {name === 'github' ? (
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                     ) : 
                     name === 'linkedin' ? <ExternalLink size={24} /> : 
                     name === 'facebook' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                     ) :
                     name === 'skool' ? (
                       <span className="text-xl font-black tracking-tighter leading-none">sk</span>
                     ) :
                     <Globe size={24} />}
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-16 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Based in {personalInfo.location} • Available Worldwide
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
