'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type BreakStatus = 
  | 'idle' 
  | 'broken' 
  | 'traveling' 
  | 'fixing' 
  | 'scolding' 
  | 'intro_walking'
  | 'intro_placing' 
  | 'intro_startled' 
  | 'intro_running';

interface ClickBreakerContextType {
  status: BreakStatus;
  robotMessage: string;
  impactPoint: { x: number; y: number; clientX: number; clientY: number } | null;
  isSocialIconsPlaced: boolean;
  isRobotEnabled: boolean;
  toggleRobot: () => void;
  triggerBreak: (x?: number, y?: number) => void;
  triggerTitleBreak: (x?: number, y?: number) => void;
}

const ClickBreakerContext = createContext<ClickBreakerContextType>({
  status: 'idle',
  robotMessage: '',
  impactPoint: null,
  isSocialIconsPlaced: false,
  isRobotEnabled: true,
  toggleRobot: () => {},
  triggerBreak: () => {},
  triggerTitleBreak: () => {},
});

const SCOLD_MESSAGES = [
  "Ei! Não clica assim no meu site! 😠",
  "Você rasgou a malha! Tive que vir arrumar! 🔧",
  "Dá pra parar?! Levei mó tempão pra alinhar os pixels! 😤",
  "Você acha que CSS nasce em árvore?! 🤖⚡",
  "Mais uma dessa e eu mudo o tema pra comic sans! ⚠️",
  "Tô de olho em você... Deixa a malha em paz! 👁️",
  "Qual o seu problema com essa malha?! 🛑",
  "Pronto, arrumei a rede. Agora se comporta! 🛠️",
];

const SCOLD_TITLE_MESSAGES = [
  "Ei! Deixa minhas letras alinhadas! 😠🔤",
  "Você bagunçou o CSS do meu título! 😤🔧",
  "Levei 2 horas pra centralizar esse 'Fullstack'! 🤖⚡",
  "Parou de mover os caracteres! 🛑",
  "Reconstruindo a tipografia... Pronto! ✨",
  "Tirou o 'Developer' do lugar?! Arrumado! 🛠️",
];

