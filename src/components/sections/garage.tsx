'use client';

import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TacticalProjectPreview } from '@/components/ui/TacticalProjectPreview';

export default function Garage() {
  return (
    <section 
      id="projects" 
      aria-labelledby="projects-heading"
      className="py-24 px-6 bg-transparent border-b border-borderTech"
    >
      <div className="container max-w-6xl mx-auto">
        
        <div className="mb-16 text-center md:text-left bg-void/90 p-6 sm:p-8 rounded-sm border border-borderTech backdrop-blur-sm max-w-3xl">
          <span className="font-mono text-tacticalHighlight text-sm font-bold uppercase tracking-widest mb-2 block">
            /// GARAGEM_DE_CODIFICAÇÃO
          </span>
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold text-primary max-w-2xl">
            Projetos Selecionados & Cases de Estudo
          </h2>
          <p className="text-steel mt-4 max-w-2xl">
            Uma seleção de aplicações web modernas, arquiteturas de back-end e experimentos de alta performance com análise técnica completa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="group relative bg-armor border border-borderTech hover:border-tacticalHighlight transition-colors duration-200 clip-tech flex flex-col h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full relative z-10">
                    
                    {/* VISUAL PREVIEW: REAL IMAGE OR TACTICAL HUD PREVIEW */}
                    <div className="relative h-52 lg:h-auto overflow-hidden border-r border-borderTech bg-void/50 transition-colors">
                        {project.image ? (
                          <Image 
                            src={project.image} 
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-all duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <TacticalProjectPreview 
                            codeName={project.codeName}
                            type={project.previewType}
                            title={project.title}
                          />
                        )}
  
                        <div className="absolute top-2 left-2 bg-armor/90 dark:bg-black/90 px-2 py-1 text-[10px] font-mono text-primary border border-borderTech z-20 shadow-sm backdrop-blur-sm group-hover:border-tacticalHighlight group-hover:text-tacticalHighlight transition-colors duration-200">
                            ID: {project.codeName}
                        </div>
                    </div>
  
                    <div className="p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold text-primary uppercase leading-none group-hover:text-tacticalHighlight transition-colors duration-200">
                                  {project.title}
                                </h3>
                                {project.repoLink && (
                                  <a 
                                    href={project.repoLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-steel hover:text-tacticalHighlight transition-colors duration-200"
                                    aria-label={`Ver código-fonte do projeto ${project.title} no GitHub`}
                                  >
                                      <Github size={18} />
                                  </a>
                                )}
                            </div>
                            <p className="text-steel text-xs font-medium leading-relaxed mb-4 line-clamp-3">
                                {project.description}
                            </p>
                        </div>
  
                        <div className="space-y-3 border-t border-borderTech pt-4 mt-auto">
                            <div className="space-y-1.5">
                              {Object.entries(project.specs).slice(0, 3).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-[10px] uppercase font-mono transition-colors duration-200">
                                      <span className="text-steel">{key}</span>
                                      <span className="text-primary truncate ml-2 text-right group-hover:text-tacticalHighlight font-semibold">{value}</span>
                                  </div>
                              ))}
                            </div>

                            {/* CASE STUDY LINK BUTTON */}
                            <div className="pt-2">
                              <Link 
                                href={`/projects/${project.slug}`}
                                className="w-full inline-flex items-center justify-between px-3 py-2 bg-void border border-borderTech hover:border-tacticalHighlight hover:bg-tacticalHighlight hover:text-white text-tacticalHighlight font-mono text-[11px] font-bold uppercase transition-all duration-200 group/link"
                                aria-label={`Ver case study completo do projeto ${project.title}`}
                              >
                                <span>Ver Case Study Completo</span>
                                <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                              </Link>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
