'use client';

import { motion } from 'framer-motion';
import { getTechnologies } from '@/data/stack';
import { useLocale, useTranslations } from 'next-intl';

export default function Stack() {
  const locale = useLocale() as 'pt' | 'en';
  const technologies = getTechnologies(locale);
  const t = useTranslations('Stack');

  return (
    <section id="stack" className="py-28 px-6 bg-transparent border-b border-slate-200/60 dark:border-borderTech/40">
      <div className="container max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
            {t('tag')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-primary font-display tracking-tight">
            {t('title')}
          </h2>
          <p className="text-steel mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="group h-full bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-8 rounded-2xl hover:border-indigo-500/40 transition-all duration-300 relative shadow-md dark:shadow-lg">
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="p-3.5 bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">{tech.category}</h3>
                    <p className="text-sm text-steel mt-1">{tech.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {tech.tools.map((tool) => (
                    <span 
                      key={tool.name} 
                      className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-700 dark:text-steel bg-slate-100 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 rounded-full hover:border-indigo-500/50 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
                    >
                      {tool.icon}
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
