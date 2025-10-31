# 🧩 PRDI — Viral Forge Studio
### *YouTube Automation Blueprint Interface Prototype*

---

## 1. 📖 Visão Geral

**Viral Forge Studio** é o núcleo de criação e automação de conteúdo para canais digitais — com foco inicial no **YouTube**, mas arquitetura expansível para **TikTok** e **Instagram**.  

O sistema une **IA, automação e controle humano**, permitindo gerar vídeos completos a partir de configurações do canal, referências, e fluxos automatizados do **n8n + ComfyUI + Supabase**.

> A filosofia do projeto é transformar o processo criativo em uma **linha de montagem inteligente**, onde cada etapa (ideia → roteiro → cena → vídeo) se conecta naturalmente à próxima.

---

## 2. 🎯 Objetivo do Protótipo UI

Criar um **protótipo funcional (Fase 1)** que simula todo o processo de automação, com foco em experiência de uso, clareza de fluxo e modularidade.

O protótipo deve:
- Reproduzir o **processo completo** (da configuração do canal até o vídeo final).
- Mostrar o comportamento de **gatilhos automáticos** em cada etapa.
- Permitir testar toda a lógica visual antes da integração real com o backend.

---

## 3. 🧱 Estrutura do Fluxo

```text
[ Canal Selecionado ]
      ↓
[ Estilo de Vídeo ]
      ↓
[ Ideias → Aprovação ]
      ↓
[ Roteiro ]
      ↓
[ Cenas ]
      ↓
 ├─ Gerar Imagens (Start / End)
 ├─ Gerar Vídeo (IA ou Híbrido)
 └─ Substituir / Regenerar
      ↓
[ Download Final das Cenas ]
```

Cada etapa aciona **gatilhos automáticos do n8n**, que se conectam a IA, scraping e pipelines de geração.

---

## 4. 🧭 Estrutura de Canal

Cada canal dentro do sistema possui:

### ⚙️ Configurações principais
- Nome do canal  
- Nicho e categoria  
- Idioma / Voz / Persona  
- Paleta visual e tonalidade estética  
- Formato (Shorts, Long-form, Híbrido)

### 📚 Bancos de referência
- **Banco interno:** vídeos próprios  
- **Banco externo:** vídeos de canais semelhantes  
- Utilizados para gerar prompts consistentes e análises de estilo.

### 🎞️ Estilos de vídeo do canal
Cada canal pode conter múltiplos estilos de vídeo, por exemplo:
- *Shorts IA narrado*
- *Long-form IA*
- *Shorts híbrido (stock + IA)*
- *Narrado com voz humana*

Cada estilo terá um **pipeline de n8n** personalizado.

---

## 5. ⚡ Etapas do Processo

### 1️⃣ Selecionar Canal
Usuário escolhe um canal já existente (YouTube, TikTok ou Instagram).  
O sistema carrega o **manifest** correspondente com todas as configurações e histórico de produção.

---

### 2️⃣ Selecionar Estilo de Vídeo
- Cada estilo define parâmetros como:
  - Tipo de vídeo (Short, Long)
  - Estrutura narrativa base
  - Prompts IA predefinidos
  - Voz, ritmo e tonalidade
- Essa escolha determina **qual fluxo n8n** será acionado.

---

### 3️⃣ Geração de Ideias
**Entrada:** configurações do canal + referências externas + vídeos anteriores.  
**Processo:**  
`n8n → GPT → Ideias geradas → Aprovação manual → Salvamento no Manifest`

- Ideias aprovadas desbloqueiam a próxima etapa (roteiro).

---

### 4️⃣ Geração de Roteiro
**Entrada:** ideia aprovada.  
**Processo:**  
`n8n → GPT → Estrutura narrativa (intro, meio, fim)`  
→ Geração textual completa  
→ Preparação para narração via **ElevenLabs**  
→ Exportação de texto para sincronização de cenas.

---

### 5️⃣ Geração de Cenas
Cada roteiro é dividido automaticamente em **blocos (beats)**.  
Cada beat representa uma cena e contém:
- Descrição da ação / contexto  
- Duração  
- Prompts visuais  
- Tags referenciais  

Essas cenas são armazenadas no Manifest e se tornam a base para geração visual.

---

### 6️⃣ Geração de Imagens / Vídeos
Para cada cena:
- Escolher tipo: `IA | Híbrido | Direto`
- Gerar:
  - **Imagem IA:** via ComfyUI (start / end)
  - **Vídeo IA:** via ComfyUI ou FFmpeg
  - **Híbrido:** busca automática em bancos (YouTube, TikTok, Pexels)

