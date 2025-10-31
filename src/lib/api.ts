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

export async function generateIdeas(channelId: string, count: number = 10) {
  console.info('[API] [MOCK] Generating ideas for:', channelId);
  // Fase 2: chamar n8n webhook
  return {
    ideas: Array.from({ length: count }, (_, i) => ({
      title: `Ideia ${i + 1} - Curiosidade tech incrível`,
      justification: 'Baseado em tendências e referências do canal',
      curiosity_level: Math.floor(Math.random() * 100),
      key_points: ['Ponto 1', 'Ponto 2', 'Ponto 3'],
    })),
  };
}

export async function generateScript(ideaTitle: string) {
  console.info('[API] [MOCK] Generating script for:', ideaTitle);
  // Fase 2: chamar n8n webhook
  return {
    script: 'Roteiro mock gerado...',
    beats: [
      { t: 0, text: 'Hook inicial' },
      { t: 2, text: 'Desenvolvimento' },
      { t: 5, text: 'Conclusão' },
    ],
  };
}

export async function generateScenes(scriptBeats: any[]) {
  console.info('[API] [MOCK] Generating scenes from beats');
  // Fase 2: chamar n8n webhook
  return {
    scenes: scriptBeats.map((beat, i) => ({
      id: `S${String(i + 1).padStart(2, '0')}`,
      duration: 2,
      prompt_start: `Scene based on: ${beat.text}`,
      mode: 'image',
    })),
  };
}

