/**
 * Dados mock para desenvolvimento e testes
 */

import type { VFManifest, VFScene, ChannelConfig, Idea } from './types';
import { generateId, generateSeed } from './utils';

// ============================================================================
// MANIFEST DEMO
// ============================================================================

export const demoManifest: VFManifest = {
  project_id: 'ch1',
  channel_preset: 'tech_curios_br',
  
  style_pack: {
    theme: 'neo-tech',
    character: 'Host BR',
    seed: 350163,
    negative_prompts: 'text, watermark, extra fingers, blurry, low quality',
    camera: '35mm, handheld, medium shot, cinematic',
    color_palette: ['#0EA5E9', '#A855F7', '#F59E0B'],
  },
  
  audio: {
    narration: true,
    voice_id: 'elevenlabs_orion',
    music_bpm: 140,
  },
  
  script: {
    title: '5 curiosidades tecnológicas que explodiram em 2025',
    beats: [
      { t: 0.0, text: 'Opening hook - Você não vai acreditar nisso!' },
      { t: 2.0, text: 'Main content - A primeira descoberta incrível' },
      { t: 4.5, text: 'Supporting points - Mas tem mais...' },
      { t: 7.0, text: 'Plot twist - E aqui vem a surpresa' },
      { t: 9.0, text: 'Conclusion and CTA - Deixa teu like!' },
    ],
  },
  
  scenes: [
    {
      id: 'S01',
      mode: 'image',
      duration: 2,
      prompt_start: 'cinematic tech background, neon lights, futuristic atmosphere, dramatic lighting',
      prompt_end: 'tech background zoomed in, particles floating, blue and purple tones',
      seed: 350163,
      reference_tags: ['tech', 'opening'],
      assets: {
        img_start: '/assets/mock/scene01_start.png',
        img_end: '/assets/mock/scene01_end.png',
        video: '/assets/mock/scene01.mp4',
      },
      status: 'ready',
      version: 10,
      drift: 7,
      notes: 'Opening shot - hook forte',
    },
    {
      id: 'S02',
      mode: 'image',
      duration: 2.5,
      prompt_start: 'AI robot close-up, glowing eyes, intricate details, metallic surface',
      seed: 350164,
      reference_tags: ['tech', 'ai'],
      assets: {
        img_start: '/assets/mock/scene02_start.png',
      },
      status: 'queued',
      version: 1,
      drift: 15,
    },
    {
      id: 'S03',
      mode: 'hybrid',
      duration: 2.5,
      prompt_start: 'smartphone with holographic display',
      hybrid: {
        query: 'futuristic smartphone technology',
        source: 'pexels',
        url: 'https://pexels.com/example',
      },
      assets: {
        video: '/assets/mock/scene03_hybrid.mp4',
      },
      status: 'ready',
      version: 3,
      drift: 22,
    },
    {
      id: 'S04',
      mode: 'image',
      duration: 2,
      prompt_start: 'virtual reality headset, person amazed, colorful environment',
      seed: 350165,
      reference_tags: ['vr', 'tech'],
      assets: {},
      status: 'error',
      version: 2,
      notes: 'Erro ao gerar - revisar prompt',
    },
  ],
  
  output: {
    ratio: '9:16',
    target_len: 10,
    fps: 30,
    captions: true,
  },
};

// ============================================================================
// IDEIAS MOCK
// ============================================================================

