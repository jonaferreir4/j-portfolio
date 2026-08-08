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

export function HeroTitleRobot() {
  const locale = useLocale() as 'pt' | 'en';
  const siteConfig = getSiteConfig(locale);
  const { status, triggerTitleBreak } = useClickBreaker();

  const parts = siteConfig.role.split(' ');
  const word1 = parts[0] || 'Desenvolvedor';
  const word2 = parts.slice(1).join(' ') || 'Fullstack';

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
    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-primary leading-[1.05] tracking-tight select-none pt-2 pb-2 uppercase font-sans">
      {/* Word 1 */}
      <span className="inline-flex flex-wrap">
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
              whileHover={{ scale: 1.15 }}
              whileDrag={{ scale: 1.25, zIndex: 50 }}
              className={`draggable-letter inline-block cursor-grab active:cursor-grabbing transition-colors duration-200 ${
                isMoved
                  ? 'drop-shadow-[0_0_15px_rgba(99,102,241,0.8)] text-indigo-600 dark:text-indigo-400 font-black'
                  : 'text-primary hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {char}
            </motion.span>
          );
        })}
      </span>

      <br />

      {/* Word 2 */}
      <span className="inline-flex flex-wrap">
        {word2.split('').map((char, i) => {
          const key = `w2-${i}`;
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
              whileHover={{ scale: 1.15 }}
              whileDrag={{ scale: 1.25, zIndex: 50 }}
              className={`draggable-letter inline-block cursor-grab active:cursor-grabbing transition-colors duration-200 ${
                isMoved
                  ? 'drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] text-rose-600 dark:text-rose-400 font-black'
                  : 'text-outline hover:text-rose-600 dark:hover:text-rose-400'
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
