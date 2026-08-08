import { Locale } from './site-config';

export interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  codeName: string;
  description: string;
  repoLink?: string;
  image?: string;
  previewType?: 'kanban' | 'microservice' | 'websocket' | 'proxy' | 'events' | 'default';
  color: string;
  specs: Record<string, string>;
}

export function getProjects(locale: Locale = 'pt'): ProjectItem[] {
  const isEn = locale === 'en';

  return [
    {
      id: 1,
      slug: "gestlab",
      title: "GestLab",
      codeName: "THE ORGANIZER",
      description: isEn
        ? "Visual management platform (Kanban) focused on UX. Built with React 19, Zustand, and TanStack Query for optimized cache and state management."
        : "Plataforma de gestão visual (Kanban) focada em UX. Utiliza React 19, Zustand e TanStack Query para cache e estado otimizado.",
      repoLink: "https://github.com/jonaferreir4/GestLab",
      previewType: "kanban",
      color: "from-blue-600 to-cyan-500",
      specs: {
        Engine: "React + Vite",
        Transmission: "Zustand",
        Torque: "React Query",
        Chassis: "Shadcn UI"
      }
    },
    {
      id: 2,
      slug: "email-service",
      title: "Email Service",
      codeName: "CLOUD RUNNER",
      description: isEn
        ? "Isolated transactional messaging microservice in Java Spring Boot. Resilient delivery capabilities integrated with AWS SES."
        : "Microsserviço transacional isolado em Java Spring Boot. Alta capacidade de entrega resiliente com AWS SES.",
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
      description: isEn
        ? "Gaming e-commerce focused on Node.js & Next.js App Router. Project focused on refactoring, clean code, and removing code smells."
        : "E-commerce de jogos focado em Node.js & Next.js App Router. Projeto centrado em refatoração, clean code e eliminando code smells.",
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
      description: isEn
        ? "Real-time low-latency chat via duplex WebSockets using .NET 8 SignalR, supporting high concurrency."
        : "Chat em tempo real com baixa latência e WebSockets duplex via .NET 8 SignalR, suportando alta concorrência.",
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
      description: isEn
        ? "High-speed URL shortener focused on infrastructure, using Traefik as Reverse Proxy."
        : "Encurtador de URL de alta velocidade focado em infraestrutura, utilizando Traefik como Proxy Reverso.",
      repoLink: "https://github.com/jonaferreir4/Smaller",
      previewType: "proxy",
      color: "from-slate-600 to-slate-800",
      specs: {
        Engine: "Traefik (Proxy)",
        Container: "Docker Compose",
        Network: "Bridge Mode",
        Language: ".NET Core"
      }
    },
    {
      id: 6,
      slug: "myevents",
      title: "MyEvents",
      codeName: "EVENT ENGINE",
      description: isEn
        ? "Academic event management platform: event creation, registrations, and automated certificate issuing with Clean Architecture and JWT in C#/.NET."
        : "Sistema para gerenciamento de eventos acadêmicos: criação, inscrições e emissão automatizada de certificados com Clean Architecture e JWT em C#/.NET.",
      repoLink: "https://github.com/jonaferreir4/MyEvents",
      previewType: "events",
      color: "from-purple-600 to-indigo-600",
      specs: {
        Engine: "C# / .NET Core",
        Structure: "Clean Architecture",
        ORM: "EntityFramework",
        Database: "PostgreSQL"
      }
    }
  ];
}

export const projects = getProjects('pt');
