<div align="center">
  <img src="https://i.postimg.cc/Bn8XCDw9/LOGO.png" alt="Viral Forge Studio" width="400"/>
  
  # Viral Forge Studio
  
  **Sistema de Automação Audiovisual com IA para Produção de Vídeos Virais**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
</div>

---

## 📖 Sobre o Projeto

**Viral Forge Studio** é uma plataforma completa de automação para criação de conteúdo audiovisual com IA. O sistema funciona como uma **esteira de produção linear**, guiando o usuário desde a concepção da ideia até a exportação final do vídeo, integrando múltiplas ferramentas de IA e automação.

### 🎯 Objetivo

Automatizar o processo completo de produção de vídeos virais para plataformas como YouTube Shorts, TikTok e Instagram Reels, permitindo que criadores de conteúdo produzam vídeos de alta qualidade em escala.

---

## ✨ Features Principais

### 🎬 Workflow de Produção Linear (7 Passos)

1. **Seleção de Canal** - Escolha o canal/perfil de conteúdo
2. **Estilo de Vídeo** - Defina formato (shorts, long-form, story) e configurações
3. **Geração de Ideias** - IA gera múltiplas ideias baseadas no nicho do canal
4. **Roteiro Inteligente** - Criação automática de roteiro com beats temporais
5. **Geração de Cenas** - Conversão do roteiro em cenas com prompts visuais
6. **Studio Visual** - Editor completo com timeline, preview e ajustes finos
7. **Export Final** - Exportação do manifest para renderização

### 🎨 Studio Avançado

- **Timeline Interativa** - Visualização e edição temporal das cenas
- **Preview Triplo** - Imagem inicial, imagem final e vídeo clip
- **Edição de Prompts** - Ajustes finos nos prompts de cada cena
- **Geração Híbrida** - Suporte para IA generativa + stock footage
- **Controle de Drift** - Monitoramento de consistência visual

### ⚙️ Gerenciamento de Canais

- **Identidade do Canal** - Nicho, categoria, idioma, formato
- **Voz & Estilo** - Configuração de voz (ElevenLabs), tema visual, paleta de cores
- **Estilos de Vídeo** - CRUD completo de templates de produção
- **Referências** - Upload de referências internas e externas
- **Webhooks n8n** - Integração com workflows de automação

---

## 🚀 Stack Tecnológica

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Zustand** - Gerenciamento de estado global

### Integrações (Planejadas/Mocked)
- **n8n** - Orquestração de workflows
- **ComfyUI** - Geração de imagens/vídeos com IA
- **ElevenLabs** - Síntese de voz para narração
- **FFmpeg** - Composição final de vídeo
- **Supabase** - Backend e armazenamento

---

## 🛠️ Instalação e Uso

### Pré-requisitos

