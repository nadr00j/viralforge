# 🚀 cursor-start.md — Viral Forge Studio
**Author:** Nadr00J & Luma  
**Purpose:** Kick‑off blueprint for Cursor (and any AI‑assisted IDE) to scaffold, code and integrate the **Viral Forge Studio** project _the right way_, from day zero.

> Viral Forge Studio é um **Creative Engine** para automação de vídeos (YouTube-first, depois TikTok/Instagram). Ele transforma **Configurações do Canal → Ideias → Roteiro → Cenas → Imagens/Vídeos → Pacote Final**, com **n8n** orquestrando fluxos, **ComfyUI** gerando visuais, **Supabase** persistindo Manifest/estado e **FFmpeg** compondo a saída.  
> Este documento estabelece _o contrato do projeto_, convenções, arquitetura, rotas, endpoints, dados mock, regras do Cursor e tarefas incrementais.

---

## 0) TL;DR (para o Cursor)
- Crie um app **Next.js + TypeScript + Tailwind**.  
- Rota principal: **`/channel/:id/studio`** (Studio step‑by‑step).  
- Estado global com **Zustand**; persistência local (LocalStorage) na Fase 1.  
- Implemente **UI capcut‑like**: lista de beats (esq.), timeline (centro), preview triplo (dir.).  
- Forneça **stubs** de API locais que simulam n8n/ComfyUI/Supabase.  
- Code‑style: **modular, limpo, comentado e extensível**.  
- Tudo que não estiver implementado de verdade deve ter **mock claro** e logs de intenção.

> **Objetivo da Sprint 1**: navegar do canal → estilo → ideias → roteiro → cenas → gerar/regenerar (mock) → exportar Manifest.json. Sem backend real.

---

## 1) Visão & Filosofia
- **YouTube‑first** (Shorts/Long), expandível para TikTok/Instagram.
- **Linha de montagem criativa**: cada etapa dispara a próxima (gatilhos).
- **Controle humano sobre IA**: regenerar, substituir, travar seed, versionar.
- **Consistência**: “Seed Pack”, LoRA/Checkpoint fixos, validação de drift.
- **Escalável**: orquestração via n8n; microserviços isolados (render, hybrid, compose).

**Personas-chave:**
- **Arquitetor (você)**: define estilos, referências, guardrails e aprova cada etapa.
- **Operator**: executa, resolve pendências e baixa o pacote final.
- **Automaton (IA)**: gera, sugere, busca, compõe — _nunca decide sozinho_.

---

## 2) Stack & Ferramentas
- **Frontend:** Next.js 14+, React 18, TypeScript, Tailwind.
- **Estado:** Zustand (stores modulares).  
- **Backend (stub):** Next Route Handlers (API local) + Express opcional para proxy.  
- **DB/Storage (Fase 2):** Supabase (Postgres + Storage).  
- **Orquestração:** n8n (webhooks por canal/estilo).  
- **IA Visual:** ComfyUI (LoRA/Checkpoint, graphs “ImageStart”, “ImageEnd”).  
- **Áudio:** ElevenLabs (narração).  
- **Composição:** FFmpeg (concat, sidechain, legendas).  
- **Lint/Format:** ESLint + Prettier.  
- **Tests:** Vitest + React Testing Library (mínimo).

---

## 3) Estrutura de Pastas (esperada)
```
/src
 ├─ app/
 │   ├─ page.tsx                      # lista de canais
 │   ├─ channel/[id]/page.tsx         # dashboard do canal (config + referências)
 │   ├─ channel/[id]/studio/page.tsx  # STUDIO (wizard + editor)
 │   └─ api/                          # stubs (n8n/ComfyUI/Supabase mocks)
 ├─ components/
 │   ├─ ChannelConfig/                # painéis de Identidade / Voz & Estilo / Referências / Webhooks
 │   ├─ Studio/                       # contêiner principal do Studio
 │   ├─ SceneList/                    # lista de cenas (esq.)
 │   ├─ Timeline/                     # blocos clicáveis por cena (centro)
 │   ├─ Preview/                      # Start / End / Clip (dir.)
 │   ├─ SceneActions/                 # Regenerate / Replace / Lock / etc
 │   ├─ PromptFields/                 # prompts start/end
 │   └─ UI/                           # botões, badges, modais
 ├─ hooks/
 │   ├─ useManifest.ts
 │   ├─ useScenes.ts
 │   └─ useN8n.ts
 ├─ lib/
 │   ├─ api.ts                        # axios + endpoints base
 │   ├─ manifestAdapter.ts            # legacy ⇄ VFManifest
 │   ├─ supabase.ts                   # client (fase 2)
 │   └─ types.ts                      # tipos compartilhados
 ├─ store/                            # zustand slices
 ├─ styles/                           # Tailwind/globals
 └─ public/assets/                    # mocks (imgs/clips)
```

