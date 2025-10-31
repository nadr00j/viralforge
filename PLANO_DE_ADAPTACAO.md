# 🔄 Plano de Adaptação - Esteira de Produção Completa

## 🎯 Objetivo

Transformar o projeto atual (que só tem o Studio isolado) em uma **ESTEIRA DE PRODUÇÃO LINEAR** completa, onde cada etapa desbloqueia a próxima, seguindo o fluxo do Blueprint.

---

## 📊 Análise: O Que Temos vs. O Que Precisa

### ✅ O Que JÁ Está Implementado

1. **Studio Completo** (Step 6)
   - `src/components/Studio/Studio.tsx`
   - Timeline, SceneList, Preview, Actions
   - Regeneração, edição, substituição de cenas
   - ✅ **Pronto para usar!**

2. **Hook useN8n** (Integração)
   - `src/hooks/useN8n.ts`
   - Funções: `generateIdeas()`, `generateScript()`, `generateScenes()`
   - ✅ **Pronto para conectar!**

3. **Componentes de Configuração de Canal**
   - `IdentityTab`, `VoiceStyleTab`, `ReferencesTab`, `WebhooksTab`
   - ✅ **Prontos para reusar!**

4. **Stores Zustand**
   - `useManifestStore`, `useSceneStore`, `useChannelStore`
   - ✅ **Prontos!**

### 🔴 O Que Está FALTANDO

1. **Página Inicial** - Lista de Canais
2. **Wizard/Stepper** - Componente de navegação step-by-step
3. **Step 1** - Seleção de Canal
4. **Step 2** - Seleção de Estilo de Vídeo
5. **Step 3** - Geração de Ideias (UI + botão)
6. **Step 4** - Geração de Roteiro (UI + aprovação)
7. **Step 5** - Geração de Cenas (UI + visualização)
8. **Store de Workflow** - Gerenciar estado do wizard

---

## 🏗️ Nova Arquitetura de Rotas

```
Estrutura de Rotas NOVA:

📍 /
   └─> Lista de Canais (cards)
       [Selecionar Canal] → vai para /production/new

📍 /channel/:id
   └─> Configuração do Canal (4 abas)
       [Voltar] [Salvar]
       Usado para EDITAR configurações de canais existentes

📍 /production/new?channel=:id
   └─> WIZARD de Produção (7 steps)
       Step 1: Confirmar Canal
       Step 2: Selecionar Estilo de Vídeo
       Step 3: Gerar Ideias
       Step 4: Gerar Roteiro
       Step 5: Gerar Cenas
       Step 6: Studio (editar cenas)
       Step 7: Exportar

📍 /production/:projectId
   └─> Retomar produção existente
       (carrega manifest e continua do step onde parou)
```

---

## 📝 Tarefas Detalhadas

### 🔷 Tarefa 1: Criar HomePage com Lista de Canais

**Arquivo**: `src/app/page.tsx`

**Componente**: `src/components/Home/ChannelList.tsx`

**Funcionalidades**:
- Listar todos os canais do localStorage
- Card por canal com:
  - Nome, nicho, plataforma
  - Thumbnail
  - Status (webhooks configurados?)
  - Botões: "Configurar" → `/channel/:id`
  - Botões: "Nova Produção" → `/production/new?channel=:id`
- Botão "+ Criar Novo Canal"
- Busca/filtro

**Mockup**:
```
┌────────────────────────────────────────────────┐
│  VIRAL FORGE STUDIO                            │
│  Seus Canais                                   │
│                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Tech BR  │  │ Gaming   │  │ Lifestyle│    │
│  │ 🎥       │  │ 🎮       │  │ 📸       │    │
│  │ Shorts   │  │ Long     │  │ Stories  │    │
│  │          │  │          │  │          │    │
│  │[Config]  │  │[Config]  │  │[Config]  │    │
│  │[Produzir]│  │[Produzir]│  │[Produzir]│    │
│  └──────────┘  └──────────┘  └──────────┘    │
│                                                │
│  [+ Criar Novo Canal]                         │
└────────────────────────────────────────────────┘
```

---

### 🔷 Tarefa 2: Criar Store de Workflow

**Arquivo**: `src/store/useProductionWorkflowStore.ts`

