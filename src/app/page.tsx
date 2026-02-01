import Hero from "@/components/sections/hero";
import Stack from "@/components/sections/stack";
import About from "@/components/sections/about";
import Garage from "@/components/sections/garage";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-void selection:bg-tacticalHighlight selection:text-white">
      <Hero />
      <Stack /> 
      <Garage />
      <About /> 
      <Contact />
      
     <footer className="py-8 bg-armor border-t border-borderTech text-center">
        <p className="text-steel text-sm">
          © {new Date().getFullYear()} Jona Ferreira. Desenvolvido com Next.js e Tailwind.
        </p>
      </footer>
    </main>
  );
}