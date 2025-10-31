/**
 * Step 3 - Geração de Ideias
 */

'use client';

import { useN8n } from '@/hooks/useN8n';
import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

export default function Step3_GenerateIdeas() {
  const { channelId, ideas, setIdeas, selectedIdeaId, selectIdea } = useProductionWorkflowStore();
  const { isLoading, triggerGenerateIdeas } = useN8n();
  
  const handleGenerate = async () => {
    if (!channelId) return;
    const generated = await triggerGenerateIdeas(channelId, 5);
    setIdeas(generated);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Geração de Ideias</h2>
      
      <div className="flex gap-4 mb-8">
        <Button 
          variant="primary" 
          size="lg"
          onClick={handleGenerate}
          isLoading={isLoading}
        >
          🎯 Gerar Ideias com IA
        </Button>
        
        {ideas.length > 0 && (
          <Button variant="outline" onClick={handleGenerate} isLoading={isLoading}>
            ⟳ Regenerar
          </Button>
        )}
      </div>
      
      {ideas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300">Ideias Geradas:</h3>
          {ideas.map(idea => (
            <Card 
              key={idea.id}
              padding="md"
              className={selectedIdeaId === idea.id ? 'border-primary' : ''}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold">{idea.title}</h4>
                <div className="text-sm text-gray-500">
                  Interesse: {idea.interestScore}%
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-3">{idea.justification}</p>
              
              <ul className="text-sm text-gray-500 mb-4 space-y-1">
                {idea.keyPoints.map((point, idx) => (
                  <li key={idx}>• {point}</li>
                ))}
              </ul>
              
              <Button 
                size="sm"
                variant={selectedIdeaId === idea.id ? 'primary' : 'outline'}
                onClick={() => selectIdea(idea.id)}
              >
                {selectedIdeaId === idea.id ? '✓ Selecionada' : 'Usar Esta Ideia'}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