Interface exibe:
- **Preview lado a lado:** Start / End / Clip  
- **Ações:** Regenerar, Substituir, Lock Seed  
- **Status:** Pronto, Em Fila, Erro, Travado  

---

### 7️⃣ Montagem e Download Final
- Sistema compila todas as cenas em sequência (via FFmpeg).  
- Adiciona narração e trilha sonora com *sidechain compression*.  
- Entrega final:
  - `.zip` com vídeos completos  
  - `.json` com Manifest atualizado  
  - `.srt` com legendas automáticas  

---

## 6. 🔄 Gatilhos e Integrações

| Etapa | Endpoint | Descrição |
|-------|-----------|------------|
| Ideias | `/generateIdeas` | Cria ideias via GPT + scraping |
| Roteiro | `/generateScript` | Gera roteiro textual |
| Cenas | `/generateScenes` | Segmenta e cria beats visuais |
| Imagens | `/render/image` | Chama ComfyUI graph |
| Vídeos | `/render/video` | Monta com FFmpeg |
| Híbridos | `/hybrid/replace` | Busca e ajusta vídeos externos |
| Manifest | `/manifest/update` | Atualiza estado geral |

---

## 7. ⚙️ Arquitetura Técnica

| Módulo | Stack | Função |
|--------|--------|--------|
| **Frontend** | React / Next.js / Tailwind | UI completa + fluxo step-by-step |
| **Backend** | Node / Express | API gateway + controle de estados |
| **Banco de Dados** | Supabase | Armazena Manifest, assets e logs |
| **IA Visual** | ComfyUI | Geração de imagens e vídeos IA |
| **Automação** | n8n | Orquestração dos processos |
| **Áudio/Narração** | ElevenLabs | Voz natural e sincronizada |
| **Composição Final** | FFmpeg | Montagem e mixagem final |

---

## 8. 🧩 Estrutura de Dados (Manifest)

```ts
type Manifest = {
  project_id: string
  channel_preset: string
  style_pack: {
    theme: string
    character: string
    seed: number
    camera: string
    color_palette: string[]
  }
  script: {
    title: string
    beats: { t: number; text: string }[]
  }
  scenes: Scene[]
  output: { ratio: '9:16' | '16:9'; fps: number; captions: boolean }
}

type Scene = {
  id: string
  mode: 'image' | 'hybrid' | 'direct'
  prompt_start?: string
  prompt_end?: string
  assets: { img_start?: string; img_end?: string; video?: string }
  drift?: number
  status: 'queued' | 'ready' | 'locked'
}
```

---

## 9. 🎨 UX / UI Design

### Conceito:
Uma **linha de montagem visual**, intuitiva, com fluidez natural entre os passos.

### Diretrizes:
- Interface **step-by-step**, sem abas fixas.  
- Cores neutras com destaques ciano/âmbar (consistência com IA).  
- Ações contextuais (somente o necessário por etapa).  
- *Progress tracking visual* por cena.  
- *Preview lado a lado* (Start / End / Clip).  
- *Seed lock*, *Drift Indicator*, *Version Counter* e *Auto-Save*.

---

## 10. 🚀 Roadmap

| Fase | Entrega | Descrição |
|------|----------|------------|
| **F1 – Protótipo UI (Mock)** | UI funcional com dados simulados | Base do editor e fluxo visual |
| **F2 – Integração Back-End** | Conexão com n8n, Supabase, ComfyUI | Fluxo de geração real |
| **F3 – Versionamento e Histórico** | Logs, comparação e replays | Gestão avançada de canais |
| **F4 – Pós-Produção IA** | Mix de áudio, cortes automáticos | Entrega final refinada |

---

## 11. 🧠 Experiência do Usuário

- Clareza e linearidade de fluxo  
- Menos “cliques”, mais “ação”  
- Feedback visual constante  
- Regeneração rápida e reversível  
- Controle humano sobre IA (sem travas opacas)  
- Cada passo gera motivação para o próximo  

> “A ferramenta deve parecer uma fábrica de ideias, não um editor.”

---

## 12. ✨ Resumo Final

> O **Viral Forge Studio** é um *Creative Engine* de automação audiovisual, projetado para gerar vídeos com consistência estética e narrativa, preservando o controle criativo humano — e tornando o processo de criação escalável, rápido e consciente.
