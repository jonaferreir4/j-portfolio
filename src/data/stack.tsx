import React from 'react';
import { 
  LayoutTemplate, 
  Database, 
  Container, 
  Server,
  Layers,
  Code,
  Sparkles
} from 'lucide-react';
import { 
  SiDotnet, SiNodedotjs, SiSharp, SiSpring, SiPhp, SiPython,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiShadcnui,
  SiPostgresql, SiMysql, SiRedis, SiPrisma, SiZod, SiVitest,
  SiDocker, SiTraefikproxy, SiJest, SiLinux, SiGit, SiGithubactions,
  SiPusher
} from 'react-icons/si';
import { FaDatabase, FaAws } from 'react-icons/fa';
import { DiMsqlServer } from 'react-icons/di';

export const technologies = [
  {
    category: "Frontend & Interface",
    icon: <LayoutTemplate size={24} />,
    description: "Interfaces reativas, modernização e design systems.",
    tools: [
      { name: "React 19", icon: <SiReact /> },
      { name: "Next.js 16", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind v4", icon: <SiTailwindcss /> },
      { name: "Shadcn UI", icon: <SiShadcnui /> },
      { name: "Zustand / Query", icon: <Code size={14} /> },
      { name: "Zod / RHF", icon: <SiZod /> },
      { name: "WebSockets", icon: <SiPusher /> }
    ]
  },
  {
    category: "Backend & Core",
    icon: <Server size={24} />,
    description: "Arquiteturas robustas, microsserviços e APIs.",
    tools: [
      { name: ".NET 8 / C#", icon: <SiDotnet /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Java Spring", icon: <SiSpring /> },
      { name: "PHP", icon: <SiPhp /> },
      { name: "Python", icon: <SiPython /> },
      { name: "Clean Arch", icon: <Layers size={14} /> },
      { name: "SOLID & DDD", icon: <Code size={14} /> },
      { name: "IA Aplicada", icon: <Sparkles size={14} /> }
    ]
  },
  {
    category: "Data & Persistence",
    icon: <Database size={24} />,
    description: "Modelagem, ORMs, otimização e cache.",
    tools: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "SQL Server", icon: <DiMsqlServer /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "Prisma", icon: <SiPrisma /> },
      { name: "Entity Framework", icon: <SiDotnet /> },
      { name: "TypeORM", icon: <FaDatabase /> }
    ]
  },
  {
    category: "DevOps, Quality & Tests",
    icon: <Container size={24} />,
    description: "Infraestrutura, testes e qualidade.",
    tools: [
      { name: "Docker", icon: <SiDocker /> },
      { name: "Traefik", icon: <SiTraefikproxy /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "CI/CD", icon: <SiGithubactions /> },
      { name: "Vitest / Jest", icon: <SiVitest /> },
      { name: "Linux", icon: <SiLinux /> },
      { name: "Git / GitHub", icon: <SiGit /> }
    ]
  }
];
