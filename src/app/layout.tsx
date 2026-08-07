import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/ui/navbar";
import { siteConfig } from "@/data/site-config";

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-tech"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jonaferreira.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jona Ferreira | Fullstack Developer & Software Engineer",
    template: "%s | Jona Ferreira"
  },
  description: "Engenharia de Software, Arquitetura Limpa e Soluções Web de Alta Complexiade com .NET Core, Node.js e React 19.",
  keywords: [
    "Jona Ferreira",
    "Desenvolvedor Fullstack",
    "Engenheiro de Software",
    ".NET Core",
    "C#",
    "React 19",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Kasterweb",
    "UFC Software Engineering"
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: "Jona Ferreira | Fullstack Developer & Software Engineer",
    description: "Engenharia de Software de Alta Performance, Arquitetura Limpa e Sistemas Distribuídos com .NET e React.",
    siteName: "Jona Ferreira Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jona Ferreira | Fullstack Developer",
    description: "Engenharia de Software, .NET Core, Node.js e React 19.",
    creator: "@jonaferreir4"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Fullstack Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Kasterweb',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidade Federal do Ceará (UFC)',
    },
    url: siteUrl,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    knowsAbout: [
      'Software Engineering',
      '.NET Core',
      'C#',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Clean Architecture',
      'Microservices',
      'WebSockets'
    ],
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${rajdhani.variable} ${mono.variable} font-sans bg-void text-primary antialiased overflow-x-hidden selection:bg-tacticalHighlight selection:text-white`}
      >
        {/* A11Y SKIP LINK */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-tacticalHighlight focus:text-white focus:font-mono focus:font-bold focus:rounded-sm focus:shadow-xl"
        >
          Pular para o conteúdo principal
        </a>

        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}