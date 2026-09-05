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
    <div className="min-h-screen bg-void pt-28 pb-20 px-6 lg:px-12 selection:bg-indigo-500 selection:text-white">
      <div className="container max-w-4xl mx-auto space-y-12">
        
        {/* BREADCRUMB & BACK LINK */}
        <div className="flex items-center justify-between font-mono text-xs border-b border-slate-200 dark:border-zinc-800/80 pb-4">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-steel hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label={t('backLink')}
          >
            <ArrowLeft size={16} /> {t('backLink')}
          </Link>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
            CASE_STUDY: {study.codeName}
          </span>
        </div>

        {/* HERO HEADER */}
        <header className="space-y-6 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-8 rounded-2xl shadow-md dark:shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 border border-indigo-500/20 rounded-full font-bold">
              ID: {study.codeName}
            </span>
            <span className="font-mono text-xs text-steel font-medium">
              {study.period} • {study.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight">
            {study.title}
          </h1>

          <p className="text-steel text-base sm:text-lg leading-relaxed font-normal">
            {study.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200 dark:border-zinc-800/80">
            {study.repoLink && (
              <a 
                href={study.repoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-mono text-xs font-semibold rounded-xl hover:bg-indigo-500 transition-colors shadow-md"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-primary font-mono text-xs font-semibold rounded-xl hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
                aria-label={`Live Demo for ${study.title}`}
              >
                <ExternalLink size={16} /> {t('demoBtn')}
              </a>
            )}
          </div>
        </header>

        {/* METRICS & IMPACT SUMMARY */}
        <section aria-labelledby="results-heading" className="space-y-4">
          <h2 id="results-heading" className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase">
            {t('resultsTag')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {study.results.map((res, idx) => (
              <div key={idx} className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl shadow-md dark:shadow-lg">
                <div className="text-3xl font-extrabold font-display text-indigo-600 dark:text-indigo-400 mb-1">
                  {res.metric}
                </div>
                <div className="font-mono text-xs text-primary font-bold uppercase mb-1">
                  {res.label}
                </div>
                <div className="text-xs text-steel leading-relaxed">
                  {res.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VISUAL SCHEMATIC / PREVIEW */}
        <section aria-labelledby="diagram-heading" className="space-y-4">
          <h2 id="diagram-heading" className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase">
            {t('diagramTag')}
          </h2>
          <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 shadow-md dark:shadow-lg">
            <div className="min-h-[280px] w-full rounded-xl overflow-hidden bg-slate-900">
              <TacticalProjectPreview 
                codeName={study.codeName}
                type={study.diagram.type}
                title={study.title}
                image={study.image}
              />
            </div>
            <div className="font-mono text-xs bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 p-4 rounded-xl text-steel">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold block mb-1">FLOW_TRACE:</span>
              {study.diagram.flowDescription}
            </div>
          </div>
        </section>

        {/* PROBLEM & BUSINESS CONTEXT */}
        <section aria-labelledby="problem-heading" className="space-y-4">
          <h2 id="problem-heading" className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase">
            {t('problemTag')}
          </h2>
          <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-8 rounded-2xl space-y-5 shadow-md dark:shadow-lg">
            <p className="text-steel text-sm sm:text-base leading-relaxed">
              {study.problem.context}
            </p>
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs text-primary font-bold uppercase block">
                {t('challengesTitle')}
              </span>
              <ul className="space-y-2 text-steel text-xs sm:text-sm">
                {study.problem.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold select-none">&gt;</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ARCHITECTURAL DECISIONS */}
        <section aria-labelledby="architecture-heading" className="space-y-4">
          <h2 id="architecture-heading" className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase">
            {t('archTag')}
          </h2>
          <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-8 rounded-2xl space-y-6 shadow-md dark:shadow-lg">
            <p className="text-steel text-sm sm:text-base leading-relaxed">
              {study.architecture.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {study.architecture.keyDecisions.map((dec, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs font-mono">
                    <Cpu size={16} className="text-indigo-600 dark:text-indigo-400" />
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
          <h2 id="tradeoffs-heading" className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase">
            {t('tradeoffsTag')}
          </h2>
          <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 shadow-md dark:shadow-lg">
            {study.tradeoffs.map((item, idx) => (
              <div key={idx} className="space-y-3 font-mono text-xs">
                <div className="p-4 bg-slate-100 dark:bg-zinc-950 border-l-4 border-indigo-500 rounded-r-xl">
                  <span className="text-steel uppercase text-[10px] block mb-1">{t('decisionAdopted')}</span>
                  <span className="text-primary font-bold text-sm block">{item.decision}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-xl">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">{t('rationale')}</span>
                    <span className="text-steel">{item.reason}</span>
                  </div>
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 text-rose-800 dark:text-rose-300 rounded-xl">
                    <span className="text-rose-600 dark:text-rose-400 font-bold block mb-1">{t('downside')}</span>
                    <span className="text-steel">{item.downside}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK FOOTER */}
        <section className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs shadow-md dark:shadow-lg">
          <div>
            <span className="text-steel uppercase text-[10px] block mb-2">{t('techUsed')}</span>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <Link 
            href="/#projects" 
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl text-center hover:bg-indigo-500 transition-colors shrink-0 shadow-md"
            aria-label={t('viewAll')}
          >
            {t('viewAll')}
          </Link>
        </section>

      </div>
    </div>
  );
}
