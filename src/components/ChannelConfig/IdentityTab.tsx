/**
 * Aba Identity - Identidade do Canal
 */

'use client';

import { useChannelStore } from '@/store/useChannelStore';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/Card';
import Input from '@/components/UI/Input';
import Textarea from '@/components/UI/Textarea';

export default function IdentityTab() {
  const { activeChannel, updateChannel } = useChannelStore();
  
  if (!activeChannel) return null;
  
  const { identity } = activeChannel;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Defina a identidade e posicionamento do seu canal
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Input
            label="Nome do Canal"
            value={activeChannel.name}
            onChange={(e) => updateChannel({ name: e.target.value })}
            placeholder="Ex: Tech Curios BR"
          />
          
          <Input
            label="Nicho"
            value={identity.niche}
            onChange={(e) => updateChannel({
              identity: { ...identity, niche: e.target.value }
            })}
            placeholder="Ex: Tecnologia e Curiosidades"
          />
          
          <Input
            label="Categoria"
            value={identity.category}
            onChange={(e) => updateChannel({
              identity: { ...identity, category: e.target.value }
            })}
            placeholder="Ex: Educação"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Idioma"
              value={identity.language}
              onChange={(e) => updateChannel({
                identity: { ...identity, language: e.target.value }
              })}
              placeholder="pt-BR"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Formato
              </label>
              <select
                value={identity.format}
                onChange={(e) => updateChannel({
                  identity: { ...identity, format: e.target.value as any }
                })}
                className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="shorts">Shorts</option>
                <option value="long-form">Long-form</option>
                <option value="hybrid">Híbrido</option>
              </select>
            </div>
          </div>
          
          <Textarea
            label="Descrição do Canal"
            value={identity.description}
            onChange={(e) => updateChannel({
              identity: { ...identity, description: e.target.value }
            })}
            placeholder="Descreva o propósito e estilo do seu canal..."
            rows={4}
            maxLength={500}
            showCharCount
          />
          
          <Textarea
            label="Persona"
            value={identity.persona}
            onChange={(e) => updateChannel({
              identity: { ...identity, persona: e.target.value }
            })}
            placeholder="Defina a personalidade do apresentador..."
            rows={3}
            maxLength={300}
            showCharCount
            helperText="Como você quer que o público perceba o canal?"
          />
        </CardContent>
      </Card>
    </div>
  );
}

