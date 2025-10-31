/**
 * Step 2 - Seleção de Estilo de Vídeo
 */

'use client';

import { useChannelStore } from '@/store/useChannelStore';
import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import Badge from '@/components/UI/Badge';

export default function Step2_SelectVideoStyle() {
  const { activeChannel } = useChannelStore();
  const { videoStyleId, setVideoStyle } = useProductionWorkflowStore();
  
  if (!activeChannel) return null;
  
  const styles = activeChannel.videoStyles || [];
  
  if (styles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">Nenhum estilo de vídeo configurado para este canal</p>
        <p className="text-sm text-gray-500">Configure estilos na página de configuração do canal</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Escolha o Estilo de Vídeo</h2>
      <div className="grid grid-cols-2 gap-6">
        {styles.map(style => (
          <Card 
            key={style.id} 
            padding="lg"
            className={videoStyleId === style.id ? 'border-primary' : ''}
          >
            <h3 className="text-xl font-semibold mb-2">{style.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{style.description}</p>
            
            <div className="flex gap-2 mb-4">
              <Badge variant="default">{style.format}</Badge>
              {style.withNarration && <Badge variant="secondary">Com Narração</Badge>}
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              Duração típica: ~{style.typicalDuration}s
            </div>
            
            <Button 
              size="sm" 
              variant={videoStyleId === style.id ? 'primary' : 'outline'}
              onClick={() => setVideoStyle(style.id)}
            >
              {videoStyleId === style.id ? 'Selecionado' : 'Usar Este'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

