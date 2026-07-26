'use client'
import { motion } from 'framer-motion';
import { ArrowRight, Download, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';
import Me from '@/assets/images/me-professional.jpeg';
import { siteConfig } from '@/data/site-config';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-6 lg:px-12 bg-transparent border-b border-borderTech overflow-hidden">
      
      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
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
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-primary leading-[1.1] tracking-tight"
            >
              {siteConfig.role.split(' ')[0]} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tacticalHighlight to-indigo-400">
              {siteConfig.role.split(' ')[1] || ''}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg md:text-xl text-steel max-w-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: siteConfig.heroBio.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') }}
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a href="#contact" className="px-8 py-3.5 bg-tacticalHighlight text-white font-bold rounded-sm hover:bg-indigo-600 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center gap-2">
                 Entrar em Contato <ArrowRight size={18} />
              </a>
              
              <a href={siteConfig.links.cv} target="_blank" className="px-8 py-3.5 border border-borderTech bg-armor text-primary font-medium rounded-sm hover:border-tacticalHighlight hover:text-tacticalHighlight hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all duration-300 flex items-center gap-2">
                <Download size={18} /> Download CV
              </a>
            </motion.div>

            <div className="flex gap-4 pt-6 text-steel">
               <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-tacticalHighlight transition-colors"><Linkedin size={24} /></a>
               <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-tacticalHighlight transition-colors"><Github size={24} /></a>
            </div>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[350px] h-[420px]">
                <div className="absolute top-4 right-4 w-full h-full border-2 border-borderTech/50 rounded-sm"></div>

                <div className="relative w-full h-full bg-armor border border-borderTech p-3 shadow-2xl group">

                    <div className="relative w-full h-full overflow-hidden bg-void">

                        <Image
                          src={Me}
                          alt={siteConfig.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
                            <p className="text-sm font-bold text-primary">{siteConfig.status}</p>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