**Estado**:
```ts
interface ProductionWorkflow {
  currentStep: number;           // 1-7
  channelId: string | null;
  videoStyle: string | null;     // 'shorts-ia', 'long-form', etc
  ideas: Idea[];                 // geradas pelo n8n
  selectedIdeaId: string | null;
  script: Script | null;         // gerado pelo n8n
  manifest: VFManifest | null;   // gerado pelo n8n (com cenas)
  isGenerating: boolean;
  error: string | null;
}
```

**Actions**:
```ts
- setStep(step: number)
- setChannel(channelId: string)
- setVideoStyle(style: string)
- setIdeas(ideas: Idea[])
- selectIdea(ideaId: string)
- setScript(script: Script)
- setManifest(manifest: VFManifest)
- setGenerating(isGenerating: boolean)
- reset()
```

---

### 🔷 Tarefa 3: Criar Componente Wizard/Stepper

**Arquivo**: `src/components/Production/ProductionWizard.tsx`

**Funcionalidades**:
- Exibe indicador de progresso (1/7, 2/7, etc)
- Breadcrumb visual dos steps
- Renderiza componente do step atual
- Botões: [Voltar] [Próximo] [Pular para Studio]
- Valida se pode avançar para próximo step

**Mockup**:
```
┌────────────────────────────────────────────────────┐
│  NOVA PRODUÇÃO                                     │
│  ━━●━━○━━○━━○━━○━━○━━○                            │
│   1  2  3  4  5  6  7                              │
│  Canal > Estilo > Ideias > Roteiro > Cenas > ...  │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │                                              │ │
│  │   [CONTEÚDO DO STEP ATUAL]                  │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  [← Voltar]              [Próximo →]              │
└────────────────────────────────────────────────────┘
```

---

### 🔷 Tarefa 4: Step 1 - Seleção/Confirmação de Canal

**Arquivo**: `src/components/Production/Steps/Step1_SelectChannel.tsx`

**Funcionalidades**:
- Se chegou via query `?channel=ch1` → mostra resumo do canal
- Se não → mostra lista de canais para escolher
- Exibe: nome, nicho, voz, estilo visual
- Botão "Usar Este Canal"
- Link "Editar Configurações" → abre `/channel/:id` em nova aba

**Dados Necessários**:
- `ChannelConfig` do store

---

### 🔷 Tarefa 5: Step 2 - Seleção de Estilo de Vídeo

**Arquivo**: `src/components/Production/Steps/Step2_SelectVideoStyle.tsx`

**Funcionalidades**:
- Lista os estilos configurados no canal:
  - Shorts IA Narrado
  - Long-form IA
  - Shorts Híbrido (stock + IA)
  - Long-form Sem Narração
- Cards com:
  - Nome do estilo
  - Descrição
  - Duração típica
  - Se usa narração ou não
  - Pipeline n8n associado
- Botão "Selecionar" em cada card

**Mockup**:
```
┌────────────────────────────────────────┐
│  Escolha o Estilo de Vídeo            │
│                                        │
│  ┌─────────────┐  ┌─────────────┐    │
│  │ Shorts IA   │  │ Long-form   │    │
│  │ Narrado     │  │ Educativo   │    │
│  │             │  │             │    │
│  │ 30-60s      │  │ 5-10min     │    │
│  │ Com voz     │  │ Com voz     │    │
│  │             │  │             │    │
│  │ [Usar Este] │  │ [Usar Este] │    │
│  └─────────────┘  └─────────────┘    │
└────────────────────────────────────────┘
```

**Nova Estrutura no ChannelConfig**:
```ts
// Adicionar ao tipo ChannelConfig
videoStyles: {
  id: string;
  name: string;
  format: 'shorts' | 'long-form';
  withNarration: boolean;
  typicalDuration: number;
  n8nWebhookBase: string;
}[]
```

---

### 🔷 Tarefa 6: Step 3 - Geração de Ideias

**Arquivo**: `src/components/Production/Steps/Step3_GenerateIdeas.tsx`

**Funcionalidades**:
- Botão grande: "🎯 Gerar Ideias com IA"
- Ao clicar:
  1. Chama `useN8n().generateIdeas(channelId, videoStyle)`
  2. Mostra loading spinner
  3. Exibe lista de ideias geradas (5-10)
- Card por ideia:
  - Título
  - Justificativa
  - Pontos-chave
  - Score de interesse (0-100)
  - Botão "Usar Esta Ideia"
