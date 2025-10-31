/**
 * Studio Header - Cabeçalho do Studio
 */

'use client';

import { useRouter } from 'next/navigation';
import { useManifest } from '@/hooks/useManifest';
import Button from '@/components/UI/Button';
import Badge from '@/components/UI/Badge';
import { exportManifestJSON } from '@/lib/export';
import { formatTimestamp } from '@/lib/utils';

interface StudioHeaderProps {
  channelId?: string;
}

export default function StudioHeader({ channelId }: StudioHeaderProps = {}) {
  const router = useRouter();
  const { manifest, isSaving, lastSaved, saveManifest } = useManifest();
  
  if (!manifest) return null;
  
  const handleExport = () => {
    exportManifestJSON(manifest);
  };
  
  return (
    <header className="bg-dark-900 border-b border-dark-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left - Breadcrumb */}
        <div className="flex items-center gap-4">
          {channelId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/channel/${channelId}`)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              Configurações
            </Button>
          )}
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-100">
              {manifest.script.title || 'Sem título'}
            </h1>
          </div>
        </div>
        
        {/* Center - Stats */}
        <div className="flex items-center gap-4">
          <Badge variant="default">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            {manifest.scenes.length} cenas
          </Badge>
          
          <Badge variant="default">
            {manifest.output.ratio}
          </Badge>
          
          {lastSaved && (
            <span className="text-xs text-gray-500">
              {isSaving ? 'Salvando...' : `Salvo ${formatTimestamp(lastSaved)}`}
            </span>
          )}
        </div>
        
        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={saveManifest}
            isLoading={isSaving}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Salvar
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleExport}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar Manifest
          </Button>
        </div>
      </div>
    </header>
  );
}

