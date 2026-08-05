export interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  codeName: string;
  description: string;
  repoLink?: string;
  image?: string;
  previewType?: 'kanban' | 'microservice' | 'websocket' | 'proxy' | 'default';
  color: string;
  specs: Record<string, string>;
}

export const projects: ProjectItem[] = [
  {
    id: 1,
    slug: "gestlab",
    title: "GestLab",
    codeName: "THE ORGANIZER",
    description: "Plataforma de gestão visual (Kanban) focada em UX. Utiliza React 19, Zustand e TanStack Query para cache e estado otimizado.",
    repoLink: "https://github.com/jonaferreir4/GestLab",
    previewType: "kanban",
    color: "from-blue-600 to-cyan-500",
    specs: {
      Engine: "React + Vite",
      Transmission: "Zustand",
      Torque: "React Query",
      Chassis: "Styled Components"
    }
  },
  {
    id: 2,
    slug: "email-service",
    title: "Email Service",
    codeName: "CLOUD RUNNER",
    description: "Microsserviço transacional isolado em Java Spring Boot. Alta capacidade de entrega resiliente com AWS SES.",
    repoLink: "https://github.com/jonaferreir4/email-service",
    previewType: "microservice",
    color: "from-orange-500 to-red-600",
    specs: {
      Engine: "Java Spring Boot",
      Turbo: "AWS SES",
      System: "Microservices",
      Build: "Docker"
    }
  },
  {
    id: 3,
    slug: "store-gg",
    title: "Store GG",
    codeName: "REFACTOR",
    description: "E-commerce de jogos focado em Node.js & Next.js App Router. Projeto centrado em refatoração, clean code e eliminando code smells.",
    repoLink: "https://github.com/csvitor-dev/next-store-gaming",
    image: "/images/store-gg.png",
    color: "from-green-500 to-emerald-600",
    specs: {
      Engine: "Node.js / Next.js",
      Structure: "Clean Code",
      UI: "Shadcn UI",
      Container: "Docker"
    }
  },
  {
    id: 4,
    slug: "dialogue",
    title: "Dialogue",
    codeName: "SPEEDSTER",
    description: "Chat em tempo real com baixa latência e WebSockets duplex via .NET 8 SignalR, suportando alta concorrência.",
    repoLink: "https://github.com/jonaferreir4/Dialogue",
    previewType: "websocket",
    color: "from-emerald-500 to-green-600",
    specs: {
      Engine: ".NET / SignalR",
      Transmission: "WebSockets",
      Torque: "Real-time Events",
      Chassis: "Material UI"
    }
  },
  {
    id: 5,
    slug: "smaller",
    title: "Smaller",
    codeName: "INFRA PRO",
    description: "Encurtador de URL de alta velocidade focado em infraestrutura, utilizando Traefik como Proxy Reverso.",
    repoLink: "https://github.com/jonaferreir4/Smaller",
    previewType: "proxy",
    color: "from-slate-600 to-slate-800",
    specs: {
      Engine: "Traefik (Proxy)",
      Container: "Docker Compose",
      Network: "Bridge Mode",
      Language: ".NET Core"
    }
  }
];