- Botão "Regenerar Ideias"

**Mockup**:
```
┌────────────────────────────────────────────────┐
│  Geração de Ideias                             │
│                                                │
│  [🎯 Gerar Ideias com IA]  [⟳ Regenerar]     │
│                                                │
│  Ideias Geradas:                               │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ 💡 5 Invenções Tecnológicas Surpreendentes│ │
│  │                                           │ │
│  │ Justificativa: Alto apelo para o nicho...│ │
│  │ • Ponto 1: IA revolucionária             │ │
│  │ • Ponto 2: Robótica avançada             │ │
│  │ • Ponto 3: Biotech impressionante        │ │
│  │                                           │ │
│  │ Interesse: ████████░░ 85%                │ │
│  │                                           │ │
│  │ [✓ Usar Esta Ideia]                      │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ 💡 O Futuro da Realidade Virtual         │ │
│  │ ...                                       │ │
│  └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

**Tipos**:
```ts
type Idea = {
  id: string;
  title: string;
  justification: string;
  keyPoints: string[];
  interestScore: number; // 0-100
};
```

---

### 🔷 Tarefa 7: Step 4 - Geração de Roteiro

**Arquivo**: `src/components/Production/Steps/Step4_GenerateScript.tsx`

**Funcionalidades**:
- Mostra a ideia selecionada no topo
- Botão "📝 Gerar Roteiro"
- Ao clicar:
  1. Chama `useN8n().generateScript(ideaId, channelId)`
  2. Loading com mensagem "Criando roteiro..."
  3. Exibe roteiro gerado
- Seções:
  - Título
  - Beats temporais (timeline textual)
  - Texto completo para narração
- Permite editar texto
- Botão "✓ Aprovar Roteiro"

**Mockup**:
```
┌─────────────────────────────────────────────────┐
│  Geração de Roteiro                             │
│                                                 │
│  Ideia Selecionada:                             │
│  "5 Invenções Tecnológicas Surpreendentes"     │
│                                                 │
│  [📝 Gerar Roteiro]                            │
│                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                 │
│  Título: "5 Invenções que Vão Mudar Tudo"     │
│                                                 │
│  Beats:                                         │
│  0.0s  | Hook: "Você não vai acreditar nisso!" │
│  2.5s  | Invenção 1: IA que...                 │
│  5.0s  | Invenção 2: Robô que...                │
│  7.5s  | Invenção 3: Chip que...                │
│  10.0s | CTA: "Deixa teu like!"                 │
│                                                 │
│  Texto para Narração:                           │
│  ┌───────────────────────────────────────────┐ │
│  │ Você não vai acreditar nessas invenções...│ │
│  │ [editável]                                 │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Duração Estimada: ~30s                        │
│                                                 │
│  [✓ Aprovar Roteiro]  [⟳ Regenerar]           │
└─────────────────────────────────────────────────┘
```

**Tipos**:
```ts
type Script = {
  id: string;
  title: string;
  beats: { t: number; text: string }[];
  fullText: string;
  estimatedDuration: number;
};
```

---

### 🔷 Tarefa 8: Step 5 - Geração de Cenas

**Arquivo**: `src/components/Production/Steps/Step5_GenerateScenes.tsx`

**Funcionalidades**:
- Mostra resumo do roteiro
- Botão "🎬 Gerar Cenas Automaticamente"
- Ao clicar:
  1. Chama `useN8n().generateScenes(scriptId, channelId, stylePack)`
  2. Loading com "Criando cenas visuais..."
  3. n8n divide roteiro em cenas e gera prompts
  4. Retorna manifest completo com todas as cenas
- Exibe:
  - Número de cenas geradas
  - Preview de cada cena (só prompts, sem assets ainda)
  - Duração total
- Botão "→ Ir para Studio" (vai para Step 6)

**Mockup**:
```
┌──────────────────────────────────────────────────┐
│  Geração de Cenas                                │
│                                                  │
│  Roteiro: "5 Invenções que Vão Mudar Tudo"     │
│  Duração: ~30s | Beats: 5                       │
│                                                  │
│  [🎬 Gerar Cenas Automaticamente]               │
│                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                  │
│  ✓ 8 Cenas Geradas:                             │
│                                                  │
│  S01 | 2.0s | Opening shot                      │
│       Prompt: "cinematic tech background..."     │
│                                                  │
│  S02 | 2.5s | Main content                      │
│       Prompt: "AI robot close-up, glowing..."    │
│                                                  │
│  S03 | 2.5s | Supporting point                  │
│       Prompt: "smartphone holographic display"   │
│                                                  │
│  ... [mais cenas]                                │
│                                                  │
│  Duração Total: 29.5s                           │
│                                                  │
│  [→ Ir para Studio Editar Cenas]                │
└──────────────────────────────────────────────────┘
```

---

### 🔷 Tarefa 9: Step 6 - Studio (Já Existe!)

**Arquivo**: `src/components/Studio/Studio.tsx` ← **JÁ TEMOS!**

**Integração**:
- Carregar manifest do workflow
- Permitir editar todas as cenas
- Regenerar assets
- Substituir com stock
- Ao finalizar → Step 7

**Nada muda aqui, só precisamos:**
- Receber o manifest do workflow store
- Sincronizar mudanças de volta para o manifest

---

### 🔷 Tarefa 10: Step 7 - Exportar/Finalizar

**Arquivo**: `src/components/Production/Steps/Step7_Export.tsx`

**Funcionalidades**:
- Resumo final:
  - Número de cenas
  - Duração total
  - Assets prontos vs. pendentes
- Opções:
  - "💾 Salvar Projeto" (salva no localStorage)
  - "📥 Exportar Manifest.json"
  - "🎬 Enviar para Renderização" (futura integração)
- Botão "🏁 Finalizar e Voltar"

**Mockup**:
```
┌────────────────────────────────────────────┐
│  Projeto Finalizado! 🎉                    │
│                                            │
│  Título: "5 Invenções que Vão Mudar Tudo" │
│  Cenas: 8                                  │
│  Duração: 29.5s                           │
│  Assets: ████████░ 7/8 prontos            │
│                                            │
│  [💾 Salvar Projeto]                      │
│  [📥 Exportar Manifest.json]              │
│  [🎬 Enviar para Renderização] (em breve) │
│                                            │
│  [🏁 Finalizar e Voltar ao Início]        │
└────────────────────────────────────────────┘
```

---

## 🎨 Novos Componentes Necessários

### 1. **ProductionWizard.tsx**
Wrapper do wizard com stepper e navegação

### 2. **Step Components** (7 steps)
- `Step1_SelectChannel.tsx`
- `Step2_SelectVideoStyle.tsx`
- `Step3_GenerateIdeas.tsx`
- `Step4_GenerateScript.tsx`
- `Step5_GenerateScenes.tsx`
- `Step6_Studio.tsx` (wrapper para Studio existente)
- `Step7_Export.tsx`

### 3. **ChannelList.tsx**
Lista de canais na HomePage

### 4. **VideoStyleSelector.tsx**
Cards de seleção de estilo

### 5. **IdeaCard.tsx**
Card para exibir uma ideia gerada

### 6. **ScriptEditor.tsx**
Editor de roteiro com beats

### 7. **ScenesSummary.tsx**
Lista de cenas geradas antes do Studio

---

## 📦 Novos Tipos Necessários

```ts
// src/lib/types.ts

