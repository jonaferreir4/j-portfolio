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
    period: "Fev 2024 - Presente",
    description: "Atuo na arquitetura e desenvolvimento de aplicações web escaláveis de ponta a ponta, liderando decisões técnicas focadas em performance, clean architecture e experiência do usuário.",
    tech: ["React", "Next.js", "TypeScript", "Vite", "Shadcn UI", "Tailwind CSS", "React Query", "Zustand"],
    projects: [
      {
        name: "Plataforma CRM e Atendimento Multicanal",
        description: [
          "Arquitetei o frontend do zero seguindo o padrão Feature-First (Vertical Slice Architecture).",
          "Construí interface reativa e de alta performance utilizando React 19, TypeScript e Zustand.",
          "Implementei integrações em tempo real para chat e filas via WebSockets (Laravel Echo + Pusher).",
          "Padronizei formulários e mutações com TanStack Query, React Hook Form e Zod."
        ],
        image: "/images/crm-preview.png"
      },
      {
        name: "Plataforma E-commerce Multi-tenant",
        description: [
          "Desenvolvi uma plataforma e-commerce baseada em Next.js (App Router) capaz de servir múltiplos clientes de setores como segurança contra incêndio e suprimentos industriais a partir de um único repositório.",
          "Implementei arquitetura de theming dinâmico e gestão de design tokens para suporte a personalização de identidade visual por tenant.",
          "Implementei Server Components para otimizações de SEO e performance."
        ],
        image: "/images/ecommerce-preview.png"
      }
    ]
  },

  {
    id: 3,
    company: "Chemall",
    role: "Desenvolvedor Freelance",
    period: "12/2025 - 12/2025",
    description: "Desenvolvimento de solução frontend sob medida para cliente. Foco no levantamento de requisitos e implementação de funcionalidades estritamente alinhadas às regras de negócio da empresa.",
    tech: ["React", "Vite", "Shadcn UI", "TanStack"]
  },
  {
    id: 4,
    company: "Suporte Verde",
    role: "Freelancer Full Stack (PHP)",
    period: "08/2025 - 08/2025",
    description: "Atuação em múltiplos projetos comerciais (Ourocargo, Yup Pet, Fenix Sindicatura). Responsável pela manutenção, evolução e refatoração de sistemas web em produção. Entregas principais incluem a implementação de regras de negócio complexas, Controle de Acesso (RBAC) com múltiplos perfis de usuário e refatoração de código legado para melhoria de segurança e performance.",
    tech: ["PHP", "HTML", "CSS", "SQL"]
  }
];