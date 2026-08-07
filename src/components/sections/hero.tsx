'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Linkedin, Github, Cpu } from 'lucide-react';
import Image from 'next/image';
import MeAvatar from '@/assets/images/me-avatar.png';
import { siteConfig } from '@/data/site-config';
import { parseFormattedText } from '@/utils/text-parser';

export default function Hero() {
  const word1 = siteConfig.role.split(' ')[0] || 'Fullstack';
  const word2 = siteConfig.role.split(' ')[1] || 'Developer';

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-8 px-6 lg:px-12 bg-transparent border-b border-borderTech overflow-hidden"
    >
      <div className="container max-w-5xl mx-auto relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Static Professional Title with Gradient */}
            <h1
              id="hero-title"
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-primary leading-[1.15] tracking-tight pt-2 pb-1"
            >
              {word1}
              <br />
              <span className="bg-gradient-to-r from-tacticalHighlight to-indigo-400 bg-clip-text text-transparent">
                {word2}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg md:text-xl text-steel max-w-xl leading-relaxed"
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
                className="px-8 py-3.5 bg-tacticalHighlight text-white font-bold rounded-sm hover:bg-indigo-600 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center gap-2"
                aria-label="Ir para seção de contato com Jona Ferreira"
              >
                Entrar em Contato <ArrowRight size={18} />
              </a>

              <a
                href={siteConfig.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-borderTech bg-armor text-primary font-medium rounded-sm hover:border-tacticalHighlight hover:text-tacticalHighlight hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all duration-300 flex items-center gap-2"
                aria-label="Baixar currículo PDF de Jona Ferreira"
              >
                <Download size={18} /> Download CV
              </a>
            </motion.div>

            {/* Social links — visible immediately */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              id="hero-social-links"
              className="flex gap-4 pt-6 text-steel"
            >
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tacticalHighlight transition-colors"
                aria-label="Perfil no LinkedIn de Jona Ferreira"
              >
                <Linkedin size={24} />
              </a>
              <a
                id="hero-github-link"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tacticalHighlight transition-colors relative"
                aria-label="Perfil no GitHub de Jona Ferreira"
              >
                <Github size={24} />
              </a>
            </motion.div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[320px] sm:w-[350px] h-[390px] sm:h-[420px]">
              <div className="absolute top-4 right-4 w-full h-full border-2 border-borderTech/50 rounded-sm"></div>

              <div className="relative w-full h-full bg-armor border border-borderTech p-3 shadow-2xl group">

                <div className="relative w-full h-full overflow-hidden bg-void">

                  <Image
                    src={MeAvatar}
                    alt={`${siteConfig.name} - Avatar`}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
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

      {/* TACTICAL HUD METRICS BAR ANCHORED AT BOTTOM OF HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="container max-w-5xl mx-auto pt-10 mt-auto z-10"
      >
        <div className="grid grid-cols-2 gap-4 p-4 bg-armor/80 backdrop-blur-md border border-borderTech clip-tech font-mono text-xs shadow-lg">
          <div className="flex items-center gap-3 border-r border-borderTech/60 pr-2">
            <div className="p-2 bg-tacticalHighlight/10 text-tacticalHighlight rounded-sm">
              <Cpu size={18} />
            </div>
            <div>
              <span className="block text-steel text-[10px] uppercase">STACK CORE</span>
              <span className="text-primary font-bold text-sm">.NET • REACT • NODE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-tacticalHighlight/10 text-tacticalHighlight rounded-sm">
              <span className="font-extrabold text-tacticalHighlight text-xs">UFC</span>
            </div>
            <div>
              <span className="block text-steel text-[10px] uppercase">FORMAÇÃO</span>
              <span className="text-primary font-bold text-sm">ENG. SOFTWARE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
