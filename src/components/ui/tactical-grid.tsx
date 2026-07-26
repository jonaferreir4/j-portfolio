'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
}

export function TacticalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    // Buffer vertical extra para o scroll parallax nunca mostrar borda cortada
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

    const pointer = { x: -1000, y: -1000 };

    const updatePointer = (clientX: number, clientY: number) => {
      // Compensar o deslocamento do scroll parallax na coordenada do canvas
      const scrollOffset = window.scrollY * 0.15;
      pointer.x = clientX;
      pointer.y = clientY + scrollOffset;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

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

    // Parâmetros de Física Elástica (Mola / Hooke's Law)
    const stiffness = 0.12;
    const damping = 0.82;
    const interactionRadius = 180;
    const forceMultiplier = 35;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const gridColor = isLight ? 'rgba(53, 56, 238, 0.10)' : 'rgba(255, 255, 255, 0.07)';
      const glowRgb = isLight ? '53, 56, 238' : '99, 102, 241'; // Brilho tático nos nós interativos

      // Movimento contínuo suave na diagonal
      const timeOffset = (performance.now() * 0.005) % gridSize;

      // 1. Atualizar física dos vértices da malha
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r][c];
          
          const targetOriginX = c * gridSize + timeOffset - gridSize;
          const targetOriginY = r * gridSize + timeOffset - gridSize;
          p.originX = targetOriginX;
          p.originY = targetOriginY;

          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetX = p.originX;
          let targetY = p.originY;

          // Repulsão magnética ao toque / cursor
          if (dist < interactionRadius && dist > 0.1) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - dist / interactionRadius) * forceMultiplier;
            targetX += Math.cos(angle) * force;
            targetY += Math.sin(angle) * force;
          }

          // Lei de Hooke (mola elástica)
          p.vx = (p.vx + (targetX - p.x) * stiffness) * damping;
          p.vy = (p.vy + (targetY - p.y) * stiffness) * damping;

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // 2. Desenhar as linhas da malha tática
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r][c];
          if (c < cols - 1) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(grid[r][c + 1].x, grid[r][c + 1].y);
          }
          if (r < rows - 1) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(grid[r + 1][c].x, grid[r + 1][c].y);
          }
        }
      }
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Desenhar os nós cibernéticos iluminados perto do toque / mouse
      if (pointer.x !== -1000) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const p = grid[r][c];
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactionRadius) {
              const alpha = (1 - dist / interactionRadius) * 0.75;
              ctx.beginPath();
              ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${glowRgb}, ${alpha})`;
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerLeave);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      style={{
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="!absolute !top-0 !left-0 !w-full will-change-transform" 
      />
    </div>
  );
}
