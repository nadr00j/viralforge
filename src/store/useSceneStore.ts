/**
 * Store Zustand - Gerenciamento de Cenas
 */

import { create } from 'zustand';
import type { VFScene } from '@/lib/types';

interface SceneState {
  selectedSceneId: string | null;
  isGenerating: boolean;
  
  // Actions
  selectScene: (sceneId: string | null) => void;
  setGenerating: (isGenerating: boolean) => void;
  
  // Reset
  reset: () => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  selectedSceneId: null,
  isGenerating: false,
  
  selectScene: (sceneId: string | null) => {
    console.info('[STORE] Scene selected:', sceneId);
    set({ selectedSceneId: sceneId });
  },
  
  setGenerating: (isGenerating: boolean) => {
    set({ isGenerating });
  },
  
  reset: () => {
    set({
      selectedSceneId: null,
      isGenerating: false,
    });
  },
}));

