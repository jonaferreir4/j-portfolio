'use client'
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { experiences } from '@/data/experiences';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-void border-b border-borderTech relative">
      <div className="container max-w-4xl mx-auto">
        
        <div className="mb-16">
          <span className="font-mono text-tacticalHighlight text-xs uppercase tracking-widest mb-1 block">/// Work_History</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Experiência Profissional</h2>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-borderTech">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-borderTech bg-armor text-steel group-hover:text-tacticalHighlight group-hover:border-tacticalHighlight transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <Terminal size={18} />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-armor border border-borderTech p-6 hover:border-tacticalHighlight transition-colors clip-tech relative"
              >
                <div className="absolute top-5 -left-3 md:group-odd:-left-3 md:group-even:-right-3 md:group-even:left-auto w-3 h-[1px] bg-borderTech group-hover:bg-tacticalHighlight transition-colors hidden md:block"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="text-xl font-bold text-primary uppercase">{exp.company}</h3>
                    <span className="font-mono text-xs text-tacticalHighlight bg-void px-2 py-1 border border-borderTech/50 w-fit">
                        {exp.period}
                    </span>
                </div>
                
                <h4 className="text-sm font-bold text-steel mb-4 uppercase tracking-wide">
                    {exp.role}
                </h4>
                
                <p className="text-steel text-sm leading-relaxed mb-6">
                    {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-borderTech/50">
                    {exp.tech.map((item) => (
                        <span key={item} className="text-[10px] font-mono font-bold uppercase tracking-wider text-steel/70 bg-void border border-borderTech px-2 py-1">
                            {item}
                        </span>
                    ))}
                </div>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}