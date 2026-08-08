import { Locale } from './site-config';

export interface CaseStudy {
  slug: string;
  projectId: number;
  title: string;
  codeName: string;
  role: string;
  period: string;
  category: string;
  summary: string;
  repoLink?: string;
  demoLink?: string;
  specs: Record<string, string>;
  problem: {
    context: string;
    challenges: string[];
  };
  architecture: {
    overview: string;
    keyDecisions: {
      title: string;
      description: string;
    }[];
  };
  tradeoffs: {
    decision: string;
    reason: string;
    downside: string;
  }[];
  results: {
    metric: string;
    label: string;
    detail: string;
  }[];
  diagram: {
    type: 'kanban' | 'microservice' | 'websocket' | 'proxy' | 'ecommerce' | 'events';
    nodes: { label: string; sub?: string; highlight?: boolean }[];
    flowDescription: string;
  };
  stack: string[];
}

export function getCaseStudies(locale: Locale = 'pt'): Record<string, CaseStudy> {
  const isEn = locale === 'en';

  return {
    gestlab: {
      slug: "gestlab",
      projectId: 1,
      title: "GestLab",
      codeName: "THE ORGANIZER",
      role: isEn ? "Tech Lead & Frontend Lead" : "Líder Técnico & Frontend Lead",
      period: isEn ? "2024 - Present" : "2024 - Presente",
      category: isEn ? "Visual Management & UX" : "Gestão Visual & UX",
      summary: isEn
        ? "Real-time task management platform (Kanban) built for the Learning Lab ecosystem at UFC, focusing on reactivity, predictable state management, and fluid UX."
        : "Plataforma de gestão de atividades em tempo real (Kanban) desenvolvida para o ecossistema Learning Lab na UFC, focando em reatividade, controle de estado previsível e UX fluida.",
      repoLink: "https://github.com/jonaferreir4/GestLab",
      specs: {
        Engine: "React 19 + Vite",
        Transmission: "Zustand",
        Torque: "TanStack React Query",
        Chassis: "Styled Components / Tailwind"
      },
      problem: {
        context: isEn
          ? "The research laboratory needed a unified task manager for multiple scholarship holders and researchers, where task state toggling generated state inconsistencies and unnecessary re-renders in legacy interfaces."
          : "O laboratório de pesquisa necessitava de um gerenciador de tarefas unificado para múltiplos bolsistas e pesquisadores, onde a alternância de estados das tarefas gerava inconsistência e re-renders desnecessários em telas legadas.",
        challenges: isEn
          ? [
              "State synchronization between Drag and Drop actions and asynchronous server mutations.",
              "Preventing layout shifts (CLS) during board loading with large volumes of items.",
              "Requirement for optimistic UI cache with transparent rollback on network failures."
            ]
          : [
              "Sincronização de estado entre arrastar e soltar (Drag and Drop) e mutações assíncronas no servidor.",
              "Prevenção de layout shifts (CLS) durante o carregamento de quadros com grande volume de itens.",
              "Necessidade de cache otimista com rollback transparente em caso de falha de conexão."
            ]
      },
      architecture: {
        overview: isEn
          ? "Adopted a Feature-First (Vertical Slices) architecture, decoupling presentation logic from data managers using Zustand for local UI state and React Query for server state."
          : "Adotou-se uma arquitetura baseada em Feature-First (Vertical Slices), desacoplando lógica de apresentação de gerenciadores de dados com Zustand para estado local de UI e React Query para estado de servidor.",
        keyDecisions: [
          {
            title: isEn ? "Optimistic Mutation with Instant Rollback" : "Mutação Otimista com Rollback Instantâneo",
            description: isEn
              ? "Utilized React Query to instantly update the UI when moving a card on the Kanban board, triggering the HTTP request in the background and performing a rollback in < 50ms if the server returns an error."
              : "Utilizamos o React Query para atualizar a UI imediatamente ao mover um card no Kanban, disparando a requisição HTTP em segundo plano e realizando rollback em < 50ms se o servidor retornar erro."
          },
          {
            title: isEn ? "Zustand for Modal & Drag States" : "Zustand para Modal & Drag States",
            description: isEn
              ? "Isolated drag state and editing modals in lightweight Zustand stores, eliminating re-renders across parent component trees."
              : "Isolou-se o estado de arrasto e modais de edição em stores Zustand leves, eliminando re-renders na árvore de componentes pai."
          }
        ]
      },
      tradeoffs: [
        {
          decision: isEn ? "React Query over centralized global Redux state" : "Uso de React Query em vez de estado global centralizado em Redux",
          reason: isEn ? "Reduced boilerplate by 60% and guaranteed automatic cache invalidation via query tags." : "Reduziu o boilerplate em 60% e garantiu invalidação automática de cache via tags de consulta.",
          downside: isEn ? "Requires strict discipline in managing Query Keys to avoid duplication." : "Exige disciplina estrita no gerenciamento de chaves de query (Query Keys) para evitar duplicação."
        }
      ],
      results: [
        { metric: "< 50ms", label: isEn ? "Optimistic Feedback" : "Feedback Otimista", detail: isEn ? "Visual response time on Kanban actions" : "Tempo de resposta visual nas ações de Kanban" },
        { metric: "-60%", label: isEn ? "Boilerplate Reduction" : "Redução de Boilerplate", detail: isEn ? "Compared to traditional Redux implementations" : "Comparado a soluções tradicionais com Redux" },
        { metric: "100%", label: isEn ? "Predictability" : "Previsibilidade", detail: isEn ? "Prevention of server race conditions" : "Prevenção de race conditions no servidor" }
      ],
      diagram: {
        type: "kanban",
        nodes: [
          { label: "UI Kanban Board", sub: "React 19 Drag & Drop", highlight: true },
          { label: "Zustand Store", sub: "Transient UI State" },
          { label: "TanStack Query", sub: "Optimistic Cache Layer" },
          { label: "REST API Gateway", sub: "Backend Validation" }
        ],
        flowDescription: isEn
          ? "Drag & Drop UI -> Direct Zustand state update -> Optimistic TanStack Query Cache -> Async REST Sync -> Automated Rollback on error"
          : "Drag & Drop UI -> Direct Zustand state update -> Optimistic TanStack Query Cache -> Async REST Sync -> Automated Rollback on error"
      },
      stack: ["React", "TypeScript", "Vite", "Zustand", "React Query", "Tailwind CSS"]
    },

    "email-service": {
      slug: "email-service",
      projectId: 2,
      title: "Email Service",
      codeName: "CLOUD RUNNER",
      role: isEn ? "Backend Architect & Java Dev" : "Backend Architect & Java Dev",
      period: "2024",
      category: isEn ? "Asynchronous Microservices" : "Microsserviços Assíncronos",
      summary: isEn
        ? "Isolated transactional messaging microservice in Java Spring Boot, capable of processing high-concurrency email dispatches integrated with AWS SES."
        : "Microsserviço de mensageria transacional isolado em Java Spring Boot, capaz de processar disparos de e-mail de alta concorrência integrando com AWS SES.",
      repoLink: "https://github.com/jonaferreir4/email-service",
      specs: {
        Engine: "Java 17 / Spring Boot",
        Turbo: "AWS SES SDK v2",
        System: "Microservices Architecture",
        Build: "Docker & Containerization"
      },
      problem: {
        context: isEn
          ? "Monolithic applications suffered main thread blocks during synchronous email sending (welcome, password reset, alerts), causing high user-facing request latency."
          : "Aplicações monolíticas sofriam com bloqueios na thread principal durante o envio síncrono de e-mails transacionais (boas-vindas, redefinição de senha e alertas), gerando alta latência nas requisições do usuário final.",
        challenges: isEn
          ? [
              "Isolate messaging responsibilities so email dispatch failures do not break the main app workflow.",
              "Ensure resilient automatic retry with exponential backoff for temporary AWS SES outages.",
              "Facilitate containerization and cloud deployment via Docker."
            ]
          : [
              "Isolar a responsabilidade de mensageria de forma que falhas de e-mail não afetem o fluxo principal da aplicação.",
              "Garantir retry automático resiliente com exponencial backoff para falhas temporárias da AWS SES.",
              "Facilitar a conteinerização e deploy em qualquer nuvem pública via Docker."
            ]
      },
      architecture: {
        overview: isEn
          ? "Clean Architecture in layers (Clean Architecture in Java Spring Boot), exposing async REST endpoints and decoupling email providers from core business logic."
          : "Arquitetura limpa em camadas (Clean Architecture em Java Spring Boot), expondo endpoints REST assíncronos e desacoplando o provedor de e-mail da lógica de negócios central.",
        keyDecisions: [
          {
            title: isEn ? "Clean Architecture with Strategy Pattern" : "Clean Architecture com Strategy Pattern",
            description: isEn
              ? "Abstraction of `EmailSenderGateway` interface, allowing seamless switching between AWS SES, SendGrid, or SMTP without changing business rules."
              : "Abstração da interface `EmailSenderGateway`, permitindo alternar entre AWS SES, SendGrid ou SMTP sem alterar uma única linha de regra de negócio."
          },
          {
            title: isEn ? "Spring Event Processors & Virtual Threads" : "Spring Event Processors & Virtual Threads",
            description: isEn
              ? "Decoupled concurrency for instant request consumption and immediate HTTP client release."
              : "Utilização de concorrência desacoplada para consumo imediato de solicitações e liberação imediata do cliente HTTP."
          }
        ]
      },
      tradeoffs: [
        {
          decision: isEn ? "Dedicated Microservice vs Async execution inside monolith" : "Microsserviço dedicado vs Envio assíncrono interno na aplicação principal",
          reason: isEn ? "Provides total resource isolation and independent horizontal scaling during dispatch spikes." : "Fornece isolamento total de recursos e escala horizontal independente em picos de disparo.",
          downside: isEn ? "Adds operational overhead of maintaining an extra application and monitoring distributed logs." : "Adiciona a complexidade de manter uma aplicação extra e monitorar logs distribuídos."
        }
      ],
      results: [
        { metric: "99.9%", label: isEn ? "Delivery Uptime" : "Uptime de Entrega", detail: isEn ? "Isolation against client application downtime" : "Isolamento contra quedas da aplicação cliente" },
        { metric: "< 15ms", label: isEn ? "Acceptance Latency" : "Latência de Aceitação", detail: isEn ? "Time to enqueue and acknowledge HTTP request" : "Tempo para enfileirar e responder o cliente HTTP" },
        { metric: "Zero", label: isEn ? "Thread Blocking" : "Bloqueio de Thread", detail: isEn ? "Asynchronous decoupling via Spring Async" : "Desacoplamento assíncrono via Spring Async" }
      ],
      diagram: {
        type: "microservice",
        nodes: [
          { label: "Client Monolith / App", sub: "HTTP Async Dispatcher" },
          { label: "Java Spring Boot Microservice", sub: "Clean Architecture", highlight: true },
          { label: "Email Gateway Strategy", sub: "Failover Engine" },
          { label: "AWS SES / Cloud", sub: "Transactional Email API" }
        ],
        flowDescription: isEn
          ? "Async HTTP Request -> Spring Controller -> EmailGateway Strategy -> AWS SES SDK -> Instant Status Response & Async Delivery"
          : "Async HTTP Request -> Spring Controller -> EmailGateway Strategy -> AWS SES SDK -> Instant Status Response & Async Delivery"
      },
      stack: ["Java 17", "Spring Boot", "AWS SES", "Docker", "REST API", "Maven"]
    },

    "store-gg": {
      slug: "store-gg",
      projectId: 3,
      title: "Store GG",
      codeName: "REFACTOR",
      role: isEn ? "Fullstack Eng. & Code Reviewer" : "Fullstack Eng. & Code Reviewer",
      period: "2024",
      category: isEn ? "Refactoring & E-commerce" : "Refatoração & E-commerce",
      summary: isEn
        ? "High-performance gaming e-commerce in Next.js and Node.js. Project focused on eliminating code smells, clean architecture, and modern UI with Shadcn."
        : "E-commerce de jogos de alta performance em Next.js e Node.js. Projeto totalmente focado na eliminação de code smells, arquitetura limpa e UI moderna com Shadcn.",
      repoLink: "https://github.com/csvitor-dev/next-store-gaming",
      specs: {
        Engine: "Node.js / Next.js (App Router)",
        Structure: "Clean Code & SOLID",
        UI: "Shadcn UI + Tailwind",
        Container: "Docker Compose"
      },
      problem: {
        context: isEn
          ? "The original codebase suffered severe coupling between UI components and database calls, leading to logic duplication and slow rendering on product pages."
          : "O projeto original apresentava acoplamento severo entre componentes de UI e chamadas de banco de dados, propiciando duplicação de lógica e carregamentos lentos em telas de produto.",
        challenges: isEn
          ? [
              "Refactor Next.js structure without breaking existing cart and checkout features.",
              "Migrate unnecessary client components to Next.js Server Components, shrinking JS bundle sent to browser.",
              "Implement a reusable design system with Shadcn UI."
            ]
          : [
              "Refatorar a estrutura do Next.js sem quebrar funcionalidades existentes de carrinho e checkout.",
              "Migrar componentes de cliente desnecessários para Next.js Server Components, reduzindo o bundle JS transportado ao navegador.",
              "Implementar design system reutilizável com Shadcn UI."
            ]
      },
      architecture: {
        overview: isEn
          ? "Structural refactoring based on Server-Driven Data Fetching with Next.js App Router, server-side caching, and isolating interactive client components."
          : "Refatoração estrutural baseada em Server-Driven Data Fetching com Next.js App Router, caching inteligente no servidor e isolamento de componentes de cliente interativos.",
        keyDecisions: [
          {
            title: isEn ? "Massive Adoption of React Server Components (RSC)" : "Adopção Massiva de React Server Components (RSC)",
            description: isEn
              ? "Catalog data fetching executed on the server, significantly reducing client-side JS bundle."
              : "Busca de dados de catálogo executada no servidor, reduzindo o Javascript do lado do cliente enviado ao browser."
          },
          {
            title: isEn ? "Standardization of UI Components" : "Padronização de Componentes UI",
            description: isEn
              ? "Replaced inline CSS and arbitrary styling with unified design tokens via Shadcn UI and Tailwind CSS."
              : "Substituição de CSS inline e estilizações arbitrárias por tokens unificados via Shadcn UI e Tailwind CSS."
          }
        ]
      },
      tradeoffs: [
        {
          decision: isEn ? "Server Components for most product pages" : "Uso de Server Components para a maioria das páginas de produto",
          reason: isEn ? "Drastically improved SEO and LCP metrics across the store." : "Melhorou drasticamente o SEO e o LCP da loja.",
          downside: isEn ? "Requires strict management of boundaries between Server and Client Components ('use client')." : "Exige gerenciamento rigoroso dos limites entre Server e Client Component ('use client')."
        }
      ],
      results: [
        { metric: "-45%", label: "JS Bundle Size", detail: isEn ? "Reduction in JavaScript delivered to client" : "Redução no Javascript enviado ao cliente" },
        { metric: "95+", label: "Lighthouse Score", detail: isEn ? "Post-refactor technical performance score" : "Nota de performance técnica pós-refatoração" },
        { metric: "Zero", label: "Code Smells", detail: isEn ? "Elimination of duplication and coupling" : "Eliminação de duplicações e acoplamentos severos" }
      ],
      diagram: {
        type: "ecommerce",
        nodes: [
          { label: "Next.js App Router", sub: "React Server Components", highlight: true },
          { label: "Shadcn UI Token System", sub: "Zero-CLS Visual Layer" },
          { label: "Node.js Data Layer", sub: "Cached Server Queries" },
          { label: "Dockerized Node API", sub: "Isolated Micro-environment" }
        ],
        flowDescription: "Client Route -> Next.js RSC Engine -> Cached Query -> Rendered Static HTML + Hydrated Interactive Elements"
      },
      stack: ["Next.js", "Node.js", "TypeScript", "Shadcn UI", "Tailwind CSS", "Docker"]
    },

    dialogue: {
      slug: "dialogue",
      projectId: 4,
      title: "Dialogue",
      codeName: "SPEEDSTER",
      role: isEn ? "Fullstack Developer (.NET Lead)" : "Fullstack Developer (.NET Lead)",
      period: "2024",
      category: isEn ? "Real-time Messaging System" : "Real-time Messaging System",
      summary: isEn
        ? "Ultra-fast real-time communication platform using .NET Core and SignalR with low-latency duplex WebSockets."
        : "Plataforma de comunicação em tempo real de altíssima velocidade utilizando .NET Core e SignalR com protocolo WebSockets duplex de baixa latência.",
      repoLink: "https://github.com/jonaferreir4/Dialogue",
      specs: {
        Engine: ".NET Core 8 / SignalR",
        Transmission: "WebSockets Duplex",
        Torque: "Real-time Event Hubs",
        Chassis: "Material UI / React"
      },
      problem: {
        context: isEn
          ? "Conventional HTTP Polling architectures consume excess bandwidth and introduce unacceptable delays for instant messaging and real-time alerts."
          : "Sistemas convencionais baseados em HTTP Polling consomem largura de banda excessiva e introduzem atrasos inaceitáveis para mensagens instantâneas e notificações em tempo real.",
        challenges: isEn
          ? [
              "Maintain thousands of open persistent connections with low server memory footprint.",
              "Ensure automatic reconnection while preserving message state during network flickers.",
              "Structure strongly typed SignalR Hubs to eliminate contract mismatches between C# and React."
            ]
          : [
              "Manter milhares de conexões persistentes abertas com baixo consumo de memória RAM no servidor.",
              "Garantir reconexão automática com preservação do estado de mensagens em caso de oscilações de rede.",
              "Estruturar Hubs no SignalR com tipagem forte para evitar erros de contrato entre C# e React."
            ]
      },
      architecture: {
        overview: isEn
          ? "Event-driven architecture using .NET 8 SignalR Hubs over duplex WebSockets with automatic Long Polling fallback."
          : "Arquitetura orientada a eventos usando .NET 8 SignalR Hubs com transporte duplex WebSockets e fallback automático para Long Polling se necessário.",
        keyDecisions: [
          {
            title: isEn ? "Strongly Typed Hubs in .NET" : "Strongly Typed Hubs no .NET",
            description: isEn
              ? "C# interface definitions for broadcast contracts (`IChatClient`), preventing method signature typos."
              : "Definição de interfaces C# de contrato de eventos transmitidos (`IChatClient`), prevenindo erros de digitação em métodos transmitidos."
          },
          {
            title: isEn ? "Client-Side State Management" : "Gerenciamento de Estado no Cliente",
            description: isEn
              ? "In-memory message buffer with async reconciliation upon reconnecting to server."
              : "Buffer de mensagens na memória com reconciliação assíncrona ao restabelecer sinal com o servidor."
          }
        ]
      },
      tradeoffs: [
        {
          decision: isEn ? "SignalR over pure native WebSockets" : "SignalR sobre WebSockets nativos puros sem abstração",
          reason: isEn ? "SignalR handles automatic fallback, connection auto-retry, and group broadcasting out of the box." : "SignalR oferece fallback automático (Server-Sent Events / Polling), reconexão embutida e grupos de transmissão out-of-the-box.",
          downside: isEn ? "Ties the backend implementation to the ASP.NET SignalR protocol ecosystem." : "Vincula o backend ao ecossistema e protocolo do ASP.NET SignalR."
        }
      ],
      results: [
        { metric: "< 10ms", label: isEn ? "Message Latency" : "Latência Mensagem", detail: isEn ? "Time from client dispatch to peer receipt" : "Tempo entre disparo no cliente e recebimento pelos pares" },
        { metric: "100%", label: "Full Duplex", detail: isEn ? "Simultaneous two-way communication" : "Comunicação simultânea bidirecional" },
        { metric: "Auto", label: isEn ? "Resilient Reconnect" : "Reconexão Resiliente", detail: isEn ? "Transparent chat session recovery" : "Restabelecimento transparente de sessão de chat" }
      ],
      diagram: {
        type: "websocket",
        nodes: [
          { label: "React Frontend Client", sub: "SignalR Client SDK" },
          { label: "SignalR Event Hub", sub: ".NET 8 Core Engine", highlight: true },
          { label: "Group / Room Manager", sub: "In-Memory Session Hub" },
          { label: "Connected Clients", sub: "Duplex WebSockets Pipeline" }
        ],
        flowDescription: "Client Action -> SignalR Hub -> Typed Interface Event -> Real-time Duplex Push to All Group Subscribers"
      },
      stack: [".NET 8", "C#", "SignalR", "WebSockets", "React", "TypeScript"]
    },

    smaller: {
      slug: "smaller",
      projectId: 5,
      title: "Smaller",
      codeName: "INFRA PRO",
      role: isEn ? "DevOps & Backend Engineer" : "DevOps & Backend Engineer",
      period: "2024",
      category: isEn ? "Infrastructure & Reverse Proxy" : "Infraestrutura & Proxy Reverso",
      summary: isEn
        ? "Ultra-fast URL shortener built with focus on modern infrastructure, Docker Compose orchestration, and Traefik Reverse Proxy."
        : "Encurtador de URLs de alta velocidade projetado com foco em arquitetura de infraestrutura moderna, orquestração com Docker Compose e Proxy Reverso Traefik.",
      repoLink: "https://github.com/jonaferreir4/Smaller",
      specs: {
        Engine: "Traefik Reverse Proxy",
        Container: "Docker Compose Infrastructure",
        Network: "Bridge Mode Isolated Network",
        Language: ".NET Core API"
      },
      problem: {
        context: isEn
          ? "Production URL redirect services demand minimal latency on link resolution and edge security against malicious requests or exposed non-TLS routes."
          : "Serviços de redirecionamento de URL em produção exigem latência mínima na resolução de links e proteção de segurança na borda contra requisições maliciosas ou rotas expostas sem TLS.",
        challenges: isEn
          ? [
              "Implement dynamic routing and auto TLS termination without touching application code.",
              "Maintain short code to target URL resolution with O(1) time complexity.",
              "Guarantee a 100% reproducible containerized environment via Docker Compose on any Linux host."
            ]
          : [
              "Implementar roteamento dinâmico e terminação TLS automática sem modificar o código da aplicação.",
              "Manter a resolução de código curto para URL original com custo computacional de O(1).",
              "Garantir ambiente 100% reproduzível via Docker Compose em qualquer servidor Linux."
            ]
      },
      architecture: {
        overview: isEn
          ? "Containerized infrastructure orchestrated via Docker Compose with Traefik acting as Ingress/Reverse Proxy at the edge."
          : "Infraestrutura em contêineres orquestrada via Docker Compose com Traefik atuando como Ingress/Proxy Reverso na borda, gerenciando roteamento por domínios e load balancing.",
        keyDecisions: [
          {
            title: isEn ? "Traefik as Edge Gateway" : "Traefik como Edge Gateway",
            description: isEn
              ? "Automatic container discovery via Docker Compose labels, eliminating manual NGINX config files."
              : "Descoberta automática de contêineres por labels no Docker Compose, eliminando a configuração manual de arquivos de NGINX."
          },
          {
            title: isEn ? ".NET Core In-Memory Caching" : ".NET Core com Caching na Memória",
            description: isEn
              ? "HTTP 301/302 redirect resolution served directly from key-value memory cache."
              : "Resolução de redirecionamento HTTP 301/302 com resposta ultra-rápida direto de cache de chave-valor."
          }
        ]
      },
      tradeoffs: [
        {
          decision: isEn ? "HTTP 301 (Permanent) vs 302 (Temporary) Redirect" : "Redirecionamento HTTP 301 (Permanente) vs 302 (Temporário)",
          reason: isEn ? "301 caches destination URL in browser, reducing server traffic on repeat clicks." : "O 301 faz o navegador salvar o destino final no cache do cliente, reduzindo o tráfego do servidor em cliques repetidos.",
          downside: isEn ? "Prevents precise metric tracking for recurring clicks from the same browser." : "Impede o rastreamento de métricas precisas de cliques recorrentes no mesmo navegador."
        }
      ],
      results: [
        { metric: "< 5ms", label: isEn ? "Link Resolution" : "Resolução de Link", detail: isEn ? "Response time for HTTP redirect" : "Tempo de resposta para redirecionamento HTTP" },
        { metric: "1 Command", label: isEn ? "Instant Deploy" : "Deploy Instantâneo", detail: isEn ? "Full orchestration via docker-compose up" : "Orquestração completa via docker-compose up" },
        { metric: "Zero", label: isEn ? "Deploy Downtime" : "Downtime em Deploy", detail: isEn ? "Rolling updates supported by Traefik" : "Rolling updates suportados pelo Traefik" }
      ],
      diagram: {
        type: "proxy",
        nodes: [
          { label: "Internet Visitor", sub: "HTTP / HTTPS Request" },
          { label: "Traefik Reverse Proxy", sub: "Dynamic Edge Gateway", highlight: true },
          { label: "Docker Bridge Network", sub: "Isolated VPC Container" },
          { label: ".NET Core URL API", sub: "O(1) Hash Resolver" }
        ],
        flowDescription: "Incoming Web Request -> Traefik Edge -> Label Routing -> .NET URL Resolver -> Instant 301 Redirect"
      },
      stack: ["Traefik", "Docker", "Docker Compose", ".NET Core", "C#", "Linux"]
    },

    myevents: {
      slug: "myevents",
      projectId: 6,
      title: "MyEvents",
      codeName: "EVENT ENGINE",
      role: isEn ? "Backend Architect & .NET Developer" : "Backend Architect & .NET Developer",
      period: "2025",
      category: isEn ? "Academic Event Management" : "Gerenciamento de Eventos Acadêmicos",
      summary: isEn
        ? "Full academic event management platform: event creation, registration control, and automated certificate generation with JWT authentication and Clean Architecture."
        : "Plataforma para gerenciamento completo de eventos acadêmicos, incluindo criação de eventos, controle de inscrições e geração/emissão automatizada de certificados com autenticação JWT e Clean Architecture.",
      repoLink: "https://github.com/jonaferreir4/MyEvents",
      specs: {
        Engine: "C# / .NET Core",
        Structure: "Clean Architecture & Unit of Work",
        Validation: "FluentValidation + FluentMigration",
        Database: "PostgreSQL / Entity Framework"
      },
      problem: {
        context: isEn
          ? "Academic event organizations frequently face registration bottlenecks, activity capacity limits, and slow valid certificate issuance for participants."
          : "Organização de eventos acadêmicos frequentemente enfrenta gargalos no credenciamento, controle de vagas por atividade e morosidade na emissão de certificados válidos para os participantes.",
        challenges: isEn
          ? [
              "Ensure concurrency-safe registration limits per workshop/lecture.",
              "Implement automated, verifiable certificate issuance with token validation.",
              "Maintain highly testable domain code decoupled from database persistence."
            ]
          : [
              "Garantir concorrência segura no limite de inscrições por oficina/palestra.",
              "Implementar emissão automatizada e autêntica de certificados com token de verificação.",
              "Manter código altamente testável desacoplando regras de negócio do banco de dados."
            ]
      },
      architecture: {
        overview: isEn
          ? "Developed in C# ASP.NET Core following Clean Architecture principles (Domain, Application, Infrastructure, WebAPI), using Entity Framework Core with PostgreSQL."
          : "Desenvolvido em C# ASP.NET Core seguindo os princípios de Clean Architecture (Domain, Application, Infrastructure, WebAPI), utilizando Entity Framework Core com PostgreSQL, FluentValidation para validações de contrato e FluentMigration para versionamento de esquema.",
        keyDecisions: [
          {
            title: "Clean Architecture + Unit of Work",
            description: isEn
              ? "Decoupling domain entities and business logic from persistence, guaranteeing atomic transactions during registration."
              : "Desacoplamento das entidades de domínio e regras de negócio da camada de persistência, garantindo atomicidade em transações de inscrição."
          },
          {
            title: "FluentValidation & Exception Middleware",
            description: isEn
              ? "Centralized data inconsistency handling before hitting application services, returning standardized responses."
              : "Centralização do tratamento de inconsistências de dados antes de atingir os serviços da aplicação, retornando respostas padronizadas."
          }
        ]
      },
      tradeoffs: [
        {
          decision: isEn ? "Layered Clean Architecture vs Direct controller CRUD" : "Clean Architecture em camadas vs Desenvolvimento em controller direto (CRUD simples)",
          reason: isEn ? "Guarantees the event system can scale to microservices or payment gateways without rewriting business domain." : "Embora adicione mais arquivos e interfaces, garante que o sistema de eventos possa evoluir para microsserviços ou suporte a pagamento sem reescrever o domínio.",
          downside: isEn ? "Slightly increases initial boilerplate code for simple entities." : "Ligeiro aumento de código boilerplate inicial para entidades simples."
        }
      ],
      results: [
        { metric: "100%", label: isEn ? "Automation" : "Automação", detail: isEn ? "Instant PDF certificate generation" : "Geração instantânea de certificados em PDF" },
        { metric: "Zero", label: isEn ? "Duplicate Registrations" : "Inscrições Duplicadas", detail: isEn ? "Atomic transactions with Unit of Work" : "Transações atômicas com Unit of Work" },
        { metric: "Clean", label: isEn ? "Architecture" : "Arquitetura", detail: isEn ? "Isolated, highly testable layers" : "Camadas isoladas e altamente testáveis" }
      ],
      diagram: {
        type: "events",
        nodes: [
          { label: "WebAPI / REST Gateway", sub: "JWT Auth & Endpoints" },
          { label: "Application Layer", sub: "FluentValidation & Handlers", highlight: true },
          { label: "Domain & Unit of Work", sub: "Business Rules & Transaction Scope" },
          { label: "PostgreSQL Database", sub: "EntityFramework Core + Migrations" }
        ],
        flowDescription: "HTTP Request -> JWT Auth Filter -> FluentValidation -> Unit of Work Transaction -> PostgreSQL Commit -> Certificate Generation"
      },
      stack: ["C#", ".NET Core", "ASP.NET Core", "EntityFramework", "PostgreSQL", "JWT", "Clean Architecture", "FluentValidation"]
    }
  };
}

export const caseStudies = getCaseStudies('pt');
