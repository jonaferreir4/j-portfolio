'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Linkedin, Github, Cpu, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import MeAvatar from '@/assets/images/me-avatar.png';
import { getSiteConfig } from '@/data/site-config';
import { parseFormattedText } from '@/utils/text-parser';
import { useLocale, useTranslations } from 'next-intl';
import { HeroTitleRobot } from '@/components/ui/HeroTitleRobot';

export default function Hero() {
  const locale = useLocale() as 'pt' | 'en';
  const siteConfig = getSiteConfig(locale);
  const t = useTranslations('Hero');

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-16 px-6 lg:px-12 bg-transparent border-b border-slate-200/60 dark:border-borderTech/40 overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Interactive Hero Title */}
            <HeroTitleRobot />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg sm:text-xl text-steel max-w-xl leading-relaxed font-normal"
            >
              {parseFormattedText(siteConfig.heroBio)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#contact"
                className="px-7 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center gap-2 text-sm"
                aria-label="Ir para seção de contato com Jona Ferreira"
              >
                {t('contactBtn')} <ArrowRight size={18} />
              </a>

              <a
                href={siteConfig.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-slate-900 dark:text-primary font-medium rounded-xl hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 text-sm backdrop-blur-md shadow-sm"
                aria-label="Baixar currículo PDF de Jona Ferreira"
              >
                <Download size={18} /> {t('downloadCvBtn')}
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              id="hero-social-links"
              className="flex items-center gap-5 pt-4 text-steel"
            >
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-700 dark:text-steel hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200 shadow-sm"
                aria-label="Perfil no LinkedIn de Jona Ferreira"
              >
                <Linkedin size={20} />
              </a>
              <a
                id="hero-github-link"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-700 dark:text-steel hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200 shadow-sm"
                aria-label="Perfil no GitHub de Jona Ferreira"
              >
                <Github size={20} />
              </a>
            </motion.div>

          </motion.div>

          {/* AVATAR FRAME WITH LEVITATION FLOATING ANIMATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-[300px] sm:w-[340px] h-[370px] sm:h-[410px] group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl bg-slate-900 dark:bg-zinc-950">
                <Image
                  src={MeAvatar}
                  alt={`${siteConfig.name} - Avatar`}
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* METRICS BAR ANCHORED AT BOTTOM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="container max-w-6xl mx-auto pt-12 mt-auto z-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 rounded-2xl shadow-lg dark:shadow-xl">
          <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-zinc-800/80 pb-3 sm:pb-0 sm:pr-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Cpu size={20} />
            </div>
            <div>
              <span className="block text-steel text-xs font-mono uppercase tracking-wider">{t('stackCore')}</span>
              <span className="text-primary font-bold text-base font-sans">.NET • REACT 19 • NODE</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:pl-2">
            <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="block text-steel text-xs font-mono uppercase tracking-wider">{t('education')}</span>
              <span className="text-primary font-bold text-base font-sans">ENG. DE SOFTWARE (UFC)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
