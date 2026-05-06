import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import VersionToggle from "@/components/VersionToggle";
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
      
      <footer className="py-20 border-t border-white/5 bg-background/50 backdrop-blur-md relative z-10">
        <div className="container-custom flex flex-col items-center text-center gap-8">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-muted-foreground text-sm font-medium">
              © {new Date().getFullYear()} Tudor Crișan. All rights reserved.
            </p>
            <VersionToggle />
          </div>
          

        </div>
      </footer>
    </main>
  );
}

