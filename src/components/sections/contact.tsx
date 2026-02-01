'use client'
import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-void">
      <div className="container max-w-4xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-armor border border-borderTech p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <MessageSquare size={200} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Vamos construir algo juntos?
          </h2>
          <p className="text-steel text-lg mb-8 max-w-xl mx-auto">
            Estou sempre aberto a novos desafios e parcerias. Se você tem um projeto em mente ou precisa de um especialista em .NET e React, entre em contato.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:jonaferreira.dev@gmail.com" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-tacticalHighlight text-white font-bold rounded-sm hover:bg-indigo-600 transition-colors shadow-lg hover:shadow-indigo-500/25"
            >
              Entre em contato
            </a>
            
            <a 
              href="https://linkedin.com/in/jonaferreira" 
              target="_blank"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-void border border-borderTech text-primary font-bold rounded-sm hover:border-tacticalHighlight transition-colors"
            >
              Conectar no LinkedIn
            </a>
          </div>
        
        </motion.div>
      </div>
    </section>
  )
}