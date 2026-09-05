'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, Play, Cpu } from 'lucide-react';

interface TacticalProjectPreviewProps {
  codeName: string;
  type?: 'kanban' | 'microservice' | 'websocket' | 'proxy' | 'ecommerce' | 'events' | 'default';
  title: string;
  image?: string;
}

export function TacticalProjectPreview({ codeName, type = 'default', title, image }: TacticalProjectPreviewProps) {
  const [activeTab, setActiveTab] = useState<'media' | 'schematic'>(image ? 'media' : 'schematic');
  const [isZoomed, setIsZoomed] = useState(false);

  const renderSchematic = () => {
    if (type === 'events') {
      return (
        <div className="w-full h-full min-h-[200px] bg-slate-950 p-4 font-mono text-xs flex flex-col justify-between relative overflow-hidden select-none group/preview">
          <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:12px_12px] opacity-15"></div>

          <div className="flex justify-between items-center z-10 border-b border-purple-500/20 pb-2">
            <span className="text-[10px] text-purple-400 font-bold tracking-wider uppercase">
              /// CLEAN_ARCH // MYEVENTS_ENGINE
            </span>
            <span className="text-[9px] text-purple-300 font-bold">JWT_AUTH: ACTIVE</span>
          </div>

          <div className="z-10 my-auto space-y-2">
            <div className="flex items-center justify-between text-[9px] bg-slate-900 p-2 border border-slate-800 rounded">
              <span className="text-purple-400 font-bold">UNIT OF WORK</span>
              <span className="text-slate-300">Atomic Transactions</span>
            </div>
            <div className="flex items-center justify-between text-[9px] bg-purple-950/40 p-2 border border-purple-500/30 rounded text-purple-200">
              <span className="text-white font-bold">CERTIFICATES</span>
              <span className="text-purple-300 font-bold">100% AUTOMATED</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] z-10 text-slate-500 border-t border-slate-800 pt-2">
            <span>POSTGRESQL + EF CORE</span>
            <span className="text-purple-400 font-bold">FLUENT VALIDATION</span>
          </div>
        </div>
      );
    }

    if (type === 'kanban') {
      return (
        <div className="w-full h-full min-h-[200px] bg-slate-950 p-4 font-mono text-xs flex flex-col justify-between relative overflow-hidden select-none group/preview">
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:12px_12px] opacity-15"></div>
          
          <div className="flex justify-between items-center z-10 border-b border-indigo-500/20 pb-2">
            <span className="text-[10px] text-indigo-400 font-bold tracking-wider uppercase">
              /// KANBAN_STATE // OPTIMISTIC_SYNC
            </span>
            <span className="flex items-center gap-1.5 text-[9px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ACTIVE_CACHE
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-auto z-10">
            <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-sm space-y-1.5">
              <div className="text-[9px] text-slate-400 font-bold border-b border-slate-800 pb-1 flex justify-between">
                <span>BACKLOG</span>
                <span className="text-indigo-400">03</span>
              </div>
              <div className="bg-slate-950 p-1.5 rounded text-[8px] text-slate-300 border-l-2 border-indigo-500">
                Auth RBAC setup
              </div>
              <div className="bg-slate-950 p-1.5 rounded text-[8px] text-slate-400 border-l-2 border-slate-700">
                UI design tokens
              </div>
            </div>

            <div className="bg-indigo-950/40 border border-indigo-500/30 p-2 rounded-sm space-y-1.5">
              <div className="text-[9px] text-indigo-300 font-bold border-b border-indigo-500/30 flex justify-between">
                <span>IN_PROGRESS</span>
                <span className="text-indigo-400">02</span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded text-[8px] text-white border-l-2 border-emerald-400 shadow-[0_0_8px_rgba(99,102,241,0.3)] animate-pulse">
                Drag & Drop Sync
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-sm space-y-1.5">
              <div className="text-[9px] text-emerald-400 font-bold border-b border-slate-800 pb-1 flex justify-between">
                <span>READY</span>
                <span className="text-emerald-400">08</span>
              </div>
              <div className="bg-slate-950 p-1.5 rounded text-[8px] text-slate-400 border-l-2 border-emerald-500/60 opacity-80">
                TanStack Query setup
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center z-10 text-[9px] text-slate-500 pt-2 border-t border-slate-800/80">
            <span>LATENCY: 12ms</span>
            <span className="text-indigo-400">ZUSTAND_STORE: OK</span>
          </div>
        </div>
      );
    }

    if (type === 'microservice') {
      return (
        <div className="w-full h-full min-h-[200px] bg-slate-950 p-4 font-mono text-xs flex flex-col justify-between relative overflow-hidden select-none group/preview">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:16px_16px] opacity-20"></div>

          <div className="flex justify-between items-center z-10 border-b border-orange-500/20 pb-2">
            <span className="text-[10px] text-orange-400 font-bold tracking-wider uppercase">
              /// AWS_SES // JAVA_SPRING_GATEWAY
            </span>
            <span className="text-[9px] text-slate-400 font-mono">DOCKER: RUNNING</span>
          </div>

          <div className="flex items-center justify-between z-10 my-auto px-2">
            <div className="flex flex-col items-center bg-slate-900 border border-slate-700 p-2 rounded-sm w-20 text-center">
              <span className="text-[8px] text-slate-400 uppercase">CLIENT</span>
              <span className="text-[9px] font-bold text-white">HTTP POST</span>
            </div>

            <div className="flex-1 px-2 flex items-center justify-center relative">
              <div className="w-full h-[1px] bg-gradient-to-r from-indigo-500 via-orange-400 to-emerald-400"></div>
              <div className="absolute w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#fb923c] animate-ping"></div>
            </div>

            <div className="flex flex-col items-center bg-orange-950/60 border border-orange-500/50 p-2 rounded-sm w-24 text-center">
              <span className="text-[8px] text-orange-300 uppercase">AWS SES</span>
              <span className="text-[9px] font-bold text-white">200 OK</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[9px] z-10 border-t border-slate-800 pt-2 text-slate-400">
            <div><span className="text-slate-500">BACKOFF:</span> EXPONENTIAL</div>
            <div className="text-right"><span className="text-slate-500">DISPATCH:</span> 0.04s</div>
          </div>
        </div>
      );
    }

    if (type === 'ecommerce') {
      return (
        <div className="w-full h-full min-h-[200px] bg-slate-950 p-4 font-mono text-xs flex flex-col justify-between relative overflow-hidden select-none group/preview">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px] opacity-15"></div>

          <div className="flex justify-between items-center z-10 border-b border-emerald-500/20 pb-2">
            <span className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase">
              /// NEXT_RSC // STORE_GAMING
            </span>
            <span className="text-[9px] text-emerald-400 font-bold">LCP: 0.4s</span>
          </div>

          <div className="z-10 my-auto space-y-2">
            <div className="flex items-center justify-between text-[9px] bg-slate-900 p-2 border border-slate-800 rounded">
              <span className="text-emerald-400 font-bold">RSC ENGINE</span>
              <span className="text-slate-300">Server Rendered HTML</span>
            </div>
            <div className="flex items-center justify-between text-[9px] bg-emerald-950/40 p-2 border border-emerald-500/30 rounded text-emerald-200">
              <span className="text-white font-bold">BUNDLE SIZE</span>
              <span className="text-emerald-400 font-bold">-45% REDUCED</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] z-10 text-slate-500 border-t border-slate-800 pt-2">
            <span>SHADCN UI</span>
            <span className="text-emerald-400 font-bold">ZERO CLS</span>
          </div>
        </div>
      );
    }

    if (type === 'websocket') {
      return (
        <div className="w-full h-full min-h-[200px] bg-slate-950 p-4 font-mono text-xs flex flex-col justify-between relative overflow-hidden select-none group/preview">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:14px_14px] opacity-15"></div>

          <div className="flex justify-between items-center z-10 border-b border-emerald-500/20 pb-2">
            <span className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase">
              /// SIGNALR_HUB // DUPLEX_WEBSOCKET
            </span>
            <span className="text-[9px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              CONNECTED
            </span>
          </div>

          <div className="z-10 bg-slate-900/90 border border-slate-800 p-2 rounded-sm space-y-1 my-auto">
            <div className="text-[8px] text-emerald-400 flex justify-between">
              <span>[NET_EVT] HubConnection.On(&quot;ReceiveMessage&quot;)</span>
              <span className="text-slate-500">10:42:01</span>
            </div>
            <div className="text-[9px] text-slate-200 truncate">
              &gt; &quot;payload&quot;: &#123; &quot;user&quot;: &quot;Dev&quot;, &quot;status&quot;: &quot;typing...&quot; &#125;
            </div>
            <div className="text-[8px] text-indigo-400 flex justify-between pt-0.5 border-t border-slate-800">
              <span>PING: 8ms</span>
              <span>CHANNEL: #General</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] z-10 text-slate-500 border-t border-slate-800 pt-2">
            <span>.NET 8 CORE HUB</span>
            <span className="text-emerald-400 font-bold">FULL DUPLEX</span>
          </div>
        </div>
      );
    }

    if (type === 'proxy') {
      return (
        <div className="w-full h-full min-h-[200px] bg-slate-950 p-4 font-mono text-xs flex flex-col justify-between relative overflow-hidden select-none group/preview">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

          <div className="flex justify-between items-center z-10 border-b border-slate-700 pb-2">
            <span className="text-[10px] text-sky-400 font-bold tracking-wider uppercase">
              /// TRAEFIK_EDGE // DOCKER_REVERSE_PROXY
            </span>
            <span className="text-[9px] text-slate-400">INGRESS: READY</span>
          </div>

          <div className="z-10 my-auto space-y-2">
            <div className="flex items-center justify-between text-[9px] bg-slate-900 p-1.5 border border-slate-800 rounded">
              <span className="text-sky-400 font-bold">EDGE GATEWAY</span>
              <span className="text-slate-400">smaller.io/x9k2 -&gt;</span>
            </div>
            <div className="flex items-center justify-between text-[9px] bg-indigo-950/60 p-1.5 border border-indigo-500/40 rounded text-indigo-200">
              <span className="text-emerald-400 font-bold">REDIRECT 301</span>
              <span className="text-white font-semibold truncate max-w-[140px]">target.com/destination</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] z-10 text-slate-500 border-t border-slate-800 pt-2">
            <span>DOCKER COMPOSE</span>
            <span className="text-sky-400">O(1) RESOLUTION</span>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full min-h-[200px] bg-slate-950 p-4 font-mono text-xs flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex justify-between items-center z-10">
          <span className="text-[10px] text-indigo-400 uppercase">/// SYSTEM_PREVIEW</span>
          <span className="text-[9px] text-slate-500">ID: {codeName}</span>
        </div>
        <div className="text-center z-10 my-auto">
          <p className="text-sm font-bold text-white uppercase">{title}</p>
          <span className="text-[10px] text-indigo-400">TACTICAL_SCHEMATIC</span>
        </div>
        <div className="text-[9px] text-slate-500 z-10 text-right">STATUS: OPERATIONAL</div>
      </div>
    );
  };

  const isGif = image?.endsWith('.gif');

  return (
    <div className="relative w-full h-full min-h-[220px] flex flex-col bg-slate-950 rounded-xl overflow-hidden border border-slate-800 group/container">
      
      {/* HEADER CONTROLS (TABS) */}
      {image && (
        <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 font-mono text-[10px] z-20 shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-semibold ${
                activeTab === 'media'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Play size={10} className={isGif ? 'animate-pulse text-emerald-400' : ''} />
              <span>{isGif ? 'GIF_DEMO' : 'PREVIEW_IMG'}</span>
            </button>
            <button
              onClick={() => setActiveTab('schematic')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-semibold ${
                activeTab === 'schematic'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Cpu size={10} />
              <span>ESQUEMÁTICO</span>
            </button>
          </div>

          {activeTab === 'media' && (
            <button
              onClick={() => setIsZoomed(true)}
              className="p-1 text-slate-400 hover:text-indigo-400 hover:bg-slate-800/80 rounded transition-colors flex items-center gap-1"
              title="Expandir Imagem"
              aria-label="Expandir Imagem"
            >
              <Maximize2 size={12} />
              <span className="hidden sm:inline text-[9px]">AMPLIAR</span>
            </button>
          )}
        </div>
      )}

      {/* CONTENT AREA */}
      <div className="relative flex-1 w-full h-full min-h-[200px] overflow-hidden">
        {image && activeTab === 'media' ? (
          <div 
            className="relative w-full h-full min-h-[200px] group/image cursor-pointer flex items-center justify-center bg-slate-950"
            onClick={() => setIsZoomed(true)}
          >
            <Image
              src={image}
              alt={title}
              fill
              unoptimized={isGif}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-500 group-hover/image:scale-105"
            />
            {/* OVERLAY BADGE */}
            <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 px-2.5 py-1 rounded-full text-[9px] font-mono text-indigo-300 flex items-center gap-1.5 opacity-90 group-hover/image:opacity-100 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {isGif ? 'GIF_STREAMING' : 'VISUAL_PREVIEW'}
            </div>
          </div>
        ) : (
          renderSchematic()
        )}
      </div>

      {/* LIGHTBOX MODAL FOR ZOOM */}
      {isZoomed && image && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={() => setIsZoomed(false)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-4 py-3 bg-slate-950 border-b border-slate-800 font-mono text-xs">
              <span className="text-indigo-400 font-bold flex items-center gap-2">
                <Play size={12} className={isGif ? 'text-emerald-400 animate-pulse' : ''} />
                MEDIA_VIEWER: {title} ({codeName})
              </span>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="relative flex-1 w-full h-full min-h-[300px] bg-black flex items-center justify-center overflow-auto p-2">
              <Image
                src={image}
                alt={title}
                fill
                unoptimized={isGif}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
