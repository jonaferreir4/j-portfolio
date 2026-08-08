import { Locale } from './site-config';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  name: string;
  description: string[];
  links?: ProjectLink[];
  image?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  projects?: Project[];
}

export function getExperiences(locale: Locale = 'pt'): Experience[] {
  const isEn = locale === 'en';

  return [
    {
      id: 1,
      company: "Kasterweb",
      role: isEn ? "Frontend Developer / Tech Lead" : "Desenvolvedor Frontend",
      period: isEn ? "Feb 2026 - Present" : "Fev 2026 - Presente",
      description: isEn
        ? "Tech Lead responsible for frontend architecture and modernization across the company's two flagship products (React/Next.js). Leading engineering decisions, performance, Feature-First architecture, and AI integration into development workflows."
        : "Responsável técnico pela arquitetura e modernização do ecossistema frontend dos dois principais produtos da empresa (React/Next.js). Liderança em decisões técnicas de engenharia, performance, arquitetura Feature-First e integração de IA no workflow.",
      tech: [
        "React 19",
        "Next.js 16 (App Router)",
        "TypeScript",
        "Vite",
        "Tailwind CSS v4",
        "Shadcn UI",
        "TanStack Query",
        "Zustand",
        "React Hook Form",
        "Zod",
        "Axios",
        "WebSockets (Pusher / Laravel Echo)"
      ],
      projects: [
        {
          name: isEn ? "Feature-First Architecture & Engineering Standards" : "Arquitetura Feature-First & Padrões de Engenharia",
          description: isEn
            ? [
                "Defined and documented Feature-First (Vertical Slice) architecture standards and engineering rules (strict typing, test coverage, security), used across the engineering team and AI-assisted workflows.",
                "Implemented ErrorBoundaries at critical application points and standardized secure authentication (interceptors, SameSite=Strict and Secure cookies).",
                "Fixed a critical race condition bug in the ticket acceptance flow, implementing URL modal deep-linking replicated across the system."
              ]
            : [
                "Defini e documentei os padrões de arquitetura Feature-First (Vertical Slice) e as regras de engenharia do time (tipagem estrita, cobertura de testes, convenções e segurança), usadas como referência por todo o time e por IAs no fluxo de desenvolvimento.",
                "Implementei ErrorBoundary nos pontos críticos da aplicação e padronizei autenticação segura (interceptors, cookies SameSite=Strict e Secure).",
                "Corrigi bug crítico de race condition no fluxo de aceite de tickets, implementando navegação por URL (deep-link de modais) replicado em todo o sistema."
              ],
          image: "/images/crm-preview.png"
        },
        {
          name: isEn ? "White-label Multi-tenant Platform (Kastershop)" : "Plataforma White-label Multi-tenant (Kastershop)",
          description: isEn
            ? [
                "Architected Kastershop's white-label multi-tenant system in Next.js (App Router), enabling a single codebase to serve multiple tenants via domain resolution.",
                "Implemented dynamic design token injection with color space conversion in OKLCH and client configuration inheritance.",
                "Collaborated actively in designing REST API contracts with Laravel backend (cursor-based pagination and standard response formatting)."
              ]
            : [
                "Arquitetei o sistema white-label multi-tenant do Kastershop em Next.js (App Router), permitindo que um único codebase atenda múltiplos clientes via resolução de tenant por domínio.",
                "Implementei injeção dinâmica de design tokens com conversão de cores no espaço OKLCH e herança de configuração entre clientes.",
                "Colaborei ativamente no desenho de contratos de API REST com backend em Laravel (formato de resposta e paginação cursor-based)."
              ],
          image: "/images/ecommerce-preview.png"
        }
      ]
    },
    {
      id: 3,
      company: "Chemall",
      role: isEn ? "Freelance Frontend Developer" : "Desenvolvedor Freelance (Frontend)",
      period: "2025 - 2025",
      description: isEn
        ? "Partnership in a postgraduate academic project: paid development of the chemical e-commerce frontend solution. Requirements gathering and implementation aligned with complex business logic."
        : "Parceria em projeto acadêmico de pós-graduação: desenvolvimento remunerado da solução frontend de e-commerce de produtos químicos. Levantamento de requisitos e implementação alinhada a regras de negócio complexas.",
      tech: ["React", "Vite", "Shadcn UI", "TanStack"]
    },
    {
      id: 4,
      company: "Suporte Verde",
      role: isEn ? "Full Stack Freelancer (PHP)" : "Freelancer Full Stack (PHP)",
      period: isEn ? "Aug 2025 - Aug 2025" : "Ago 2025 - Ago 2025",
      description: isEn
        ? "Worked on multiple commercial projects (Ourocargo, Yup Pet, Fenix Sindicatura) during academic recess. Maintenance, evolution, and refactoring of production web systems, RBAC access control with multi-role profiles, and legacy code performance optimization."
        : "Atuação em múltiplos projetos comerciais (Ourocargo, Yup Pet, Fenix Sindicatura) durante período de férias acadêmicas. Manutenção, evolução e refatoração de sistemas web em produção, implementação de Controle de Acesso (RBAC) com múltiplos perfis e otimização de segurança/performance de código legado.",
      tech: ["PHP", "HTML", "CSS", "SQL"]
    }
  ];
}

export const experiences = getExperiences('pt');