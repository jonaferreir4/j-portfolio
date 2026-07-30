'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type BreakStatus = 'idle' | 'broken' | 'traveling' | 'fixing' | 'scolding';

interface ClickBreakerContextType {
  status: BreakStatus;
  robotMessage: string;
  impactPoint: { x: number; y: number } | null;
  triggerBreak: (x?: number, y?: number) => void;
}

const ClickBreakerContext = createContext<ClickBreakerContextType>({
  status: 'idle',
  robotMessage: '',
  impactPoint: null,
  triggerBreak: () => {},
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

export function ClickBreakerProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<BreakStatus>('idle');
  const [robotMessage, setRobotMessage] = useState<string>('');
  const [impactPoint, setImpactPoint] = useState<{ x: number; y: number } | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const triggerBreak = useCallback((x?: number, y?: number) => {
    if (cooldown || status !== 'idle') return;

    const clickX = x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    const clickY = y ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    setImpactPoint({ x: clickX, y: clickY });
    setStatus('broken');
    setCooldown(true);

    const randomMsg = SCOLD_MESSAGES[Math.floor(Math.random() * SCOLD_MESSAGES.length)];
    setRobotMessage(randomMsg);

    // Sequence:
    // 0ms: Broken (Net tears & sags)
    // 150ms: Traveling (Micro-bot walks UP along grid column facing away)
    // 1300ms: Fixing (Micro-bot pulls net threads back up)
    // 3000ms: Scolding (Net fixed! Micro-bot turns 180° facing user & scolds)
    // 7000ms: Back to idle (Micro-bot exits)
    // 9000ms: Cooldown over

    setTimeout(() => {
      setStatus('traveling');
    }, 150);

    setTimeout(() => {
      setStatus('fixing');
    }, 1300);

    setTimeout(() => {
      setStatus('scolding');
    }, 3000);

    setTimeout(() => {
      setStatus('idle');
      setImpactPoint(null);
    }, 7000);

    setTimeout(() => {
      setCooldown(false);
    }, 9000);
  }, [cooldown, status]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (status !== 'idle' || cooldown) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, textarea, select, option, label, [role="button"], [data-no-break="true"]'
      );

      if (isInteractive) return;

      triggerBreak(e.clientX, e.clientY);
    };

    // Use capture phase so no stopped propagation blocks the click event!
    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, [status, cooldown, triggerBreak]);

  return (
    <ClickBreakerContext.Provider value={{ status, robotMessage, impactPoint, triggerBreak }}>
      {children}
    </ClickBreakerContext.Provider>
  );
}

export function useClickBreaker() {
  return useContext(ClickBreakerContext);
}
