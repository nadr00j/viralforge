/**
 * Componente Badge - Indicadores visuais de status
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type { SceneStatus } from '@/lib/types';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'queued' | 'ready' | 'locked' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export default function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  const variantStyles = {
    default: 'bg-dark-700 text-gray-300',
    primary: 'bg-primary/20 text-primary border border-primary/30',
    secondary: 'bg-secondary/20 text-secondary border border-secondary/30',
    accent: 'bg-accent/20 text-accent border border-accent/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    queued: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
    ready: 'bg-green-500/20 text-green-400 border border-green-500/30',
    locked: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2',
  };
  
  const dotColors = {
    default: 'bg-gray-400',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-green-400',
    warning: 'bg-amber-400',
    danger: 'bg-red-400',
    queued: 'bg-gray-400',
    ready: 'bg-green-400',
    locked: 'bg-amber-400',
    error: 'bg-red-400',
  };
  
  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

// Helper para mapear status de cena para variant
export function getStatusBadgeVariant(status: SceneStatus): BadgeVariant {
  const map: Record<SceneStatus, BadgeVariant> = {
    queued: 'queued',
    ready: 'ready',
    locked: 'locked',
    error: 'error',
  };
  return map[status];
}

