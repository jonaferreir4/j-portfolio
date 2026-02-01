import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--bg-void)",
        armor: "var(--bg-armor)",
        steel: "var(--text-steel)",
        primary: "var(--text-primary)",
        
        // NOVA COR: Indigo Tático (Roxo Azulado)
        // Substitui o laranja. É mais frio e tecnológico.
        tacticalHighlight: "#3538ee", // Indigo 500
        
        tacticalGreen: "#10b981",
        borderTech: "var(--border-tech)",
      },
      fontFamily: {
        sans: ['var(--font-tech)', 'sans-serif'],
        mono: ['var(--font-code)', 'monospace'],
      },
      backgroundImage: {
        'stripe-pattern': "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(99, 102, 241, 0.05) 10px, rgba(99, 102, 241, 0.05) 20px)",
      },
      animation: {
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;