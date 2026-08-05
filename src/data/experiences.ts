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

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Kasterweb",
    role: "Desenvolvedor Frontend",
    period: "Fev 2026 - Presente",
    description: "Responsável técnico pela arquitetura e modernização do ecossistema frontend dos dois principais produtos da empresa (React/Next.js). Liderança em decisões técnicas de engenharia, performance, arquitetura Feature-First e integração de IA no workflow.",
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
        name: "Arquitetura Feature-First & Padrões de Engenharia",
        description: [
          "Defini e documentei os padrões de arquitetura Feature-First (Vertical Slice) e as regras de engenharia do time (tipagem estrita, cobertura de testes, convenções e segurança), usadas como referência por todo o time e por IAs no fluxo de desenvolvimento.",
          "Implementei ErrorBoundary nos pontos críticos da aplicação e padronizei autenticação segura (interceptors, cookies SameSite=Strict e Secure).",
          "Corrigi bug crítico de race condition no fluxo de aceite de tickets, implementando navegação por URL (deep-link de modais) replicado em todo o sistema."
        ],
        image: "/images/crm-preview.png"
      },
      {
        name: "Plataforma White-label Multi-tenant (Kastershop)",
        description: [
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
    role: "Desenvolvedor Freelance (Frontend)",
    period: "2025 - 2025",
    description: "Parceria em projeto acadêmico de pós-graduação: desenvolvimento remunerado da solução frontend de e-commerce de produtos químicos. Levantamento de requisitos e implementação alinhada a regras de negócio complexas.",
    tech: ["React", "Vite", "Shadcn UI", "TanStack"]
  },
  {
    id: 4,
    company: "Suporte Verde",
    role: "Freelancer Full Stack (PHP)",
    period: "Ago 2025 - Ago 2025",
    description: "Atuação em múltiplos projetos comerciais (Ourocargo, Yup Pet, Fenix Sindicatura) durante período de férias acadêmicas. Manutenção, evolução e refatoração de sistemas web em produção, implementação de Controle de Acesso (RBAC) com múltiplos perfis e otimização de segurança/performance de código legado.",
    tech: ["PHP", "HTML", "CSS", "SQL"]
  }
];