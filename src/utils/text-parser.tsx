import React from 'react';

/**
 * Safely parses markdown bold (**text**) and highlight (*text*) formatted text into React JSX elements
 * avoiding dangerous dangerouslySetInnerHTML usage.
 */
export function parseFormattedText(text: string): React.ReactNode[] {
  if (!text) return [];

  // Regex pattern matching **bold** or *highlight*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return (
        <strong key={index} className="text-primary font-semibold">
          {content}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const content = part.slice(1, -1);
      return (
        <span key={index} className="text-tacticalHighlight font-semibold">
          {content}
        </span>
      );
    }
    return part;
  });
}
