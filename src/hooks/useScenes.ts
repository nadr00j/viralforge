/**
 * Hook useScenes - Lógica de manipulação de cenas
 */

'use client';

import { useState } from 'react';
import { useManifestStore } from '@/store/useManifestStore';
import { useSceneStore } from '@/store/useSceneStore';
import { renderImage, renderVideo, hybridReplace } from '@/lib/api';
import { createMockScene } from '@/lib/mocks';
import type { VFScene, RenderImageRequest, RenderVideoRequest, HybridReplaceRequest } from '@/lib/types';

export function useScenes() {
  const { manifest, updateScene, addScene, deleteScene } = useManifestStore();
  const { selectedSceneId, selectScene, isGenerating, setGenerating } = useSceneStore();
  
  const [error, setError] = useState<string | null>(null);
  
  // Cena selecionada
  const selectedScene = manifest?.scenes.find(s => s.id === selectedSceneId) || null;
  
  // ============================================================================
  // OPERAÇÕES DE GERAÇÃO
  // ============================================================================
  
  /**
   * Regenera imagens de uma cena
   */
  const regenerateImages = async (sceneId: string) => {
    if (!manifest) return;
    
    const scene = manifest.scenes.find(s => s.id === sceneId);
    if (!scene) return;
    
    setGenerating(true);
    setError(null);
    
    try {
      // Atualiza status para queued
      updateScene(sceneId, { status: 'queued' });
      
      const request: RenderImageRequest = {
        sceneId,
        projectId: manifest.project_id,
        prompt_start: scene.prompt_start || '',
        prompt_end: scene.prompt_end,
        seed: scene.seed,
        style_pack: manifest.style_pack,
      };
      
      const result = await renderImage(request);
      
      // Atualiza cena com novos assets
      updateScene(sceneId, {
        assets: {
          ...scene.assets,
          img_start: result.img_start,
          img_end: result.img_end,
        },
        seed: result.seed,
        version: result.version,
        drift: result.drift,
        status: 'ready',
      });
      
      console.info('[SCENES] Images regenerated:', sceneId);
    } catch (err) {
      console.error('[SCENES] Error regenerating images:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      updateScene(sceneId, { status: 'error' });
    } finally {
      setGenerating(false);
    }
  };
  
  /**
   * Regenera vídeo de uma cena
   */
  const regenerateVideo = async (sceneId: string) => {
    if (!manifest) return;
    
    const scene = manifest.scenes.find(s => s.id === sceneId);
    if (!scene || !scene.assets.img_start) return;
    
    setGenerating(true);
    setError(null);
    
    try {
      updateScene(sceneId, { status: 'queued' });
      
      const request: RenderVideoRequest = {
        sceneId,
        projectId: manifest.project_id,
        img_start: scene.assets.img_start,
        img_end: scene.assets.img_end,
        duration: scene.duration,
      };
      
      const result = await renderVideo(request);
      
      updateScene(sceneId, {
        assets: {
          ...scene.assets,
          video: result.video,
        },
        status: 'ready',
      });
      
      console.info('[SCENES] Video regenerated:', sceneId);
    } catch (err) {
      console.error('[SCENES] Error regenerating video:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      updateScene(sceneId, { status: 'error' });
    } finally {
      setGenerating(false);
    }
  };
  
  /**
   * Substitui cena com stock footage
   */
  const replaceWithHybrid = async (
    sceneId: string,
    query: string,
    source: 'pexels' | 'youtube' | 'tiktok' = 'pexels'
  ) => {
    if (!manifest) return;
    
    const scene = manifest.scenes.find(s => s.id === sceneId);
    if (!scene) return;
    
    setGenerating(true);
    setError(null);
    
    try {
      updateScene(sceneId, { status: 'queued', mode: 'hybrid' });
      
      const request: HybridReplaceRequest = {
        sceneId,
        query,
        source,
        duration: scene.duration,
      };
      
      const result = await hybridReplace(request);
      
      updateScene(sceneId, {
        mode: 'hybrid',
        hybrid: {
          query,
          source,
          url: result.url,
        },
        assets: {
          ...scene.assets,
          video: result.video,
        },
        status: 'ready',
      });
      
      console.info('[SCENES] Replaced with hybrid:', sceneId);
    } catch (err) {
      console.error('[SCENES] Error replacing with hybrid:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      updateScene(sceneId, { status: 'error' });
    } finally {
      setGenerating(false);
    }
  };
  
  // ============================================================================
  // OPERAÇÕES DE CENA
  // ============================================================================
  
  /**
   * Adiciona nova cena
   */
  const createScene = () => {
    const scene = createMockScene();
    addScene(scene);
    selectScene(scene.id);
    console.info('[SCENES] Scene created:', scene.id);
  };
  
  /**
   * Remove cena
   */
  const removeScene = (sceneId: string) => {
    deleteScene(sceneId);
    if (selectedSceneId === sceneId) {
      selectScene(null);
    }
    console.info('[SCENES] Scene deleted:', sceneId);
  };
  
  /**
   * Duplica cena
   */
  const duplicateScene = (sceneId: string) => {
    if (!manifest) return;
    
    const scene = manifest.scenes.find(s => s.id === sceneId);
    if (!scene) return;
    
    const duplicate: VFScene = {
      ...scene,
      id: `${scene.id}_copy_${Date.now()}`,
      version: 1,
      status: 'queued',
      assets: {},
    };
    
    addScene(duplicate);
    console.info('[SCENES] Scene duplicated:', sceneId);
  };
  
  /**
   * Trava/destrava seed
   */
  const toggleSeedLock = (sceneId: string) => {
    if (!manifest) return;
    
    const scene = manifest.scenes.find(s => s.id === sceneId);
    if (!scene) return;
    
    const isLocked = scene.status === 'locked';
    updateScene(sceneId, {
      status: isLocked ? 'ready' : 'locked',
    });
    
    console.info('[SCENES] Seed lock toggled:', sceneId, !isLocked);
  };
  
  return {
    scenes: manifest?.scenes || [],
    selectedScene,
    selectedSceneId,
    isGenerating,
    error,
    
    // Selection
    selectScene,
    
    // Generation
    regenerateImages,
    regenerateVideo,
    replaceWithHybrid,
    
    // Scene operations
    createScene,
    removeScene,
    duplicateScene,
    toggleSeedLock,
    updateScene,
  };
}

