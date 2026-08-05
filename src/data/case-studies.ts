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

export const caseStudies: Record<string, CaseStudy> = {
  gestlab: {
    slug: "gestlab",
    projectId: 1,
    title: "GestLab",
    codeName: "THE ORGANIZER",
    role: "Líder Técnico & Frontend Lead",
    period: "2024 - Presente",
    category: "Gestão Visual & UX",
    summary: "Plataforma de gestão de atividades em tempo real (Kanban) desenvolvida para o ecossistema Learning Lab na UFC, focando em reatividade, controle de estado previsível e UX fluida.",
    repoLink: "https://github.com/jonaferreir4/GestLab",
    specs: {
      Engine: "React 19 + Vite",
      Transmission: "Zustand",
      Torque: "TanStack React Query",
      Chassis: "Styled Components / Tailwind"
    },
    problem: {
      context: "O laboratório de pesquisa necessitava de um gerenciador de tarefas unificado para múltiplos bolsistas e pesquisadores, onde a alternância de estados das tarefas gerava inconsistência e re-renders desnecessários em telas legadas.",
      challenges: [
        "Sincronização de estado entre arrastar e soltar (Drag and Drop) e mutações assíncronas no servidor.",
        "Prevenção de layout shifts (CLS) durante o carregamento de quadros com grande volume de itens.",
        "Necessidade de cache otimista com rollback transparente em caso de falha de conexão."
      ]
    },
    architecture: {
      overview: "Adotou-se uma arquitetura baseada em Feature-First (Vertical Slices), desacoplando lógica de apresentação de gerenciadores de dados com Zustand para estado local de UI e React Query para estado de servidor.",
      keyDecisions: [
        {
          title: "Mutação Otimista com Rollback Instantâneo",
          description: "Utilizamos o React Query para atualizar a UI imediatamente ao mover um card no Kanban, disparando a requisição HTTP em segundo plano e realizando rollback em < 50ms se o servidor retornar erro."
        },
        {
          title: "Zustand para Modal & Drag States",
          description: "Isolou-se o estado de arrasto e modais de edição em stores Zustand leves, eliminando re-renders na árvore de componentes pai."
        }
      ]
    },
    tradeoffs: [
      {
        decision: "Uso de React Query em vez de estado global centralizado em Redux",
        reason: "Reduziu o boilerplate em 60% e garantiu invalidação automática de cache via tags de consulta.",
        downside: "Exige disciplina estrita no gerenciamento de chaves de query (Query Keys) para evitar duplicação."
      }
    ],
    results: [
      { metric: "< 50ms", label: "Feedback Otimista", detail: "Tempo de resposta visual nas ações de Kanban" },
      { metric: "-60%", label: "Redução de Boilerplate", detail: "Comparado a soluções tradicionais com Redux" },
      { metric: "100%", label: "Previsibilidade", detail: "Prevenção de race conditions no servidor" }
    ],
    diagram: {
      type: "kanban",
      nodes: [
        { label: "UI Kanban Board", sub: "React 19 Drag & Drop", highlight: true },
        { label: "Zustand Store", sub: "Transient UI State" },
        { label: "TanStack Query", sub: "Optimistic Cache Layer" },
        { label: "REST API Gateway", sub: "Backend Validation" }
      ],
      flowDescription: "Drag & Drop UI -> Direct Zustand state update -> Optimistic TanStack Query Cache -> Async REST Sync -> Automated Rollback on error"
    },
    stack: ["React", "TypeScript", "Vite", "Zustand", "React Query", "Tailwind CSS"]
  },

  "email-service": {
    slug: "email-service",
    projectId: 2,
    title: "Email Service",
    codeName: "CLOUD RUNNER",
    role: "Backend Architect & Java Dev",
    period: "2024",
    category: "Microsserviços Assíncronos",
    summary: "Microsserviço de mensageria transacional isolado em Java Spring Boot, capaz de processar disparos de e-mail de alta concorrência integrando com AWS SES.",
    repoLink: "https://github.com/jonaferreir4/email-service",
    specs: {
      Engine: "Java 17 / Spring Boot",
      Turbo: "AWS SES SDK v2",
      System: "Microservices Architecture",
      Build: "Docker & Containerization"
    },
    problem: {
      context: "Aplicações monolíticas sofriam com bloqueios na thread principal durante o envio síncrono de e-mails transacionais (boas-vindas, redefinição de senha e alertas), gerando alta latência nas requisições do usuário final.",
      challenges: [
        "Isolar a responsabilidade de mensageria de forma que falhas de e-mail não afetem o fluxo principal da aplicação.",
        "Garantir retry automático resiliente com exponencial backoff para falhas temporárias da AWS SES.",
        "Facilitar a conteinerização e deploy em qualquer nuvem pública via Docker."
      ]
    },
    architecture: {
      overview: "Arquitetura limpa em camadas (Clean Architecture em Java Spring Boot), expondo endpoints REST assíncronos e desacoplando o provedor de e-mail da lógica de negócios central.",
      keyDecisions: [
        {
          title: "Clean Architecture com Strategy Pattern",
          description: "Abstração da interface `EmailSenderGateway`, permitindo alternar entre AWS SES, SendGrid ou SMTP sem alterar uma única linha de regra de negócio."
        },
        {
          title: "Spring Event Processors & Virtual Threads",
          description: "Utilização de concorrência desacoplada para consumo imediato de solicitações e liberação imediata do cliente HTTP."
        }
      ]
    },
    tradeoffs: [
      {
        decision: "Microsserviço dedicado vs Envio assíncrono interno na aplicação principal",
        reason: "Fornece isolamento total de recursos e escala horizontal independente em picos de disparo.",
        downside: "Adiciona a complexidade de manter uma aplicação extra e monitorar logs distribuídos."
      }
    ],
    results: [
      { metric: "99.9%", label: "Uptime de Entrega", detail: "Isolamento contra quedas da aplicação cliente" },
      { metric: "< 15ms", label: "Latência de Aceitação", detail: "Tempo para enfileirar e responder o cliente HTTP" },
      { metric: "Zero", label: "Bloqueio de Thread", detail: "Desacoplamento assíncrono via Spring Async" }
    ],
    diagram: {
      type: "microservice",
      nodes: [
        { label: "Client Monolith / App", sub: "HTTP Async Dispatcher" },
        { label: "Java Spring Boot Microservice", sub: "Clean Architecture", highlight: true },
        { label: "Email Gateway Strategy", sub: "Failover Engine" },
        { label: "AWS SES / Cloud", sub: "Transactional Email API" }
      ],
      flowDescription: "Async HTTP Request -> Spring Controller -> EmailGateway Strategy -> AWS SES SDK -> Instant Status Response & Async Delivery"
    },
    stack: ["Java 17", "Spring Boot", "AWS SES", "Docker", "REST API", "Maven"]
  },

  "store-gg": {
    slug: "store-gg",
    projectId: 3,
    title: "Store GG",
    codeName: "REFACTOR",
    role: "Fullstack Eng. & Code Reviewer",
    period: "2024",
    category: "Refatoração & E-commerce",
    summary: "E-commerce de jogos de alta performance em Next.js e Node.js. Projeto totalmente focado na eliminação de code smells, arquitetura limpa e UI moderna com Shadcn.",
    repoLink: "https://github.com/csvitor-dev/next-store-gaming",
    specs: {
      Engine: "Node.js / Next.js (App Router)",
      Structure: "Clean Code & SOLID",
      UI: "Shadcn UI + Tailwind",
      Container: "Docker Compose"
    },
    problem: {
      context: "O projeto original apresentava acoplamento severo entre componentes de UI e chamadas de banco de dados, propiciando duplicação de lógica e carregamentos lentos em telas de produto.",
      challenges: [
        "Refatorar a estrutura do Next.js sem quebrar funcionalidades existentes de carrinho e checkout.",
        "Migrar componentes de cliente desnecessários para Next.js Server Components, reduzindo o bundle JS transportado ao navegador.",
        "Implementar design system reutilizável com Shadcn UI."
      ]
    },
    architecture: {
      overview: "Refatoração estrutural baseada em Server-Driven Data Fetching com Next.js App Router, caching inteligente no servidor e isolamento de componentes de cliente interativos.",
      keyDecisions: [
        {
          title: "Adopção Massiva de React Server Components (RSC)",
          description: "Busca de dados de catálogo executada no servidor, reduzindo o Javascript do lado do cliente enviado ao browser."
        },
        {
          title: "Padronização de Componentes UI",
          description: "Substituição de CSS inline e estilizações arbitrárias por tokens unificados via Shadcn UI e Tailwind CSS."
        }
      ]
    },
    tradeoffs: [
      {
        decision: "Uso de Server Components para a maioria das páginas de produto",
        reason: "Melhorou drasticamente o SEO e o LCP da loja.",
        downside: "Exige gerenciamento rigoroso dos limites entre Server e Client Component ('use client')."
      }
    ],
    results: [
      { metric: "-45%", label: "Tamanho de Bundle JS", detail: "Redução no Javascript enviado ao cliente" },
      { metric: "95+", label: "Lighthouse Performance", detail: "Nota de performance técnica pós-refatoração" },
      { metric: "Zero", label: "Code Smells", detail: "Eliminação de duplicações e acoplamentos severos" }
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
    role: "Fullstack Developer (.NET Lead)",
    period: "2024",
    category: "Real-time Messaging System",
    summary: "Plataforma de comunicação em tempo real de altíssima velocidade utilizando .NET Core e SignalR com protocolo WebSockets duplex de baixa latência.",
    repoLink: "https://github.com/jonaferreir4/Dialogue",
    specs: {
      Engine: ".NET Core 8 / SignalR",
      Transmission: "WebSockets Duplex",
      Torque: "Real-time Event Hubs",
      Chassis: "Material UI / React"
    },
    problem: {
      context: "Sistemas convencionais baseados em HTTP Polling consomem largura de banda excessiva e introduzem atrasos inaceitáveis para mensagens instantâneas e notificações em tempo real.",
      challenges: [
        "Manter milhares de conexões persistentes abertas com baixo consumo de memória RAM no servidor.",
        "Garantir reconexão automática com preservação do estado de mensagens em caso de oscilações de rede.",
        "Estruturar Hubs no SignalR com tipagem forte para evitar erros de contrato entre C# e React."
      ]
    },
    architecture: {
      overview: "Arquitetura orientada a eventos usando .NET 8 SignalR Hubs com transporte duplex WebSockets e fallback automático para Long Polling se necessário.",
      keyDecisions: [
        {
          title: "Strongly Typed Hubs no .NET",
          description: "Definição de interfaces C# de contrato de eventos transmitidos (`IChatClient`), prevenindo erros de digitação em métodos transmitidos."
        },
        {
          title: "Gerenciamento de Estado no Cliente",
          description: "Buffer de mensagens na memória com reconciliação assíncrona ao restabelecer sinal com o servidor."
        }
      ]
    },
    tradeoffs: [
      {
        decision: "SignalR sobre WebSockets nativos puros sem abstração",
        reason: "SignalR oferece fallback automático (Server-Sent Events / Polling), reconexão embutida e grupos de transmissão out-of-the-box.",
        downside: "Vincula o backend ao ecossistema e protocolo do ASP.NET SignalR."
      }
    ],
    results: [
      { metric: "< 10ms", label: "Latência Mensagem", detail: "Tempo entre disparo no cliente e recebimento pelos pares" },
      { metric: "100%", label: "Full Duplex", detail: "Comunicação simultânea bidirecional" },
      { metric: "Auto", label: "Reconexão Resiliente", detail: "Restabelecimento transparente de sessão de chat" }
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
    role: "DevOps & Backend Engineer",
    period: "2024",
    category: "Infraestrutura & Proxy Reverso",
    summary: "Encurtador de URLs de alta velocidade projetado com foco em arquitetura de infraestrutura moderna, orquestração com Docker Compose e Proxy Reverso Traefik.",
    repoLink: "https://github.com/jonaferreir4/Smaller",
    specs: {
      Engine: "Traefik Reverse Proxy",
      Container: "Docker Compose Infrastructure",
      Network: "Bridge Mode Isolated Network",
      Language: ".NET Core API"
    },
    problem: {
      context: "Serviços de redirecionamento de URL em produção exigem latência mínima na resolução de links e proteção de segurança na borda contra requisições maliciosas ou rotas expostas sem TLS.",
      challenges: [
        "Implementar roteamento dinâmico e terminação TLS automática sem modificar o código da aplicação.",
        "Manter a resolução de código curto para URL original com custo computacional de O(1).",
        "Garantir ambiente 100% reproduzível via Docker Compose em qualquer servidor Linux."
      ]
    },
    architecture: {
      overview: "Infraestrutura em contêineres orquestrada via Docker Compose com Traefik atuando como Ingress/Proxy Reverso na borda, gerenciando roteamento por domínios e load balancing.",
      keyDecisions: [
        {
          title: "Traefik como Edge Gateway",
          description: "Descoberta automática de contêineres por labels no Docker Compose, eliminando a configuração manual de arquivos de NGINX."
        },
        {
          title: ".NET Core com Caching na Memória",
          description: "Resolução de redirecionamento HTTP 301/302 com resposta ultra-rápida direto de cache de chave-valor."
        }
      ]
    },
    tradeoffs: [
      {
        decision: "Redirecionamento HTTP 301 (Permanente) vs 302 (Temporário)",
        reason: "O 301 faz o navegador salvar o destino final no cache do cliente, reduzindo o tráfego do servidor em cliques repetidos.",
        downside: "Impede o rastreamento de métricas precisas de cliques recorrentes no mesmo navegador."
      }
    ],
    results: [
      { metric: "< 5ms", label: "Resolução de Link", detail: "Tempo de resposta para redirecionamento HTTP" },
      { metric: "1 Command", label: "Deploy Instantâneo", detail: "Orquestração completa via docker-compose up" },
      { metric: "Zero", label: "Downtime em Deploy", detail: "Rolling updates suportados pelo Traefik" }
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
    role: "Backend Architect & .NET Developer",
    period: "2025",
    category: "Gerenciamento de Eventos Acadêmicos",
    summary: "Plataforma para gerenciamento completo de eventos acadêmicos, incluindo criação de eventos, controle de inscrições e geração/emissão automatizada de certificados com autenticação JWT e Clean Architecture.",
    repoLink: "https://github.com/jonaferreir4/MyEvents",
    specs: {
      Engine: "C# / .NET Core",
      Structure: "Clean Architecture & Unit of Work",
      Validation: "FluentValidation + FluentMigration",
      Database: "PostgreSQL / Entity Framework"
    },
    problem: {
      context: "Organização de eventos acadêmicos frequentemente enfrenta gargalos no credenciamento, controle de vagas por atividade e morosidade na emissão de certificados válidos para os participantes.",
      challenges: [
        "Garantir concorrência segura no limite de inscrições por oficina/palestra.",
        "Implementar emissão automatizada e autêntica de certificados com token de verificação.",
        "Manter código altamente testável desacoplando regras de negócio do banco de dados."
      ]
    },
    architecture: {
      overview: "Desenvolvido em C# ASP.NET Core seguindo os princípios de Clean Architecture (Domain, Application, Infrastructure, WebAPI), utilizando Entity Framework Core com PostgreSQL, FluentValidation para validações de contrato e FluentMigration para versionamento de esquema.",
      keyDecisions: [
        {
          title: "Clean Architecture + Unit of Work",
          description: "Desacoplamento das entidades de domínio e regras de negócio da camada de persistência, garantindo atomicidade em transações de inscrição."
        },
        {
          title: "FluentValidation & Middleware de Exceção",
          description: "Centralização do tratamento de inconsistências de dados antes de atingir os serviços da aplicação, retornando respostas padronizadas."
        }
      ]
    },
    tradeoffs: [
      {
        decision: "Clean Architecture em camadas vs Desenvolvimento em controller direto (CRUD simples)",
        reason: "Embora adicione mais arquivos e interfaces, garante que o sistema de eventos possa evoluir para microsserviços ou suporte a pagamento sem reescrever o domínio.",
        downside: "Ligeiro aumento de código boilerplate inicial para entidades simples."
      }
    ],
    results: [
      { metric: "100%", label: "Automação", detail: "Geração instantânea de certificados em PDF" },
      { metric: "Zero", label: "Inscrições Duplicadas", detail: "Transações atômicas com Unit of Work" },
      { metric: "Clean", label: "Arquitetura", detail: "Camadas isoladas e altamente testáveis" }
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
