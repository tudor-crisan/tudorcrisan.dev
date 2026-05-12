"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  BarChart3, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  LineChart, 
  MessageSquare, 
  Rocket, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function ZidyCaseStudy() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-mesh opacity-50 -z-10" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
        <div className="flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-full glass pointer-events-auto shadow-2xl shadow-primary/10">
          <Link href="/" className="flex items-center gap-2 group text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          <a 
            href={personalInfo.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 v2-border-glow"
          >
            Book a meeting
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Technical Transformation Case Study</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Building the <span className="text-primary-gradient">Engine</span> that scaled <span className="v2-glow">Zidy.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12">
              How I started as a Frontend Developer and evolved into a full-time Technical Consultant, building the product and team that enabled Zidy to reach $50k MRR.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Revenue Milestone", value: "$50k/mo", icon: TrendingUp },
                { label: "Final Role", value: "Technical Consultant", icon: Users },
                { label: "Value Growth", value: "2x Comp", icon: Zap },
                { label: "Stack", value: "Vue3 / TS / AWS", icon: Code2 },
              ].map((stat, i) => (
                <div key={i} className="glass p-6 rounded-2xl border-primary/10">
                  <stat.icon size={20} className="text-primary mb-3" />
                  <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 border-t border-primary/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl font-black tracking-tighter uppercase mb-6 text-primary">The Overview</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Zidy is a US-based AI-powered CRM and lead recovery platform specifically engineered for local brick-and-mortar businesses—from bike shops to medical spas. 
                </p>
                <p>
                  By automating follow-ups via SMS and Voice, Zidy ensures no lead is left behind, significantly improving conversion rates for high-intent, appointment-based services. Today, the software commands a premium price point of <span className="text-foreground font-bold">$1,000/month per client.</span>
                </p>
              </div>
            </motion.div>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-[2rem] border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Globe size={120} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Target Verticals</h3>
              <ul className="space-y-3">
                {[
                  "Local Bike Shop Owners",
                  "Premium Medical Spas",
                  "High-End Service Businesses",
                  "Appointment-Driven Practices"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 size={16} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem & What Was Broken */}
      <section className="py-24 bg-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <motion.h2 {...fadeIn} className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
              The <span className="text-primary">Stalling Point.</span>
            </motion.h2>
            <motion.p {...fadeIn} className="text-xl text-muted-foreground">
              When I joined Zidy, the company was at a critical crossroads. They had a product that solved a real problem, but the technical foundation was collapsing under its own weight.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fragile Infrastructure",
                desc: "The core systems were poorly built, leading to frequent downtime and slow response times that frustrated early adopters.",
                icon: Layers
              },
              {
                title: "Engineering Leadership Gap",
                desc: "The development team lacked direction. Without a clear technical roadmap, execution was reactive rather than strategic.",
                icon: ShieldCheck
              },
              {
                title: "Unclear Product Direction",
                desc: "The feature set was growing horizontally without depth, making it difficult to justify the premium $1k/mo price point.",
                icon: Rocket
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* My Role - Technical Consultant */}
      <section className="py-24 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div {...fadeIn} className="flex-1">
              <h2 className="text-3xl font-black tracking-tighter uppercase mb-6 text-primary">The Progression</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">
                From Developer to <br />
                <span className="text-gradient">Technical Consultant.</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I started at Zidy as a Frontend Developer at $5,000/month. As I began rebuilding the product architecture and solving core technical bottlenecks, my role quickly expanded. 
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Within months, I transitioned to a full-time Technical Consultant at $10,000/month, taking responsibility for building the technical team and defining the product roadmap.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Architected Core Product",
                  "Built Technical Team",
                  "Full-Stack Leadership",
                  "Product Strategy & Execution",
                  "Scaling Technical Processes",
                  "Technical Hiring & Onboarding"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-bold">
                    <Zap size={14} className="text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="flex-1 relative"
            >
              <div className="glass p-2 rounded-[2.5rem] border-primary/20 rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="bg-black/50 rounded-[2rem] p-12 aspect-square flex flex-col items-center justify-center text-center">
                  <Cpu size={80} className="text-primary mb-6 animate-pulse" />
                  <div className="text-3xl font-black tracking-tighter mb-2">Startup Turnaround</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Foundation Built for $1M+ ARR</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 blur-3xl rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Transformation & Leadership */}
      <section className="py-24 bg-black/20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div {...fadeIn} className="glass p-10 rounded-[3rem] border-primary/10">
              <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3">
                <Code2 className="text-primary" /> Technical Transformation
              </h3>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  I overhauled the frontend architecture using **Vue 3, TypeScript, and Pinia**, moving away from a brittle legacy structure to a modular, component-driven system.
                </p>
                <p>
                  I established **rigorous technical processes**, including standardized code reviews, automated testing, and a streamlined deployment pipeline that reduced bug reports by 70% within the first quarter.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="glass p-10 rounded-[3rem] border-secondary/10">
              <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3">
                <Users className="text-secondary" /> Building the Team
              </h3>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  As the product matured, I took charge of **recruiting and onboarding the technical team**. I brought in the talent necessary to maintain and expand the platform.
                </p>
                <p>
                  While the CEO focused on scaling revenue through marketing and ads, I ensured the **product engine was powerful enough to handle the growth** and deliver on the promise to 2,000+ businesses.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results & Metrics */}
      <section className="py-24 relative">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 {...fadeIn} className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              The <span className="text-primary">Impact</span> in Numbers.
            </motion.h2>
            <motion.p {...fadeIn} className="text-xl text-muted-foreground">
              Sustainable growth is the only metric that matters in a startup environment.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "$50k", label: "Monthly Recurring Revenue", sub: "By 2026", color: "text-primary" },
              { value: "2,000+", label: "Active Businesses", sub: "Across 8+ Industries", color: "text-white" },
              { value: "$1,000", label: "Monthly Price Point", sub: "Commanded via Premium Value", color: "text-secondary" }
            ].map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-12 rounded-[2.5rem] text-center border-white/5 relative group"
              >
                <div className={`text-6xl font-black tracking-tighter mb-4 ${metric.color} group-hover:scale-110 transition-transform duration-500`}>
                  {metric.value}
                </div>
                <div className="text-sm font-black uppercase tracking-widest mb-1">{metric.label}</div>
                <div className="text-xs text-muted-foreground">{metric.sub}</div>
                
                {/* Visual "Chart" element */}
                <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                    className={`h-full ${metric.color === 'text-primary' ? 'bg-primary' : metric.color === 'text-secondary' ? 'bg-secondary' : 'bg-white'}`} 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After Comparison */}
      <section className="py-24 bg-primary/5">
        <div className="container-custom">
          <h2 className="text-3xl font-black tracking-tighter uppercase mb-12 text-center">Transformation Summary</h2>
          <div className="glass rounded-[3rem] overflow-hidden border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-8 text-sm font-black uppercase tracking-widest text-muted-foreground border-b border-white/5">Metric / Area</th>
                  <th className="p-8 text-sm font-black uppercase tracking-widest text-red-500/80 border-b border-white/5">Before</th>
                  <th className="p-8 text-sm font-black uppercase tracking-widest text-primary border-b border-white/5">After (2026)</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {[
                  { area: "Architecture", before: "Fragile Prototypes", after: "Scalable Vue3 Production Engine" },
                  { area: "Team", before: "Solo / Weak Devs", after: "Vetted Technical Team" },
                  { area: "User Capacity", before: "Manual Handling", after: "2,000+ Active Businesses" },
                  { area: "Personal Role", before: "Frontend Developer", after: "Technical Consultant" },
                  { area: "Compensation", before: "$5,000 / mo", after: "$10,000 / mo" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-8 font-bold border-b border-white/5">{row.area}</td>
                    <td className="p-8 text-muted-foreground border-b border-white/5">{row.before}</td>
                    <td className="p-8 font-black text-white border-b border-white/5 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-primary" /> {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Founder Insight */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div 
            {...fadeIn}
            className="max-w-4xl mx-auto glass p-16 rounded-[4rem] border-primary/20 relative text-center"
          >
            <MessageSquare size={60} className="text-primary mx-auto mb-10 opacity-50" />
            <blockquote className="text-3xl md:text-4xl font-medium italic tracking-tight leading-snug mb-10">
              "Building a scalable SaaS isn't just about the code; it's about building a product engine that handles growth as fast as the CEO can sell it."
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="w-16 h-1 w-12 bg-primary mb-4" />
              <div className="text-xl font-black tracking-tighter">Tudor Crișan</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Technical Consultant & Product Builder</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="container-custom text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10">
              Need technical <br />
              <span className="text-primary-gradient">execution?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
              I help founders build the product engine and technical team required to scale. Let's discuss your roadmap and how to turn your vision into a high-performance SaaS.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href={personalInfo.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-12 py-6 rounded-full bg-primary text-primary-foreground font-black text-xl transition-all hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95 v2-border-glow"
              >
                Book a Strategy Call
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                href="/"
                className="px-12 py-6 rounded-full glass font-black text-xl hover:bg-white/10 transition-all"
              >
                View Other Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer-like space */}
      <footer className="py-12 border-t border-white/5 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
        © 2026 Tudor Crișan — Engineering Excellence
      </footer>
    </div>
  );
}
