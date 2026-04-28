"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, ArrowUpRight, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr_auto] gap-20 items-end">
          <div>
            <h2 className="text-muted uppercase text-sm font-bold tracking-[0.2em] mb-16">Contact</h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-20 leading-[1.1]">
              Let's create something <br />
              <span className="text-muted/50">exceptional.</span>
            </h3>
            
            <div className="flex flex-wrap gap-20">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="text-3xl font-black hover:text-primary transition-colors tracking-tight">
                  {personalInfo.email}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Education</p>
                <p className="text-3xl font-black tracking-tight">{personalInfo.education.institution}</p>
                <p className="text-muted text-lg mt-2">{personalInfo.education.degree}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 min-w-[280px]">
            {[
              { name: "LinkedIn", url: personalInfo.socials.linkedin },
              { name: "WhatsApp", url: personalInfo.socials.whatsapp },
              { name: "Facebook", url: personalInfo.socials.facebook },
              { name: "Skool", url: personalInfo.socials.skool },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                className="group flex items-center justify-between p-6 border border-border rounded-2xl hover:border-foreground transition-all"
              >
                <span className="text-xl font-bold">{social.name}</span>
                <ArrowUpRight className="text-muted group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
