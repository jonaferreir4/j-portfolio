'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 px-3 py-1.5 border border-borderTech bg-armor text-primary font-mono uppercase text-xs hover:border-tacticalHighlight hover:text-tacticalHighlight transition-all duration-300 group rounded-sm shadow-sm"
      aria-label="Toggle Theme"
    >
      <div className="relative w-4 h-4 overflow-hidden text-steel group-hover:text-tacticalHighlight transition-colors">
        <motion.div
            initial={false}
            animate={{ y: theme === "dark" ? 20 : 0 }}
            className="absolute inset-0"
        >
            <Sun size={16} />
        </motion.div>
        
        <motion.div
            initial={false}
            animate={{ y: theme === "dark" ? 0 : -20 }}
            className="absolute inset-0"
        >
            <Moon size={16} />
        </motion.div>
      </div>
      
      <span className="font-bold tracking-wide">
        {theme === "dark" ? "DARK" : "LIGHT"}
      </span>
    </button>
  );
}