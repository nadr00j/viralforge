# 🎯 Entendendo o Viral Forge Studio

## 📋 Resumo Executivo

O projeto **Viral Forge Studio** é um **sistema completo de automação audiovisual com IA**. Ele foi construído de forma **modular** com múltiplas páginas e funcionalidades.

**Atualmente você está vendo**: Apenas o **Studio** diretamente (página inicial), mas **TODAS as outras funcionalidades já estão implementadas!**

---

## 🏗️ Arquitetura Completa do Sistema

### 🌐 Estrutura de Rotas (URLs)

```
📍 /                              → Studio direto (simplificado para testes)
📍 /channel/:id                   → Configuração do Canal (4 abas)
📍 /channel/:id/studio            → Studio Editor (versão completa)
```

---

## 🔄 Fluxo Completo Planejado

```
┌─────────────────────────────────────────────────────────────┐
│                    1️⃣  PÁGINA INICIAL (/)                     │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Canal 1   │  │   Canal 2   │  │   Canal 3   │         │
│  │ Tech Curios │  │  Gaming BR  │  │  Lifestyle  │         │
│  │             │  │             │  │             │         │
│  │ [Config]    │  │ [Config]    │  │ [Config]    │         │
│  │ [Studio]    │  │ [Studio]    │  │ [Studio]    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  [+ Criar Novo Canal]                                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├──────────────┐
                            ↓              ↓
┌─────────────────────────────────┐  ┌──────────────────────────┐
│  2️⃣  CONFIGURAÇÃO DO CANAL      │  │  3️⃣  STUDIO EDITOR        │
│     (/channel/ch1)              │  │    (/channel/ch1/studio) │
│                                 │  │                          │
│  📌 Aba: IDENTIDADE             │  │  🎬 Timeline             │
│  • Nome do canal                │  │  📋 Lista de Cenas       │
│  • Nicho                        │  │  🖼️  Preview Triplo       │
│  • Idioma                       │  │  ⚙️  Metadados            │
│  • Formato (Shorts/Long)        │  │  📝 Campos de Prompt     │
│  • Persona                      │  │  ⚡ Ações                 │
│                                 │  │                          │
│  🎨 Aba: VOZ & ESTILO           │  │  Funcionalidades:        │
│  • Voz ElevenLabs               │  │  ✅ Adicionar cenas      │
│  • Tema visual                  │  │  ✅ Editar prompts       │
│  • Paleta de cores              │  │  ✅ Regenerar imagens    │
│  • Estilo de câmera             │  │  ✅ Regenerar vídeos     │
│  • Negative prompts             │  │  ✅ Substituir c/ stock  │
│                                 │  │  ✅ Travar seed          │
│  📚 Aba: REFERÊNCIAS            │  │  ✅ Duplicar/Deletar     │
│  • Vídeos internos              │  │  ✅ Exportar manifest    │
│  • Vídeos externos              │  │  ✅ Auto-save            │
│  • Tags                         │  │                          │
│                                 │  └──────────────────────────┘
│  🔗 Aba: WEBHOOKS               │
│  • URLs n8n                     │
│  • Testar endpoints             │
│  • Logs de chamadas             │
│                                 │
│  [Abrir Studio →]               │
└─────────────────────────────────┘
```

---

## 📂 O Que Foi Implementado

### ✅ **COMPLETO** - Studio Editor

**Localização**: `src/components/Studio/Studio.tsx` + `/channel/:id/studio/page.tsx`

**Componentes**:
- ✅ `StudioHeader` - Cabeçalho com título, stats, botões
- ✅ `Timeline` - Linha do tempo horizontal
- ✅ `SceneList` - Lista lateral de cenas
- ✅ `ScenePreview` - Preview triplo (Start/End/Video)
- ✅ `SceneMetadata` - Metadados da cena
- ✅ `PromptFields` - Campos de edição de prompts
- ✅ `SceneActions` - Ações (regenerar, substituir, etc)

**Funcionalidades**:
- ✅ CRUD completo de cenas
- ✅ Seleção de cenas (lista/timeline)
- ✅ Edição de prompts e configurações
- ✅ Regeneração de imagens (mock)
- ✅ Regeneração de vídeos (mock)
- ✅ Substituição com stock footage
- ✅ Lock/unlock de seed
- ✅ Duplicação de cenas
- ✅ Deleção de cenas
- ✅ Auto-save em localStorage
- ✅ Exportação de manifest JSON

