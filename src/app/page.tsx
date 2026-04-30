import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { personalInfo } from "@/lib/data";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.05),transparent_50%)]" />
      </div>

      <Navbar />
      
      <div className="flex flex-col">
        <Hero />
        <Experience />
        <Skills />
        <Contact />
      </div>
      
      <footer className="py-20 border-t border-white/5">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-muted-foreground text-sm font-medium">
            © {new Date().getFullYear()} Tudor Crișan. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href={`mailto:${personalInfo.email}`} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Email</a>
            <a href={personalInfo.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">WhatsApp</a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