export const mockIdeas: Idea[] = [
  {
    id: 'idea_1',
    title: '5 Invenções Tecnológicas que Explodiram em 2025',
    justification: 'Alto apelo para nicho tech, combina curiosidade com tendências atuais. Formato top-list funciona muito bem para shorts.',
    keyPoints: [
      'IA revolucionária que aprende sozinha sem supervisão humana',
      'Robótica avançada para medicina com cirurgias autônomas',
      'Chips neurais acessíveis para interface cérebro-computador',
    ],
    interestScore: 92,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'idea_2',
    title: 'O Futuro da Realidade Virtual: Vivendo em Mundos Digitais',
    justification: 'Tema evergreen com muito potencial viral. VR está crescendo exponencialmente e gera muita curiosidade.',
    keyPoints: [
      'Metaverso se tornando realidade com headsets acessíveis',
      'Trabalho remoto em ambientes VR imersivos',
      'Socialização digital superando interações físicas',
    ],
    interestScore: 88,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'idea_3',
    title: 'Como a IA Está Mudando a Forma Como Trabalhamos',
    justification: 'Tema atual e relevante. Todos querem saber como a IA impactará seus empregos.',
    keyPoints: [
      'Automação de tarefas repetitivas liberando tempo criativo',
      'Assistentes IA personalizados para cada profissão',
      'Nova economia baseada em colaboração humano-IA',
    ],
    interestScore: 85,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'idea_4',
    title: 'Tecnologias Impossíveis que Agora São Reais',
    justification: 'Formato "mind-blowing" que gera muito engajamento. Perfeito para o nicho tech.',
    keyPoints: [
      'Teletransporte quântico de informações',
      'Hologramas 3D palpáveis com feedback tátil',
      'Baterias que carregam em 1 minuto e duram 1 semana',
    ],
    interestScore: 90,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'idea_5',
    title: 'O Lado Obscuro da Tecnologia Moderna',
    justification: 'Abordagem contrária gera curiosidade. Público tech gosta de conteúdo crítico e consciente.',
    keyPoints: [
      'Privacidade digital sendo completamente eliminada',
      'Dependência tecnológica afetando saúde mental',
      'Desigualdade digital criando novas classes sociais',
    ],
    interestScore: 82,
    createdAt: new Date().toISOString(),
  },
];

// ============================================================================
// CANAIS DEMO
// ============================================================================

