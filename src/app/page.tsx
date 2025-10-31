'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChannelStore } from '@/store/useChannelStore';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import Badge from '@/components/UI/Badge';

export default function HomePage() {
  const router = useRouter();
  const { channels, loadChannels } = useChannelStore();
  
  useEffect(() => {
    loadChannels();
  }, [loadChannels]);
  
  return (
    <div className="min-h-screen bg-dark-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Viral Forge Studio</h1>
            <p className="text-gray-400">Seus Canais de Produção</p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="ghost"
              onClick={() => router.push('/debug/studio')}
            >
              Debug: Studio Direto
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/channel/new')}
              disabled
            >
              + Criar Novo Canal
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {channels.map(channel => (
            <Card key={channel.id} padding="lg" className="hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{channel.name}</h3>
                  <p className="text-sm text-gray-400">{channel.identity.niche}</p>
                </div>
                <Badge variant="default">{channel.platform}</Badge>
              </div>
              
              <div className="flex gap-2 mb-4 text-xs text-gray-500">
                <span>{channel.identity.format}</span>
                <span>•</span>
                <span>{channel.identity.language}</span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => router.push(`/channel/${channel.id}`)}
                >
                  Configurar
                </Button>
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => router.push(`/production/new?channel=${channel.id}`)}
                >
                  Nova Produção
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {channels.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">Nenhum canal configurado ainda</p>
            <Button variant="primary" onClick={() => router.push('/channel/new')} disabled>
              Criar Primeiro Canal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
