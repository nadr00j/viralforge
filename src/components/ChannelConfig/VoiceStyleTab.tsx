/**
 * Aba Voice & Style - Voz e Estilo Visual
 */

'use client';

import { useState } from 'react';
import { useChannelStore } from '@/store/useChannelStore';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/Card';
import Input from '@/components/UI/Input';
import Textarea from '@/components/UI/Textarea';
import Badge from '@/components/UI/Badge';

export default function VoiceStyleTab() {
  const { activeChannel, updateChannel } = useChannelStore();
  const [newColor, setNewColor] = useState('#0EA5E9');
  
  if (!activeChannel) return null;
  
  const { voice_style } = activeChannel;
  
  const addColor = () => {
    if (voice_style.color_palette.length < 5) {
      updateChannel({
        voice_style: {
          ...voice_style,
          color_palette: [...voice_style.color_palette, newColor],
        },
      });
    }
  };
  
  const removeColor = (index: number) => {
    const newPalette = voice_style.color_palette.filter((_, i) => i !== index);
    updateChannel({
      voice_style: {
        ...voice_style,
        color_palette: newPalette,
      },
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Voz */}
      <Card>
        <CardHeader>
          <CardTitle>Narração</CardTitle>
          <CardDescription>
            Configure a voz para narração (ElevenLabs)
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Voice ID"
              value={voice_style.voice_id}
              onChange={(e) => updateChannel({
                voice_style: { ...voice_style, voice_id: e.target.value }
              })}
              placeholder="elevenlabs_orion"
            />
            
            <Input
              label="Nome da Voz"
              value={voice_style.voice_name}
              onChange={(e) => updateChannel({
                voice_style: { ...voice_style, voice_name: e.target.value }
              })}
              placeholder="Orion (BR)"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Estilo Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Estilo Visual</CardTitle>
          <CardDescription>
            Defina a identidade visual das gerações de IA
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Input
            label="Tema"
            value={voice_style.theme}
            onChange={(e) => updateChannel({
              voice_style: { ...voice_style, theme: e.target.value }
            })}
            placeholder="Ex: neo-tech, cinematic-dark, vintage"
          />
          
          <Input
            label="Character"
            value={voice_style.character}
            onChange={(e) => updateChannel({
              voice_style: { ...voice_style, character: e.target.value }
            })}
            placeholder="Ex: Host BR Animado"
          />
          
          <Input
            label="Camera Style"
            value={voice_style.camera_style}
            onChange={(e) => updateChannel({
              voice_style: { ...voice_style, camera_style: e.target.value }
            })}
            placeholder="Ex: 35mm, handheld, medium shot, cinematic"
            helperText="Descreva o estilo de câmera para os prompts"
          />
          
          {/* Color Palette */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Paleta de Cores
            </label>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {voice_style.color_palette.map((color, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-2 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg"
                >
                  <div
                    className="w-6 h-6 rounded border-2 border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-300 font-mono">
                    {color}
                  </span>
                  <button
                    onClick={() => removeColor(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {voice_style.color_palette.length < 5 && (
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-12 h-10 bg-dark-800 border border-dark-600 rounded cursor-pointer"
                />
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="#0EA5E9"
                  className="flex-1"
                />
                <button
                  onClick={addColor}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Adicionar
                </button>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Máximo de 5 cores. Use cores hexadecimais (#RGB).
            </p>
          </div>
          
          <Textarea
            label="Negative Prompts"
            value={voice_style.negative_prompts}
            onChange={(e) => updateChannel({
              voice_style: { ...voice_style, negative_prompts: e.target.value }
            })}
            placeholder="text, watermark, extra fingers, blurry, low quality..."
            rows={3}
            helperText="O que evitar nas gerações de IA"
          />
        </CardContent>
      </Card>
    </div>
  );
}

