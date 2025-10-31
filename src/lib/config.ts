/**
 * Configurações centrais da aplicação
 */

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Viral Forge Studio',
  version: '0.1.0',
  
  // URLs base para integrações (Fase 2)
  api: {
    n8n: process.env.N8N_BASE || 'http://localhost:5678',
    comfyui: process.env.COMFY_BASE || 'http://localhost:8188',
  },
  
  // Configurações de renderização
  render: {
    defaultFps: 30,
    defaultRatio: '9:16' as const,
    defaultDuration: 2,
    maxSceneDuration: 10,
    minSceneDuration: 0.5,
  },
  
  // Cores do tema
  colors: {
    primary: '#0EA5E9', // Cyan
    secondary: '#A855F7', // Purple
    accent: '#F59E0B', // Amber
    background: '#0a0a0a',
    surface: '#151515',
    error: '#EF4444',
    success: '#10B981',
  },
  
  // LocalStorage keys
  storage: {
    manifestPrefix: 'vf_manifest_',
    projectsList: 'vf_projects',
    channelPrefix: 'vf_channel_',
  },
  
  // Auto-save config
  autoSave: {
    enabled: true,
    debounceMs: 500,
  },
  
  // Mock delays (ms)
  mockDelays: {
    renderImage: 1500,
    renderVideo: 2000,
    hybridReplace: 1800,
    apiCall: 300,
  },
} as const;

// Drift thresholds (%)
export const DRIFT_THRESHOLDS = {
  good: 20,
  warning: 40,
} as const;

// Status colors
export const STATUS_COLORS = {
  queued: '#6B7280', // Gray
  ready: '#10B981', // Green
  locked: '#F59E0B', // Amber
  error: '#EF4444', // Red
} as const;

