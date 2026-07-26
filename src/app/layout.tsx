import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/ui/navbar";
import { TacticalGrid } from "@/components/ui/tactical-grid";

const rajdhani = Rajdhani({ 
  weight: ['400', '500', '600', '700'], 
  subsets: ["latin"], 
  variable: "--font-tech" 
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-code" 
});

export const metadata: Metadata = {
  title: "Jona Ferreira | Dev",
  description: "Engenharia de Software e Soluções de Alta Complexidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${rajdhani.variable} ${mono.variable} font-sans bg-void text-primary antialiased overflow-x-hidden selection:bg-tacticalHighlight selection:text-white`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          
          <TacticalGrid />
          
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}