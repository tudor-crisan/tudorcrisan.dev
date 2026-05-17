"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowRight, CheckCircle2, Target, Wrench, ExternalLink, Calendar } from "lucide-react";

export default function Problems() {
  const cases = [
    {
      company: "Zidy.com",
      role: "Strategy & Transformation Advisor",
      metric: "Scaled to $50k MRR",
      link: "https://www.zidy.fun",
      linkLabel: "View Case Study",
      isCaseStudy: true,
      points: [
        {
          label: "WHAT",
          icon: <Target size={18} className="text-primary" />,
          text: "Stepped in to rescue the founder from a fragile, crashing MVP prototype (Current Situation) and transformed it into a reliable, enterprise-grade commercial engine (Desired Situation)."
        },
        {
          label: "WHY",
          icon: <CheckCircle2 size={18} className="text-secondary" />,
          text: "The CEO was bleeding money, burning endless hours micromanaging developers, and losing critical sales because the product kept freezing during high-stakes demos."
        },
        {
          label: "HOW",
          icon: <Wrench size={18} className="text-primary" />,
          text: "Took the entire technical weight off the CEO's shoulders. Leveraged system architecture as the vehicle, hired a competent development team to handle the execution, and established a bulletproof operational setup—allowing the CEO to focus 100% on growth and scale the business safely to $50,000 MRR."
        }
      ]
    },
    {
      company: "Kartra.com",
      role: "Lead Systems & Transformation Advisor",
      metric: "Serves 60,000+ Active Users",
      link: "https://www.kartra.com",
      linkLabel: "Visit Kartra.com",
      isCaseStudy: false,
      points: [
        {
          label: "WHAT",
          icon: <Target size={18} className="text-primary" />,
          text: "Modernized a massive multi-million dollar digital product suite, taking a sluggish, legacy drag-and-drop builder (Current Situation) and turning it into a lightning-fast, high-converting asset (Desired Situation)."
        },
        {
          label: "WHY",
          icon: <CheckCircle2 size={18} className="text-secondary" />,
          text: "Angry customers were threatening to churn, development velocity had ground to a halt, and the existing team was stuck saying 'it's too complex' while competitor market share expanded."
        },
        {
          label: "HOW",
          icon: <Wrench size={18} className="text-primary" />,
          text: "Deployed high-performance state engines as the primary vehicle to bypass bottlenecks. Removed legacy drag and drop friction smoothly with zero system downtime, giving users a safe, easy, and low-effort experience while securing the platform's multi-million dollar revenue stream."
        }
      ]
    }
  ];

  return (
    <section id="problems" className="py-32 relative overflow-hidden bg-mesh">
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Case Study & Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter"
          >
            Critical Problems <span className="text-primary-gradient v2:v2-glow">Solved</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Translating complex engineering bottlenecks, outdated architectures, and system instability into high-velocity product execution.
          </motion.p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {cases.map((c, index) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between glass-hover border border-white/5 relative overflow-hidden group"
            >
              {/* Radial subtle ambient glow in card background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none rounded-full group-hover:bg-primary/20 transition-all duration-500" />
              
              <div>
                {/* Card Title */}
                <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight text-gradient">
                      {c.company}
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground mt-1">
                      {c.role}
                    </p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary v2-glow">
                    {c.metric}
                  </span>
                </div>

                {/* Structured points (WHAT, WHY, HOW) */}
                <div className="flex flex-col gap-6 mb-10">
                  {c.points.map((pt) => (
                    <div key={pt.label} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 p-2 rounded-xl bg-white/5 border border-white/10 mt-1">
                        {pt.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-gradient v2:v2-glow block mb-1">
                          {pt.label}
                        </span>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {pt.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center pt-4 border-t border-white/10">
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex items-center gap-2 font-bold text-sm tracking-wide rounded-full py-3 px-6 transition-all duration-300
                    ${c.isCaseStudy 
                      ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.03] active:scale-95" 
                      : "border border-white/10 bg-white/5 text-foreground hover:bg-white/10 hover:border-white/20 active:scale-95"
                    }
                  `}
                >
                  {c.linkLabel}
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden flex flex-col items-center"
        >
          {/* Internal Glow Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] pointer-events-none rounded-full" />
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-6 relative z-10 max-w-3xl">
            Have a painful, urgent, or <span className="text-primary-gradient v2:v2-glow">expensive</span> technical problem?
          </h3>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed mb-10 relative z-10">
            Let&apos;s dissect the bottleneck and engineer a reliable, highly scalable solution. Schedule a dedicated strategy call today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href={personalInfo.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold cta-glow-button text-base"
            >
              <Calendar size={18} className="mr-1" />
              Book a Strategy Call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.zidy.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full glass font-bold text-sm hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 active:scale-95"
            >
              Explore Full Case Study
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
