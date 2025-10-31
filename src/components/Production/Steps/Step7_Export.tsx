/**
 * Step 7 - Export/Finalização
 */

'use client';

import { useRouter } from 'next/navigation';
import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import { exportManifestJSON } from '@/lib/export';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

export default function Step7_Export() {
  const router = useRouter();
  const { manifest, script, reset } = useProductionWorkflowStore();
  
  const handleExport = () => {
    if (manifest) {
      exportManifestJSON(manifest);
    }
  };
  
  const handleFinish = () => {
    reset();
    router.push('/');
  };
  
  const totalScenes = manifest?.scenes.length || 0;
  const readyScenes = manifest?.scenes.filter(s => s.status === 'ready').length || 0;
  const totalDuration = manifest?.scenes.reduce((sum, s) => sum + s.duration, 0) || 0;
  
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-4">🎉 Projeto Finalizado!</h2>
      
      <Card padding="lg" className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{script?.title || 'Projeto'}</h3>
        
        <div className="grid grid-cols-3 gap-6 text-center mb-6">
          <div>
            <div className="text-3xl font-bold text-primary">{totalScenes}</div>
            <div className="text-sm text-gray-500">Cenas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-500">{totalDuration.toFixed(1)}s</div>
            <div className="text-sm text-gray-500">Duração</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-500">{readyScenes}/{totalScenes}</div>
            <div className="text-sm text-gray-500">Prontos</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button variant="primary" size="lg" className="w-full" onClick={handleExport}>
            💾 Exportar Manifest.json
          </Button>
          
          <Button variant="outline" size="lg" className="w-full" disabled>
            🎬 Enviar para Renderização (em breve)
          </Button>
        </div>
      </Card>
      
      <Button variant="ghost" onClick={handleFinish}>
        🏁 Finalizar e Voltar ao Início
      </Button>
    </div>
  );
}

