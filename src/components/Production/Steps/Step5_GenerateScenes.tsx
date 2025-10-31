/**
 * Step 5 - Geração de Cenas
 */

'use client';

import { useN8n } from '@/hooks/useN8n';
import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import { useManifestStore } from '@/store/useManifestStore';
import { useChannelStore } from '@/store/useChannelStore';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { demoManifest } from '@/lib/mocks';

export default function Step5_GenerateScenes() {
  const { script, manifest, setManifest, channelId } = useProductionWorkflowStore();
  const { activeChannel } = useChannelStore();
  const { isLoading, triggerGenerateScenes } = useN8n();
  const { setManifest: setGlobalManifest } = useManifestStore();
  
  const handleGenerate = async () => {
    if (!script) return;
    const scenes = await triggerGenerateScenes(script.beats);
    
    // Criar manifest completo
    const newManifest = {
      ...demoManifest,
      project_id: channelId || 'ch1',
      script,
      scenes,
      style_pack: activeChannel?.voice_style ? {
        theme: activeChannel.voice_style.theme,
        character: activeChannel.voice_style.character,
        seed: 350163,
        negative_prompts: activeChannel.voice_style.negative_prompts,
        camera: activeChannel.voice_style.camera_style,
        color_palette: activeChannel.voice_style.color_palette,
      } : demoManifest.style_pack,
    };
    
    setManifest(newManifest);
    setGlobalManifest(newManifest);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Geração de Cenas</h2>
      
      {script && (
        <Card padding="sm" className="mb-6">
          <p className="text-sm text-gray-400">Roteiro:</p>
          <h3 className="text-lg font-semibold">{script.title}</h3>
          <p className="text-sm text-gray-500">
            Duração: ~{script.estimatedDuration}s | Beats: {script.beats.length}
          </p>
        </Card>
      )}
      
      <Button 
        variant="primary" 
        size="lg"
        onClick={handleGenerate}
        isLoading={isLoading}
        className="mb-8"
      >
        🎬 Gerar Cenas Automaticamente
      </Button>
      
      {manifest && manifest.scenes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            ✓ {manifest.scenes.length} Cenas Geradas
          </h3>
          
          <div className="space-y-3">
            {manifest.scenes.map(scene => (
              <Card key={scene.id} padding="sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold">{scene.id}</span>
                    <span className="text-gray-500 ml-3">{scene.duration}s</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {scene.prompt_start}
                </p>
              </Card>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Duração Total: {manifest.scenes.reduce((sum, s) => sum + s.duration, 0).toFixed(1)}s
          </p>
        </div>
      )}
    </div>
  );
}

