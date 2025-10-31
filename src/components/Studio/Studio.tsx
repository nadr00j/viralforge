/**
 * Studio - Componente principal do Viral Forge Studio
 * 
 * Orquestra todos os componentes da interface:
 * - Header com informações do projeto
 * - Timeline com visualização das cenas
 * - Preview da cena selecionada
 * - Ações e controles das cenas
 */

'use client';

import { useEffect } from 'react';
import { useManifestStore } from '@/store/useManifestStore';
import { useSceneStore } from '@/store/useSceneStore';
import StudioHeader from './StudioHeader';
import SceneMetadata from './SceneMetadata';
import Timeline from '../Timeline/Timeline';
import SceneList from '../SceneList/SceneList';
import ScenePreview from '../Preview/ScenePreview';
import SceneActions from '../SceneActions/SceneActions';
import PromptFields from '../PromptFields/PromptFields';

export function Studio() {
  const { manifest, loadManifest } = useManifestStore();
  const { selectedSceneId } = useSceneStore();
  
  // Carrega o manifest na inicialização
  useEffect(() => {
    if (!manifest) {
      console.info('[STUDIO] Initializing with demo manifest');
      loadManifest('ch1'); // Carrega o projeto demo
    }
  }, [manifest, loadManifest]);
  
  // Loading state
  if (!manifest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando projeto...</p>
        </div>
      </div>
    );
  }
  
  const selectedScene = manifest.scenes.find(s => s.id === selectedSceneId);
  
  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 flex flex-col">
      {/* Header */}
      <StudioHeader />
      
      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Timeline - Topo */}
        <div className="border-b border-gray-800 bg-dark-900">
          <Timeline />
        </div>
        
        {/* Conteúdo Principal - Dividido em 3 colunas */}
        <div className="flex-1 flex overflow-hidden">
          {/* Coluna Esquerda - Lista de Cenas */}
          <div className="w-80 border-r border-gray-800 bg-dark-900 overflow-y-auto">
            <SceneList />
          </div>
          
          {/* Coluna Central - Preview e Metadata */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {selectedScene ? (
              <>
                {/* Preview da Cena */}
                <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                  <ScenePreview />
                </div>
                
                {/* Metadata e Prompts */}
                <div className="border-t border-gray-800 bg-dark-900 p-6 overflow-y-auto max-h-[40vh]">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <SceneMetadata />
                    <PromptFields />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">Nenhuma cena selecionada</p>
                  <p className="text-sm text-gray-600">
                    Selecione uma cena na lista à esquerda ou na timeline acima
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Coluna Direita - Ações */}
          <div className="w-80 border-l border-gray-800 bg-dark-900 overflow-y-auto">
            {selectedScene ? (
              <SceneActions />
            ) : (
              <div className="p-6 text-center text-gray-600">
                <p className="text-sm">Selecione uma cena para ver as ações disponíveis</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Status Bar - Rodapé */}
      <div className="border-t border-gray-800 bg-dark-950 px-6 py-2 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>Projeto: {manifest.project_id}</span>
          <span className="text-gray-700">|</span>
          <span>{manifest.scenes.length} cenas</span>
          <span className="text-gray-700">|</span>
          <span>
            {manifest.scenes.reduce((sum, s) => sum + s.duration, 0).toFixed(1)}s total
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Pronto</span>
        </div>
      </div>
    </div>
  );
}