export function ClickBreakerProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<BreakStatus>('idle');
  const [robotMessage, setRobotMessage] = useState<string>('');
  const [impactPoint, setImpactPoint] = useState<{ x: number; y: number; clientX: number; clientY: number } | null>(null);
  const [isSocialIconsPlaced, setIsSocialIconsPlaced] = useState(false);
  const [isRobotEnabled, setIsRobotEnabled] = useState(true);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const hasRunIntroRef = useRef(false);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const toggleRobot = useCallback(() => {
    setIsRobotEnabled(prev => !prev);
  }, []);

  // Intro sequence:
  // 1. Icons initially hidden on page.
  // 2. Robot enters from the LEFT along social links row, carrying LinkedIn & GitHub icons under arm.
  // 3. Places icons on page -> reveals real social icons.
  // 4. Sees visitor, gets startled (!, >_<).
  // 5. Runs away back to the LEFT offscreen.
  useEffect(() => {
    if (hasRunIntroRef.current) return;
    hasRunIntroRef.current = true;

    const timer = setTimeout(() => {
      const el = document.getElementById('hero-social-links');
      const sX = window.scrollX;
      const sY = window.scrollY;
      if (el) {
        const rect = el.getBoundingClientRect();
        setImpactPoint({
          x: rect.left + sX,
          y: rect.top - 18 + sY,
          clientX: rect.left,
          clientY: rect.top - 18,
        });
      } else {
        setImpactPoint({
          x: 180 + sX,
          y: 520 + sY,
          clientX: 180,
          clientY: 520,
        });
      }

      setStatus('intro_walking');

      const t1 = setTimeout(() => { setStatus('intro_placing'); }, 1400);
      const tReveal = setTimeout(() => { setIsSocialIconsPlaced(true); }, 2000);
      const t2 = setTimeout(() => { setStatus('intro_startled'); }, 2600);
      const t3 = setTimeout(() => { setStatus('intro_running'); }, 3400);
      const t4 = setTimeout(() => { setStatus('idle'); setImpactPoint(null); }, 4200);

      timeoutsRef.current.push(t1, tReveal, t2, t3, t4);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const triggerBreak = useCallback((x?: number, y?: number) => {
    if (!isRobotEnabled) return;
    clearAllTimeouts();

    const clickX = x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    const clickY = y ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);
    const sX = typeof window !== 'undefined' ? window.scrollX : 0;
    const sY = typeof window !== 'undefined' ? window.scrollY : 0;

    setImpactPoint({
      x: clickX + sX,
      y: clickY + sY,
      clientX: clickX,
      clientY: clickY,
    });
    setStatus('broken');

    const randomMsg = SCOLD_MESSAGES[Math.floor(Math.random() * SCOLD_MESSAGES.length)];
    setRobotMessage(randomMsg);

    const t1 = setTimeout(() => { setStatus('traveling'); }, 150);
    const t2 = setTimeout(() => { setStatus('fixing'); }, 1300);
    const t3 = setTimeout(() => { setStatus('scolding'); }, 3000);
    const t4 = setTimeout(() => { setStatus('idle'); setImpactPoint(null); }, 7000);

    timeoutsRef.current.push(t1, t2, t3, t4);
  }, [clearAllTimeouts, isRobotEnabled]);

  const triggerTitleBreak = useCallback((x?: number, y?: number) => {
    if (!isRobotEnabled) return;
    clearAllTimeouts();

    const clickX = x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    const clickY = y ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);
    const sX = typeof window !== 'undefined' ? window.scrollX : 0;
    const sY = typeof window !== 'undefined' ? window.scrollY : 0;

    setImpactPoint({
      x: clickX + sX,
      y: clickY + sY,
      clientX: clickX,
      clientY: clickY,
    });

    const randomMsg = SCOLD_TITLE_MESSAGES[Math.floor(Math.random() * SCOLD_TITLE_MESSAGES.length)];
    setRobotMessage(randomMsg);

    if (status === 'traveling' || status === 'fixing' || status === 'scolding') {
      setStatus('fixing');

      const t1 = setTimeout(() => { setStatus('scolding'); }, 1800);
      const t2 = setTimeout(() => { setStatus('idle'); setImpactPoint(null); }, 6000);
      timeoutsRef.current.push(t1, t2);
    } else {
      setStatus('broken');

      const t1 = setTimeout(() => { setStatus('traveling'); }, 150);
      const t2 = setTimeout(() => { setStatus('fixing'); }, 1000);
      const t3 = setTimeout(() => { setStatus('scolding'); }, 2600);
      const t4 = setTimeout(() => { setStatus('idle'); setImpactPoint(null); }, 6500);
      timeoutsRef.current.push(t1, t2, t3, t4);
    }
  }, [clearAllTimeouts, isRobotEnabled, status]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (status !== 'idle' || !isRobotEnabled) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const shouldIgnore = (el: HTMLElement | null): boolean => {
        if (!el || el === document.body || el === document.documentElement) return false;

        if (el.matches('a, button, input, textarea, select, option, label, [role="button"], [role="dialog"], [data-no-break="true"], .draggable-letter, .card')) {
          return true;
        }

        const className = typeof el.className === 'string' ? el.className : '';
        if (
          className.includes('bg-armor') ||
          className.includes('bg-void') ||
          className.includes('clip-tech') ||
          className.includes('backdrop-blur')
        ) {
          if (!className.includes('bg-transparent')) {
            return true;
          }
        }

        return shouldIgnore(el.parentElement);
      };

      if (shouldIgnore(target)) return;

      triggerBreak(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, [status, isRobotEnabled, triggerBreak]);

  return (
    <ClickBreakerContext.Provider value={{ status, robotMessage, impactPoint, isSocialIconsPlaced, isRobotEnabled, toggleRobot, triggerBreak, triggerTitleBreak }}>
      {children}
    </ClickBreakerContext.Provider>
  );
}

export function useClickBreaker() {
  return useContext(ClickBreakerContext);
}
