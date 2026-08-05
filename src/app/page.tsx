import Hero from "@/components/sections/hero";
import Stack from "@/components/sections/stack";
import About from "@/components/sections/about";
import Garage from "@/components/sections/garage";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import { GithubStats } from "@/components/sections/github-stats";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen selection:bg-tacticalHighlight selection:text-white">
      <Hero />
      <About /> 
      <Experience />
      <Garage />
      <GithubStats />
      <Stack /> 
      <Contact />
      
      <footer className="py-8 bg-armor border-t border-borderTech text-center font-mono text-xs text-steel">
        <p>
          © {new Date().getFullYear()} Jona Ferreira. Engenharia & Arquitetura de Software.
        </p>
      </footer>
    </main>
  );
}