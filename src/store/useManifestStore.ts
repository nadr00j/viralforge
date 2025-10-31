/**
 * Store Zustand - Gerenciamento do Manifest
 */

import { create } from 'zustand';
import type { VFManifest, VFScene } from '@/lib/types';
import { saveManifest, loadManifest } from '@/lib/localStorage';
import { demoManifest } from '@/lib/mocks';

interface ManifestState {
  manifest: VFManifest | null;
  isSaving: boolean;
  lastSaved: string | null;
  
  // Actions
  loadManifest: (projectId: string) => void;
  setManifest: (manifest: VFManifest) => void;
  updateManifest: (updates: Partial<VFManifest>) => void;
  saveToStorage: () => void;
  
  // Scene operations
  updateScene: (sceneId: string, updates: Partial<VFScene>) => void;
  addScene: (scene: VFScene) => void;
  deleteScene: (sceneId: string) => void;
  reorderScenes: (scenes: VFScene[]) => void;
  
  // Script operations
  updateScriptTitle: (title: string) => void;
  
  // Reset
  reset: () => void;
}

export const useManifestStore = create<ManifestState>((set, get) => ({
  manifest: null,
  isSaving: false,
  lastSaved: null,
  
  // ============================================================================
  // MANIFEST OPERATIONS
  // ============================================================================
  
  loadManifest: (projectId: string) => {
    console.info('[STORE] Loading manifest:', projectId);
    const loaded = loadManifest(projectId);
    
    if (loaded) {
      set({ manifest: loaded });
    } else {
      // Se não encontrar, usa demo
      console.warn('[STORE] Manifest not found, using demo');
      set({ manifest: demoManifest });
    }
  },
  
  setManifest: (manifest: VFManifest) => {
    set({ manifest });
  },
  
  updateManifest: (updates: Partial<VFManifest>) => {
    const { manifest } = get();
    if (!manifest) return;
    
    const updated = { ...manifest, ...updates };
    set({ manifest: updated });
    
    // Auto-save
    setTimeout(() => get().saveToStorage(), 100);
  },
  
  saveToStorage: () => {
    const { manifest } = get();
    if (!manifest) return;
    
    set({ isSaving: true });
    
    try {
      saveManifest(manifest);
      set({
        isSaving: false,
        lastSaved: new Date().toISOString(),
      });
      console.info('[STORE] Manifest saved successfully');
    } catch (error) {
      console.error('[STORE] Error saving manifest:', error);
      set({ isSaving: false });
    }
  },
  
  // ============================================================================
  // SCENE OPERATIONS
  // ============================================================================
  
  updateScene: (sceneId: string, updates: Partial<VFScene>) => {
    const { manifest } = get();
    if (!manifest) return;
    
    const scenes = manifest.scenes.map(scene =>
      scene.id === sceneId ? { ...scene, ...updates } : scene
    );
    
    get().updateManifest({ scenes });
  },
  
  addScene: (scene: VFScene) => {
    const { manifest } = get();
    if (!manifest) return;
    
    const scenes = [...manifest.scenes, scene];
    get().updateManifest({ scenes });
  },
  
  deleteScene: (sceneId: string) => {
    const { manifest } = get();
    if (!manifest) return;
    
    const scenes = manifest.scenes.filter(scene => scene.id !== sceneId);
    get().updateManifest({ scenes });
  },
  
  reorderScenes: (scenes: VFScene[]) => {
    get().updateManifest({ scenes });
  },
  
  // ============================================================================
  // SCRIPT OPERATIONS
  // ============================================================================
  
  updateScriptTitle: (title: string) => {
    const { manifest } = get();
    if (!manifest) return;
    
    get().updateManifest({
      script: { ...manifest.script, title },
    });
  },
  
  // ============================================================================
  // RESET
  // ============================================================================
  
  reset: () => {
    set({
      manifest: null,
      isSaving: false,
      lastSaved: null,
    });
  },
}));