export type Idea = {
  id: string;
  title: string;
  justification: string;
  keyPoints: string[];
  interestScore: number;
  createdAt: string;
};

export type Script = {
  id: string;
  ideaId: string;
  title: string;
  beats: { t: number; text: string }[];
  fullText: string;
  estimatedDuration: number;
  createdAt: string;
};

export type VideoStyle = {
  id: string;
  name: string;
  format: 'shorts' | 'long-form' | 'story';
  withNarration: boolean;
  typicalDuration: number;
  n8nWebhookBase: string;
  description?: string;
};

export type ProductionWorkflowState = {
  id: string;
  currentStep: number;
  channelId: string | null;
  videoStyleId: string | null;
  ideas: Idea[];
  selectedIdeaId: string | null;
  script: Script | null;
  manifest: VFManifest | null;
  createdAt: string;
  updatedAt: string;
};
```

---

## 🔄 Adaptações no useN8n Hook

**Arquivo**: `src/hooks/useN8n.ts`

**Já existe, mas precisa de ajustes**:

```ts
// ANTES (já tem):
generateIdeas(channelId: string, context?: any): Promise<Idea[]>
generateScript(idea: Idea, channelId: string): Promise<Script>
generateScenes(script: Script, channelId: string): Promise<VFManifest>

// DEPOIS (melhorar retornos):
generateIdeas(channelId: string, videoStyleId: string): Promise<Idea[]>
generateScript(ideaId: string, channelId: string): Promise<Script>
generateScenes(scriptId: string, channelId: string, stylePack: any): Promise<VFManifest>
```

---

## 🗺️ Mapa de Navegação Completo

```
FLUXO COMPLETO DO USUÁRIO:

