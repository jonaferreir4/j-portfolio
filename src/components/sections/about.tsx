'use client'
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-void relative overflow-hidden border-b border-borderTech">
      
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-borderTech hidden lg:block"></div>

      <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center pl-0 lg:pl-12">
        
        <div className="space-y-6">
          <div className="mb-8">
            <span className="font-mono text-tacticalHighlight text-xs tracking-widest block mb-2 uppercase">/// Bio_Data</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase leading-none">
              Engenharia & <br/> Resolução de Problemas
            </h2>
          </div>
          
          <div className="text-steel leading-relaxed space-y-4 font-medium border-l-2 border-tacticalHighlight/30 pl-6">
            <p>
              Estudante de Engenharia de Software na <strong className="text-primary">UFC</strong> e Desenvolvedor Full Stack com uma abordagem pragmática.
            </p>
            <p>
              Minha atuação vai além de escrever código novo. Como Freelancer no <strong className="text-primary">Suporte Verde</strong>, sou responsável pela sustentação de sistemas em produção, lidando com <strong>PHP, refatoração de código legado e regras de negócio complexas</strong>.
            </p>
            <p>
              Simultaneamente, construo soluções modernas (como no projeto <strong className="text-primary">Chemall</strong>) utilizando <strong className="text-tacticalHighlight">React, Node.js e .NET</strong>, focando sempre em arquitetura limpa (DDD), performance e experiência do usuário.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-borderTech font-mono text-xs">
            <div>
               <span className="block text-steel uppercase mb-1">Formação</span>
               <span className="text-primary block font-bold">Engenharia de Software (UFC)</span>
               <span className="text-steel/50">Téc. Informática (IFCE)</span>
            </div>
            <div>
               <span className="block text-steel uppercase mb-1">Experiência Atual</span>
               <span className="text-primary block font-bold">Freelancer Full Stack</span>
               <span className="text-steel/50">Suporte Verde / Chemall</span>
            </div>
          </div>
        </div>

        <div className="relative h-full min-h-[300px] border border-borderTech bg-armor p-6 flex flex-col justify-between clip-tech">
          
          <div className="flex justify-between items-start border-b border-borderTech pb-4">
            <span className="font-mono text-xs text-tacticalHighlight animate-pulse">SKILL_DISTRIBUTION</span>
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-primary"></div>
              <div className="w-1 h-3 bg-primary"></div>
              <div className="w-1 h-3 bg-tacticalHighlight"></div>
            </div>
          </div>
          
          <div className="py-8 space-y-4 font-mono text-[10px] text-steel">
            
            <div>
                <div className="flex justify-between mb-1">
                    <span> MODERN BACKEND (.NET / NODE)</span> 
                    <span className="text-primary">HIGH PRIORITY</span>
                </div>
                <div className="w-full h-1.5 bg-void overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: "90%" }} 
                        transition={{ duration: 1 }}
                        className="h-full bg-tacticalHighlight"
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between mb-1">
                    <span> FRONTEND ENG. (REACT / NEXT)</span> 
                    <span className="text-primary">ADVANCED</span>
                </div>
                <div className="w-full h-1.5 bg-void overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: "85%" }} 
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between mb-1">
                    <span> LEGACY & MAINTENANCE (PHP)</span> 
                    <span className="text-primary">SPECIALIST</span>
                </div>
                <div className="w-full h-1.5 bg-void overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: "75%" }} 
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-indigo-900"
                    />
                </div>
            </div>

          </div>

          <div className="text-right font-mono text-[10px] text-steel/50 pt-4 border-t border-borderTech">
            CURRENT_STATUS: OPEN TO WORK <br/>
            LOCATION: MORADA NOVA, CE
          </div>
        </div>

      </div>
    </section>
  )
}