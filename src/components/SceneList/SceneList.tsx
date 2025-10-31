/**
 * SceneList - Lista de Cenas (Sidebar Esquerda)
 */

'use client';

import { useScenes } from '@/hooks/useScenes';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import Badge, { getStatusBadgeVariant } from '@/components/UI/Badge';
import ImagePlaceholder from '@/components/UI/ImagePlaceholder';
import { cn } from '@/lib/utils';

export default function SceneList() {
  const { scenes, selectedSceneId, selectScene, createScene } = useScenes();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-100">Cenas</h2>
        <Button size="sm" onClick={createScene}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Button>
      </div>
      
      <div className="space-y-2">
        {scenes.length === 0 ? (
          <Card className="text-center py-8">
            <div className="text-gray-500">
              <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <p className="text-sm">Nenhuma cena</p>
            </div>
          </Card>
        ) : (
          scenes.map((scene) => (
            <Card
              key={scene.id}
              padding="sm"
              className={cn(
                'cursor-pointer transition-all hover:border-primary/50',
                selectedSceneId === scene.id && 'border-primary bg-dark-800'
              )}
              onClick={() => selectScene(scene.id)}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 flex-shrink-0">
                  {scene.assets.img_start ? (
                    <img
                      src={scene.assets.img_start}
                      alt={scene.id}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark-800 rounded" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-200">
                      {scene.id}
                    </span>
                    <Badge size="sm" variant={getStatusBadgeVariant(scene.status)}>
                      {scene.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{scene.duration}s</span>
                    <span>•</span>
                    <span>{scene.mode}</span>
                    {scene.version > 1 && (
                      <>
                        <span>•</span>
                        <span>v{scene.version}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

