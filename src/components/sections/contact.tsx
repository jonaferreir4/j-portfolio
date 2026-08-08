'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Send, CheckCircle2, Clock, Globe2, AlertCircle } from 'lucide-react';
import { getSiteConfig } from '@/data/site-config';
import { useLocale, useTranslations } from 'next-intl';

export default function Contact() {
  const locale = useLocale() as 'pt' | 'en';
  const siteConfig = getSiteConfig(locale);
  const t = useTranslations('Contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    if (!formData.name.trim() || formData.name.length < 2) {
      setErrorMessage(locale === 'en' ? 'Please enter your name.' : 'Por favor, informe seu nome.');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage(locale === 'en' ? 'Please enter a valid email address.' : 'Por favor, insira um e-mail válido.');
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage(locale === 'en' ? 'Message must be at least 10 characters long.' : 'A mensagem deve conter pelo menos 10 caracteres.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';

      if (!apiKey) {
        const mailtoUrl = `mailto:${siteConfig.links.email || 'jonaferreira.dev@gmail.com'}?subject=${encodeURIComponent(
          formData.subject || `Contact from ${formData.name}`
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoUrl;
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Opportunity / Contact from ${formData.name}`,
          message: formData.message,
          from_name: 'Portfolio Jona Ferreira'
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send email.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(
        locale === 'en'
          ? 'Transmission error via API. Click fallback button to send directly via mail client.'
          : 'Erro na transmissão via API. Clique no botão de fallback para enviar diretamente via seu cliente de e-mail.'
      );
    }
  };

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="py-28 px-6 bg-transparent border-b border-slate-200/60 dark:border-borderTech/40 relative"
    >
      <div className="container max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
            {t('tag')}
          </span>
          <h2 id="contact-heading" className="text-3xl sm:text-5xl font-extrabold text-primary font-display tracking-tight uppercase">
            {t('title')}
          </h2>
          <p className="text-steel mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* FORM CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-8 rounded-2xl shadow-md dark:shadow-xl"
          >
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800/80 pb-4 mb-6 font-mono text-xs">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">{t('dispatcherTag')}</span>
              <span className="text-steel">{t('statusReady')}</span>
            </div>

            {status === 'success' ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3 text-center">
                <CheckCircle2 size={40} className="text-emerald-500 dark:text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold font-display text-primary uppercase">{t('successTitle')}</h3>
                <p className="text-steel text-sm leading-relaxed">
                  {t('successDesc')}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-5 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-500 transition-colors"
                >
                  {t('newMsgBtn')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-sm font-sans">
                
                {errorMessage && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 rounded-xl flex items-center gap-2 text-xs">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-steel uppercase text-xs font-mono mb-2 font-semibold">
                      {t('nameLabel')} <span className="text-indigo-600 dark:text-indigo-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Ex: Carlos Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 px-4 py-3 text-slate-900 dark:text-primary placeholder-slate-400 dark:placeholder-steel/50 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-steel uppercase text-xs font-mono mb-2 font-semibold">
                      {t('emailLabel')} <span className="text-indigo-600 dark:text-indigo-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="carlos@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 px-4 py-3 text-slate-900 dark:text-primary placeholder-slate-400 dark:placeholder-steel/50 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-steel uppercase text-xs font-mono mb-2 font-semibold">
                    {t('subjectLabel')}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Oportunidade / Projeto Fullstack"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 px-4 py-3 text-slate-900 dark:text-primary placeholder-slate-400 dark:placeholder-steel/50 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-steel uppercase text-xs font-mono mb-2 font-semibold">
                    {t('messageLabel')} <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Descreva brevemente a demanda ou oportunidade..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 px-4 py-3 text-slate-900 dark:text-primary placeholder-slate-400 dark:placeholder-steel/50 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all duration-200 flex items-center justify-center gap-2 text-xs font-mono tracking-wider uppercase disabled:opacity-50 shadow-md hover:shadow-indigo-500/20"
                  aria-label="Transmitir mensagem de contato"
                >
                  {status === 'submitting' ? (
                    <span>{t('submitting')}</span>
                  ) : (
                    <>
                      <span>{t('submitBtn')}</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* TELEMETRY & DIRECT CHANNELS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* SLA PANEL */}
            <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 font-mono text-xs shadow-md dark:shadow-xl">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase block border-b border-slate-200 dark:border-zinc-800/80 pb-3">
                {t('telemetryTag')}
              </span>

              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Globe2 size={18} />
                </div>
                <div>
                  <span className="text-steel uppercase text-[10px] block">{t('timezoneLabel')}</span>
                  <span className="text-primary font-bold text-sm">BRT (UTC-3) • Brasil</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-steel uppercase text-[10px] block">{t('slaLabel')}</span>
                  <span className="text-primary font-bold text-sm">{t('slaValue')}</span>
                </div>
              </div>
            </div>

            {/* DIRECT LINKS */}
            <div className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 font-mono text-xs shadow-md dark:shadow-xl">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase block border-b border-slate-200 dark:border-zinc-800/80 pb-3">
                {t('directChannelsTag')}
              </span>

              <a 
                href={siteConfig.links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 hover:border-indigo-500/40 transition-colors rounded-xl text-slate-700 dark:text-steel hover:text-slate-900 dark:hover:text-primary"
                aria-label="Conectar com Jona Ferreira no LinkedIn"
              >
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold">LinkedIn Profile</span>
                </div>
                <span className="text-indigo-600 dark:text-indigo-400">&rarr;</span>
              </a>

              <a 
                href={siteConfig.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 hover:border-indigo-500/40 transition-colors rounded-xl text-slate-700 dark:text-steel hover:text-slate-900 dark:hover:text-primary"
                aria-label="Acessar repositórios de Jona Ferreira no GitHub"
              >
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold">GitHub Repositories</span>
                </div>
                <span className="text-indigo-600 dark:text-indigo-400">&rarr;</span>
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
