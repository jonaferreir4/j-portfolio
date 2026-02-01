'use client'
import { motion } from 'framer-motion';
import { ArrowRight, Download, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';
import Me from '@/assets/images/me-professional.jpeg';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 border-b border-borderTech bg-void">
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-4 py-2 bg-armor border border-borderTech rounded-full w-fit"
          >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tacticalHighlight opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tacticalHighlight"></span>
              </span>
              <span className="text-xs font-bold text-steel uppercase tracking-wider">Disponível para Projetos</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-primary leading-[1.1] tracking-tight"
          >
            Fullstack <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tacticalHighlight to-indigo-400">
            Engineer.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-steel max-w-xl leading-relaxed"
          >
            Olá, sou <strong>Jona Ferreira</strong>. Desenvolvo aplicações de alta complexidade com 
            <strong className="text-primary"> .NET</strong>, <strong className="text-primary">Node.js</strong> e <strong className="text-primary">React</strong>. 
            Especialista em unir arquitetura limpa com a realidade de sistemas em produção, seja criando do zero ou refatorando legados.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a href="#contact" className="px-8 py-3.5 bg-tacticalHighlight text-white font-bold rounded-sm hover:bg-indigo-600 transition-colors flex items-center gap-2">
               Entrar em Contato <ArrowRight size={18} />
            </a>
            
            <a href="/docs/curriculo.pdf" target="_blank" className="px-8 py-3.5 border border-borderTech bg-armor text-primary font-medium rounded-sm hover:border-tacticalHighlight transition-colors flex items-center gap-2">
              <Download size={18} /> Download CV
            </a>
          </motion.div>

          <div className="flex gap-4 pt-6 text-steel">
             <a href="https://linkedin.com/in/jonaferreira" className="hover:text-tacticalHighlight transition-colors"><Linkedin size={24} /></a>
             <a href="https://github.com/jonaferreir4" className="hover:text-tacticalHighlight transition-colors"><Github size={24} /></a>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-5 relative flex justify-center"
        >
            <div className="relative w-[350px] h-[420px]">
                <div className="absolute top-4 right-4 w-full h-full border-2 border-borderTech/50 rounded-sm"></div>
                
                <div className="relative w-full h-full bg-armor border border-borderTech p-3 shadow-2xl group"> {/* Adicionei 'group' aqui para controlar o hover */}
                    
                    <div className="relative w-full h-full overflow-hidden bg-void">
                        
                        <div className="absolute inset-0 bg-tacticalHighlight/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>

                        {/* A Imagem */}
                        <Image 
                          src={Me} 
                          alt="Jona Ferreira" 
                          fill 
                          className="object-cover 
                                     grayscale contrast-125 brightness-90 
                                     group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 
                                     group-hover:scale-105 transition-all duration-700 ease-out"
                          priority
                        />
                        
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-10 pointer-events-none z-20"></div>
                    </div>
                    
                    <div className="absolute bottom-6 -left-6 bg-void border border-borderTech p-4 shadow-lg flex items-center gap-4 z-30">
                        <div className="bg-green-500/10 text-green-600 p-2 rounded-sm">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-steel uppercase">Status Atual</p>
                            <p className="text-sm font-bold text-primary">Open to Work</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  )
}