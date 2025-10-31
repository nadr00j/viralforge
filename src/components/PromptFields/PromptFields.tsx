/**
 * PromptFields - Campos de edição de prompts e metadados
 */

'use client';

import { useScenes } from '@/hooks/useScenes';
import { useManifest } from '@/hooks/useManifest';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import Textarea from '@/components/UI/Textarea';
import Input from '@/components/UI/Input';

export default function PromptFields() {
  const { selectedScene } = useScenes();
  const { updateScene } = useManifest();
  
  if (!selectedScene) return null;
  
  const handleUpdate = (field: string, value: any) => {
    updateScene(selectedScene.id, { [field]: value });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Prompts & Configurações</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Prompt Start */}
        <Textarea
          label="Prompt Start"
          value={selectedScene.prompt_start || ''}
          onChange={(e) => handleUpdate('prompt_start', e.target.value)}
          placeholder="Descreva a imagem inicial..."
          rows={3}
          autoResize
          maxLength={500}
          showCharCount
        />
        
        {/* Prompt End (apenas para mode=image) */}
        {selectedScene.mode === 'image' && (
          <Textarea
            label="Prompt End (Opcional)"
            value={selectedScene.prompt_end || ''}
            onChange={(e) => handleUpdate('prompt_end', e.target.value)}
            placeholder="Descreva a imagem final..."
            rows={3}
            autoResize
            maxLength={500}
            showCharCount
            helperText="Deixe vazio para usar apenas Start"
          />
        )}
        
        {/* Duration */}
        <Input
          label="Duração (segundos)"
          type="number"
          min={0.5}
          max={10}
          step={0.5}
          value={selectedScene.duration}
          onChange={(e) => handleUpdate('duration', parseFloat(e.target.value))}
        />
        
        {/* Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Modo de Geração
          </label>
          <select
            value={selectedScene.mode}
            onChange={(e) => handleUpdate('mode', e.target.value)}
            className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="image">Image (IA)</option>
            <option value="hybrid">Hybrid (Stock)</option>
            <option value="direct">Direct (Manual)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {selectedScene.mode === 'image' && 'Gera imagens com IA (ComfyUI)'}
            {selectedScene.mode === 'hybrid' && 'Busca em bibliotecas de stock'}
            {selectedScene.mode === 'direct' && 'Upload manual de assets'}
          </p>
        </div>
        
        {/* Seed (apenas se tiver) */}
        {selectedScene.seed && (
          <Input
            label="Seed"
            type="number"
            value={selectedScene.seed}
            onChange={(e) => handleUpdate('seed', parseInt(e.target.value))}
            helperText="Seed fixo para reproduzibilidade"
          />
        )}
        
        {/* Notes */}
        <Textarea
          label="Notas (Opcional)"
          value={selectedScene.notes || ''}
          onChange={(e) => handleUpdate('notes', e.target.value)}
          placeholder="Anotações sobre esta cena..."
          rows={2}
          maxLength={200}
          showCharCount
        />
      </CardContent>
    </Card>
  );
}