---

### ✅ **COMPLETO** - Configuração de Canal

**Localização**: `/channel/:id/page.tsx`

**Componentes (4 Abas)**:
- ✅ `IdentityTab` - Nome, nicho, idioma, formato, persona
- ✅ `VoiceStyleTab` - Voz, tema, cores, câmera, prompts
- ✅ `ReferencesTab` - Vídeos de referência (internos/externos)
- ✅ `WebhooksTab` - URLs n8n, testes, logs

**Funcionalidades**:
- ✅ Edição de identidade do canal
- ✅ Configuração de estilo visual
- ✅ Seleção de voz ElevenLabs
- ✅ Paleta de cores customizável
- ✅ Gerenciamento de referências
- ✅ Configuração de webhooks n8n
- ✅ Persistência em localStorage

---

### ✅ **COMPLETO** - Sistema de Gerenciamento

**Stores (Zustand)**:
- ✅ `useManifestStore` - Gerencia projetos/manifests
- ✅ `useSceneStore` - Gerencia seleção e estado de cenas
- ✅ `useChannelStore` - Gerencia canais e configurações

**Hooks**:
- ✅ `useManifest` - Wrapper com auto-save e helpers
- ✅ `useScenes` - Operações de cenas completas
- ✅ `useN8n` - Integração com n8n (geração de ideias, scripts, etc)

**Utilitários**:
- ✅ `localStorage.ts` - Persistência local
- ✅ `api.ts` - Chamadas de API mock
- ✅ `export.ts` - Exportação de dados
- ✅ `mocks.ts` - Dados de demonstração
- ✅ `types.ts` - Tipos TypeScript completos

---

### ⚠️ **PARCIALMENTE IMPLEMENTADO** - Página Inicial

**Localização**: `/page.tsx` (raiz)

**Estado Atual**: 
- ❌ **NÃO** mostra lista de canais
- ❌ **NÃO** tem botão "Criar Canal"
- ✅ **SIM** renderiza o Studio diretamente (para testes rápidos)

**O que deveria ter**:
```tsx
// Página inicial ideal
- Grid de cards de canais
- Informações: nome, nicho, status
- Botões: "Configurar" e "Abrir Studio"
- Botão para criar novo canal
- Busca/filtro de canais
```

---

## 🎯 Funcionalidades por Etapa do Fluxo

### 1️⃣ Geração de Ideias (n8n)
- 📍 **Onde**: Webhook configurado em `/channel/:id` → Aba Webhooks
- 🔧 **Como funciona**: 
  - Usuário clica "Testar Geração de Ideias"
  - Sistema chama n8n via `useN8n.generateIdeas()`
  - n8n usa IA (OpenRouter/ChatGPT) para gerar ideias baseadas no nicho
  - Retorna JSON com título, hook, conceito

### 2️⃣ Geração de Roteiro (n8n)
- 📍 **Onde**: Mesmo lugar, Aba Webhooks
- 🔧 **Como funciona**:
  - Usuário seleciona uma ideia
  - Sistema chama n8n via `useN8n.generateScript()`
  - n8n gera roteiro completo com beats temporais
  - Retorna script estruturado

### 3️⃣ Geração de Cenas (n8n)
- 📍 **Onde**: Mesmo lugar, Aba Webhooks
- 🔧 **Como funciona**:
  - Sistema envia script + config do canal
  - n8n gera prompts visuais para cada cena
  - Retorna manifest completo com todas as cenas

### 4️⃣ Configuração de Narração
- 📍 **Onde**: `/channel/:id` → Aba Voz & Estilo
- 🔧 **Opções**:
  - ✅ Com narração (seleciona voz ElevenLabs)
  - ✅ Sem narração (apenas música de fundo)
  - ✅ BPM da música configurável

### 5️⃣ Seleção de Estilo Visual
- 📍 **Onde**: `/channel/:id` → Aba Voz & Estilo
- 🔧 **Configurações**:
  - Tema visual (neo-tech, organic, minimal, etc)
  - Personagem/Host (se houver)
  - Paleta de cores (3 cores principais)
  - Estilo de câmera (35mm, drone, etc)
  - Negative prompts

### 6️⃣ Edição Final no Studio
- 📍 **Onde**: `/channel/:id/studio`
- 🔧 **Ações**:
  - Editar prompts manualmente
  - Regenerar assets específicos
  - Ajustar durações
  - Substituir com stock footage
  - Exportar manifest final

