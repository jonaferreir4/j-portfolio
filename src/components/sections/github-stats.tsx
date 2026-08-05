'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Activity, GitBranch, Star, ShieldCheck, RefreshCw } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

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
        // Fallback data
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
    <section id="github-telemetry" className="py-16 px-6 bg-armor/40 border-b border-borderTech relative">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="bg-void/90 p-6 sm:p-8 rounded-sm border border-borderTech backdrop-blur-sm flex-1 max-w-3xl">
            <span className="font-mono text-tacticalHighlight text-xs font-bold uppercase tracking-widest block mb-1">
              /// GITHUB_LIVE_TELEMETRY
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase">
              Métricas Técnicas em Tempo Real
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] bg-void border border-borderTech px-3 py-1.5 rounded-sm w-fit text-steel">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>API_STATUS: {error ? 'FALLBACK_CACHE' : 'LIVE_SYNC'}</span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Card 1: Public Repos */}
          <div className="bg-armor border border-borderTech p-5 clip-tech hover:border-tacticalHighlight transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[10px] text-steel uppercase">REPOSITÓRIOS PÚBLICOS</span>
              <GitBranch size={18} className="text-tacticalHighlight group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-bold font-mono text-primary">
              {loading ? <RefreshCw className="animate-spin text-steel" size={24} /> : `${stats?.public_repos || 18}+`}
            </div>
            <p className="font-mono text-[10px] text-steel mt-2">CÓDIGO ABERTO NO GITHUB</p>
          </div>

          {/* Card 2: Core Stack & Ecosystem */}
          <div className="bg-armor border border-borderTech p-5 clip-tech hover:border-tacticalHighlight transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[10px] text-steel uppercase">STACK PRINCIPAL</span>
              <Activity size={18} className="text-tacticalHighlight group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-bold font-mono text-primary">.NET / React / Node</div>
            <p className="font-mono text-[10px] text-steel mt-2">CLEAN ARCHITECTURE & REACT 19</p>
          </div>

          {/* Card 3: Code Integrity */}
          <div className="bg-armor border border-borderTech p-5 clip-tech hover:border-tacticalHighlight transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[10px] text-steel uppercase">INTEGRIDADE TÉCNICA</span>
              <ShieldCheck size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400">100%</div>
            <p className="font-mono text-[10px] text-steel mt-2">TYPESCRIPT STRICT MODE</p>
          </div>

          {/* Card 4: GitHub Link */}
          <div className="bg-armor border border-borderTech p-5 clip-tech hover:border-tacticalHighlight transition-colors group flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[10px] text-steel uppercase">PERFIL GITHUB</span>
              <Github size={18} className="text-tacticalHighlight group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-primary block">@{siteConfig.github.username}</span>
              <a 
                href={siteConfig.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 font-mono text-[10px] text-tacticalHighlight hover:underline mt-2"
                aria-label="Acessar perfil de Jona Ferreira no GitHub"
              >
                Acessar Repositórios &rarr;
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
