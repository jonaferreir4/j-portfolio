'use client'
import { motion } from 'framer-motion';
import { 
  Code2, 
  LayoutTemplate, 
  Database, 
  Container, 
  Server, 
  Cpu // Novo ícone para variar
} from 'lucide-react';

const technologies = [
  {
    category: "Backend & Core",
    icon: <Server size={24} />,
    description: "Arquiteturas robustas, microsserviços e APIs.",
    // Mistura estratégica: .NET e Node como principais, Java/PHP/Python como secundários de peso
    tools: [".NET 8", "Node.js", "C#", "Java Spring", "PHP", "Python", "C", "Clean Arch"]
  },
  {
    category: "Frontend & Interface",
    icon: <LayoutTemplate size={24} />,
    description: "Experiências reativas e design systems.",
    tools: ["React", "Next.js", "TypeScript", "Angular", "Tailwind", "Shadcn UI", "Zustand"]
  },
  {
    category: "Data & Persistence",
    icon: <Database size={24} />,
    description: "Modelagem, otimização e cache.",
    tools: ["PostgreSQL", "SQL Server", "MySQL", "Redis", "Entity Framework", "TypeORM"]
  },
  {
    category: "DevOps & Quality",
    icon: <Container size={24} />,
    description: "Infraestrutura, testes e deploy.",
    tools: ["Docker", "Traefik", "AWS SES", "CI/CD", "Jest/TDD", "Linux", "Git"]
  }
];

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
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-void border border-borderTech p-8 hover:border-tacticalHighlight transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-tacticalHighlight/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>

              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="p-3 bg-armor border border-borderTech text-tacticalHighlight rounded-sm">
                  {tech.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">{tech.category}</h3>
                  <p className="text-sm text-steel">{tech.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                {tech.tools.map((tool) => (
                  <span 
                    key={tool} 
                    className="px-3 py-1.5 text-xs font-mono font-medium text-steel bg-armor border border-borderTech rounded-sm group-hover:text-primary group-hover:border-tacticalHighlight/30 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}