export const demoChannels: ChannelConfig[] = [
  {
    id: 'ch1',
    name: 'Tech Curios BR',
    platform: 'youtube',
    
    identity: {
      niche: 'Tecnologia e Curiosidades',
      category: 'Educação',
      language: 'pt-BR',
      format: 'shorts',
      description: 'Canal focado em curiosidades tecnológicas para o público brasileiro, estilo Veritasium mas em formato curto e dinâmico.',
      persona: 'Entusiasta tech que torna conceitos complexos acessíveis e divertidos',
    },
    
    voice_style: {
      voice_id: 'elevenlabs_orion',
      voice_name: 'Orion (BR)',
      theme: 'neo-tech',
      character: 'Host BR Animado',
      camera_style: '35mm, handheld, medium shot, cinematic',
      color_palette: ['#0EA5E9', '#A855F7', '#F59E0B'],
      negative_prompts: 'text, watermark, extra fingers, blurry, low quality, anime',
    },
    
    references: {
      internal: [
        {
          id: 'ref_int_01',
          url: 'https://youtube.com/watch?v=example1',
          title: '5 Invenções que mudaram 2024',
          thumbnail: '/assets/mock/thumb1.jpg',
        },
      ],
      external: [
        {
          id: 'ref_ext_01',
          url: 'https://youtube.com/watch?v=veritasium1',
          title: 'Veritasium - How AI Works',
          thumbnail: '/assets/mock/thumb_veritasium.jpg',
          tags: ['ai', 'education'],
        },
        {
          id: 'ref_ext_02',
          url: 'https://youtube.com/watch?v=mkbhd1',
          title: 'MKBHD - Tech Review',
          thumbnail: '/assets/mock/thumb_mkbhd.jpg',
          tags: ['tech', 'review'],
        },
      ],
    },
    
    webhooks: [
      {
        style: 'shorts-ia',
        endpoints: {
          ideas: 'http://localhost:5678/webhook/ch1/ideas',
          script: 'http://localhost:5678/webhook/ch1/script',
          scenes: 'http://localhost:5678/webhook/ch1/scenes',
          render_image: 'http://localhost:5678/webhook/render-image',
          render_video: 'http://localhost:5678/webhook/render-video',
          hybrid_replace: 'http://localhost:5678/webhook/hybrid-replace',
        },
        active: true,
        last_calls: [
          { endpoint: 'ideas', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'success' },
          { endpoint: 'script', timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'success' },
        ],
      },
    ],
    
    videoStyles: [
      {
        id: 'shorts-ia',
        name: 'Shorts IA Narrado',
        description: 'Vídeos curtos com narração IA e visuais gerados',
        format: 'shorts',
        withNarration: true,
        typicalDuration: 45,
        n8nWebhookBase: 'http://localhost:5678/webhook/ch1/shorts-ia',
      },
      {
        id: 'shorts-hibrido',
        name: 'Shorts Híbrido',
        description: 'Vídeos curtos com stock footage e IA',
        format: 'shorts',
        withNarration: true,
        typicalDuration: 30,
        n8nWebhookBase: 'http://localhost:5678/webhook/ch1/shorts-hybrid',
      },
    ],
    
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'ch2',
    name: 'Histórias Incríveis',
    platform: 'youtube',
    
    identity: {
      niche: 'História e Narrativa',
      category: 'Entretenimento',
      language: 'pt-BR',
      format: 'long-form',
      description: 'Narrativas históricas envolventes com produção cinematográfica',
      persona: 'Contador de histórias sério mas acessível',
    },
    
    voice_style: {
      voice_id: 'elevenlabs_atlas',
      voice_name: 'Atlas (BR)',
      theme: 'cinematic-dark',
      character: 'Narrador Épico',
      camera_style: 'dramatic lighting, wide shots, establishing shots',
      color_palette: ['#1F2937', '#991B1B', '#B45309'],
      negative_prompts: 'cartoon, anime, modern clothing, technology',
    },
    
    references: {
      internal: [],
      external: [
        {
          id: 'ref_ext_03',
          url: 'https://youtube.com/watch?v=history1',
          title: 'History Channel - Ancient Mysteries',
          tags: ['history', 'documentary'],
        },
      ],
    },
    
    webhooks: [
      {
        style: 'long-form-ia',
        endpoints: {
          ideas: 'http://localhost:5678/webhook/ch2/ideas',
          script: 'http://localhost:5678/webhook/ch2/script',
          scenes: 'http://localhost:5678/webhook/ch2/scenes',
          render_image: 'http://localhost:5678/webhook/render-image',
          render_video: 'http://localhost:5678/webhook/render-video',
          hybrid_replace: 'http://localhost:5678/webhook/hybrid-replace',
        },
        active: false,
      },
    ],
    
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Cria uma nova cena mock
 */
export function createMockScene(): VFScene {
  return {
    id: generateId('S'),
    mode: 'image',
    duration: 2,
    prompt_start: '',
    seed: generateSeed(),
    assets: {},
    status: 'queued',
    version: 1,
    reference_tags: [],
  };
}

/**
 * Cria um novo manifest mock
 */
export function createMockManifest(channelId: string, channelPreset: string): VFManifest {
  return {
    project_id: channelId,
    channel_preset: channelPreset,
    
    style_pack: {
      theme: 'default',
      character: 'Generic Host',
      seed: generateSeed(),
      negative_prompts: 'text, watermark, blurry',
      camera: '35mm, medium shot',
      color_palette: ['#0EA5E9', '#A855F7', '#F59E0B'],
    },
    
    audio: {
      narration: true,
      voice_id: 'elevenlabs_default',
      music_bpm: 120,
    },
    
    script: {
      title: 'Novo Projeto',
      beats: [],
    },
    
    scenes: [],
    
    output: {
      ratio: '9:16',
      target_len: 0,
      fps: 30,
      captions: true,
    },
  };
}

