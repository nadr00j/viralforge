/**
 * Cliente API - Funções wrapper para endpoints
 */

import axios from 'axios';
import type {
  ApiResponse,
  RenderImageRequest,
  RenderImageResponse,
  RenderVideoRequest,
  RenderVideoResponse,
  HybridReplaceRequest,
  HybridReplaceResponse,
  VFManifest,
  VFScene,
  Idea,
  Script,
} from './types';
import { APP_CONFIG } from './config';

// Axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor para logs
api.interceptors.request.use((config) => {
  console.info('[API] Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Response interceptor para logs
api.interceptors.response.use(
  (response) => {
    console.info('[API] Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('[API] Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

// ============================================================================
// RENDER ENDPOINTS
// ============================================================================

export async function renderImage(
  request: RenderImageRequest
): Promise<RenderImageResponse> {
  const { data } = await api.post<ApiResponse<RenderImageResponse>>(
    '/render/image',
    request
  );
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to render image');
  }
  
  return data.data;
}

export async function renderVideo(
  request: RenderVideoRequest
): Promise<RenderVideoResponse> {
  const { data } = await api.post<ApiResponse<RenderVideoResponse>>(
    '/render/video',
    request
  );
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to render video');
  }
  
  return data.data;
}

export async function hybridReplace(
  request: HybridReplaceRequest
): Promise<HybridReplaceResponse> {
  const { data } = await api.post<ApiResponse<HybridReplaceResponse>>(
    '/hybrid/replace',
    request
  );
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to replace with hybrid');
  }
  
  return data.data;
}

// ============================================================================
// SCENE ENDPOINTS
// ============================================================================

export async function updateScene(
  sceneId: string,
  updates: Partial<VFScene>
): Promise<VFScene> {
  const { data } = await api.patch<ApiResponse<VFScene>>(
    `/scenes/${sceneId}`,
    updates
  );
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to update scene');
  }
  
  return data.data;
}

// ============================================================================
// MANIFEST ENDPOINTS
// ============================================================================

export async function getManifest(projectId: string): Promise<VFManifest> {
  const { data } = await api.get<ApiResponse<VFManifest>>(
    `/manifest/${projectId}`
  );
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to get manifest');
  }
  
  return data.data;
}

export async function saveManifestApi(
  projectId: string,
  manifest: VFManifest
): Promise<VFManifest> {
  const { data } = await api.put<ApiResponse<VFManifest>>(
    `/manifest/${projectId}`,
    manifest
  );
  
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to save manifest');
  }
  
  return data.data;
}

// ============================================================================
// N8N WEBHOOKS (Mock para Fase 1)
// ============================================================================

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateIdeas(channelId: string, count: number = 10): Promise<{ ideas: Idea[] }> {
  console.info('[API] [MOCK] Generating ideas for:', channelId);
  await delay(2000); // Simula tempo de processamento
  
  const { mockIdeas } = await import('./mocks');
  return { ideas: mockIdeas.slice(0, count) };
}

export async function generateScript(ideaTitle: string): Promise<Script> {
  console.info('[API] [MOCK] Generating script for:', ideaTitle);
  await delay(3000); // Simula tempo de processamento
  
  const { generateId } = await import('./utils');
  
  return {
    id: generateId('script'),
    ideaId: 'idea_1',
    title: ideaTitle,
    beats: [
      { t: 0.0, text: 'Hook: Você não vai acreditar nisso!' },
      { t: 2.5, text: 'Ponto 1: Primeira descoberta incrível' },
      { t: 5.0, text: 'Ponto 2: Segunda inovação surpreendente' },
      { t: 7.5, text: 'Ponto 3: Terceira revolução tecnológica' },
      { t: 10.0, text: 'CTA: Deixa teu like e se inscreve!' },
    ],
    fullText: `Você não vai acreditar nessas ${ideaTitle}! 

Primeiro, temos uma descoberta que está revolucionando tudo. É incrível como a tecnologia avança.

Em segundo lugar, uma inovação que ninguém esperava. Isso vai mudar completamente o mercado.

E por fim, a terceira revolução que todos estavam esperando.

Se você gostou, deixa seu like e se inscreve no canal para mais conteúdo tech!`,
    estimatedDuration: 30,
    createdAt: new Date().toISOString(),
  };
}

export async function generateScenes(scriptBeats: any[]): Promise<{ scenes: VFScene[] }> {
  console.info('[API] [MOCK] Generating scenes from beats');
  await delay(2500); // Simula tempo de processamento
  
  const { generateSeed } = await import('./utils');
  
  return {
    scenes: scriptBeats.map((beat, i) => ({
      id: `S${String(i + 1).padStart(2, '0')}`,
      mode: 'image' as const,
      duration: 2.5,
      prompt_start: `cinematic scene illustrating: ${beat.text}, high quality, dramatic lighting, tech aesthetic`,
      prompt_end: `same scene with subtle camera movement, enhanced details`,
      seed: generateSeed(),
      reference_tags: ['tech', 'dynamic'],
      assets: {},
      status: 'queued' as const,
      version: 1,
      drift: Math.floor(Math.random() * 15),
    })),
  };
}

