'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Navbar() {
  const t = useTranslations('Navbar');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('projects'), href: '#projects' },
    { name: t('experience'), href: '#experience' },
    { name: t('about'), href: '#about' },
    { name: t('stack'), href: '#stack' },
    { name: t('contact'), href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-borderTech bg-armor/95 backdrop-blur-md shadow-sm ${
        isScrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        <a href="#" className="font-bold text-xl tracking-tight uppercase flex items-center gap-2">
          <div className="w-3 h-3 bg-tacticalHighlight"></div>
          Jona<span className="text-steel">Ferreira</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-steel hover:text-tacticalHighlight uppercase tracking-wide transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pl-4 border-l border-borderTech flex items-center gap-2">
             <LanguageToggle />
             <ThemeToggle />
          </div>
        </nav>

        <button 
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-void border-b border-borderTech p-6 md:hidden shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-primary font-bold uppercase"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-borderTech flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-steel">{t('changeTheme')}</span>
                  <LanguageToggle />
                </div>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}