'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import Image from 'next/image';
import { experiences } from '@/data/experiences';

export default function Experience() {
  // State for toggling expanded project details per experience item
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({
    1: true // Default open for first experience
  });

  const toggleExpand = (id: number) => {
    setExpandedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section 
      id="experience" 
      aria-labelledby="experience-heading"
      className="py-24 px-6 bg-transparent border-b border-borderTech relative"
    >
      <div className="container max-w-4xl mx-auto">
        
        <div className="mb-16 bg-void/90 p-6 sm:p-8 rounded-sm border border-borderTech backdrop-blur-sm max-w-3xl">
          <span className="font-mono text-tacticalHighlight text-xs uppercase tracking-widest mb-1 block font-bold">
            {'/// Work_History'}
          </span>
          <h2 id="experience-heading" className="text-3xl md:text-4xl font-bold text-primary uppercase">
            Experiência Profissional
          </h2>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-borderTech">
          {experiences.map((exp, index) => {
            const isExpanded = !!expandedProjects[exp.id];
            const hasProjects = exp.projects && exp.projects.length > 0;

            return (
              <div key={exp.id} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-borderTech bg-armor text-steel group-hover:text-void group-hover:bg-tacticalHighlight group-hover:border-tacticalHighlight transition-colors duration-200 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <Terminal size={18} />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] relative"
                >
                  <div className="absolute top-5 -left-3 md:group-odd:-left-3 md:group-even:-right-3 md:group-even:left-auto w-3 h-[1px] bg-borderTech group-hover:bg-tacticalHighlight transition-colors duration-200 hidden md:block"></div>

                  <div className="bg-armor border border-borderTech p-6 hover:border-tacticalHighlight transition-colors duration-200 clip-tech relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2 relative z-10">
                        <h3 className="text-xl font-bold text-primary uppercase">{exp.company}</h3>
                        <span className="font-mono text-xs text-tacticalHighlight bg-void px-2 py-1 border border-borderTech/50 w-fit">
                            {exp.period}
                        </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-steel mb-3 uppercase tracking-wide relative z-10">
                        {exp.role}
                    </h4>
                    
                    <p className="text-steel text-sm leading-relaxed mb-4 relative z-10">
                        {exp.description}
                    </p>

                    {/* EXPANDABLE SUB-PROJECTS SECTION */}
                    {hasProjects && (
                      <div className="mb-4 relative z-10 border-t border-borderTech/40 pt-3">
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="w-full flex items-center justify-between font-mono text-xs text-tacticalHighlight hover:text-indigo-400 py-1.5 px-3 bg-void border border-borderTech/60 rounded-sm transition-colors group/btn mb-3"
                          aria-expanded={isExpanded}
                          aria-label={`Alternar detalhes de projetos da ${exp.company}`}
                        >
                          <span className="flex items-center gap-2 font-bold uppercase text-[10px]">
                            <Layers size={14} />
                            {isExpanded ? '/// OCULTAR_PROJETOS_ENTREGUES' : '/// EXIBIR_PROJETOS_ENTREGUES'} ({exp.projects?.length})
                          </span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden space-y-4 pt-1"
                            >
                              {exp.projects?.map((project, pIdx) => (
                                <div key={pIdx} className="p-3 bg-void/60 border border-borderTech/40 rounded-sm">
                                  <h5 className="text-xs font-bold text-primary mb-2">{project.name}</h5>
                                  
                                  {project.image && (
                                    <div className="mb-3 w-full h-36 rounded overflow-hidden border border-borderTech/50 relative group/img">
                                      <Image 
                                        src={project.image} 
                                        alt={project.name} 
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover object-top transition-all duration-300 group-hover/img:scale-105" 
                                      />
                                    </div>
                                  )}

                                  <ul className="list-disc list-outside ml-4 space-y-1 text-steel text-[11px] leading-relaxed mb-2">
                                    {project.description.map((desc, dIdx) => (
                                      <li key={dIdx}>{desc}</li>
                                    ))}
                                  </ul>

                                  {project.links && project.links.length > 0 && (
                                    <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-borderTech/30">
                                      {project.links.map((link, lIdx) => (
                                        <a 
                                          key={lIdx} 
                                          href={link.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-[10px] font-mono uppercase tracking-wider text-tacticalHighlight hover:text-white flex items-center gap-1 underline underline-offset-4 decoration-tacticalHighlight/40 hover:decoration-tacticalHighlight transition-colors"
                                          aria-label={`Ver projeto ${link.label}`}
                                        >
                                          {link.label}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-borderTech/50 relative z-10">
                        {exp.tech.map((item) => (
                            <span key={item} className="text-[10px] font-mono font-bold uppercase tracking-wider text-steel/70 bg-void border border-borderTech px-2 py-1 hover:text-void hover:border-tacticalHighlight hover:bg-tacticalHighlight transition-colors duration-200">
                                {item}
                            </span>
                        ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}