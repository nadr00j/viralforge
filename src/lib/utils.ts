/**
 * Funções utilitárias
 */

import clsx, { ClassValue } from 'clsx';
import { DRIFT_THRESHOLDS, STATUS_COLORS } from './config';
import type { SceneStatus } from './types';

/**
 * Combina classes CSS com clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Gera ID único para cenas
 */
export function generateId(prefix: string = 'S'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${prefix}${timestamp}${random}`.toUpperCase();
}

/**
 * Gera seed aleatório para IA
 */
export function generateSeed(): number {
  return Math.floor(Math.random() * 999999) + 100000;
}

/**
 * Formata duração em segundos para MM:SS
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Retorna cor baseada no drift %
 */
export function getDriftColor(drift: number | undefined): string {
  if (drift === undefined) return STATUS_COLORS.queued;
  
  if (drift <= DRIFT_THRESHOLDS.good) return STATUS_COLORS.ready; // Verde
  if (drift <= DRIFT_THRESHOLDS.warning) return STATUS_COLORS.locked; // Amarelo
  return STATUS_COLORS.error; // Vermelho
}

/**
 * Retorna cor baseada no status
 */
export function getStatusColor(status: SceneStatus): string {
  return STATUS_COLORS[status];
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Simula delay (para mocks)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formata timestamp para exibição
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'agora';
  if (minutes < 60) return `${minutes}m atrás`;
  if (hours < 24) return `${hours}h atrás`;
  if (days < 7) return `${days}d atrás`;
  
  return date.toLocaleDateString('pt-BR');
}

/**
 * Valida URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Download de arquivo JSON
 */
export function downloadJSON(data: any, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

