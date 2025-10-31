/**
 * Funções de exportação de manifest e assets
 */

import type { VFManifest } from './types';
import { downloadJSON } from './utils';

/**
 * Exporta manifest como arquivo JSON
 */
export function exportManifestJSON(manifest: VFManifest): void {
  const filename = `${manifest.project_id}_manifest_${Date.now()}.json`;
  downloadJSON(manifest, filename);
  console.info('[EXPORT] Manifest exported:', filename);
}

/**
 * Mock de exportação de package completo (.zip)
 * Fase 2: gerar ZIP real com vídeos, manifest e SRT
 */
export async function exportPackage(manifest: VFManifest): Promise<void> {
  console.info('[EXPORT] [MOCK] Exporting package for:', manifest.project_id);
  
  // Simula delay de empacotamento
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Por enquanto, apenas exporta o manifest
  exportManifestJSON(manifest);
  
  // Fase 2: incluir vídeos, legendas SRT, etc
  console.info('[EXPORT] [MOCK] Package exported (manifest only for now)');
}

/**
 * Gera nome de arquivo para exportação
 */
export function generateExportFilename(
  projectId: string,
  extension: string
): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  return `${projectId}_${timestamp}.${extension}`;
}

