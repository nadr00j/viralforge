/**
 * Página Studio - Editor Principal
 * Layout 3 colunas: SceneList | Timeline + Header | Preview + Actions
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useManifest } from '@/hooks/useManifest';
import { useScenes } from '@/hooks/useScenes';
import StudioHeader from '@/components/Studio/StudioHeader';
import SceneList from '@/components/SceneList/SceneList';
import Timeline from '@/components/Timeline/Timeline';
import ScenePreview from '@/components/Preview/ScenePreview';
import PromptFields from '@/components/PromptFields/PromptFields';
import SceneActions from '@/components/SceneActions/SceneActions';
import SceneMetadata from '@/components/Studio/SceneMetadata';

export default function StudioPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { manifest, loadManifest, hasManifest } = useManifest();
  const { selectedScene, selectScene } = useScenes();
  
  useEffect(() => {
    loadManifest(params.id);
  }, [params.id, loadManifest]);
  
  // Auto-select primeira cena se nenhuma selecionada
  useEffect(() => {
    if (manifest && manifest.scenes.length > 0 && !selectedScene) {
      selectScene(manifest.scenes[0].id);
    }
  }, [manifest, selectedScene, selectScene]);
  
  if (!hasManifest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Carregando Studio...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <StudioHeader channelId={params.id} />
      
      {/* Main Layout - 3 Colunas */}
      <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-5rem)]">
        {/* Coluna Esquerda - Scene List (20%) */}
        <div className="col-span-12 lg:col-span-2 overflow-y-auto">
          <SceneList />
        </div>
        
        {/* Coluna Centro - Timeline (50%) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <Timeline />
          
          {/* Info adicional quando não há cena selecionada */}
          {!selectedScene && manifest && manifest.scenes.length === 0 && (
            <div className="flex-1 flex items-center justify-center bg-dark-900 rounded-2xl border border-dark-700">
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Nenhuma cena criada
                </h3>
                <p className="text-gray-500 mb-4">
                  Comece adicionando sua primeira cena ao projeto
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Coluna Direita - Preview + Actions (30%) */}
        <div className="col-span-12 lg:col-span-4 overflow-y-auto space-y-4">
          {selectedScene ? (
            <>
              {/* Preview Triplo */}
              <ScenePreview />
              
              {/* Metadata */}
              <SceneMetadata />
              
              {/* Prompt Fields */}
              <PromptFields />
              
              {/* Actions */}
              <SceneActions />
            </>
          ) : manifest && manifest.scenes.length > 0 ? (
            <div className="flex items-center justify-center h-full bg-dark-900 rounded-2xl border border-dark-700">
              <div className="text-center p-8">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p className="text-gray-400 text-sm">
                  Selecione uma cena na lista
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

