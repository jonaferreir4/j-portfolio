'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2, Clock, Globe2, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export default function Contact() {
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
      setErrorMessage('Por favor, informe seu nome.');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('A mensagem deve conter pelo menos 10 caracteres.');
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
      // Simulate server action or backend contact handler latency
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Falha ao enviar mensagem. Tente novamente ou use o e-mail direto.');
    }
  };

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="py-24 px-6 bg-transparent border-b border-borderTech relative"
    >
      <div className="container max-w-5xl mx-auto">
        
        <div className="mb-16 bg-void/90 p-6 sm:p-8 rounded-sm border border-borderTech backdrop-blur-sm max-w-3xl">
          <span className="font-mono text-tacticalHighlight text-xs font-bold uppercase tracking-widest block mb-1">
            {'/// Communication_Channel'}
          </span>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-primary uppercase">
            Iniciar Contato / Proposta
          </h2>
          <p className="text-steel mt-2 max-w-xl text-sm">
            Estou disponível para novas oportunidades, projetos de consultoria técnica e posições CLT/PJ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* CONTACT FORM (8 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-armor border border-borderTech p-6 sm:p-8 clip-tech"
          >
            <div className="flex justify-between items-center border-b border-borderTech pb-4 mb-6 font-mono text-xs">
              <span className="text-tacticalHighlight font-bold uppercase">/// MESSAGE_DISPATCHER</span>
              <span className="text-steel">STATUS: READY</span>
            </div>

            {status === 'success' ? (
              <div className="p-6 bg-emerald-550/10 border border-emerald-500/30 rounded-sm space-y-3 text-center">
                <CheckCircle2 size={40} className="text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold font-mono text-primary uppercase">Mensagem Transmitida com Sucesso!</h3>
                <p className="text-steel text-xs leading-relaxed">
                  Obrigado pelo contato. Retornarei sua mensagem em menos de 24 horas no e-mail informado.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-4 py-2 bg-tacticalHighlight text-white font-mono text-xs font-bold rounded-sm hover:bg-indigo-600 transition-colors"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                
                {errorMessage && (
                  <div className="p-3 bg-rose-950/20 border border-rose-500/40 text-rose-300 rounded-sm flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-steel uppercase mb-1 font-bold">
                      Seu Nome <span className="text-tacticalHighlight">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Ex: Carlos Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-void border border-borderTech px-3 py-2.5 text-primary placeholder-steel/50 rounded-sm focus:border-tacticalHighlight focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-steel uppercase mb-1 font-bold">
                      Seu E-mail <span className="text-tacticalHighlight">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="carlos@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-void border border-borderTech px-3 py-2.5 text-primary placeholder-steel/50 rounded-sm focus:border-tacticalHighlight focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-steel uppercase mb-1 font-bold">
                    Assunto
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Oportunidade / Projeto Fullstack"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-void border border-borderTech px-3 py-2.5 text-primary placeholder-steel/50 rounded-sm focus:border-tacticalHighlight focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-steel uppercase mb-1 font-bold">
                    Mensagem <span className="text-tacticalHighlight">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Descreva brevemente a demanda ou oportunidade..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full bg-void border border-borderTech px-3 py-2.5 text-primary placeholder-steel/50 rounded-sm focus:border-tacticalHighlight focus:outline-none transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 bg-tacticalHighlight text-white font-bold rounded-sm hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 text-xs tracking-wider uppercase disabled:opacity-50"
                  aria-label="Transmitir mensagem de contato"
                >
                  {status === 'submitting' ? (
                    <span>TRANSMITINDO_DADOS...</span>
                  ) : (
                    <>
                      <span>TRANSMITIR MENSAGEM</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* OPERATIONAL METADATA & DIRECT CHANNELS (5 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* SLA & AVAILABILITY PANEL */}
            <div className="bg-armor border border-borderTech p-6 clip-tech space-y-4 font-mono text-xs">
              <span className="text-tacticalHighlight font-bold uppercase block border-b border-borderTech pb-2">
                /// OPERATIONAL_TELEMETRY
              </span>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-tacticalHighlight/10 text-tacticalHighlight rounded-sm">
                  <Globe2 size={16} />
                </div>
                <div>
                  <span className="text-steel uppercase text-[10px] block">FUSO HORÁRIO / LOCAL</span>
                  <span className="text-primary font-bold">BRT (UTC-3) • Brasil</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-sm">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-steel uppercase text-[10px] block">TEMPO MÉDIO DE RESPOSTA</span>
                  <span className="text-primary font-bold">&lt; 24 HORAS ÚTEIS</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-tacticalHighlight/10 text-tacticalHighlight rounded-sm">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping block"></span>
                </div>
                <div>
                  <span className="text-steel uppercase text-[10px] block">DISPONIBILIDADE ATUAL</span>
                  <span className="text-primary font-bold">{siteConfig.status}</span>
                </div>
              </div>
            </div>

            {/* DIRECT LINKS */}
            <div className="bg-armor border border-borderTech p-6 clip-tech space-y-4 font-mono text-xs">
              <span className="text-tacticalHighlight font-bold uppercase block border-b border-borderTech pb-2">
                /// CANAIS_DIRETOS
              </span>

              <a 
                href={siteConfig.links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-void border border-borderTech hover:border-tacticalHighlight transition-colors rounded-sm text-steel hover:text-primary"
                aria-label="Conectar com Jona Ferreira no LinkedIn"
              >
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-tacticalHighlight" />
                  <span>LinkedIn Profile</span>
                </div>
                <span className="text-[10px] text-tacticalHighlight">&rarr;</span>
              </a>

              <a 
                href={siteConfig.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-void border border-borderTech hover:border-tacticalHighlight transition-colors rounded-sm text-steel hover:text-primary"
                aria-label="Acessar repositórios de Jona Ferreira no GitHub"
              >
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-tacticalHighlight" />
                  <span>GitHub Repositories</span>
                </div>
                <span className="text-[10px] text-tacticalHighlight">&rarr;</span>
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
