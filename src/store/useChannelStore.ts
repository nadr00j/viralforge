/**
 * Store Zustand - Gerenciamento de Canais
 */

import { create } from 'zustand';
import type { ChannelConfig } from '@/lib/types';
import { saveChannel, loadChannel, listChannels } from '@/lib/localStorage';
import { demoChannels } from '@/lib/mocks';

interface ChannelState {
  channels: ChannelConfig[];
  activeChannel: ChannelConfig | null;
  isLoading: boolean;
  
  // Actions
  loadChannels: () => void;
  loadChannel: (channelId: string) => void;
  setActiveChannel: (channel: ChannelConfig | null) => void;
  updateChannel: (updates: Partial<ChannelConfig>) => void;
  saveChannelToStorage: () => void;
  addChannel: (channel: ChannelConfig) => void;
  
  // Reset
  reset: () => void;
}

export const useChannelStore = create<ChannelState>((set, get) => ({
  channels: [],
  activeChannel: null,
  isLoading: false,
  
  // ============================================================================
  // CHANNELS LIST
  // ============================================================================
  
  loadChannels: () => {
    console.info('[STORE] Loading channels list');
    set({ isLoading: true });
    
    try {
      const loaded = listChannels();
      
      if (loaded.length === 0) {
        // Se não tem canais salvos, usa demos
        console.warn('[STORE] No channels found, using demos');
        demoChannels.forEach(ch => saveChannel(ch));
        set({ channels: demoChannels });
      } else {
        set({ channels: loaded });
      }
    } catch (error) {
      console.error('[STORE] Error loading channels:', error);
      set({ channels: demoChannels });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // ============================================================================
  // ACTIVE CHANNEL
  // ============================================================================
  
  loadChannel: (channelId: string) => {
    console.info('[STORE] Loading channel:', channelId);
    const loaded = loadChannel(channelId);
    
    if (loaded) {
      set({ activeChannel: loaded });
    } else {
      // Tenta encontrar nos demos
      const demo = demoChannels.find(ch => ch.id === channelId);
      if (demo) {
        saveChannel(demo);
        set({ activeChannel: demo });
      } else {
        console.error('[STORE] Channel not found:', channelId);
      }
    }
  },
  
  setActiveChannel: (channel: ChannelConfig | null) => {
    set({ activeChannel: channel });
  },
  
  updateChannel: (updates: Partial<ChannelConfig>) => {
    const { activeChannel } = get();
    if (!activeChannel) return;
    
    const updated: ChannelConfig = {
      ...activeChannel,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    set({ activeChannel: updated });
    
    // Auto-save
    setTimeout(() => get().saveChannelToStorage(), 100);
  },
  
  saveChannelToStorage: () => {
    const { activeChannel, channels } = get();
    if (!activeChannel) return;
    
    try {
      saveChannel(activeChannel);
      
      // Atualiza na lista
      const updatedChannels = channels.map(ch =>
        ch.id === activeChannel.id ? activeChannel : ch
      );
      
      set({ channels: updatedChannels });
      console.info('[STORE] Channel saved successfully');
    } catch (error) {
      console.error('[STORE] Error saving channel:', error);
    }
  },
  
  addChannel: (channel: ChannelConfig) => {
    const { channels } = get();
    
    saveChannel(channel);
    set({ channels: [...channels, channel] });
    console.info('[STORE] Channel added:', channel.id);
  },
  
  // ============================================================================
  // RESET
  // ============================================================================
  
  reset: () => {
    set({
      channels: [],
      activeChannel: null,
      isLoading: false,
    });
  },
}));

