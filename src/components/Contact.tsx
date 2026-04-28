"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, ArrowUpRight, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr_auto] gap-20 items-end">
          <div className="space-y-24">
            <h2 className="text-muted uppercase text-sm font-black tracking-[0.3em]">Contact</h2>
            
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1]">
              Let's create something <br />
              <span className="text-muted/30">exceptional.</span>
            </h3>
            
            <div className="flex flex-wrap gap-8 md:gap-16">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="text-base md:text-xl font-black hover:text-primary transition-colors tracking-tight break-all">
                  {personalInfo.email}
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Education</p>
                <p className="text-lg md:text-xl font-black tracking-tight">{personalInfo.education.institution}</p>
                <p className="text-muted text-sm font-medium italic">{personalInfo.education.degree}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 min-w-[200px]">
            {[
              { name: "LinkedIn", url: personalInfo.socials.linkedin },
              { name: "GitHub", url: personalInfo.socials.github },
              { name: "WhatsApp", url: personalInfo.socials.whatsapp },
              { name: "Facebook", url: personalInfo.socials.facebook },
              { name: "Skool", url: personalInfo.socials.skool },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                className="group flex items-center justify-between px-5 py-3 border border-border rounded-lg hover:border-foreground transition-all hover:bg-white/5"
              >
                <span className="text-sm font-bold">{social.name}</span>
                <ArrowUpRight size={14} className="text-muted group-hover:text-foreground transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
