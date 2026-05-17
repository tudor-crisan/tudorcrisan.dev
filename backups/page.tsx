import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { personalInfo } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}

