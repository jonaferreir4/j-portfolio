export type Locale = 'pt' | 'en';

export const siteConfig = {
  name: "Jona Ferreira",
  links: {
    email: "jonaferreira.dev@gmail.com",
    github: "https://github.com/jonaferreir4",
    linkedin: "https://linkedin.com/in/jonaferreira",
    cvPt: "/docs/curriculo.pdf",
    cvEn: "/docs/curriculo.pdf"
  },
  github: {
    username: "jonaferreir4",
    pinnedRepos: [
      "GestLab",
      "MyEvents",
      "Dialogue",
      "email-service",
      "Smaller",
      "portfolio-jona"
    ]
  }
};

export function getSiteConfig(locale: Locale = 'pt') {
  const isEn = locale === 'en';

  return {
    ...siteConfig,
    role: isEn ? "Fullstack Developer" : "Desenvolvedor Fullstack",
    titleBio: isEn ? "Software &\nProblem Solving" : "Desenvolvimento &\nResolução de Problemas",
    heroBio: isEn
      ? "Hi, I'm **Jona Ferreira**. Fullstack Developer building scalable web applications with **React 19**, **Next.js 16**, **TypeScript**, **.NET Core**, and **Node.js**. At **Kasterweb**, I develop the frontend of production products using Feature-First architecture. Beyond that, I build backend systems with .NET Core, Clean Architecture and Docker."
      : "Olá, sou **Jona Ferreira**. Desenvolvedor Fullstack criando aplicações web escaláveis com **React 19**, **Next.js 16**, **TypeScript**, **.NET Core** e **Node.js**. Na **Kasterweb**, atuo no frontend dos produtos em produção com arquitetura Feature-First. Além disso, construo sistemas backend com .NET Core, Clean Architecture e Docker.",
    aboutBio: isEn
      ? [
          "Software Engineering at **UFC** (graduating Dec/2026). Fullstack Developer with a strong focus on software architecture and delivering real production value.",
          "At **Kasterweb**, I develop the frontend of production products with **React 19, Next.js (App Router)**, and **Tailwind CSS v4**, applying Feature-First (Vertical Slice) architecture and building advanced solutions like white-label multi-tenant platforms with OKLCH design tokens and real-time integrations.",
          "Solid backend foundation in **C# / .NET Core, Node.js (Express & REST APIs)**, **Clean Architecture, WebSockets, and SQL**, built through personal projects and academic work. Lead developer of the **GestLab** extension project at UFC. Continuous integration of AI tools (GitHub Copilot, ChatGPT, Claude) for workflow optimization, code reviews, and test coverage."
        ]
      : [
          "Engenharia de Software na **UFC** (formação Dez/2026), atuo como Desenvolvedor Fullstack com forte foco em arquitetura de software e entrega de valor real em produção.",
          "Na **Kasterweb**, desenvolvo o frontend dos produtos em produção com **React 19, Next.js (App Router)** e **Tailwind CSS v4**, aplicando o padrão Feature-First (Vertical Slice) e construindo soluções avançadas como plataformas *white-label multi-tenant* com tokens em space OKLCH e integrações em tempo real.",
          "Possuo sólida base técnica em backend com **C# / .NET Core, Node.js (Express & APIs REST)**, **Clean Architecture, WebSockets e SQL**, construída em projetos pessoais e trabalhos acadêmicos. Desenvolvedor principal do projeto de extensão **GestLab** na UFC. Integração contínua de ferramentas de IA (GitHub Copilot, ChatGPT, Claude) para otimização de workflow, análise de código e cobertura de testes."
        ],
    status: isEn ? "Open to Work" : "Open to Work",
    cvLink: isEn ? siteConfig.links.cvEn : siteConfig.links.cvPt
  };
}
