'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/site-config';
import { parseFormattedText } from '@/utils/text-parser';
import { ShieldCheck, Cpu, Code2 } from 'lucide-react';

export default function About() {
  return (
    <section 
      id="about" 
      aria-labelledby="about-heading"
      className="py-24 px-6 bg-transparent relative overflow-hidden border-b border-borderTech"
    >
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-borderTech hidden lg:block"></div>

      <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center pl-0 lg:pl-12">
        
        <div className="space-y-6 bg-void/90 p-6 sm:p-8 rounded-sm border border-borderTech backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="font-mono text-tacticalHighlight text-xs tracking-widest block mb-2 uppercase">
              {'/// Bio_Data'}
            </span>
            <h2 
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-primary uppercase leading-none whitespace-pre-line"
            >
              {siteConfig.titleBio}
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-steel leading-relaxed space-y-4 font-medium border-l-2 border-tacticalHighlight/30 pl-6"
          >
            {siteConfig.aboutBio.map((paragraph, idx) => (
              <p key={idx}>
                {parseFormattedText(paragraph)}
              </p>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-borderTech font-mono text-xs"
          >
            <div>
               <span className="block text-steel uppercase mb-1">Formação Acadêmica</span>
               <span className="text-primary block font-bold">Engenharia de Software (UFC)</span>
               <span className="text-steel/70">Téc. Informática (IFCE)</span>
            </div>
            <div>
               <span className="block text-steel uppercase mb-1">Localização & Fuso</span>
               <span className="text-primary block font-bold">Brasil (Remote)</span>
               <span className="text-steel/70">BRT (UTC-3)</span>
            </div>
          </motion.div>
        </div>

        {/* CAPABILITY CARDS WITH REAL ENGINEERING EVIDENCE (Replacing arbitrary % bars) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-full min-h-[340px] border border-borderTech bg-armor p-6 flex flex-col justify-between clip-tech hover:border-tacticalHighlight/30 transition-colors duration-300 group"
        >
          
          <div className="flex justify-between items-start border-b border-borderTech pb-4">
            <div>
              <span className="font-mono text-xs text-tacticalHighlight font-bold block uppercase">
                /// CAPABILITY_DISTRIBUTION
              </span>
              <span className="font-mono text-[10px] text-steel">Evidências de Produção & Arquitetura</span>
            </div>
            <div className="flex gap-1 group-hover:scale-110 transition-transform duration-300">
              <div className="w-1 h-3 bg-primary"></div>
              <div className="w-1 h-3 bg-primary"></div>
              <div className="w-1 h-3 bg-tacticalHighlight"></div>
            </div>
          </div>
          
          <div className="py-6 space-y-4 font-mono text-xs">
            
            {/* Capability 1 */}
            <div className="p-3 bg-void border border-borderTech/60 rounded-sm hover:border-tacticalHighlight transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Cpu size={14} className="text-tacticalHighlight" />
                  <span>MODERN BACKEND (.NET / NODE / JAVA)</span>
                </div>
                <span className="text-[9px] text-tacticalHighlight bg-tacticalHighlight/10 px-1.5 py-0.5 rounded font-bold">
                  PRODUÇÃO
                </span>
              </div>
              <p className="text-[11px] text-steel leading-snug">
                Arquitetura Feature-First, microsserviços desacoplados em Java/AWS SES e SignalR WebSockets em tempo real.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="p-3 bg-void border border-borderTech/60 rounded-sm hover:border-tacticalHighlight transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Code2 size={14} className="text-tacticalHighlight" />
                  <span>FRONTEND ENG. (REACT 19 / NEXT.JS)</span>
                </div>
                <span className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded font-bold">
                  SÊNIOR
                </span>
              </div>
              <p className="text-[11px] text-steel leading-snug">
                Plataformas multi-tenant com theming dinâmico, cache com TanStack Query, Zustand e zero CLS.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="p-3 bg-void border border-borderTech/60 rounded-sm hover:border-tacticalHighlight transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>LEGADO & SEGURANÇA (PHP / SQL)</span>
                </div>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">
                  VERIFICADO
                </span>
              </div>
              <p className="text-[11px] text-steel leading-snug">
                Implementação de Controle de Acesso (RBAC) com múltiplos perfis e refatoração de código legado.
              </p>
            </div>

          </div>

          <div className="flex justify-between items-center font-mono text-[10px] text-steel/70 pt-3 border-t border-borderTech">
            <span>CURRENT_STATUS: KASTERWEB FE LEAD</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              VERIFIED
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}