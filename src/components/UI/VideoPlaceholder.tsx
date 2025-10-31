/**
 * Componente VideoPlaceholder - SVG para preview de vídeo
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type { Ratio } from '@/lib/types';

export interface VideoPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: Ratio;
  text?: string;
  duration?: number;
  isPlaying?: boolean;
}

export default function VideoPlaceholder({
  ratio = '9:16',
  text = 'Video Clip',
  duration = 0,
  isPlaying = false,
  className,
  ...props
}: VideoPlaceholderProps) {
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
      {/* Background gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-dark-800 to-cyan-900/30">
        {isPlaying && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        )}
      </div>
      
      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          'w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all',
          isPlaying && 'scale-90 opacity-50'
        )}>
          {isPlaying ? (
            <svg
              className="w-10 h-10 text-white/80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-10 h-10 text-white/80 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>
      
      {/* Info overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-sm font-medium text-white/90">{text}</p>
        {duration > 0 && (
          <p className="text-xs text-white/70 mt-1">
            {Math.floor(duration)}s
          </p>
        )}
      </div>
      
      {/* Timeline bar (mock) */}
      {isPlaying && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/50">
          <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }} />
        </div>
      )}
    </div>
  );
}

