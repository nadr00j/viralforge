/**
 * Hook useManifest - Wrapper para useManifestStore com lógica adicional
 */

'use client';

import { useEffect } from 'react';
import { useManifestStore } from '@/store/useManifestStore';
import { APP_CONFIG } from '@/lib/config';
import { debounce } from '@/lib/utils';
import type { VFManifest } from '@/lib/types';

export function useManifest(projectId?: string) {
  const {
    manifest,
    isSaving,
    lastSaved,
    loadManifest,
    setManifest,
    updateManifest,
    saveToStorage,
    updateScene,
    addScene,
    deleteScene,
    reorderScenes,
    updateScriptTitle,
  } = useManifestStore();
  
  // Carrega manifest ao montar (se projectId fornecido)
  useEffect(() => {
    if (projectId && !manifest) {
      loadManifest(projectId);
    }
  }, [projectId, manifest, loadManifest]);
  
  // Auto-save debounced
  const debouncedSave = debounce(() => {
    if (manifest && APP_CONFIG.autoSave.enabled) {
      saveToStorage();
    }
  }, APP_CONFIG.autoSave.debounceMs);
  
  // Trigger auto-save quando manifest mudar
  useEffect(() => {
    if (manifest) {
      debouncedSave();
    }
  }, [manifest]);
  
  return {
    manifest,
    isSaving,
    lastSaved,
    
    // Actions
    loadManifest,
    setManifest,
    updateManifest,
    saveManifest: saveToStorage,
    
    // Scene operations
    updateScene,
    addScene,
    deleteScene,
    reorderScenes,
    
    // Script operations
    updateScriptTitle,
    
    // Helpers
    hasManifest: !!manifest,
    projectId: manifest?.project_id,
    scenes: manifest?.scenes || [],
    totalDuration: manifest?.scenes.reduce((acc, scene) => acc + scene.duration, 0) || 0,
  };
}

