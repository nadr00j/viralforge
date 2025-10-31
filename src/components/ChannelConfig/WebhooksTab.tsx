/**
 * Aba Webhooks - Configuração de webhooks n8n
 */

'use client';

import { useState } from 'react';
import { useChannelStore } from '@/store/useChannelStore';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/Card';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Badge from '@/components/UI/Badge';
import { formatTimestamp } from '@/lib/utils';

export default function WebhooksTab() {
  const { activeChannel, updateChannel } = useChannelStore();
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
  
  if (!activeChannel) return null;
  
  const { webhooks } = activeChannel;
  const webhook = webhooks[0]; // Por simplicidade, usando primeiro webhook
  
  if (!webhook) return <div>Nenhum webhook configurado</div>;
  
  const testWebhook = async (endpoint: string) => {
    setTestingEndpoint(endpoint);
    console.info('[WEBHOOK] Testing:', endpoint);
    
    // Mock de teste
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTestingEndpoint(null);
    alert('Webhook testado com sucesso! (Mock)');
  };
  
  const toggleActive = () => {
    const updatedWebhooks = [...webhooks];
    updatedWebhooks[0] = { ...webhook, active: !webhook.active };
    updateChannel({ webhooks: updatedWebhooks });
  };
  
  const updateEndpoint = (key: keyof typeof webhook.endpoints, value: string) => {
    const updatedWebhooks = [...webhooks];
    updatedWebhooks[0] = {
      ...webhook,
      endpoints: {
        ...webhook.endpoints,
        [key]: value,
      },
    };
    updateChannel({ webhooks: updatedWebhooks });
  };
  
  const endpoints = [
    { key: 'ideas', label: 'Geração de Ideias', icon: '💡' },
    { key: 'script', label: 'Geração de Roteiro', icon: '📝' },
    { key: 'scenes', label: 'Geração de Cenas', icon: '🎬' },
    { key: 'render_image', label: 'Render de Imagens', icon: '🖼️' },
    { key: 'render_video', label: 'Render de Vídeos', icon: '🎥' },
    { key: 'hybrid_replace', label: 'Substituição Híbrida', icon: '🔄' },
  ] as const;
  
  return (
    <div className="space-y-6">
      {/* Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Status dos Webhooks</CardTitle>
              <CardDescription>
                Estilo: {webhook.style}
              </CardDescription>
            </div>
            
            <Button
              variant={webhook.active ? 'danger' : 'primary'}
              onClick={toggleActive}
            >
              {webhook.active ? 'Desativar' : 'Ativar'}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge
              variant={webhook.active ? 'success' : 'default'}
              dot
              size="lg"
            >
              {webhook.active ? 'Webhooks Ativos' : 'Webhooks Inativos'}
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      {/* Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Endpoints n8n</CardTitle>
          <CardDescription>
            Configure as URLs dos webhooks para cada operação
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {endpoints.map(({ key, label, icon }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{icon}</span>
                <label className="text-sm font-medium text-gray-300">
                  {label}
                </label>
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={webhook.endpoints[key]}
                  onChange={(e) => updateEndpoint(key, e.target.value)}
                  placeholder={`http://localhost:5678/webhook/${activeChannel.id}/${key}`}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="md"
                  isLoading={testingEndpoint === key}
                  onClick={() => testWebhook(key)}
                >
                  Testar
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Chamadas</CardTitle>
          <CardDescription>
            Histórico recente de webhooks executados
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!webhook.last_calls || webhook.last_calls.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">Nenhuma chamada registrada</p>
            </div>
          ) : (
            <div className="space-y-2">
              {webhook.last_calls.map((call, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-dark-800 border border-dark-600 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={call.status === 'success' ? 'success' : 'danger'}
                      dot
                    >
                      {call.endpoint}
                    </Badge>
                  </div>
                  
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(call.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

