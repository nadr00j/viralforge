/**
 * Step 4 - Geração de Roteiro
 */

'use client';

import { useN8n } from '@/hooks/useN8n';
import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import Textarea from '@/components/UI/Textarea';

export default function Step4_GenerateScript() {
  const { ideas, selectedIdeaId, script, setScript } = useProductionWorkflowStore();
  const { isLoading, triggerGenerateScript } = useN8n();
  
  const selectedIdea = ideas.find(i => i.id === selectedIdeaId);
  
  const handleGenerate = async () => {
    if (!selectedIdea) return;
    const generated = await triggerGenerateScript(selectedIdea.title);
    if (generated) setScript(generated);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Geração de Roteiro</h2>
      
      {selectedIdea && (
        <Card padding="sm" className="mb-6">
          <p className="text-sm text-gray-400">Ideia Selecionada:</p>
          <h3 className="text-lg font-semibold">{selectedIdea.title}</h3>
        </Card>
      )}
      
      <Button 
        variant="primary" 
        size="lg"
        onClick={handleGenerate}
        isLoading={isLoading}
        className="mb-8"
      >
        📝 Gerar Roteiro
      </Button>
      
      {script && (
        <div className="space-y-6">
          <Card padding="md">
            <h3 className="text-xl font-semibold mb-4">{script.title}</h3>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Beats:</h4>
              {script.beats.map((beat, idx) => (
                <div key={idx} className="flex gap-4 text-sm mb-2">
                  <span className="text-gray-500 w-12">{beat.t.toFixed(1)}s</span>
                  <span className="text-gray-300">{beat.text}</span>
                </div>
              ))}
            </div>
            
            <Textarea
              label="Texto para Narração"
              value={script.fullText}
              onChange={(e) => setScript({ ...script, fullText: e.target.value })}
              rows={8}
            />
            
            <p className="text-sm text-gray-500 mt-4">
              Duração Estimada: ~{script.estimatedDuration}s
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