**Dependências:**
```bash
npm i next react react-dom typescript tailwindcss postcss autoprefixer \
zustand axios clsx @supabase/supabase-js
npm i -D eslint prettier vitest @testing-library/react @types/node
```

---

## 4) Modelo de Dados (contratos)
> **Manifest** é a fonte da verdade. Cada cena tem versão, seed e “drift”.

```ts
export type Ratio = '9:16' | '16:9' | '1:1';
export type SceneMode = 'image' | 'hybrid' | 'direct';

export type VFScene = {
  id: string;
  mode: SceneMode;
  duration: number;        // seconds
  prompt_start?: string;
  prompt_end?: string;
  seed?: number;
  reference_tags?: string[];
  hybrid?: { query?: string; source?: string; url?: string; clip_in?: number; clip_out?: number };
  assets: { img_start?: string; img_end?: string; video?: string };
  status: 'queued' | 'ready' | 'locked' | 'error';
  version: number;
  drift?: number;          // 0..100 (consistência vs. style_pack)
  notes?: string;
};

export type VFManifest = {
  project_id: string;
  channel_preset: string;
  style_pack: {
    theme: string; character: string; seed: number; negative_prompts: string;
    camera: string; color_palette: string[];
  };
  audio: { narration: boolean; voice_id?: string; music_bpm?: number };
  script: { title: string; beats: { t: number; text: string }[] };
  scenes: VFScene[];
  output: { ratio: Ratio; target_len: number; fps: number; captions: boolean };
};
```

**Seed Pack & Consistência**
- `style_pack.seed` como seed base por projeto; cenas podem sobrescrever.  
- `negative_prompts` aplicado globalmente.  
- LoRA/Checkpoint fixos por canal/estilo (com versionamento).

**Drift**
- Heurística: CLIPScore + delta de paleta (ΔE).  
- Sinalização: verde ≤20%, amarelo 21–40%, vermelho >40%.

---

## 5) Rotas & Páginas
- `/` → lista canais (cards com “Edit Config” e “Open Studio”).  
- `/channel/:id` → config do canal (tabs internas ou seções: Identity, Voice & Style, References, Webhooks).  
- `/channel/:id/studio` → **wizard + editor**.  
  - **Sidebar**: beats do roteiro.  
  - **Center**: timeline + ações.  
  - **Right**: preview Start/End/Clip + prompts + meta.

---

## 6) UI — Requisitos Visuais
- **Dark UI** (neutros), acentos **ciano/roxo/âmbar**.  
- Cards arredondados `rounded-2xl`, sombras sutis, tipografia limpa.  
- Componentes com estados: `queued/ready/locked/error`.  
- Badges: `v#`, `drift %`, `mode`, `seed`.  
- **Ações**: Regenerate Image/Video, Replace with Stock, Lock Seed, Export Manifest.  
- **Preview Triplo** com aspect `9/16` por padrão.  
- **Wizard linear** (próximo passo só aparece quando o anterior existe).

---

## 7) Endpoints (stubs) — Fase 1
> Implementar como **Route Handlers** em `/src/app/api/*` (respostas mock).

- `POST /api/render/image` → `{ img_start?: string, img_end?: string }`
- `POST /api/render/video` → `{ video: string }`
- `POST /api/hybrid/replace` → `{ video: string }`
- `PATCH /api/scenes/[id]` → atualiza `status|mode|seed|version|drift`
- `GET /api/manifest/:projectId` → retorna manifest (local/memory)
- `PUT /api/manifest/:projectId` → salva manifest (local/memory)

**Logs**: em cada endpoint, `console.info('[MOCK]', route, payload)`.  
**Fase 2**: apontar para o gateway Express ou n8n direto.

---

