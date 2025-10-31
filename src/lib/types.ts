/**
 * Tipos centrais do Viral Forge Studio
 * Baseado no PRDI e cursor-start.md
 */

// ============================================================================
// TIPOS BÁSICOS
// ============================================================================

export type Ratio = '9:16' | '16:9' | '1:1';
export type SceneMode = 'image' | 'hybrid' | 'direct';
export type SceneStatus = 'queued' | 'ready' | 'locked' | 'error';

// ============================================================================
// CENA (Scene)
// ============================================================================

export type VFScene = {
  id: string;
  mode: SceneMode;
  duration: number; // segundos
  prompt_start?: string;
  prompt_end?: string;
  seed?: number;
  reference_tags?: string[];
  
  // Específico para modo híbrido
  hybrid?: {
    query?: string;
    source?: string; // 'pexels' | 'youtube' | 'tiktok'
    url?: string;
    clip_in?: number;
    clip_out?: number;
  };
  
  // Assets gerados
  assets: {
    img_start?: string;
    img_end?: string;
    video?: string;
  };
  
  status: SceneStatus;
  version: number;
  drift?: number; // 0-100 (% de divergência do style_pack)
  notes?: string;
};

// ============================================================================
// MANIFEST (Fonte da Verdade)
// ============================================================================

export type VFManifest = {
  project_id: string;
  channel_preset: string;
  
  style_pack: {
    theme: string;
    character: string;
    seed: number;
    negative_prompts: string;
    camera: string;
    color_palette: string[];
  };
  
  audio: {
    narration: boolean;
    voice_id?: string;
    music_bpm?: number;
  };
  
  script: {
    title: string;
    beats: { t: number; text: string }[];
  };
  
  scenes: VFScene[];
  
  output: {
    ratio: Ratio;
    target_len: number; // segundos
    fps: number;
    captions: boolean;
  };
};

// ============================================================================
// CONFIGURAÇÃO DE CANAL
// ============================================================================

export type ChannelConfig = {
  id: string;
  name: string;
  platform: 'youtube' | 'tiktok' | 'instagram';
  
  // Identity Tab
  identity: {
    niche: string;
    category: string;
    language: string;
    format: 'shorts' | 'long-form' | 'hybrid';
    description: string;
    persona: string;
  };
  
  // Voice & Style Tab
  voice_style: {
    voice_id: string;
    voice_name: string;
    theme: string;
    character: string;
    camera_style: string;
    color_palette: string[];
    negative_prompts: string;
  };
  
  // References Tab
  references: {
    internal: { id: string; url: string; title: string; thumbnail?: string }[];
    external: { id: string; url: string; title: string; thumbnail?: string; tags?: string[] }[];
  };
  
  // Webhooks Tab
  webhooks: {
    style: string; // ex: 'shorts-ia', 'long-form-ia'
    endpoints: {
      ideas: string;
      script: string;
      scenes: string;
      render_image: string;
      render_video: string;
      hybrid_replace: string;
    };
    active: boolean;
    last_calls?: { endpoint: string; timestamp: string; status: 'success' | 'error' }[];
  }[];
  
  created_at: string;
  updated_at: string;
};

// ============================================================================
// TIPOS DE API
// ============================================================================

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type RenderImageRequest = {
  sceneId: string;
  projectId: string;
  prompt_start: string;
  prompt_end?: string;
  seed?: number;
  style_pack: VFManifest['style_pack'];
};

export type RenderImageResponse = {
  img_start?: string;
  img_end?: string;
  seed: number;
  version: number;
  drift?: number;
};

export type RenderVideoRequest = {
  sceneId: string;
  projectId: string;
  img_start: string;
  img_end?: string;
  duration: number;
};

export type RenderVideoResponse = {
  video: string;
  duration: number;
};

export type HybridReplaceRequest = {
  sceneId: string;
  query: string;
  source: 'pexels' | 'youtube' | 'tiktok';
  duration: number;
};

export type HybridReplaceResponse = {
  video: string;
  url: string;
  source: string;
  license_proof?: string;
};

