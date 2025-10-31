/**
 * Gerenciamento de localStorage para persistência local (Fase 1)
 */

import type { VFManifest, ChannelConfig } from './types';
import { APP_CONFIG } from './config';

// ============================================================================
// MANIFEST
// ============================================================================

/**
 * Salva manifest no localStorage
 */
export function saveManifest(manifest: VFManifest): void {
  try {
    const key = `${APP_CONFIG.storage.manifestPrefix}${manifest.project_id}`;
    localStorage.setItem(key, JSON.stringify(manifest));
    
    // Atualiza lista de projetos
    updateProjectsList(manifest.project_id, manifest.script.title);
    
    console.info('[STORAGE] Manifest salvo:', manifest.project_id);
  } catch (error) {
    console.error('[STORAGE] Erro ao salvar manifest:', error);
    throw error;
  }
}

/**
 * Carrega manifest do localStorage
 */
export function loadManifest(projectId: string): VFManifest | null {
  try {
    const key = `${APP_CONFIG.storage.manifestPrefix}${projectId}`;
    const data = localStorage.getItem(key);
    
    if (!data) {
      console.warn('[STORAGE] Manifest não encontrado:', projectId);
      return null;
    }
    
    const manifest = JSON.parse(data) as VFManifest;
    console.info('[STORAGE] Manifest carregado:', projectId);
    return manifest;
  } catch (error) {
    console.error('[STORAGE] Erro ao carregar manifest:', error);
    return null;
  }
}

/**
 * Remove manifest do localStorage
 */
export function deleteManifest(projectId: string): void {
  try {
    const key = `${APP_CONFIG.storage.manifestPrefix}${projectId}`;
    localStorage.removeItem(key);
    
    // Remove da lista de projetos
    removeFromProjectsList(projectId);
    
    console.info('[STORAGE] Manifest removido:', projectId);
  } catch (error) {
    console.error('[STORAGE] Erro ao remover manifest:', error);
  }
}

// ============================================================================
// CANAL
// ============================================================================

/**
 * Salva configuração de canal
 */
export function saveChannel(channel: ChannelConfig): void {
  try {
    const key = `${APP_CONFIG.storage.channelPrefix}${channel.id}`;
    localStorage.setItem(key, JSON.stringify(channel));
    console.info('[STORAGE] Canal salvo:', channel.id);
  } catch (error) {
    console.error('[STORAGE] Erro ao salvar canal:', error);
    throw error;
  }
}

/**
 * Carrega configuração de canal
 */
export function loadChannel(channelId: string): ChannelConfig | null {
  try {
    const key = `${APP_CONFIG.storage.channelPrefix}${channelId}`;
    const data = localStorage.getItem(key);
    
    if (!data) {
      console.warn('[STORAGE] Canal não encontrado:', channelId);
      return null;
    }
    
    const channel = JSON.parse(data) as ChannelConfig;
    console.info('[STORAGE] Canal carregado:', channelId);
    return channel;
  } catch (error) {
    console.error('[STORAGE] Erro ao carregar canal:', error);
    return null;
  }
}

/**
 * Lista todos os canais salvos
 */
export function listChannels(): ChannelConfig[] {
  try {
    const channels: ChannelConfig[] = [];
    const prefix = APP_CONFIG.storage.channelPrefix;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        const data = localStorage.getItem(key);
        if (data) {
          channels.push(JSON.parse(data));
        }
      }
    }
    
    console.info('[STORAGE] Canais listados:', channels.length);
    return channels;
  } catch (error) {
    console.error('[STORAGE] Erro ao listar canais:', error);
    return [];
  }
}

// ============================================================================
// LISTA DE PROJETOS
// ============================================================================

type ProjectInfo = {
  id: string;
  title: string;
  updated_at: string;
};

/**
 * Atualiza lista de projetos
 */
function updateProjectsList(projectId: string, title: string): void {
  try {
    const list = getProjectsList();
    const existing = list.findIndex(p => p.id === projectId);
    
    const project: ProjectInfo = {
      id: projectId,
      title,
      updated_at: new Date().toISOString(),
    };
    
    if (existing >= 0) {
      list[existing] = project;
    } else {
      list.push(project);
    }
    
    localStorage.setItem(APP_CONFIG.storage.projectsList, JSON.stringify(list));
  } catch (error) {
    console.error('[STORAGE] Erro ao atualizar lista de projetos:', error);
  }
}

/**
 * Obtém lista de projetos
 */
export function getProjectsList(): ProjectInfo[] {
  try {
    const data = localStorage.getItem(APP_CONFIG.storage.projectsList);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('[STORAGE] Erro ao obter lista de projetos:', error);
    return [];
  }
}

/**
 * Remove projeto da lista
 */
function removeFromProjectsList(projectId: string): void {
  try {
    const list = getProjectsList();
    const filtered = list.filter(p => p.id !== projectId);
    localStorage.setItem(APP_CONFIG.storage.projectsList, JSON.stringify(filtered));
  } catch (error) {
    console.error('[STORAGE] Erro ao remover da lista:', error);
  }
}

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Limpa todo o storage (use com cuidado!)
 */
export function clearAllStorage(): void {
  try {
    const keys: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('vf_')) {
        keys.push(key);
      }
    }
    
    keys.forEach(key => localStorage.removeItem(key));
    console.info('[STORAGE] Storage limpo:', keys.length, 'items removidos');
  } catch (error) {
    console.error('[STORAGE] Erro ao limpar storage:', error);
  }
}

/**
 * Verifica se há dados salvos
 */
export function hasStoredData(): boolean {
  return getProjectsList().length > 0;
}

