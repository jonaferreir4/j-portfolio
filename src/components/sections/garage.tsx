'use client';

import { getProjects } from '@/data/projects';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { TacticalProjectPreview } from '@/components/ui/TacticalProjectPreview';
import { useLocale, useTranslations } from 'next-intl';

export default function Garage() {
  const locale = useLocale() as 'pt' | 'en';
  const projects = getProjects(locale);
  const t = useTranslations('Garage');

  return (
    <section 
      id="projects" 
      aria-labelledby="projects-heading"
      className="py-28 px-6 bg-transparent border-b border-slate-200/60 dark:border-borderTech/40"
    >
      <div className="container max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
            {t('tag')}
          </span>
          <h2 id="projects-heading" className="text-3xl sm:text-5xl font-extrabold text-primary font-display tracking-tight">
            {t('title')}
          </h2>
          <p className="text-steel mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* PROJECTS GRID */}
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
              <div className="group relative bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 hover:border-indigo-500/50 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full shadow-md dark:shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full relative z-10">
                    
                    {/* VISUAL PREVIEW */}
                    <div className="relative h-56 lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-zinc-800/80 bg-slate-900 dark:bg-zinc-950/60">
                        {project.image ? (
                          <Image 
                            src={project.image} 
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-all duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <TacticalProjectPreview 
                            codeName={project.codeName}
                            type={project.previewType}
                            title={project.title}
                          />
                        )}
  
                        <div className="absolute top-3 left-3 bg-slate-900/90 dark:bg-zinc-950/90 px-2.5 py-1 text-[10px] font-mono text-indigo-400 border border-slate-700 dark:border-zinc-800 rounded-full z-20 shadow-sm backdrop-blur-md">
                            ID: {project.codeName}
                        </div>
                    </div>
  
                    {/* CONTENT DETAILS */}
                    <div className="p-6 flex flex-col justify-between space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-2xl font-bold text-primary font-display tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                  {project.title}
                                </h3>
                                {project.repoLink && (
                                  <a 
                                    href={project.repoLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-2 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-700 dark:text-steel hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200"
                                    aria-label={`Ver código-fonte do projeto ${project.title} no GitHub`}
                                  >
                                      <Github size={18} />
                                  </a>
                                )}
                            </div>
                            <p className="text-steel text-sm leading-relaxed line-clamp-3">
                                {project.description}
                            </p>
                        </div>
  
                        {/* SPECS BADGES */}
                        <div className="space-y-4 border-t border-slate-200 dark:border-zinc-800/80 pt-4 mt-auto">
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(project.specs).slice(0, 3).map(([key, value]) => (
                                  <span 
                                    key={key} 
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 rounded-full text-[11px] font-mono text-slate-700 dark:text-steel"
                                  >
                                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{key}:</span>
                                      <span className="text-slate-900 dark:text-primary font-medium">{value}</span>
                                  </span>
                              ))}
                            </div>

                            {/* CASE STUDY LINK BUTTON */}
                            <div className="pt-2">
                              <Link 
                                href={`/projects/${project.slug}`}
                                className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-indigo-500/20 group/link"
                                aria-label={`Ver case study completo do projeto ${project.title}`}
                              >
                                <span>{t('viewCaseStudy')}</span>
                                <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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
