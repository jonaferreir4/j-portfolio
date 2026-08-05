'use client';

import React, { useEffect, useRef } from 'react';
import { useClickBreaker } from '@/providers/ClickBreakerProvider';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  isSevered?: boolean;
}

export function TacticalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { status, impactPoint } = useClickBreaker();

  const statusRef = useRef(status);
  const impactRef = useRef(impactPoint);
  const prevStatusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
    impactRef.current = impactPoint;
  }, [status, impactPoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight + 600;

    const gridSize = 40;
    let cols = Math.ceil(width / gridSize) + 2;
    let rows = Math.ceil(height / gridSize) + 2;

    let grid: Point[][] = [];

    const initGrid = () => {
      grid = [];
      for (let r = 0; r < rows; r++) {
        const row: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * gridSize;
          const y = r * gridSize;
          row.push({ x, y, originX: x, originY: y, vx: 0, vy: 0 });
        }
        grid.push(row);
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight + 600;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / gridSize) + 2;
      rows = Math.ceil(height / gridSize) + 2;
      initGrid();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Scroll Parallax via GPU (translate3d)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (canvasRef.current) {
            const offset = window.scrollY * 0.15;
            canvasRef.current.style.transform = `translate3d(0, -${offset}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mark nodes near impact as severed
    const triggerBreakPhysics = () => {
      if (!impactRef.current) return;
      const scrollOffset = window.scrollY * 0.15;
      const clientX = impactRef.current.clientX ?? impactRef.current.x;
      const clientY = impactRef.current.clientY ?? (impactRef.current.y - window.scrollY);

      const ix = clientX;
      const iy = clientY + scrollOffset;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r][c];
          const dx = p.x - ix;
          const dy = p.y - iy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Small localized radius around click
          if (dist < 80) {
            p.isSevered = true;
            // Small initial downward impulse
            p.vy = 1 + Math.random() * 2;
            p.vx = (Math.random() - 0.5) * 1.5;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const currentStatus = statusRef.current;

      // Check transition to broken
      if ((currentStatus === 'broken' || currentStatus === 'traveling') && prevStatusRef.current === 'idle') {
        triggerBreakPhysics();
      }
      prevStatusRef.current = currentStatus;

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const gridColor = isLight ? 'rgba(53, 56, 238, 0.10)' : 'rgba(255, 255, 255, 0.07)';

      const isBrokenOrTraveling = currentStatus === 'broken' || currentStatus === 'traveling';
      const isFixing = currentStatus === 'fixing';

      const timeOffset = (performance.now() * 0.005) % gridSize;

      // 1. Update physics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r][c];

          const targetOriginX = c * gridSize + timeOffset - gridSize;
          const targetOriginY = r * gridSize + timeOffset - gridSize;
          p.originX = targetOriginX;
          p.originY = targetOriginY;

          if (isBrokenOrTraveling && p.isSevered) {
            // Gravity pulls severed nodes down — they stay connected to neighbors
            // creating a realistic sagging net effect
            p.vy += 0.15;
            p.vx *= 0.96;
            p.vy *= 0.96;

            // Soft limit so it sags but doesn't fall infinitely
            if (p.y > p.originY + 30) {
              p.vy *= -0.15;
              p.y = p.originY + 30;
            }

            p.x += p.vx;
            p.y += p.vy;
          } else if (isFixing || currentStatus === 'scolding' || currentStatus === 'idle') {
            // Restore nodes smoothly back to origin
            p.isSevered = false;
            const stiffness = isFixing ? 0.22 : 0.12;
            const damping = isFixing ? 0.75 : 0.82;

            p.vx = (p.vx + (p.originX - p.x) * stiffness) * damping;
            p.vy = (p.vy + (p.originY - p.y) * stiffness) * damping;

            p.x += p.vx;
            p.y += p.vy;
          }
        }
      }

      // 2. Draw grid lines with realistic tear logic:
      //    - Both intact → draw normally
      //    - One severed + one intact → draw (thread hangs from intact neighbor)
      //    - Both severed → DON'T draw (connection is torn/broken!)
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r][c];

          // Horizontal lines
          if (c < cols - 1) {
            const p2 = grid[r][c + 1];
            const bothSevered = isBrokenOrTraveling && p.isSevered && p2.isSevered;
            if (!bothSevered) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }

          // Vertical lines
          if (r < rows - 1) {
            const p2 = grid[r + 1][c];
            const bothSevered = isBrokenOrTraveling && p.isSevered && p2.isSevered;
            if (!bothSevered) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }
        }
      }
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="!absolute !top-0 !left-0 !w-full will-change-transform"
      />
    </div>
  );
}
