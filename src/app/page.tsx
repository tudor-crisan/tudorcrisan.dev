import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex flex-col space-y-64 pb-32">
      <Hero />
      <Experience />
      <Skills />
      <Contact />
    </div>
      
      <footer className="py-20 border-t border-border">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-muted font-medium">
            © {new Date().getFullYear()} Tudor Crișan
          </p>
          <div className="flex gap-6 md:gap-10">
            <a href="#experience" className="text-xs font-bold uppercase tracking-wider text-muted hover:text-foreground transition-colors">Experience</a>
            <a href="#skills" className="text-xs font-bold uppercase tracking-wider text-muted hover:text-foreground transition-colors">Skills</a>
            <a href="#contact" className="text-xs font-bold uppercase tracking-wider text-muted hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
