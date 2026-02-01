'use client'
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { Github, MonitorX } from 'lucide-react';
import Image from 'next/image';

export default function Garage() {
  return (
    <section id="projects" className="py-24 px-6 bg-void border-b border-borderTech">
      
      <div className="container max-w-6xl mx-auto">
        
        <div className="flex items-end justify-between mb-16 border-b border-borderTech pb-4">
            <div>
                <span className="font-mono text-tacticalHighlight text-xs uppercase tracking-widest mb-1 block">/// Database Access</span>
                <h2 className="text-4xl font-bold text-primary uppercase">Projetos</h2>
            </div>
            <div className="hidden md:block text-right font-mono text-xs text-steel">
                SECTOR: SOFTWARE_ENG <br/>
                ENTRIES_FOUND: {projects.length}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-armor border border-borderTech hover:border-tacticalHighlight transition-colors clip-tech flex flex-col h-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  
                  {/* ÁREA DA IMAGEM OU PLACEHOLDER */}
                  <div className="relative h-48 lg:h-auto overflow-hidden border-r border-borderTech bg-void/50 transition-colors">
                      
                      {project.image ? (
                        <Image 
                          src={project.image} 
                          alt={project.title}
                          fill
                          className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        />
                      ) : (
                        /* PLACEHOLDER ADAPTÁVEL AO TEMA 
                           Light Mode: Fundo cinza técnico (gray-200)
                           Dark Mode: Fundo preto profundo (#020204)
                        */
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gray-200 dark:bg-[#020204]"> 
                           
                           {/* Camada de Scanlines (Agora usa cor currentColor para adaptar ou opacidade fixa baixa) */}
                           <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none z-0" style={{ 
                              backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 3px)',
                              backgroundSize: '100% 3px'
                           }}></div>
                           
                           {/* Vinheta escura (apenas no Dark Mode para dar profundidade, no Light removemos ou suavizamos) */}
                           <div className="absolute inset-0 bg-transparent dark:bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)] opacity-50 z-0"></div>

                           {/* Conteúdo Central */}
                           {/* text-steel/40 adapta a cor automaticamente baseado no tema */}
                           <div className="z-10 flex flex-col items-center text-steel/40 group-hover:text-steel/60 transition-colors duration-500">
                             
                             <div className="relative mb-3">
                                <MonitorX size={36} strokeWidth={1.5} className="opacity-50" />
                                {/* LED de status: Vermelho escuro no dark, Vermelho vivo no light para contraste */}
                                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-900 animate-pulse shadow-sm"></div>
                             </div>

                             <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold border-b border-steel/20 pb-1 text-steel/50">
                               Video_Feed_Offline
                             </span>
                             <span className="font-mono text-[8px] opacity-60 mt-2 text-steel/50">
                               Code: {project.codeName} // No Signal
                             </span>
                           </div>
                        </div>
                      )}

                      <div className="absolute top-2 left-2 bg-armor/90 dark:bg-black/90 px-2 py-1 text-[10px] font-mono text-tacticalHighlight border border-tacticalHighlight/20 z-20 shadow-sm backdrop-blur-sm">
                          ID: {project.codeName}
                      </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between">
                      <div>
                          <div className="flex justify-between items-start mb-2">
                              <h3 className="text-2xl font-bold text-primary uppercase leading-none">{project.title}</h3>
                              {project.repoLink && (
                                <a href={project.repoLink} target="_blank" className="text-steel hover:text-tacticalHighlight transition-colors">
                                    <Github size={18} />
                                </a>
                              )}
                          </div>
                          <p className="text-steel text-sm font-medium leading-relaxed mb-4 line-clamp-3">
                              {project.description}
                          </p>
                      </div>

                      <div className="space-y-2 border-t border-borderTech pt-4 mt-auto">
                          {Object.entries(project.specs).slice(0, 3).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-[10px] uppercase font-mono">
                                  <span className="text-steel">{key}</span>
                                  <span className="text-primary truncate ml-2 text-right">{value}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}