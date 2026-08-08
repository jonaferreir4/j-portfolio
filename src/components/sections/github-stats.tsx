'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Activity, GitBranch, ShieldCheck, RefreshCw } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { useTranslations } from 'next-intl';

interface GithubUser {
  public_repos: number;
  followers: number;
  public_gists: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  bio: string;
}

export function GithubStats() {
  const t = useTranslations('GithubStats');
  const [stats, setStats] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${siteConfig.github.username}`, {
          next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('GitHub API response not ok');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.warn('Using fallback GitHub stats due to rate limit or connection:', err);
        setError(true);
        setStats({
          public_repos: 18,
          followers: 12,
          public_gists: 4,
          created_at: '2021-03-15T00:00:00Z',
          updated_at: new Date().toISOString(),
          avatar_url: 'https://github.com/jonaferreir4.png',
          bio: 'Fullstack Developer | .NET & React'
        });
      } finally {
        setLoading(false);
      }
    }
    fetchGithubStats();
  }, []);

  return (
    <section id="github-telemetry" className="py-20 px-6 bg-transparent border-b border-slate-200/60 dark:border-borderTech/40 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
              {t('tag')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-primary font-display uppercase tracking-tight">
              {t('title')}
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 px-3.5 py-1.5 rounded-full w-fit text-steel shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>API_STATUS: {error ? 'FALLBACK_CACHE' : 'LIVE_SYNC'}</span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Public Repos */}
          <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl hover:border-indigo-500/40 transition-colors group shadow-md dark:shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-steel uppercase font-semibold">{t('publicRepos')}</span>
              <GitBranch size={20} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-4xl font-extrabold font-display text-primary">
              {loading ? <RefreshCw className="animate-spin text-steel" size={28} /> : `${stats?.public_repos || 18}+`}
            </div>
            <p className="font-mono text-xs text-steel mt-2">{t('publicReposSub')}</p>
          </div>

          {/* Card 2: Primary Stack */}
          <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl hover:border-indigo-500/40 transition-colors group shadow-md dark:shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-steel uppercase font-semibold">{t('mainStack')}</span>
              <Activity size={20} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-extrabold font-display text-primary">.NET / React / Node</div>
            <p className="font-mono text-xs text-steel mt-2">{t('mainStackSub')}</p>
          </div>

          {/* Card 3: Code Integrity */}
          <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl hover:border-emerald-500/40 transition-colors group shadow-md dark:shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-steel uppercase font-semibold">{t('technicalIntegrity')}</span>
              <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-4xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">100%</div>
            <p className="font-mono text-xs text-steel mt-2">TYPESCRIPT STRICT MODE</p>
          </div>

          {/* Card 4: GitHub Link */}
          <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl hover:border-indigo-500/40 transition-colors group flex flex-col justify-between shadow-md dark:shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-steel uppercase font-semibold">{t('githubProfile')}</span>
              <Github size={20} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-primary block">@{siteConfig.github.username}</span>
              <a 
                href={siteConfig.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 font-mono text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-2 font-semibold"
                aria-label="Acessar perfil de Jona Ferreira no GitHub"
              >
                {t('accessRepos')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
