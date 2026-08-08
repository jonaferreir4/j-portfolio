'use client';

import { motion } from 'framer-motion';
import { getSiteConfig } from '@/data/site-config';
import { parseFormattedText } from '@/utils/text-parser';
import { ShieldCheck, Cpu, Code2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function About() {
  const locale = useLocale() as 'pt' | 'en';
  const siteConfig = getSiteConfig(locale);
  const t = useTranslations('About');

  return (
    <section 
      id="about" 
      aria-labelledby="about-heading"
      className="py-28 px-6 bg-transparent relative overflow-hidden border-b border-slate-200/60 dark:border-borderTech/40"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* BIO & ACADEMIC INFO */}
          <div className="space-y-6 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 dark:border-zinc-800/80 flex flex-col justify-between shadow-md dark:shadow-lg">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
                  {t('bioData')}
                </span>
                <h2 
                  id="about-heading"
                  className="text-3xl sm:text-4xl font-extrabold text-primary font-display uppercase leading-tight whitespace-pre-line"
                >
                  {siteConfig.titleBio}
                </h2>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-steel leading-relaxed space-y-4 text-base font-normal border-l-2 border-indigo-500/40 pl-5"
              >
                {siteConfig.aboutBio.map((paragraph, idx) => (
                  <p key={idx}>
                    {parseFormattedText(paragraph)}
                  </p>
                ))}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-slate-200 dark:border-zinc-800/80 text-xs font-mono"
            >
              <div>
                 <span className="block text-steel uppercase mb-1">{t('academicBackground')}</span>
                 <span className="text-primary block font-bold text-sm">Engenharia de Software (UFC)</span>
                 <span className="text-steel/80">Téc. Informática (IFCE)</span>
              </div>
              <div>
                 <span className="block text-steel uppercase mb-1">{t('locationTimezone')}</span>
                 <span className="text-primary block font-bold text-sm">Brasil (Remote)</span>
                 <span className="text-steel/80">BRT (UTC-3)</span>
              </div>
            </motion.div>
          </div>

          {/* CAPABILITY CARDS */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-full border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between shadow-md dark:shadow-lg group"
          >
            
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-zinc-800/80 pb-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
                  {t('capabilityDistribution')}
                </span>
                <span className="block text-xs text-steel">{t('evidenceTitle')}</span>
              </div>
            </div>
            
            <div className="py-6 space-y-4">
              
              {/* Capability 1 */}
              <div className="p-4 bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 rounded-xl hover:border-indigo-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 text-primary font-bold text-sm font-display">
                    <Code2 size={16} className="text-indigo-600 dark:text-indigo-400" />
                    <span>{t('cap1Title')}</span>
                  </div>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-bold font-mono border border-indigo-500/20">
                    {t('cap1Tag')}
                  </span>
                </div>
                <p className="text-xs text-steel leading-relaxed">
                  {t('cap1Desc')}
                </p>
              </div>

              {/* Capability 2 */}
              <div className="p-4 bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 rounded-xl hover:border-indigo-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 text-primary font-bold text-sm font-display">
                    <Cpu size={16} className="text-indigo-600 dark:text-indigo-400" />
                    <span>{t('cap2Title')}</span>
                  </div>
                  <span className="text-[10px] text-slate-900 dark:text-primary bg-slate-200 dark:bg-primary/10 px-2 py-0.5 rounded-full font-bold font-mono border border-slate-300 dark:border-white/10">
                    {t('cap2Tag')}
                  </span>
                </div>
                <p className="text-xs text-steel leading-relaxed">
                  {t('cap2Desc')}
                </p>
              </div>

              {/* Capability 3 */}
              <div className="p-4 bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 rounded-xl hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 text-primary font-bold text-sm font-display">
                    <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span>{t('cap3Title')}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold font-mono border border-emerald-500/20">
                    {t('cap3Tag')}
                  </span>
                </div>
                <p className="text-xs text-steel leading-relaxed">
                  {t('cap3Desc')}
                </p>
              </div>

            </div>

            <div className="flex justify-between items-center font-mono text-xs text-steel/80 pt-4 border-t border-slate-200 dark:border-zinc-800/80">
              <span>CURRENT_STATUS: KASTERWEB FE LEAD</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {t('verified')}
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}