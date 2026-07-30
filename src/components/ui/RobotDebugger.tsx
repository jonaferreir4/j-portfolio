'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickBreaker } from '@/providers/ClickBreakerProvider';
import { Sparkles } from 'lucide-react';

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

  const isIntroWalking = status === 'intro_walking';
  const isIntroPlacing = status === 'intro_placing';
  const isIntroStartled = status === 'intro_startled';
  const isIntroRunning = status === 'intro_running';

  const isIntro = isIntroWalking || isIntroPlacing || isIntroStartled || isIntroRunning;

  const spawnData = useMemo(() => {
    if (!impactPoint) return null;

    const { x, y } = impactPoint;
    const { w, h } = screenSize;

    if (isIntro) {
      return {
        startX: -150, // Start offscreen on the LEFT!
        startY: y,
        targetX: x - 10, // Exact X alignment for social links row
        targetY: y,
        travelRotateZ: 0,
      };
    }

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
  }, [impactPoint, screenSize, isIntro]);

  if (status === 'idle' || !impactPoint || !spawnData) return null;

  const isTraveling = status === 'traveling' || status === 'broken';
  const isFixing = status === 'fixing';
  const isScolding = status === 'scolding';

  const isFrontView = isScolding || isIntroStartled || isIntroRunning;

  const { startX, startY, targetX, targetY, travelRotateZ } = spawnData;

  return (
    <AnimatePresence>
      <motion.div
        key="robot-container"
        initial={
          isIntroWalking
            ? { x: -150, y: targetY, opacity: 0, scale: 0.9 } // Entrance from LEFT offscreen!
            : { x: isIntro ? targetX : startX, y: isIntro ? targetY : startY, opacity: 0, scale: 0.8 }
        }
        animate={
          isIntroRunning
            ? { x: -600, y: targetY, opacity: 0, scale: 0.6 } // Exit to LEFT offscreen!
            : { x: targetX, y: targetY, opacity: 1, scale: 1 }
        }
        exit={{ 
          x: startX, 
          y: startY, 
          opacity: 0,
          scale: 0.8
        }}
        transition={
          isIntroWalking
            ? { duration: 1.3, ease: 'easeOut' }
            : isIntroRunning
            ? { duration: 0.5, ease: [0.7, 0, 0.84, 0] }
            : { 
                x: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
                y: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
                opacity: { duration: 0.2 } 
              }
        }
        style={{ position: 'fixed', left: 0, top: 0 }}
        className="z-[9999] flex flex-col items-center pointer-events-none select-none"
      >
        {/* Startled Exclamation ( ! ) when robot sees user */}
        {isIntroStartled && (
          <motion.div
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1.6, y: -20 }}
            className="absolute -top-6 text-rose-500 font-extrabold text-lg z-50 drop-shadow-[0_0_12px_#f43f5e]"
          >
            !
          </motion.div>
        )}

        {/* Welding Sparks during intro placement */}
        {isIntroPlacing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
            transition={{ repeat: Infinity, duration: 0.18 }}
            className="absolute -bottom-2 -left-6 z-50 flex gap-6"
          >
            <Sparkles size={18} className="text-sky-400 animate-pulse" />
            <Sparkles size={18} className="text-indigo-400 animate-pulse" />
          </motion.div>
        )}

        {/* Robot Vector Frame */}
        <motion.div
          animate={
            isTraveling || isIntroWalking || isIntroRunning
              ? { y: [0, -5, 0] } // Stepping gait while walking/running
              : isFixing || isIntroPlacing
              ? { y: [0, -2, 0] }
              : isScolding || isIntroStartled
              ? { y: [0, -3, 0], rotate: [-4, 4, -4] }
              : {}
          }
          transition={{ repeat: Infinity, duration: isTraveling || isIntroWalking || isIntroRunning ? 0.18 : 0.4 }}
          className="w-14 h-17 relative flex items-center justify-center"
        >
          <motion.div
            key={isFrontView ? 'front-face' : 'side-back-face'}
            initial={{ rotateY: isFrontView ? -90 : 0, opacity: 0 }}
            animate={{ 
              rotateY: isIntroWalking ? 30 : isFrontView ? 0 : 0, 
              rotateZ: isFrontView ? 0 : travelRotateZ,
              opacity: 1 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            {!isFrontView ? (
              /* 1. SIDE/BACK VIEW — Walking in from LEFT carrying LinkedIn & GitHub icons under arms */
              <svg width="56" height="68" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M85 32 C85 20, 115 20, 115 32 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="6" />
                <rect x="24" y="65" width="18" height="34" rx="9" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                <rect x="158" y="65" width="18" height="34" rx="9" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                <rect x="36" y="32" width="128" height="90" rx="36" fill="#18181B" stroke="#6366F1" strokeWidth="7" />
                <rect x="65" y="55" width="70" height="32" rx="8" fill="#09090B" stroke="#27272A" strokeWidth="5" />
                <circle cx="85" cy="71" r="5" fill="#6366F1" />
                <circle cx="100" cy="71" r="5" fill="#6366F1" opacity="0.6" />
                <circle cx="115" cy="71" r="5" fill="#6366F1" opacity="0.3" />
                <rect x="84" y="118" width="32" height="14" rx="6" fill="#09090B" stroke="#3F3F46" strokeWidth="5" />

                {/* Left Arm holding LinkedIn Icon */}
                <rect x="22" y="132" width="26" height="60" rx="13" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                {/* Right Arm holding GitHub Icon */}
                <rect x="152" y="132" width="26" height="60" rx="13" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />

                {/* Torso Shell */}
                <path d="M52 134 C52 125, 148 125, 148 134 C158 190, 138 226, 100 226 C62 226, 42 190, 52 134 Z" fill="#18181B" stroke="#6366F1" strokeWidth="7" />

                {/* Both LinkedIn & GitHub Badges under arms during intro_walking & intro_placing (before icons reveal) */}
                {(isIntroWalking || isIntroPlacing) && (
                  <g transform="translate(10, 150) scale(0.9)">
                    {/* LinkedIn Badge (Left Arm) */}
                    <g transform="translate(0, 0)">
                      <rect x="0" y="0" width="34" height="34" rx="8" fill="#0A66C2" stroke="#38BDF8" strokeWidth="2.5" />
                      <text x="7" y="25" fontFamily="sans-serif" fontWeight="bold" fontSize="22" fill="#FFFFFF">in</text>
                    </g>

                    {/* GitHub Badge (Right Arm) */}
                    <g transform="translate(142, 0)">
                      <rect x="0" y="0" width="34" height="34" rx="8" fill="#09090B" stroke="#6366F1" strokeWidth="2.5" />
                      <path d="M17 6 C10.9 6 6 10.9 6 17 C6 21.8 9.1 25.9 13.5 27.3 C14.1 27.4 14.3 27.1 14.3 26.8 C14.3 26.5 14.3 25.6 14.3 24.7 C11.3 25.3 10.5 24.1 10.3 23.5 C10.1 23.1 9.6 22.1 9.1 21.9 C8.7 21.7 8.1 21.1 9.1 21.1 C10 21.1 10.7 21.9 10.9 22.3 C12 24.1 13.7 23.6 14.4 23.3 C14.5 22.5 14.8 22 15.2 21.7 C12.5 21.4 9.7 20.3 9.7 15.7 C9.7 14.4 10.2 13.3 11 12.4 C10.9 12.1 10.5 10.9 11.1 9.2 C11.1 9.2 12.1 8.9 14.4 10.4 C15.4 10.1 16.4 10 17.4 10 C18.4 10 19.4 10.1 20.4 10.4 C22.7 8.9 23.7 9.2 23.7 9.2 C24.3 10.9 23.9 12.1 23.8 12.4 C24.6 13.3 25.1 14.4 25.1 15.7 C25.1 20.3 22.3 21.4 19.6 21.7 C20.1 22.1 20.5 22.8 20.5 24 C20.5 25.7 20.5 26.5 20.5 26.8 C20.5 27.1 20.7 27.4 21.3 27.3 C25.7 25.8 28.8 21.8 28.8 17 C28.8 10.9 23.9 6 17.8 6 Z" fill="#6366F1" />
                    </g>
                  </g>
                )}

                <path d="M100 138 L100 215" stroke="#27272A" strokeWidth="6" strokeDasharray="6 6" />
                <path d="M58 185 L142 185" stroke="#6366F1" strokeWidth="5" strokeLinecap="round" />
              </svg>
            ) : (
              /* 2. FRONT VIEW — STARTLED REACT & RUNNING TO THE LEFT ✊ */
              <svg width="56" height="68" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M85 32 C85 20, 115 20, 115 32 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="6" />
                <rect x="24" y="65" width="18" height="34" rx="9" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                <rect x="158" y="65" width="18" height="34" rx="9" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                <rect x="36" y="32" width="128" height="90" rx="36" fill="#18181B" stroke="#6366F1" strokeWidth="7" />
                <rect x="52" y="46" width="96" height="62" rx="22" fill="#09090B" stroke="#27272A" strokeWidth="6" />

                {/* STARTLED EYES (> <) */}
                <path d="M68 68 L84 76 L68 84" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M132 68 L116 76 L132 84" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M92 88 Q100 82 108 88" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" />
                <path d="M128 50 L140 50 M134 44 L134 56" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />

                <rect x="84" y="118" width="32" height="14" rx="6" fill="#09090B" stroke="#3F3F46" strokeWidth="5" />
                <rect x="22" y="132" width="26" height="60" rx="13" fill="#18181B" stroke="#3F3F46" strokeWidth="6" />
                <path d="M52 134 C52 125, 148 125, 148 134 C158 190, 138 226, 100 226 C62 226, 42 190, 52 134 Z" fill="#18181B" stroke="#6366F1" strokeWidth="7" />
                <path d="M58 185 L85 185 L92 192 L108 192 L115 185 L142 185" stroke="#6366F1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M160 145 L152 95" stroke="#18181B" strokeWidth="22" strokeLinecap="round" />
                <path d="M160 145 L152 95" stroke="#6366F1" strokeWidth="28" strokeLinecap="round" opacity="0.3" />
                <path d="M160 145 L152 95" stroke="#18181B" strokeWidth="20" strokeLinecap="round" />

                {/* Startled Fist shake animation */}
                <motion.g
                  animate={{ 
                    rotate: [-34, 34, -34],
                    y: [0, -8, 0, -4, 0],
                    x: [-4, 4, -4]
                  }}
                  transition={{ repeat: Infinity, duration: 0.14, ease: "easeInOut" }}
                  style={{ transformOrigin: '152px 95px' }}
                >
                  <path d="M152 95 C150 75, 140 62, 128 56" stroke="#18181B" strokeWidth="20" strokeLinecap="round" />
                  <path d="M152 95 C150 75, 140 62, 128 56" stroke="#6366F1" strokeWidth="26" strokeLinecap="round" opacity="0.3" />
                  <path d="M152 95 C150 75, 140 62, 128 56" stroke="#18181B" strokeWidth="18" strokeLinecap="round" />
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
