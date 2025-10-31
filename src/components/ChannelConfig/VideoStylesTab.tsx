/**
 * VideoStylesTab - Gerenciamento de Estilos de Vídeo
 */

'use client';

import { useState } from 'react';
import { useChannelStore } from '@/store/useChannelStore';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import Input from '@/components/UI/Input';
import Textarea from '@/components/UI/Textarea';
import Badge from '@/components/UI/Badge';
import Modal, { ModalFooter } from '@/components/UI/Modal';
import type { VideoStyle } from '@/lib/types';
import { generateId } from '@/lib/utils';

export default function VideoStylesTab() {
  const { activeChannel, updateChannel } = useChannelStore();
  const [showModal, setShowModal] = useState(false);
  const [editingStyle, setEditingStyle] = useState<VideoStyle | null>(null);
  
  if (!activeChannel) return null;
  
  const styles = activeChannel.videoStyles || [];
  
  const handleSave = (style: VideoStyle) => {
    const updated = editingStyle
      ? styles.map(s => s.id === editingStyle.id ? style : s)
      : [...styles, { ...style, id: generateId('style') }];
    
    updateChannel({ videoStyles: updated });
    setShowModal(false);
    setEditingStyle(null);
  };
  
  const handleDelete = (styleId: string) => {
    updateChannel({ 
      videoStyles: styles.filter(s => s.id !== styleId) 
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-100">Estilos de Vídeo</h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure os tipos de vídeo que este canal pode produzir
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          + Adicionar Estilo
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {styles.map(style => (
          <Card key={style.id} padding="md">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">{style.name}</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => {
                  setEditingStyle(style);
                  setShowModal(true);
                }}>
                  Editar
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(style.id)}>
                  Deletar
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-3">{style.description}</p>
            
            <div className="flex gap-2">
              <Badge variant="default">{style.format}</Badge>
              {style.withNarration && <Badge variant="secondary">Com Narração</Badge>}
            </div>
          </Card>
        ))}
      </div>
      
      {showModal && (
        <VideoStyleModal
          style={editingStyle}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingStyle(null);
          }}
        />
      )}
    </div>
  );
}

function VideoStyleModal({ 
  style, 
  onSave, 
  onClose 
}: { 
  style: VideoStyle | null;
  onSave: (style: VideoStyle) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Partial<VideoStyle>>(
    style || {
      id: '',
      name: '',
      description: '',
      format: 'shorts',
      withNarration: true,
      typicalDuration: 45,
      n8nWebhookBase: '',
    }
  );
  
  return (
    <Modal
      isOpen
      onClose={onClose}
      title={style ? 'Editar Estilo' : 'Novo Estilo de Vídeo'}
    >
      <div className="space-y-4">
        <Input
          label="Nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        
        <Textarea
          label="Descrição"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Formato</label>
          <select
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
            className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="shorts">Shorts</option>
            <option value="long-form">Long-form</option>
            <option value="story">Story</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.withNarration}
            onChange={(e) => setFormData({ ...formData, withNarration: e.target.checked })}
            className="w-4 h-4"
          />
          <label className="text-sm text-gray-300">Com Narração</label>
        </div>
        
        <Input
          label="Duração Típica (segundos)"
          type="number"
          value={formData.typicalDuration}
          onChange={(e) => setFormData({ ...formData, typicalDuration: parseInt(e.target.value) })}
        />
        
        <Input
          label="Webhook n8n (Base URL)"
          value={formData.n8nWebhookBase}
          onChange={(e) => setFormData({ ...formData, n8nWebhookBase: e.target.value })}
          placeholder="http://localhost:5678/webhook/ch1/shorts-ia"
        />
      </div>
      
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={() => onSave(formData as VideoStyle)}>
          Salvar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