/
├─ Lista de Canais
│  ├─ [Configurar] → /channel/:id
│  └─ [Nova Produção] → /production/new?channel=:id

/channel/:id
├─ 4 Abas de Config
│  ├─ Identidade
│  ├─ Voz & Estilo
│  ├─ Referências
│  └─ Webhooks
└─ [Voltar]

/production/new?channel=:id
├─ Wizard (Step 1-7)
│  ├─ Step 1: Selecionar Canal
│  ├─ Step 2: Selecionar Estilo
│  ├─ Step 3: Gerar Ideias ← n8n
│  ├─ Step 4: Gerar Roteiro ← n8n
│  ├─ Step 5: Gerar Cenas ← n8n
│  ├─ Step 6: Studio (editar)
│  └─ Step 7: Exportar
└─ Salva em localStorage → /production/:projectId

/production/:projectId
└─ Retoma produção do step onde parou
```

---

## ⚡ Ordem de Implementação Sugerida

### Fase 1: Estrutura Base (2-3h)
1. ✅ Criar `useProductionWorkflowStore`
2. ✅ Criar estrutura de pastas `/production`
3. ✅ Criar `ProductionWizard.tsx` (skeleton)
4. ✅ Criar rota `/production/new`

### Fase 2: Steps Básicos (3-4h)
5. ✅ Step 1 - Seleção de Canal
6. ✅ Step 2 - Seleção de Estilo
7. ✅ HomePage com lista de canais

### Fase 3: Geração IA (4-5h)
8. ✅ Step 3 - Geração de Ideias (UI + integração)
9. ✅ Step 4 - Geração de Roteiro (UI + integração)
10. ✅ Step 5 - Geração de Cenas (UI + integração)

### Fase 4: Integração (2-3h)
11. ✅ Step 6 - Wrapper do Studio
12. ✅ Step 7 - Exportação
13. ✅ Navegação entre steps
14. ✅ Persistência do workflow

### Fase 5: Refinamento (2-3h)
15. ✅ Loading states
16. ✅ Error handling
17. ✅ Validações
18. ✅ Feedback visual

**Total Estimado**: 13-18 horas de desenvolvimento

---

## 🎯 Checklist de Validação

Após implementação, validar:

- [ ] Consigo navegar linearmente pelos 7 steps
- [ ] Botão "Gerar Ideias" chama n8n (mock) e exibe resultados
- [ ] Consigo selecionar uma ideia e gerar roteiro
- [ ] Consigo aprovar roteiro e gerar cenas
- [ ] As cenas geradas aparecem no Studio
- [ ] Consigo editar cenas no Studio
- [ ] Consigo exportar manifest final
- [ ] Estado do workflow persiste no localStorage
- [ ] Posso retomar produção de onde parei

---

## 📚 Documentação Adicional

### Estrutura de Dados do Workflow

```ts
// localStorage key: `vf_workflow_${workflowId}`
{
  id: "prod_123",
  currentStep: 3,
  channelId: "ch1",
  videoStyleId: "shorts-ia",
  ideas: [...],
  selectedIdeaId: "idea_1",
  script: {...},
  manifest: {...},
  createdAt: "2025-10-31T...",
  updatedAt: "2025-10-31T..."
}
```

### Integração com n8n

Cada step que precisa de IA:
1. Mostra botão de ação
2. Ao clicar, chama `useN8n()` correspondente
3. Mostra loading durante requisição
4. Exibe resultado
5. Permite avançar para próximo step

---

## 🚀 Próximos Passos

1. **Revisar e Aprovar** este plano
2. **Implementar Fase 1** (estrutura base)
3. **Testar navegação** entre steps
4. **Implementar Fase 2** (steps básicos)
5. **Implementar Fase 3** (integrações IA)
6. **Implementar Fase 4** (integração com Studio)
7. **Refinar e Testar** fluxo completo

---

**Pronto para começar?** 🎯

