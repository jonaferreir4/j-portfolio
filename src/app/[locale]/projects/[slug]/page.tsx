import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, Github, ExternalLink, Cpu } from 'lucide-react';
import { getCaseStudies } from '@/data/case-studies';
import { TacticalProjectPreview } from '@/components/ui/TacticalProjectPreview';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/data/site-config';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const caseStudyKeys = Object.keys(getCaseStudies('pt'));
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const slug of caseStudyKeys) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isLocaleValid = routing.locales.includes(locale as any);
  const currentLocale = (isLocaleValid ? locale : 'pt') as Locale;

  const caseStudies = getCaseStudies(currentLocale);
  const study = caseStudies[slug];

  if (!study) {
    return {
      title: currentLocale === 'en' ? 'Project Not Found | Jona Ferreira' : 'Projeto Não Encontrado | Jona Ferreira',
    };
  }

  return {
    title: `Case Study: ${study.title} | Jona Ferreira`,
    description: study.summary,
    openGraph: {
      title: `Case Study: ${study.title} - ${currentLocale === 'en' ? 'Engineering & Architecture' : 'Engenharia & Arquitetura'}`,
      description: study.summary,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  setRequestLocale(currentLocale);
  const t = await getTranslations('CaseStudy');

  const caseStudies = getCaseStudies(currentLocale);
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
            aria-label={t('backLink')}
          >
            <ArrowLeft size={16} /> {t('backLink')}
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
                aria-label={`GitHub Repository for ${study.title}`}
              >
                <Github size={16} /> {t('repoBtn')}
              </a>
            )}
            {study.demoLink && (
              <a 
                href={study.demoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-borderTech bg-void text-primary font-mono text-xs font-bold rounded-sm hover:border-tacticalHighlight hover:text-tacticalHighlight transition-colors"
                aria-label={`Live Demo for ${study.title}`}
              >
                <ExternalLink size={16} /> {t('demoBtn')}
              </a>
            )}
          </div>
        </header>

        {/* METRICS & IMPACT SUMMARY */}
        <section aria-labelledby="results-heading" className="space-y-4">
          <h2 id="results-heading" className="font-mono text-xs text-tacticalHighlight font-bold tracking-widest uppercase">
            {t('resultsTag')}
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

        {/* VISUAL SCHEMATIC / PREVIEW */}
        <section aria-labelledby="diagram-heading" className="space-y-4">
          <h2 id="diagram-heading" className="font-mono text-xs text-tacticalHighlight font-bold tracking-widest uppercase">
            {t('diagramTag')}
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
            {t('problemTag')}
          </h2>
          <div className="bg-armor border border-borderTech p-6 sm:p-8 clip-tech space-y-4">
            <p className="text-steel text-sm sm:text-base leading-relaxed">
              {study.problem.context}
            </p>
            <div className="space-y-2 pt-2">
              <span className="font-mono text-xs text-primary font-bold uppercase block">
                {t('challengesTitle')}
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
            {t('archTag')}
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
            {t('tradeoffsTag')}
          </h2>
          <div className="bg-armor border border-borderTech p-6 clip-tech space-y-4">
            {study.tradeoffs.map((item, idx) => (
              <div key={idx} className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-void border-l-4 border-tacticalHighlight">
                  <span className="text-steel uppercase text-[10px] block mb-1">{t('decisionAdopted')}</span>
                  <span className="text-primary font-bold text-sm block">{item.decision}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-emerald-550/10 border border-emerald-500/20 text-emerald-300">
                    <span className="text-emerald-400 font-bold block mb-1">{t('rationale')}</span>
                    <span className="text-steel">{item.reason}</span>
                  </div>
                  <div className="p-3 bg-rose-950/10 border border-rose-500/20 text-rose-300">
                    <span className="text-rose-400 font-bold block mb-1">{t('downside')}</span>
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
            <span className="text-steel uppercase text-[10px] block mb-2">{t('techUsed')}</span>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 bg-void border border-borderTech text-primary font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <Link 
            href="/#projects" 
            className="px-6 py-3 bg-tacticalHighlight text-white font-bold rounded-sm text-center hover:bg-indigo-600 transition-colors shrink-0"
            aria-label={t('viewAll')}
          >
            {t('viewAll')}
          </Link>
        </section>

      </div>
    </div>
  );
}
