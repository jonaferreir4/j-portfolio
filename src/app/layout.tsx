import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
// 1. Importar a Navbar
import { Navbar } from "@/components/ui/navbar";

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
      <body className={`${rajdhani.variable} ${mono.variable} font-sans bg-void text-primary antialiased overflow-x-hidden selection:bg-tacticalHighlight selection:text-white`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          
          <div className="tactical-grid"></div>
          
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}