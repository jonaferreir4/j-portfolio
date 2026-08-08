'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import Image from 'next/image';
import { getExperiences } from '@/data/experiences';
import { useLocale, useTranslations } from 'next-intl';

export default function Experience() {
  const locale = useLocale() as 'pt' | 'en';
  const experiences = getExperiences(locale);
  const t = useTranslations('Experience');

  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});

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
      className="py-28 px-6 bg-transparent border-b border-slate-200/60 dark:border-borderTech/40 relative"
    >
      <div className="container max-w-4xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
            {t('workHistory')}
          </span>
          <h2 id="experience-heading" className="text-3xl sm:text-5xl font-extrabold text-primary font-display tracking-tight uppercase">
            {t('title')}
          </h2>
        </div>

        {/* TIMELINE ITEMS */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-slate-200 dark:before:bg-zinc-800">
          {experiences.map((exp, index) => {
            const isExpanded = !!expandedProjects[exp.id];
            const hasProjects = exp.projects && exp.projects.length > 0;

            return (
              <div key={exp.id} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* NODE ICON */}
                <div className="flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-steel group-hover:text-white group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                  <Terminal size={18} />
                </div>
                
                {/* CARD CONTAINER */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] relative"
                >
                  <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-7 hover:border-indigo-500/50 transition-all duration-300 rounded-2xl relative shadow-md dark:shadow-lg">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 relative z-10">
                        <h3 className="text-2xl font-bold text-primary font-display">{exp.company}</h3>
                        <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 w-fit">
                            {exp.period}
                        </span>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-steel mb-4 uppercase tracking-wider relative z-10">
                        {exp.role}
                    </h4>
                    
                    <p className="text-steel text-sm leading-relaxed mb-5 relative z-10">
                        {exp.description}
                    </p>

                    {/* EXPANDABLE SUB-PROJECTS */}
                    {hasProjects && (
                      <div className="mb-5 relative z-10 border-t border-slate-200 dark:border-zinc-800/80 pt-4">
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="w-full flex items-center justify-between font-mono text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 py-2 px-3.5 bg-slate-100 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800/80 rounded-xl transition-colors mb-3"
                          aria-expanded={isExpanded}
                          aria-label={`Alternar detalhes de projetos da ${exp.company}`}
                        >
                          <span className="flex items-center gap-2 font-semibold uppercase text-[11px]">
                            <Layers size={15} />
                            {isExpanded ? t('hideProjects') : t('showProjects')} ({exp.projects?.length})
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
                                <div key={pIdx} className="p-4 bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/60 rounded-xl">
                                  <h5 className="text-sm font-bold text-primary mb-2 font-display">{project.name}</h5>
                                  
                                  {project.image && (
                                    <div className="mb-3 w-full h-40 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800 relative group/img">
                                      <Image 
                                        src={project.image} 
                                        alt={project.name} 
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover object-top transition-all duration-300 group-hover/img:scale-105" 
                                      />
                                    </div>
                                  )}

                                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-steel text-xs leading-relaxed mb-2">
                                    {project.description.map((desc, dIdx) => (
                                      <li key={dIdx}>{desc}</li>
                                    ))}
                                  </ul>

                                  {project.links && project.links.length > 0 && (
                                    <div className="flex flex-wrap gap-3 mt-3 pt-2.5 border-t border-slate-200 dark:border-zinc-800/60">
                                      {project.links.map((link, lIdx) => (
                                        <a 
                                          key={lIdx} 
                                          href={link.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-white flex items-center gap-1 underline underline-offset-4 decoration-indigo-500/40 transition-colors"
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

                    {/* TECH TAGS AS PILLS */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-zinc-800/80 relative z-10">
                        {exp.tech.map((item) => (
                            <span key={item} className="text-xs font-mono font-medium px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-full">
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