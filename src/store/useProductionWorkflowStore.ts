/**
 * Store Zustand - Gerenciamento do Workflow de Produção
 */

import { create } from 'zustand';
import type { Idea, Script, VFManifest, ProductionWorkflowState } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface WorkflowStore extends ProductionWorkflowState {
  setStep: (step: number) => void;
  setChannel: (channelId: string) => void;
  setVideoStyle: (styleId: string) => void;
  setIdeas: (ideas: Idea[]) => void;
  selectIdea: (ideaId: string) => void;
  setScript: (script: Script) => void;
  setManifest: (manifest: VFManifest) => void;
  nextStep: () => void;
  prevStep: () => void;
  canAdvance: () => boolean;
  reset: () => void;
  saveToStorage: () => void;
  loadFromStorage: (id: string) => void;
}

const initialState: ProductionWorkflowState = {
  id: generateId('prod'),
  currentStep: 1,
  channelId: null,
  videoStyleId: null,
  ideas: [],
  selectedIdeaId: null,
  script: null,
  manifest: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useProductionWorkflowStore = create<WorkflowStore>((set, get) => ({
  ...initialState,
  
  setStep: (step) => {
    set({ currentStep: step, updatedAt: new Date().toISOString() });
    get().saveToStorage();
  },
  
  setChannel: (channelId) => {
    set({ channelId, updatedAt: new Date().toISOString() });
    get().saveToStorage();
  },
  
  setVideoStyle: (styleId) => {
    set({ videoStyleId: styleId, updatedAt: new Date().toISOString() });
    get().saveToStorage();
  },
  
  setIdeas: (ideas) => {
    set({ ideas, updatedAt: new Date().toISOString() });
    get().saveToStorage();
  },
  
  selectIdea: (ideaId) => {
    set({ selectedIdeaId: ideaId, updatedAt: new Date().toISOString() });
    get().saveToStorage();
  },
  
  setScript: (script) => {
    set({ script, updatedAt: new Date().toISOString() });
    get().saveToStorage();
  },
  
  setManifest: (manifest) => {
    set({ manifest, updatedAt: new Date().toISOString() });
    get().saveToStorage();
  },
  
  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 7) {
      get().setStep(currentStep + 1);
    }
  },
  
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      get().setStep(currentStep - 1);
    }
  },
  
  canAdvance: () => {
    const state = get();
    switch (state.currentStep) {
      case 1: return !!state.channelId;
      case 2: return !!state.videoStyleId;
      case 3: return !!state.selectedIdeaId;
      case 4: return !!state.script;
      case 5: return !!state.manifest;
      case 6: return true;
      default: return false;
    }
  },
  
  reset: () => set({ ...initialState, id: generateId('prod') }),
  
  saveToStorage: () => {
    const state = get();
    const key = `vf_workflow_${state.id}`;
    localStorage.setItem(key, JSON.stringify(state));
  },
  
  loadFromStorage: (id: string) => {
    const key = `vf_workflow_${id}`;
    const data = localStorage.getItem(key);
    if (data) {
      set(JSON.parse(data));
    }
  },
}));

