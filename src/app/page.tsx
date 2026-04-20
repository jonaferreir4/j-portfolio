import Hero from "@/components/sections/hero";
import Stack from "@/components/sections/stack";
import About from "@/components/sections/about";
import Garage from "@/components/sections/garage";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";

export default function Home() {
  return (
    <main className="min-h-screen bg-void selection:bg-tacticalHighlight selection:text-white">
      <Hero />
      <About /> 
      <Experience />
      <Garage />
      <Stack /> 
      <Contact />
      
     <footer className="py-8 bg-armor border-t border-borderTech text-center">
        <p className="text-steel text-sm">
          © {new Date().getFullYear()} Jona Ferreira.
        </p>
      </footer>
    </main>
  );
}