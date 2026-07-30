'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickBreaker } from '@/providers/ClickBreakerProvider';

export function RobotDebugger() {
  const { status, impactPoint } = useClickBreaker();
  const [screenSize, setScreenSize] = useState({ w: 1000, h: 800 });

  useEffect(() => {
    const updateSize = () => {
      setScreenSize({ w: window.innerWidth, h: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const spawnData = useMemo(() => {
    if (!impactPoint) return null;

    const { x, y } = impactPoint;
    const { w, h } = screenSize;

    const distBottom = h - y;
    const distTop = y;
    const distLeft = x;
    const distRight = w - x;

    const minDist = Math.min(distBottom, distTop, distLeft, distRight);

    const robotWidth = 56;
    const robotHeight = 68;
    const gridSize = 40;

    let startX = 0;
    let startY = 0;
    let targetX = 0;
    let targetY = 0;
    let travelRotateZ = 0;

    if (minDist === distBottom) {
      const lineX = Math.round(x / gridSize) * gridSize;
      startX = lineX - robotWidth / 2;
      startY = h + 90;
      targetX = startX;
      targetY = Math.min(Math.max(60, y - robotHeight / 2), h - 90);
      travelRotateZ = 0;
    } else if (minDist === distTop) {
      const lineX = Math.round(x / gridSize) * gridSize;
      startX = lineX - robotWidth / 2;
      startY = -90;
      targetX = startX;
      targetY = Math.min(Math.max(60, y - robotHeight / 2), h - 90);
      travelRotateZ = 180;
    } else if (minDist === distLeft) {
      const lineY = Math.round(y / gridSize) * gridSize;
      startX = -90;
      startY = lineY - robotHeight / 2;
      targetX = Math.min(Math.max(60, x - robotWidth / 2), w - 90);
      targetY = startY;
      travelRotateZ = 90;
    } else {
      const lineY = Math.round(y / gridSize) * gridSize;
      startX = w + 90;
      startY = lineY - robotHeight / 2;
      targetX = Math.min(Math.max(60, x - robotWidth / 2), w - 90);
      targetY = startY;
      travelRotateZ = -90;
    }

    return { startX, startY, targetX, targetY, travelRotateZ };
  }, [impactPoint, screenSize]);

  if (status === 'idle' || !impactPoint || !spawnData) return null;

  const isTraveling = status === 'traveling' || status === 'broken';
  const isFixing = status === 'fixing';
  const isScolding = status === 'scolding';

  const { startX, startY, targetX, targetY, travelRotateZ } = spawnData;

  return (
    <AnimatePresence>
      <motion.div
        key="robot-container"
        initial={{ 
          x: startX, 
          y: startY, 
          opacity: 0,
          scale: 0.8
        }}
        animate={{ 
          x: targetX, 
          y: targetY, 
          opacity: 1,
          scale: 1
        }}
        exit={{ 
          x: startX, 
          y: startY, 
          opacity: 0,
          scale: 0.8
        }}
        transition={{ 
          x: { duration: 1.0, ease: [0.25, 1, 0.5, 1] },
          y: { duration: 1.0, ease: [0.25, 1, 0.5, 1] },
          opacity: { duration: 0.2 } 
        }}
        style={{ position: 'fixed', left: 0, top: 0 }}
        className="z-[9999] flex flex-col items-center pointer-events-none select-none"
      >
        {/* Robot Vector Frame */}
        <motion.div
          animate={
            isTraveling
              ? { y: [0, -4, 0] } // Stepping along grid line
              : isFixing
              ? { y: [0, -2, 0] }
              : isScolding
              ? { y: [0, -3, 0], rotate: [-2, 2, -2] }
              : {}
          }
          transition={{ repeat: Infinity, duration: isTraveling ? 0.25 : 0.6 }}
          className="w-14 h-17 relative flex items-center justify-center"
        >
          <motion.div
            key={isScolding ? 'front-face' : 'back-face'}
            initial={{ rotateY: isScolding ? -90 : 90, opacity: 0 }}
            animate={{ 
              rotateY: 0, 
              rotateZ: isScolding ? 0 : travelRotateZ,
              opacity: 1 
            }}
            exit={{ rotateY: isScolding ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            {!isScolding ? (
              /* 1. BACK VIEW (DE COSTAS) — Shown during traveling & fixing */
              <svg width="56" height="68" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top Antenna Cap */}
                <path d="M85 32 C85 20, 115 20, 115 32 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="6" />

                {/* Ear Pods */}
                <rect x="24" y="65" width="18" height="34" rx="9" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                <rect x="158" y="65" width="18" height="34" rx="9" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />

                {/* Head Shell Back (SOLID BACK ARMOR, NO VISOR, NO EYES) */}
                <rect x="36" y="32" width="128" height="90" rx="36" fill="#18181B" stroke="#6366F1" strokeWidth="7" />

                {/* Back Battery Pack */}
                <rect x="65" y="55" width="70" height="32" rx="8" fill="#09090B" stroke="#27272A" strokeWidth="5" />
                <circle cx="85" cy="71" r="5" fill="#6366F1" />
                <circle cx="100" cy="71" r="5" fill="#6366F1" opacity="0.6" />
                <circle cx="115" cy="71" r="5" fill="#6366F1" opacity="0.3" />

                {/* Neck Joint */}
                <rect x="84" y="118" width="32" height="14" rx="6" fill="#09090B" stroke="#3F3F46" strokeWidth="5" />

                {/* Left & Right Arms Hanging at sides */}
                <rect x="22" y="132" width="26" height="60" rx="13" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                <rect x="152" y="132" width="26" height="60" rx="13" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />

                {/* Torso Back Shell */}
                <path d="M52 134 C52 125, 148 125, 148 134 C158 190, 138 226, 100 226 C62 226, 42 190, 52 134 Z" fill="#18181B" stroke="#6366F1" strokeWidth="7" />

                {/* Back Seam Line */}
                <path d="M100 138 L100 215" stroke="#27272A" strokeWidth="6" strokeDasharray="6 6" />
                <path d="M58 185 L142 185" stroke="#6366F1" strokeWidth="5" strokeLinecap="round" />
              </svg>
            ) : (
              /* 2. FRONT VIEW — EXAGGERATED HIGH-AMPLITUDE FIST SHAKE ✊ */
              <svg width="56" height="68" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top Antenna Cap */}
                <path d="M85 32 C85 20, 115 20, 115 32 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="6" />

                {/* Ear Pods */}
                <rect x="24" y="65" width="18" height="34" rx="9" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                <rect x="158" y="65" width="18" height="34" rx="9" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />

                {/* Head Helmet Outer */}
                <rect x="36" y="32" width="128" height="90" rx="36" fill="#18181B" stroke="#6366F1" strokeWidth="7" />

                {/* Visor Screen */}
                <rect x="52" y="46" width="96" height="62" rx="22" fill="#09090B" stroke="#27272A" strokeWidth="6" />

                {/* ANGRY EYES (> <) */}
                <path d="M68 68 L84 76 L68 84" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M132 68 L116 76 L132 84" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                {/* Angry Mouth */}
                <path d="M92 88 Q100 82 108 88" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" />

                {/* Manga Anime Anger Mark (💢) directly on Visor corner */}
                <path d="M128 50 L140 50 M134 44 L134 56" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />

                {/* Neck Joint */}
                <rect x="84" y="118" width="32" height="14" rx="6" fill="#09090B" stroke="#3F3F46" strokeWidth="5" />

                {/* Left Arm (Relaxed at side) */}
                <rect x="22" y="132" width="26" height="60" rx="13" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />

                {/* Torso Front Shell */}
                <path d="M52 134 C52 125, 148 125, 148 134 C158 190, 138 226, 100 226 C62 226, 42 190, 52 134 Z" fill="#18181B" stroke="#6366F1" strokeWidth="7" />

                {/* Tactical Chest Line */}
                <path d="M58 185 L85 185 L92 192 L108 192 L115 185 L142 185" stroke="#6366F1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

                {/* 100% FIXED UPPER ARM (Anchored solidly at shoulder 160, 145) */}
                <path d="M160 145 L152 95" stroke="#18181B" strokeWidth="22" strokeLinecap="round" />
                <path d="M160 145 L152 95" stroke="#6366F1" strokeWidth="28" strokeLinecap="round" opacity="0.3" />
                <path d="M160 145 L152 95" stroke="#18181B" strokeWidth="20" strokeLinecap="round" />

                {/* FOREARM & FIST WITH EXAGGERATED HIGH-AMPLITUDE SHAKE ✊ */}
                <motion.g
                  animate={{ 
                    rotate: [-34, 34, -34],
                    y: [0, -8, 0, -4, 0],
                    x: [-4, 4, -4]
                  }}
                  transition={{ repeat: Infinity, duration: 0.14, ease: "easeInOut" }}
                  style={{ transformOrigin: '152px 95px' }}
                >
                  {/* Forearm segment extending up to visor */}
                  <path d="M152 95 C150 75, 140 62, 128 56" stroke="#18181B" strokeWidth="20" strokeLinecap="round" />
                  <path d="M152 95 C150 75, 140 62, 128 56" stroke="#6366F1" strokeWidth="26" strokeLinecap="round" opacity="0.3" />
                  <path d="M152 95 C150 75, 140 62, 128 56" stroke="#18181B" strokeWidth="18" strokeLinecap="round" />

                  {/* Clenched Fist ✊ in front of visor */}
                  <circle cx="126" cy="54" r="14" fill="#18181B" stroke="#F43F5E" strokeWidth="6" />
                  <path d="M120 48 Q126 44 132 48" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
                  <path d="M120 54 L132 54" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
                </motion.g>
              </svg>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