## 8) n8n — Webhooks e Fluxos (Fase 2)
**Por Canal & Estilo** (ex.: `ch1` / `shorts-ia`):
- `POST /webhook/ch1/ideas` → GPT (ideias a partir de referências).  
- `POST /webhook/ch1/script` → GPT (roteiro & timestamps baseados no TTS).  
- `POST /webhook/ch1/scenes` → split em beats + prompts por cena.  
- `POST /webhook/render-image` → ComfyUI graph (start/end) + upload S3.  
- `POST /webhook/render-video` → FFmpeg cut/concat + normalização.  
- `POST /webhook/hybrid-replace` → busca Pexels/YouTube, baixa e normaliza.

**Boas práticas n8n**:
- Tópicos por workflow: entrada mínima, saída determinística.  
- Salvar `run_id`, tempo e custo; retornar URLs absolutas.

---

## 9) ComfyUI — Graphs mínimos
- **ImageStart.graph**  
  Inputs: `{positive, negative, seed, cfg, steps, width, height, lora}`  
  Output: `png` (1080×1920).  
- **ImageEnd.graph** (idêntico, muda prompt).  
- Opcional: **FrameBlend** (in‑betweens subtis).

> **Contrato**: ambos aceitam `style_pack` + prompts da cena; sem isso, falhar explicitamente.

---

## 10) FFmpeg — Composição (referência)
**Segmento com zoom sutil (2s, 30fps):**
```bash
ffmpeg -loop 1 -t 2 -i S01_start.png -vf "scale=1080:-2,zoompan=z='min(zoom+0.001,1.05)':d=60" -r 30 -y S01_seg.mp4
```
**Concat + sidechain + captions:**
```bash
ffmpeg -f concat -safe 0 -i segments.txt -i narration.wav -i music.mp3 \
-filter_complex "[1:a]volume=1.0[a1];[2:a]volume=0.2,sidechaincompress=threshold=0.05:ratio=8:attack=5:release=50[a2];[a1][a2]amix=inputs=2:duration=longest[aout]" \
-map 0:v -map "[aout]" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest -y final.mp4
```

---

## 11) Supabase — Schema (Fase 2)
```sql
create table if not exists public.project_manifests (
  project_id text primary key,
  manifest jsonb not null,
  updated_at timestamptz default now()
);
```
**Env:** `SUPABASE_URL`, `SUPABASE_ANON_KEY` (client) / `SERVICE_ROLE` (server).

---

## 12) Variáveis de Ambiente
`.env.local` (Fase 1 – mocks):
```
NEXT_PUBLIC_APP_NAME=Viral Forge Studio
N8N_BASE=http://localhost:5678
COMFY_BASE=http://localhost:8188
SUPABASE_URL=
SUPABASE_ANON=
```

`.env` (Fase 2 – real):
```
SUPABASE_SERVICE_ROLE=
S3_ENDPOINT=
S3_BUCKET=assets
S3_KEY=
S3_SECRET=
```

---

## 13) Dados Mock (iniciais)
```ts
export const demoManifest: VFManifest = {
  project_id: "ch1",
  channel_preset: "tech_curios_br",
  style_pack: {
    theme: "neo-tech",
    character: "Host BR",
    seed: 350163,
    negative_prompts: "text, watermark, extra fingers",
    camera: "35mm, handheld, medium shot",
    color_palette: ["#0EA5E9", "#A855F7", "#F59E0B"]
  },
  audio: { narration: true, voice_id: "elevenlabs_orion", music_bpm: 140 },
  script: {
    title: "5 curiosidades tecnológicas que explodiram em 2025",
    beats: [
      { t: 0.0, text: "Opening hook" },
      { t: 2.0, text: "Main content" },
      { t: 4.0, text: "Supporting points" },
      { t: 6.0, text: "Conclusion and CTA" }
    ]
  },
  scenes: [{
    id: "S01",
    mode: "image",
    duration: 2,
    prompt_start: "cinematic opening shot",
    seed: 350163,
    assets: { img_start: "/assets/mock/start.png" },
    status: "ready",
    version: 10,
    drift: 7
  }],
  output: { ratio: "9:16", target_len: 10, fps: 30, captions: true }
}
```

---

