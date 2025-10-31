/**
 * Aba References - Referências Internas e Externas
 */

'use client';

import { useState } from 'react';
import { useChannelStore } from '@/store/useChannelStore';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/Card';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Badge from '@/components/UI/Badge';
import { generateId } from '@/lib/utils';

export default function ReferencesTab() {
  const { activeChannel, updateChannel } = useChannelStore();
  
  const [internalUrl, setInternalUrl] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [externalTags, setExternalTags] = useState('');
  
  if (!activeChannel) return null;
  
  const { references } = activeChannel;
  
  const addInternal = () => {
    if (!internalUrl.trim()) return;
    
    const newRef = {
      id: generateId('ref_int_'),
      url: internalUrl,
      title: `Vídeo ${references.internal.length + 1}`,
      thumbnail: '/assets/mock/thumb_placeholder.jpg',
    };
    
    updateChannel({
      references: {
        ...references,
        internal: [...references.internal, newRef],
      },
    });
    
    setInternalUrl('');
  };
  
  const addExternal = () => {
    if (!externalUrl.trim()) return;
    
    const tags = externalTags.split(',').map(t => t.trim()).filter(Boolean);
    
    const newRef = {
      id: generateId('ref_ext_'),
      url: externalUrl,
      title: `Referência Externa ${references.external.length + 1}`,
      tags: tags.length > 0 ? tags : undefined,
    };
    
    updateChannel({
      references: {
        ...references,
        external: [...references.external, newRef],
      },
    });
    
    setExternalUrl('');
    setExternalTags('');
  };
  
  const removeInternal = (id: string) => {
    updateChannel({
      references: {
        ...references,
        internal: references.internal.filter(ref => ref.id !== id),
      },
    });
  };
  
  const removeExternal = (id: string) => {
    updateChannel({
      references: {
        ...references,
        external: references.external.filter(ref => ref.id !== id),
      },
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Banco Interno */}
      <Card>
        <CardHeader>
          <CardTitle>Banco Interno</CardTitle>
          <CardDescription>
            Vídeos próprios do canal para referência
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="URL do vídeo"
              value={internalUrl}
              onChange={(e) => setInternalUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addInternal()}
            />
            <Button onClick={addInternal}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {references.internal.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Nenhum vídeo interno</p>
              </div>
            ) : (
              references.internal.map((ref) => (
                <div
                  key={ref.id}
                  className="flex items-center gap-3 p-3 bg-dark-800 border border-dark-600 rounded-lg group hover:border-dark-500 transition-colors"
                >
                  <div className="w-16 h-16 bg-dark-700 rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-300 truncate">
                      {ref.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {ref.url}
                    </p>
                  </div>
                  <button
                    onClick={() => removeInternal(ref.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Banco Externo */}
      <Card>
        <CardHeader>
          <CardTitle>Banco Externo</CardTitle>
          <CardDescription>
            Vídeos de referência de outros canais
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="URL do vídeo"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
            />
            <Input
              placeholder="Tags (separadas por vírgula)"
              value={externalTags}
              onChange={(e) => setExternalTags(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addExternal()}
              helperText="Ex: tech, education, veritasium"
            />
            <Button onClick={addExternal} className="w-full">
              Adicionar Referência
            </Button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {references.external.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Nenhuma referência externa</p>
              </div>
            ) : (
              references.external.map((ref) => (
                <div
                  key={ref.id}
                  className="p-3 bg-dark-800 border border-dark-600 rounded-lg group hover:border-dark-500 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-16 h-16 bg-dark-700 rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-300 truncate">
                        {ref.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {ref.url}
                      </p>
                    </div>
                    <button
                      onClick={() => removeExternal(ref.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 flex-shrink-0"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {ref.tags && ref.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ref.tags.map((tag, i) => (
                        <Badge key={i} size="sm" variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

