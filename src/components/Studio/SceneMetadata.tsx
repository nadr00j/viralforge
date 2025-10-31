/**
 * Scene Metadata - Metadados da cena selecionada
 */

'use client';

import { useScenes } from '@/hooks/useScenes';
import Card from '@/components/UI/Card';
import Badge, { getStatusBadgeVariant } from '@/components/UI/Badge';
import { getDriftColor } from '@/lib/utils';

export default function SceneMetadata() {
  const { selectedScene } = useScenes();
  
  if (!selectedScene) return null;
  
  return (
    <Card>
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Metadados</h3>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Status</span>
          <Badge variant={getStatusBadgeVariant(selectedScene.status)} dot>
            {selectedScene.status}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Modo</span>
          <Badge variant="secondary" size="sm">
            {selectedScene.mode}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Versão</span>
          <Badge variant="default" size="sm">
            v{selectedScene.version}
          </Badge>
        </div>
        
        {selectedScene.seed && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Seed</span>
            <div className="flex items-center gap-1">
              {selectedScene.status === 'locked' && (
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-xs text-gray-300 font-mono">
                {selectedScene.seed}
              </span>
            </div>
          </div>
        )}
        
        {selectedScene.drift !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Drift</span>
            <div className="flex items-center gap-2">
              <div className="w-12 h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${selectedScene.drift}%`,
                    backgroundColor: getDriftColor(selectedScene.drift),
                  }}
                />
              </div>
              <span className="text-xs text-gray-300 font-mono">
                {selectedScene.drift}%
              </span>
            </div>
          </div>
        )}
        
        {selectedScene.notes && (
          <div className="pt-2 border-t border-dark-700">
            <span className="text-xs text-gray-500 block mb-1">Notas</span>
            <p className="text-xs text-gray-400">{selectedScene.notes}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

