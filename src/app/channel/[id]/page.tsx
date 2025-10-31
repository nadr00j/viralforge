/**
 * Página de Configuração do Canal
 * 4 Abas: Identity, Voice & Style, References, Webhooks
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChannelStore } from '@/store/useChannelStore';
import Button from '@/components/UI/Button';
import Tabs, { TabsContent, TabsList, TabsTrigger } from '@/components/UI/Tabs';
import IdentityTab from '@/components/ChannelConfig/IdentityTab';
import VoiceStyleTab from '@/components/ChannelConfig/VoiceStyleTab';
import ReferencesTab from '@/components/ChannelConfig/ReferencesTab';
import WebhooksTab from '@/components/ChannelConfig/WebhooksTab';
import VideoStylesTab from '@/components/ChannelConfig/VideoStylesTab';

export default function ChannelConfigPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { activeChannel, loadChannel } = useChannelStore();
  const [activeTab, setActiveTab] = useState('identity');
  
  useEffect(() => {
    loadChannel(params.id);
  }, [params.id, loadChannel]);
  
  if (!activeChannel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Carregando configurações...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
              onClick={() => router.push('/')}
            >
              Voltar
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-100 mt-4">
              {activeChannel.name}
            </h1>
            <p className="text-gray-400 mt-1">
              Configurações do Canal
            </p>
          </div>
          
          <Button
            size="lg"
            onClick={() => router.push(`/channel/${params.id}/studio`)}
            rightIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            }
          >
            Abrir Studio
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="identity">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              Identidade
            </TabsTrigger>
            
            <TabsTrigger value="voice-style">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Voz & Estilo
            </TabsTrigger>
            
            <TabsTrigger value="references">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Referências
            </TabsTrigger>
            
            <TabsTrigger value="webhooks">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Webhooks
            </TabsTrigger>
            
            <TabsTrigger value="video-styles">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Estilos de Vídeo
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="identity">
            <IdentityTab />
          </TabsContent>
          
          <TabsContent value="voice-style">
            <VoiceStyleTab />
          </TabsContent>
          
          <TabsContent value="references">
            <ReferencesTab />
          </TabsContent>
          
          <TabsContent value="webhooks">
            <WebhooksTab />
          </TabsContent>
          
          <TabsContent value="video-styles">
            <VideoStylesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