```bash
Node.js 18+ 
npm ou yarn
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/nadr00j/viralforge.git

# Entre na pasta
cd viralforge

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

### Build para Produção

```bash
npm run build
npm start
```

---

## 📂 Estrutura do Projeto

```
viralforge/
├── src/
│   ├── app/                          # Rotas Next.js (App Router)
│   │   ├── page.tsx                 # HomePage - Lista de canais
│   │   ├── production/new/          # Wizard de produção
│   │   ├── channel/[id]/            # Configuração de canal
│   │   └── debug/studio/            # Studio (acesso direto)
│   │
│   ├── components/
│   │   ├── Production/              # Wizard e Steps (1-7)
│   │   ├── Studio/                  # Studio principal
│   │   ├── SceneList/               # Lista vertical de cenas
│   │   ├── Timeline/                # Timeline horizontal
│   │   ├── Preview/                 # Preview triplo
│   │   ├── PromptFields/            # Edição de prompts
│   │   ├── SceneActions/            # Ações de cena
│   │   ├── ChannelConfig/           # Tabs de configuração
│   │   └── UI/                      # Componentes reutilizáveis
│   │
│   ├── store/                       # Zustand stores
│   │   ├── useManifestStore.ts     # Estado do manifest
│   │   ├── useSceneStore.ts        # Cena ativa
│   │   ├── useChannelStore.ts      # Configuração do canal
│   │   └── useProductionWorkflowStore.ts  # Workflow de produção
│   │
│   ├── hooks/                       # Custom hooks
│   │   ├── useManifest.ts          # Lógica de manifest
│   │   ├── useScenes.ts            # Lógica de cenas
│   │   └── useN8n.ts               # Integração n8n
│   │
│   └── lib/                         # Utilitários e tipos
│       ├── types.ts                 # Definições TypeScript
│       ├── mocks.ts                 # Dados de demonstração
│       ├── api.ts                   # Cliente API
│       ├── utils.ts                 # Funções utilitárias
│       ├── export.ts                # Exportação de arquivos
│       └── localStorage.ts          # Persistência local
│
├── public/                          # Assets estáticos
└── docs/                            # Documentação adicional
```

---

## 🎯 Fluxo de Uso

### 1. **Configurar Canal**
```
Home → Selecionar Canal → Configurações
- Preencher identidade (nicho, categoria, idioma)
- Configurar voz e estilo visual
- Adicionar estilos de vídeo
- Configurar webhooks n8n
```

### 2. **Iniciar Nova Produção**
```
Home → Canal → Nova Produção → Wizard (7 Steps)
```

### 3. **Seguir o Wizard**
```
Step 1: Selecionar Canal
Step 2: Escolher Estilo de Vídeo (ex: Shorts IA Narrado)
Step 3: Gerar 5 Ideias com IA → Selecionar a melhor
Step 4: Gerar Roteiro com beats temporais → Editar se necessário
Step 5: Gerar Cenas automaticamente do roteiro
Step 6: Editar no Studio (prompts, imagens, timing)
Step 7: Exportar Manifest JSON
```

### 4. **Edição no Studio (Step 6)**
- Visualizar timeline completa
- Selecionar cenas para editar
- Ajustar prompts visuais
- Gerar/regenerar imagens
- Gerar vídeo clips
- Trocar por footage híbrido
- Ajustar duração
- Bloquear cenas prontas

---

## 🗂️ Tipos de Dados Principais

### VFManifest
Estrutura central que define um projeto completo:
- Metadados do projeto
- Script com beats temporais
- Array de cenas (VFScene[])
- Style pack (tema, personagem, seed, etc)
- Configurações de áudio
- Output (resolução, FPS, legendas)

### VFScene
Representa uma cena individual:
- Modo (image, video, hybrid)
- Prompts (start/end)
- Assets (img_start, img_end, video)
- Status (queued, generating, ready, error)
- Drift (controle de consistência)

### ChannelConfig
Configuração completa de um canal:
- Identidade
- Voz e estilo visual
- Referências (internas/externas)
- Webhooks n8n
- Estilos de vídeo

---

## 🔮 Roadmap

### Fase 1: MVP (Atual) ✅
- [x] Interface completa do wizard
- [x] Studio funcional
- [x] Gerenciamento de canais
- [x] Mocks de API
- [x] Persistência local (localStorage)

### Fase 2: Integração Real 🚧
- [ ] Conectar n8n workflows
- [ ] Integrar ComfyUI para geração de imagens
- [ ] Integrar ElevenLabs para narração
- [ ] Implementar FFmpeg para composição
- [ ] Backend com Supabase

### Fase 3: Features Avançadas 📋
- [ ] Histórico de produções
- [ ] Templates prontos
- [ ] Biblioteca de referências
- [ ] Renderização em background
- [ ] Preview em tempo real
- [ ] Analytics de performance

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adicionar NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Jordan** - [@nadr00j](https://github.com/nadr00j)

---

## 🙏 Agradecimentos

- **n8n** - Plataforma de automação
- **ComfyUI** - Geração de imagens com IA
- **ElevenLabs** - Síntese de voz
- **Vercel** - Deploy e hosting
- **Comunidade Open Source** - Inspiração e ferramentas

---

<div align="center">
  <p>Feito com ❤️ por Jordan</p>
  <p>⭐ Se este projeto foi útil, considere dar uma estrela!</p>
</div>

