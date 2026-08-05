import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jona Ferreira - Fullstack Developer & Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          padding: '60px',
          fontFamily: 'sans-serif',
          border: '12px solid #18181b',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ color: '#6366f1', fontSize: '20px', fontFamily: 'monospace', fontWeight: 'bold' }}>
            /// SYSTEM_HUD // OPERATIONAL_PORTFOLIO
          </div>
          <div style={{ color: '#10b981', fontSize: '18px', fontFamily: 'monospace', fontWeight: 'bold' }}>
            STATUS: ONLINE
          </div>
        </div>

        {/* Center Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: '#f8fafc', fontSize: '64px', fontWeight: '900', textTransform: 'uppercase' }}>
            Jona Ferreira
          </div>
          <div style={{ color: '#6366f1', fontSize: '32px', fontWeight: '700' }}>
            Fullstack Engineer | .NET • Node • React 19
          </div>
          <div style={{ color: '#94a3b8', fontSize: '22px', maxWidth: '850px', lineHeight: '1.4' }}>
            Desenvolvimento de Aplicações de Alta Complexidade, Arquitetura Limpa e Microserviços de Alta Concorrência.
          </div>
        </div>

        {/* Bottom Tags */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['.NET 8', 'React 19', 'Next.js App Router', 'TypeScript Strict', 'AWS SES'].map((tag) => (
            <div
              key={tag}
              style={{
                backgroundColor: '#18181b',
                color: '#f8fafc',
                border: '2px solid #27272a',
                padding: '10px 20px',
                fontSize: '18px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
