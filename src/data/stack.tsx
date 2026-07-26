import React from 'react';
import { 
  LayoutTemplate, 
  Database, 
  Container, 
  Server,
  Layers,
  Code
} from 'lucide-react';
import { 
  SiDotnet, SiNodedotjs, SiSharp, SiSpring, SiPhp, SiPython, SiC,
  SiReact, SiNextdotjs, SiTypescript, SiAngular, SiTailwindcss, SiShadcnui,
  SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiTraefikproxy, SiJest, SiLinux, SiGit, SiGithubactions
} from 'react-icons/si';
import { FaDatabase, FaAws } from 'react-icons/fa';
import { DiMsqlServer } from 'react-icons/di';

export const technologies = [
  {
    category: "Backend & Core",
    icon: <Server size={24} />,
    description: "Arquiteturas robustas, microsserviços e APIs.",
    tools: [
      { name: ".NET 8", icon: <SiDotnet /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "C#", icon: <SiSharp /> },
      { name: "Java Spring", icon: <SiSpring /> },
      { name: "PHP", icon: <SiPhp /> },
      { name: "Python", icon: <SiPython /> },
      { name: "C", icon: <SiC /> },
      { name: "Clean Arch", icon: <Layers size={14} /> }
    ]
  },
  {
    category: "Frontend & Interface",
    icon: <LayoutTemplate size={24} />,
    description: "Experiências reativas e design systems.",
    tools: [
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Angular", icon: <SiAngular /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "Shadcn UI", icon: <SiShadcnui /> },
      { name: "Zustand", icon: <Code size={14} /> }
    ]
  },
  {
    category: "Data & Persistence",
    icon: <Database size={24} />,
    description: "Modelagem, otimização e cache.",
    tools: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "SQL Server", icon: <DiMsqlServer /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "Entity Framework", icon: <SiDotnet /> },
      { name: "TypeORM", icon: <FaDatabase /> }
    ]
  },
  {
    category: "DevOps & Quality",
    icon: <Container size={24} />,
    description: "Infraestrutura, testes e deploy.",
    tools: [
      { name: "Docker", icon: <SiDocker /> },
      { name: "Traefik", icon: <SiTraefikproxy /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "CI/CD", icon: <SiGithubactions /> },
      { name: "Jest/TDD", icon: <SiJest /> },
      { name: "Linux", icon: <SiLinux /> },
      { name: "Git", icon: <SiGit /> }
    ]
  }
];
