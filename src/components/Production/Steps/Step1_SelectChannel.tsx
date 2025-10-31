/**
 * Step 1 - Seleção de Canal
 */

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useChannelStore } from '@/store/useChannelStore';
import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

export default function Step1_SelectChannel() {
  const searchParams = useSearchParams();
  const { channels, loadChannels, loadChannel, activeChannel } = useChannelStore();
  const { channelId, setChannel } = useProductionWorkflowStore();
  
  useEffect(() => {
    loadChannels();
    const channelParam = searchParams.get('channel');
    if (channelParam) {
      loadChannel(channelParam);
      setChannel(channelParam);
    }
  }, [searchParams, loadChannels, loadChannel, setChannel]);
  
  if (channelId && activeChannel) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Canal Selecionado</h2>
        <Card className="max-w-md mx-auto p-6">
          <h3 className="text-xl font-semibold mb-2">{activeChannel.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{activeChannel.identity.niche}</p>
          <div className="flex gap-4 text-xs text-gray-500 justify-center">
            <span>Formato: {activeChannel.identity.format}</span>
            <span>Idioma: {activeChannel.identity.language}</span>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Escolha um Canal</h2>
      <div className="grid grid-cols-3 gap-4">
        {channels.map(channel => (
          <Card key={channel.id} padding="md" className="cursor-pointer hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">{channel.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{channel.identity.niche}</p>
            <Button size="sm" onClick={() => {
              loadChannel(channel.id);
              setChannel(channel.id);
            }}>
              Selecionar
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

