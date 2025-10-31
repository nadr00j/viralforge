/**
 * Timeline - Timeline horizontal de cenas
 */

'use client';

import { useScenes } from '@/hooks/useScenes';
import { useManifest } from '@/hooks/useManifest';
import Card from '@/components/UI/Card';
import { cn, formatDuration, getStatusColor } from '@/lib/utils';

export default function Timeline() {
  const { scenes, selectedSceneId, selectScene } = useScenes();
  const { totalDuration } = useManifest();
  
  if (scenes.length === 0) {
    return (
      <Card className="p-8 text-center">
        <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-400">Timeline vazia - adicione cenas</p>
      </Card>
    );
  }
  
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300">Timeline</h3>
        <span className="text-xs text-gray-500">
          Duração total: {formatDuration(totalDuration)}
        </span>
      </div>
      
      <div className="relative h-24 bg-dark-800 rounded-lg overflow-x-auto">
        <div className="flex h-full min-w-full">
          {scenes.map((scene, index) => {
            const widthPercent = (scene.duration / totalDuration) * 100;
            
            return (
              <div
                key={scene.id}
                className={cn(
                  'flex-shrink-0 h-full border-r-2 border-dark-950 cursor-pointer transition-all',
                  'hover:opacity-80',
                  selectedSceneId === scene.id && 'ring-2 ring-primary ring-inset'
                )}
                style={{
                  width: `${widthPercent}%`,
                  minWidth: '60px',
                  backgroundColor: getStatusColor(scene.status),
                  opacity: selectedSceneId === scene.id ? 1 : 0.6,
                }}
                onClick={() => selectScene(scene.id)}
              >
                <div className="p-2 flex flex-col justify-between h-full">
                  <span className="text-xs font-semibold text-white truncate">
                    {scene.id}
                  </span>
                  <span className="text-xs text-white/80">
                    {scene.duration}s
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Time markers */}
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>0:00</span>
        <span>{formatDuration(totalDuration)}</span>
      </div>
    </Card>
  );
}

