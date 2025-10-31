/**
 * Componente ImagePlaceholder - SVG gradiente dinâmico
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type { Ratio } from '@/lib/types';

export interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: Ratio;
  text?: string;
  seed?: number;
  variant?: 'gradient' | 'solid' | 'pattern';
}

export default function ImagePlaceholder({
  ratio = '9:16',
  text = 'Preview',
  seed = 123456,
  variant = 'gradient',
  className,
  ...props
}: ImagePlaceholderProps) {
  // Gera cores baseadas no seed
  const hue1 = (seed % 360);
  const hue2 = ((seed + 120) % 360);
  
  const aspectRatioClass = {
    '9:16': 'aspect-9-16',
    '16:9': 'aspect-16-9',
    '1:1': 'aspect-1-1',
  }[ratio];
  
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-lg bg-dark-800',
        aspectRatioClass,
        className
      )}
      {...props}
    >
      {variant === 'gradient' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`hsl(${hue1}, 70%, 50%)`} stopOpacity="0.8" />
              <stop offset="50%" stopColor={`hsl(${hue2}, 70%, 40%)`} stopOpacity="0.6" />
              <stop offset="100%" stopColor={`hsl(${hue1}, 70%, 30%)`} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="400" height="600" fill={`url(#grad-${seed})`} />
          
          {/* Padrão de ruído sutil */}
          <g opacity="0.1">
            {Array.from({ length: 50 }).map((_, i) => (
              <circle
                key={i}
                cx={((seed + i * 37) % 400)}
                cy={((seed + i * 71) % 600)}
                r={((seed + i * 13) % 30) + 10}
                fill="white"
              />
            ))}
          </g>
        </svg>
      )}
      
      {variant === 'solid' && (
        <div
          className="w-full h-full"
          style={{ backgroundColor: `hsl(${hue1}, 40%, 25%)` }}
        />
      )}
      
      {variant === 'pattern' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="400" height="600" fill={`hsl(${hue1}, 40%, 20%)`} />
          <pattern id={`pattern-${seed}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="transparent" />
            <circle cx="20" cy="20" r="1" fill={`hsl(${hue2}, 50%, 40%)`} opacity="0.5" />
          </pattern>
          <rect width="400" height="600" fill={`url(#pattern-${seed})`} />
        </svg>
      )}
      
      {/* Overlay com texto */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-white/80">{text}</p>
        </div>
      </div>
    </div>
  );
}

