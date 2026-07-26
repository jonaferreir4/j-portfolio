'use client'
import { motion } from 'framer-motion';
import { technologies } from '@/data/stack';

export default function Stack() {
  return (
    <section id="stack" className="py-24 px-6 bg-armor border-b border-borderTech">
      <div className="container max-w-6xl mx-auto">
        
        <div className="mb-16 text-center md:text-left">
          <span className="font-mono text-tacticalHighlight text-sm font-bold uppercase tracking-widest mb-2 block">
            Arsenal Técnico
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary max-w-2xl">
            Stack Tecnológica & Ferramentas
          </h2>
          <p className="text-steel mt-4 max-w-2xl">
            Um ecossistema versátil. Do desenvolvimento moderno com <strong>.NET e React</strong> à manutenção crítica de sistemas legados em <strong>PHP</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="group h-full bg-void border border-borderTech p-8 hover:border-tacticalHighlight transition-colors duration-200 relative overflow-hidden">
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-armor border border-borderTech text-tacticalHighlight rounded-sm group-hover:bg-tacticalHighlight group-hover:text-void transition-colors duration-200">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary group-hover:text-tacticalHighlight transition-colors duration-200">{tech.category}</h3>
                    <p className="text-sm text-steel">{tech.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                  {tech.tools.map((tool) => (
                    <span 
                      key={tool.name} 
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-steel bg-armor border border-borderTech rounded-sm group-hover:text-primary hover:border-tacticalHighlight hover:bg-tacticalHighlight hover:text-void transition-colors duration-200"
                    >
                      {tool.icon}
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
