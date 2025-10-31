/**
 * Hook useN8n - Simulação de chamadas para n8n (Mock para Fase 1)
 */

'use client';

import { useState } from 'react';
import { generateIdeas, generateScript, generateScenes } from '@/lib/api';

export function useN8n() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Gera ideias para o canal
   */
  const triggerGenerateIdeas = async (channelId: string, count: number = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateIdeas(channelId, count);
      console.info('[N8N] Ideas generated:', result.ideas.length);
      return result.ideas;
    } catch (err) {
      console.error('[N8N] Error generating ideas:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Gera roteiro baseado em ideia
   */
  const triggerGenerateScript = async (ideaTitle: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateScript(ideaTitle);
      console.info('[N8N] Script generated');
      return result;
    } catch (err) {
      console.error('[N8N] Error generating script:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Gera cenas a partir de beats do roteiro
   */
  const triggerGenerateScenes = async (scriptBeats: any[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateScenes(scriptBeats);
      console.info('[N8N] Scenes generated:', result.scenes.length);
      return result.scenes;
    } catch (err) {
      console.error('[N8N] Error generating scenes:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    error,
    triggerGenerateIdeas,
    triggerGenerateScript,
    triggerGenerateScenes,
  };
}

