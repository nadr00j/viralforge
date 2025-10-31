/**
 * SceneActions - Ações de regeneração e manipulação de cenas
 */

'use client';

import { useState } from 'react';
import { useScenes } from '@/hooks/useScenes';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import Modal, { ModalFooter } from '@/components/UI/Modal';
import Input from '@/components/UI/Input';

export default function SceneActions() {
  const {
    selectedScene,
    isGenerating,
    regenerateImages,
    regenerateVideo,
    replaceWithHybrid,
    toggleSeedLock,
    duplicateScene,
    removeScene,
  } = useScenes();
  
  const [showHybridModal, setShowHybridModal] = useState(false);
  const [hybridQuery, setHybridQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  if (!selectedScene) return null;
  
  const handleRegenerateImages = () => {
    regenerateImages(selectedScene.id);
  };
  
  const handleRegenerateVideo = () => {
    regenerateVideo(selectedScene.id);
  };
  
  const handleReplaceWithHybrid = () => {
    if (!hybridQuery.trim()) return;
    replaceWithHybrid(selectedScene.id, hybridQuery, 'pexels');
    setShowHybridModal(false);
    setHybridQuery('');
  };
  
  const handleToggleLock = () => {
    toggleSeedLock(selectedScene.id);
  };
  
  const handleDuplicate = () => {
    duplicateScene(selectedScene.id);
  };
  
  const handleDelete = () => {
    removeScene(selectedScene.id);
    setShowDeleteModal(false);
  };
  
  const isLocked = selectedScene.status === 'locked';
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Ações</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-2">
          {/* Regenerate Images */}
          <Button
            variant="primary"
            className="w-full"
            isLoading={isGenerating}
            disabled={isLocked}
            onClick={handleRegenerateImages}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
          >
            Regenerar Imagens
          </Button>
          
          {/* Regenerate Video */}
          <Button
            variant="secondary"
            className="w-full"
            isLoading={isGenerating}
            disabled={isLocked || !selectedScene.assets.img_start}
            onClick={handleRegenerateVideo}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            Regenerar Vídeo
          </Button>
          
          {/* Replace with Hybrid */}
          <Button
            variant="outline"
            className="w-full"
            disabled={isLocked}
            onClick={() => setShowHybridModal(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            }
          >
            Substituir com Stock
          </Button>
          
          <div className="border-t border-dark-700 my-2" />
          
          {/* Lock Seed */}
          <Button
            variant={isLocked ? 'danger' : 'ghost'}
            className="w-full"
            onClick={handleToggleLock}
            leftIcon={
              isLocked ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              )
            }
          >
            {isLocked ? 'Destravar Seed' : 'Travar Seed'}
          </Button>
          
          {/* Duplicate */}
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleDuplicate}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          >
            Duplicar Cena
          </Button>
          
          {/* Delete */}
          <Button
            variant="danger"
            className="w-full"
            onClick={() => setShowDeleteModal(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            }
          >
            Deletar Cena
          </Button>
        </CardContent>
      </Card>
      
      {/* Modal Hybrid Replace */}
      <Modal
        isOpen={showHybridModal}
        onClose={() => setShowHybridModal(false)}
        title="Substituir com Stock Footage"
        description="Busque vídeos em bibliotecas de stock"
      >
        <div className="space-y-4">
          <Input
            label="Query de Busca"
            placeholder="Ex: futuristic technology background"
            value={hybridQuery}
            onChange={(e) => setHybridQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleReplaceWithHybrid()}
          />
        </div>
        
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowHybridModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleReplaceWithHybrid}>
            Buscar e Substituir
          </Button>
        </ModalFooter>
      </Modal>
      
      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Deletar Cena"
        description="Tem certeza que deseja deletar esta cena? Esta ação não pode ser desfeita."
      >
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Deletar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