## 14) Regras do Cursor (colocar em `.cursor/rules`)
1. **Gerar código idiomático TypeScript/React** (sem `any`).  
2. **Componentizar agressivamente**: entradas/saídas bem tipadas; nenhum componente >200 linhas.  
3. **Manter acessibilidade** básica (labels, alt, roles).  
4. **Nomes claros** para stores/hooks (`useManifest`, `useScenes`).  
5. **Evitar libs pesadas** (nada de UI kits grandes; use Tailwind).  
6. **Simular APIs** primeiro; depois parametrizar baseURL via env.  
7. **Logs visíveis** em cada ação (mock) para depuração.  
8. **Sem quebra de contrato**: respeitar os tipos de `VFManifest`/`VFScene`.  
9. **Testar**: pelo menos 1 teste de render do Studio e 1 do Timeline.  
10. **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`…).

---

## 15) Tarefas da Sprint 1 (Checklist objetivo)
- [ ] Setup Next/TS/Tailwind/Zustand/ESLint/Prettier.
- [ ] Tipos `VFManifest`/`VFScene` + mocks.
- [ ] Página `/channel/:id` (config do canal: identidade, referências, webhooks).
- [ ] Página `/channel/:id/studio` (wizard + editor capcut‑like).
- [ ] Componentes: `SceneList`, `Timeline`, `SceneActions`, `ScenePreview`, `PromptFields`.
- [ ] API mocks: `/api/render/image|video|hybrid/replace|scenes/:id|manifest`.
- [ ] Persistência em LocalStorage (`manifest` por `project_id`).  
- [ ] Export Manifest `.json`.
- [ ] Teste mínimo de smoke para Studio.

**Critérios de aceite:**  
- Fluxo completo navegável; ações executam mocks e atualizam UI; exporta Manifest.

---

## 16) Prompts de Sistema (para módulos GPT no n8n)
**Ideias (YouTube Tech BR):**
```
Você é um gerador de ideias para vídeos curtos estilo Veritasium em PT‑BR.
Entrada: identidade do canal, referências (links) e últimos vídeos.
Saída: 10 ideias com título + justificativa + nível de curiosidade (0–100) + 3 pontos-chave.
Formato: JSON.
```

**Roteiro:**
```
Você é um roteirista. Construa um roteiro de 30–60s com hook forte (até 6s), corpo (3 a 4 pontos) e CTA.
Entregue também uma versão limpa para TTS (sem emojis) e estimativa de duração por frase.
Formato: JSON: { script, beats: [{t, text}] }
```

**Cenas (a partir de beats):**
```
Divida o roteiro em cenas. Para cada cena gere: duration, prompt_start, prompt_end (opcional), reference_tags.
Formato: JSON: { scenes: [...] }
```

**Imagem (ComfyUI):**
```
Gere prompt final combinando: style_pack + prompt_start/prompt_end + camera + palette.
Respeite negative_prompts. Não gere texto na imagem.
```

---

## 17) Segurança & Licenças
- Gravar `license_proof` para clipes vindos de Pexels/YouTube.  
- Blacklist de termos proibidos em prompts.  
- Checagem de direitos antes do “Package Final”.

---

## 18) Escalabilidade & Observabilidade
- Log por worker: `{sceneId, action, duration_ms, cost}`.  
- Métricas: %drift médio, tempo por cena, taxa de regeneração.  
- Fila de jobs (BullMQ) é futura expansão.

---

## 19) Roadmap Macro
- **F1 (protótipo)** → **F2 (integração)** → **F3 (histórico/versões)** → **F4 (pós‑produção avançada)**.  
- Opções futuras: Remotion para captions dinâmicos; modelos de “ritmo” (jump-cuts).

---

## 20) Como iniciar (comandos)
```bash
npx create-next-app@latest viral-forge-studio --ts --eslint --tailwind --app --src-dir
cd viral-forge-studio
npm i zustand axios clsx @supabase/supabase-js
# copie types/mocks/stubs deste cursor-start.md para as pastas
npm run dev
```

> **Princípio chavoso:** _“Menos glamour, mais throughput.”_ Cada PR deve mover uma cena do papel para a tela.

---

## 21) Anexos úteis
- **PRDI** (versão formal): `PRDI_Viral_Forge_Studio.md`  
- **Adapter/Endpoints** (Express + Supabase): ver rascunhos incluídos por Luma.  
- **Wire UI**: Studio com **Preview Start/End/Clip** + botões de ação.

---

_Fim do cursor-start.md_ — **Construa como se centenas de vídeos dependessem disso. Porque vão.**
