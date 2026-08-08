import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/ui/navbar";
import { siteConfig } from "@/data/site-config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isEn
        ? "Jona Ferreira | Fullstack Developer & Software Engineer"
        : "Jona Ferreira | Fullstack Developer & Engenheiro de Software",
      template: "%s | Jona Ferreira"
    },
    description: isEn
      ? "Software Engineering, Clean Architecture, and High-Complexity Web Solutions with .NET Core, Node.js, and React 19."
      : "Engenharia de Software, Arquitetura Limpa e Soluções Web de Alta Complexidade com .NET Core, Node.js e React 19.",
    keywords: [
      "Jona Ferreira",
      "Fullstack Developer",
      "Software Engineer",
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
      locale: isEn ? "en_US" : "pt_BR",
      url: siteUrl,
      title: "Jona Ferreira | Fullstack Developer & Software Engineer",
      description: isEn
        ? "High Performance Software Engineering, Clean Architecture, and Distributed Systems with .NET and React."
        : "Engenharia de Software de Alta Performance, Arquitetura Limpa e Sistemas Distribuídos com .NET e React.",
      siteName: "Jona Ferreira Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: "Jona Ferreira | Fullstack Developer",
      description: "Software Engineering, .NET Core, Node.js, and React 19.",
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
      languages: {
        'pt-BR': '/pt',
        'en-US': '/en'
      }
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

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
    <html lang={locale === 'en' ? 'en' : 'pt-BR'} suppressHydrationWarning>
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-tacticalHighlight focus:text-white focus:font-mono focus:font-bold focus:rounded-sm focus:shadow-xl"
        >
          {locale === 'en' ? 'Skip to main content' : 'Pular para o conteúdo principal'}
        </a>

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
            <Navbar />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
