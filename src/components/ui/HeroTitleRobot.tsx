'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSiteConfig } from '@/data/site-config';
import { useClickBreaker } from '@/providers/ClickBreakerProvider';
import { useLocale } from 'next-intl';

interface LetterOffset {
  x: number;
  y: number;
  rotate: number;
}

function getDeveloperGradientColor(index: number, total: number): string {
  if (total <= 1) return 'rgb(99, 102, 241)';
  const ratio = index / (total - 1);
  const r = Math.round(99 + (129 - 99) * ratio);
  const g = Math.round(102 + (140 - 102) * ratio);
  const b = Math.round(241 + (248 - 241) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

export function HeroTitleRobot() {
  const locale = useLocale() as 'pt' | 'en';
  const siteConfig = getSiteConfig(locale);
  const { status, triggerTitleBreak } = useClickBreaker();

  const word1 = siteConfig.role.split(' ')[0] || 'Fullstack';
  const word2 = siteConfig.role.split(' ').slice(1).join(' ') || 'Developer';

  const [offsets, setOffsets] = useState<{ [key: string]: LetterOffset }>({});

  useEffect(() => {
    if (status === 'fixing') {
      setOffsets({});
    }
  }, [status]);

  const handleDragEnd = (key: string, e: any, info: { offset: { x: number; y: number } }) => {
    const clientX = e?.clientX ?? (e?.changedTouches ? e.changedTouches[0]?.clientX : window.innerWidth / 2);
    const clientY = e?.clientY ?? (e?.changedTouches ? e.changedTouches[0]?.clientY : window.innerHeight / 2);

    setOffsets(prev => {
      const current = prev[key] || { x: 0, y: 0, rotate: 0 };
      const updatedPos = {
        x: current.x + info.offset.x,
        y: current.y + info.offset.y,
        rotate: current.rotate + (Math.random() * 24 - 12),
      };
      return { ...prev, [key]: updatedPos };
    });

    if (status === 'fixing' || status === 'scolding' || status === 'traveling') {
      setTimeout(() => {
        setOffsets({});
      }, 450);
    }

    triggerTitleBreak(clientX, clientY);
  };

  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-primary leading-[1.15] tracking-tight select-none pt-2 pb-1">
      {/* Word 1: Fullstack / Desenvolvedor */}
      <span className="inline-flex whitespace-nowrap">
        {word1.split('').map((char, i) => {
          const key = `w1-${i}`;
          const pos = offsets[key] || { x: 0, y: 0, rotate: 0 };
          const isMoved = Math.abs(pos.x) > 3 || Math.abs(pos.y) > 3;

          return (
            <motion.span
              key={key}
              drag
              dragSnapToOrigin={false}
              dragElastic={0.1}
              onDragEnd={(e, info) => handleDragEnd(key, e, info)}
              animate={{
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              whileHover={{ scale: 1.18, color: '#818cf8' }}
              whileDrag={{ scale: 1.3, zIndex: 50 }}
              className={`draggable-letter inline-block cursor-grab active:cursor-grabbing relative text-primary ${
                isMoved ? 'drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]' : ''
              }`}
            >
              {char}
            </motion.span>
          );
        })}
      </span>

      <br />

      {/* Word 2: Developer / Fullstack */}
      <span className="inline-flex whitespace-nowrap">
        {word2.split('').map((char, i) => {
          const key = `w2-${i}`;
          const pos = offsets[key] || { x: 0, y: 0, rotate: 0 };
          const isMoved = Math.abs(pos.x) > 3 || Math.abs(pos.y) > 3;
          const letterColor = getDeveloperGradientColor(i, word2.length);

          return (
            <motion.span
              key={key}
              drag
              dragSnapToOrigin={false}
              dragElastic={0.1}
              onDragEnd={(e, info) => handleDragEnd(key, e, info)}
              animate={{
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              whileHover={{ scale: 1.18 }}
              whileDrag={{ scale: 1.3, zIndex: 50 }}
              style={{ color: isMoved ? '#f43f5e' : letterColor }}
              className={`draggable-letter inline-block cursor-grab active:cursor-grabbing relative ${
                isMoved ? 'drop-shadow-[0_0_14px_rgba(244,63,94,0.9)]' : ''
              }`}
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </h1>
  );
}