---

## 🔧 APIs Implementadas (Mock)

```
📡 POST /api/render/image          → Gera imagens (ComfyUI mock)
📡 POST /api/render/video          → Gera vídeos (Runway mock)
📡 POST /api/hybrid/replace        → Busca stock footage
📡 GET  /api/manifest/:projectId   → Carrega manifest
📡 PUT  /api/scenes/:id            → Atualiza cena
```

---

## 🎨 Componentes UI Reutilizáveis

```
✅ Button       - Botões (primary, secondary, outline, ghost, danger)
✅ Badge        - Tags coloridos por status
✅ Card         - Cards com variantes
✅ Input        - Campos de texto
✅ Textarea     - Áreas de texto com auto-resize
✅ Modal        - Modais com footer
✅ Tabs         - Sistema de abas
✅ ImagePlaceholder  - Placeholder SVG para imagens
✅ VideoPlaceholder  - Placeholder SVG para vídeos
```

---

## 📊 Dados Demo

**Canais de Demonstração**:
- `ch1` - Tech Curios BR (Tecnologia, Português, Shorts)
- Mais canais podem ser adicionados em `src/lib/mocks.ts`

**Manifest Demo** (`ch1`):
- 4 cenas de exemplo
- Diferentes status (ready, queued, error)
- Modo image e hybrid
- Assets mockados

---

## 🚀 O Que Você Está Vendo Agora

**Quando você abre `http://localhost:3000`**:

```tsx
// src/app/page.tsx
export default function HomePage() {
  return <Studio />; // ← Renderiza Studio DIRETAMENTE
}
```

Isso significa:
- ✅ Você vê o Studio funcionando
- ✅ Com o manifest demo pré-carregado
- ❌ MAS não vê a página de lista de canais
- ❌ MAS não vê a página de configuração

---

## 🎯 Como Acessar Todas as Funcionalidades

### Opção 1: Via URL Direta

```bash
# Configuração do canal ch1
http://localhost:3000/channel/ch1

# Studio do canal ch1  
http://localhost:3000/channel/ch1/studio
```

### Opção 2: Criar Página Inicial Completa

Precisamos criar uma **HomePage real** que:
1. Lista todos os canais salvos
2. Permite criar novos canais
3. Navega para `/channel/:id` ou `/channel/:id/studio`

---

## 📝 O Que Está Faltando

### 🔴 Página Inicial de Canais

**Arquivo**: `src/app/page.tsx`

**Precisa ter**:
- Lista de cards de canais
- Botão "Criar Novo Canal"
- Busca/filtro
- Navegação para config e studio

### 🟡 Integração n8n Real

**Status**: Hooks implementados, mas chamando APIs mock

**Precisa**:
- Configurar URLs reais do n8n
- Testar endpoints
- Validar responses

### 🟡 Upload de Assets

**Status**: Placeholders funcionando

**Precisa**:
- Sistema de upload de imagens/vídeos
- Integração com storage (Supabase/S3)

---

## 🎓 Resumo Final

### O que você tem:

1. ✅ **Sistema completo de Studio** com todas as operações de cenas
2. ✅ **Sistema completo de Config de Canal** com 4 abas funcionais
3. ✅ **Stores e Hooks** para gerenciar estado
4. ✅ **Persistência local** via localStorage
5. ✅ **Componentes UI** reutilizáveis e consistentes
6. ✅ **Tipagem TypeScript** completa
7. ✅ **Mock de APIs** para desenvolvimento

### O que está "escondido" na URL raiz:

- 📍 `/channel/ch1` → **Configuração completa do canal**
  - Identidade, Voz & Estilo, Referências, Webhooks
  
- 📍 `/channel/ch1/studio` → **Studio completo** (versão oficial)
  - Igual ao que você vê na raiz, mas vinculado ao canal

### Por que está direto no Studio?

A página inicial (`/`) foi configurada para **testes rápidos** - renderiza o Studio direto para você ver funcionando imediatamente, mas **todas as outras páginas estão prontas!**

---

## 🚀 Próximos Passos Sugeridos

1. **Criar HomePage real** com lista de canais
2. **Testar fluxo completo**: Home → Config → Studio
3. **Integrar n8n real** (substituir mocks)
4. **Adicionar sistema de upload**
5. **Implementar geração automática** (botão mágico)

---

**Dúvidas?** Posso te mostrar qualquer parte específica do código! 🎯

