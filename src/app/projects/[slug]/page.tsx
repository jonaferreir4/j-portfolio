import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Github, ExternalLink, Terminal, ShieldCheck, Cpu, GitMerge } from 'lucide-react';
import { caseStudies } from '@/data/case-studies';
import { TacticalProjectPreview } from '@/components/ui/TacticalProjectPreview';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    return {
      title: 'Projeto Não Encontrado | Jona Ferreira',
    };
  }

  return {
    title: `Case Study: ${study.title} | Jona Ferreira`,
    description: study.summary,
    openGraph: {
      title: `Case Study: ${study.title} - Engenharia & Arquitetura`,
      description: study.summary,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-void pt-28 pb-20 px-6 lg:px-12 selection:bg-tacticalHighlight selection:text-white">
      <div className="container max-w-4xl mx-auto space-y-12">
        
        {/* BREADCRUMB & BACK LINK */}
        <div className="flex items-center justify-between font-mono text-xs border-b border-borderTech/60 pb-4">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-steel hover:text-tacticalHighlight transition-colors"
            aria-label="Voltar para a seção de projetos"
          >
            <ArrowLeft size={16} /> /// VOLTAR_PARA_PROJETOS
          </Link>
          <span className="text-tacticalHighlight font-bold">
            CASE_STUDY: {study.codeName}
          </span>
        </div>

        {/* HERO HEADER */}
        <header className="space-y-6 bg-armor border border-borderTech p-6 sm:p-8 clip-tech">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs text-tacticalHighlight bg-void px-2.5 py-1 border border-borderTech font-bold">
              ID: {study.codeName}
            </span>
            <span className="font-mono text-xs text-steel">
              {study.period} • {study.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary uppercase tracking-tight">
            {study.title}
          </h1>

          <p className="text-steel text-base sm:text-lg leading-relaxed font-medium">
            {study.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-borderTech/60">
            {study.repoLink && (
              <a 
                href={study.repoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-tacticalHighlight text-white font-mono text-xs font-bold rounded-sm hover:bg-indigo-600 transition-colors"
                aria-label={`Ver repositório do projeto ${study.title} no GitHub`}
              >
                <Github size={16} /> Repositório GitHub
              </a>
            )}
            {study.demoLink && (
              <a 
                href={study.demoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-borderTech bg-void text-primary font-mono text-xs font-bold rounded-sm hover:border-tacticalHighlight hover:text-tacticalHighlight transition-colors"
                aria-label={`Ver demonstração ao vivo do projeto ${study.title}`}
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </header>

        {/* METRICS & IMPACT SUMMARY */}
        <section aria-labelledby="results-heading" className="space-y-4">
          <h2 id="results-heading" className="font-mono text-xs text-tacticalHighlight font-bold tracking-widest uppercase">
            /// 01_RESULTADOS_MEDIDOS_E_IMPACTO
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {study.results.map((res, idx) => (
              <div key={idx} className="bg-armor border border-borderTech p-5 clip-tech">
                <div className="text-3xl font-extrabold font-mono text-tacticalHighlight mb-1">
                  {res.metric}
                </div>
                <div className="font-mono text-xs text-primary font-bold uppercase mb-1">
                  {res.label}
                </div>
                <div className="text-xs text-steel">
                  {res.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TACTICAL VISUAL SCHEMATIC / PREVIEW */}
        <section aria-labelledby="diagram-heading" className="space-y-4">
          <h2 id="diagram-heading" className="font-mono text-xs text-tacticalHighlight font-bold tracking-widest uppercase">
            /// 02_DIAGRAMA_DE_ARQUITETURA_E_FLUXO
          </h2>
          <div className="bg-armor border border-borderTech p-6 clip-tech space-y-4">
            <div className="h-64 w-full">
              <TacticalProjectPreview 
                codeName={study.codeName}
                type={study.diagram.type}
                title={study.title}
              />
            </div>
            <div className="font-mono text-xs bg-void border border-borderTech/60 p-4 text-steel">
              <span className="text-tacticalHighlight font-bold block mb-1">FLOW_TRACE:</span>
              {study.diagram.flowDescription}
            </div>
          </div>
        </section>

        {/* PROBLEM & BUSINESS CONTEXT */}
        <section aria-labelledby="problem-heading" className="space-y-4">
          <h2 id="problem-heading" className="font-mono text-xs text-tacticalHighlight font-bold tracking-widest uppercase">
            /// 03_CONTEXTO_DE_NEGÓCIO_E_DESAFIOS
          </h2>
          <div className="bg-armor border border-borderTech p-6 sm:p-8 clip-tech space-y-4">
            <p className="text-steel text-sm sm:text-base leading-relaxed">
              {study.problem.context}
            </p>
            <div className="space-y-2 pt-2">
              <span className="font-mono text-xs text-primary font-bold uppercase block">
                Desafios Técnicos Identificados:
              </span>
              <ul className="space-y-2 text-steel text-xs sm:text-sm">
                {study.problem.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-tacticalHighlight font-mono font-bold select-none">&gt;</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ARCHITECTURAL DECISIONS */}
        <section aria-labelledby="architecture-heading" className="space-y-4">
          <h2 id="architecture-heading" className="font-mono text-xs text-tacticalHighlight font-bold tracking-widest uppercase">
            /// 04_DECISÕES_DE_ARQUITETURA
          </h2>
          <div className="bg-armor border border-borderTech p-6 sm:p-8 clip-tech space-y-6">
            <p className="text-steel text-sm sm:text-base leading-relaxed">
              {study.architecture.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {study.architecture.keyDecisions.map((dec, idx) => (
                <div key={idx} className="p-4 bg-void border border-borderTech/60 rounded-sm space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs font-mono">
                    <Cpu size={16} className="text-tacticalHighlight" />
                    <span>{dec.title}</span>
                  </div>
                  <p className="text-xs text-steel leading-relaxed">
                    {dec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL TRADEOFFS */}
        <section aria-labelledby="tradeoffs-heading" className="space-y-4">
          <h2 id="tradeoffs-heading" className="font-mono text-xs text-tacticalHighlight font-bold tracking-widest uppercase">
            /// 05_TRADE_OFFS_E_COMPROMISSOS_TÉCNICOS
          </h2>
          <div className="bg-armor border border-borderTech p-6 clip-tech space-y-4">
            {study.tradeoffs.map((item, idx) => (
              <div key={idx} className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-void border-l-4 border-tacticalHighlight">
                  <span className="text-steel uppercase text-[10px] block mb-1">DECISÃO ADOTADA:</span>
                  <span className="text-primary font-bold text-sm block">{item.decision}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-emerald-550/10 border border-emerald-500/20 text-emerald-300">
                    <span className="text-emerald-400 font-bold block mb-1">✓ RATIONALE (POR QUE):</span>
                    <span className="text-steel">{item.reason}</span>
                  </div>
                  <div className="p-3 bg-rose-950/10 border border-rose-500/20 text-rose-300">
                    <span className="text-rose-400 font-bold block mb-1">⚠ DOWNSIDE (TRADE-OFF):</span>
                    <span className="text-steel">{item.downside}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK FOOTER */}
        <section className="bg-armor border border-borderTech p-6 clip-tech flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="text-steel uppercase text-[10px] block mb-2">TECNOLOGIAS UTILIZADAS NO CASE</span>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <span key={t} className="px-2.5 py-1 bg-void border border-borderTech text-primary font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Link 
            href="/#projects" 
            className="px-6 py-3 bg-tacticalHighlight text-white font-bold rounded-sm text-center hover:bg-indigo-600 transition-colors shrink-0"
            aria-label="Voltar para a página inicial"
          >
            Ver Todos os Projetos &rarr;
          </Link>
        </section>

      </div>
    </div>
  );
}
