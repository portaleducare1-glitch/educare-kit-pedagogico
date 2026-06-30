# Educare · Guia para Agentes

> Índice. Não duplica conteúdo, aponta. Identifique a task e abra só o doc relevante.

## Antes de qualquer coisa

Carregue `Vault/protocolo-comportamento-ia.md` — regra geral de como tratar qualquer instrução
do Eduardo (pesquisar antes de criar, não assumir ordem literal, nunca expor tática no
resultado final). Vale pra qualquer projeto, código ou negócio, antes de qualquer doc abaixo.

## Sessão de negócio (apostila, funil, copy, análise)?

Carregue primeiro: `Vault/Projetos/Educare/guia-ia.md` — tem o mapa completo de qual contexto carregar para cada tipo de tarefa de negócio.

---

**Stack:** Vite + React 19 + TypeScript · Tailwind CSS 4 · shadcn/ui (Radix) ·
PWA/Workbox · GA4 + Microsoft Clarity · Capacitor (iOS/Android, futuro) ·
Supabase (stub, futuro).

**O que é:** plataforma Educare. A Fase 1 entrega o **Portal de Materiais do
Kit Pedagógico**, 100% client-side nesta etapa, sem backend, login ou banco.

---

## Antes de mexer, leia o doc da área

| Vai mexer em... | Doc |
|---|---|
| UI, cores, tipografia, tema, a11y | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| Criar/alterar um módulo (passo a passo SDD) | [docs/MODULE_GUIDE.md](docs/MODULE_GUIDE.md) |
| Decisões de arquitetura, nativo, Supabase | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Segurança, privacidade, hospedagem | [docs/SECURITY.md](docs/SECURITY.md) |
| Portal de materiais (regras, UX, tarefas) | [docs/specs/portal-materiais/](docs/specs/portal-materiais/) |
| Fundação (stack, configs) | [docs/specs/00-foundation/](docs/specs/00-foundation/) |
| Shell/dashboard (sidebar/header) FUTURO | [docs/specs/app-shell/01-requirements.md](docs/specs/app-shell/01-requirements.md) |

## Convenções inegociáveis

- **Sem travessão** (em dash e en dash) em texto visível ao usuário. Use o ponto
  médio, vírgula, "de X a Y", ou hífen simples. Detalhe no DESIGN_SYSTEM.md.
- **Tudo em português do Brasil**, com acentuação correta (UI, comentários, docs).
- **Lógica em `features/<módulo>/lib` (pura, testável); React só em `components/`.**
- **Tokens semânticos** nas classes (`bg-primary`, `text-success`), nunca hex cru.
- **Conteúdo do usuário** (arquivos/forms): sanitize antes de exibir (`sanitizeText`).
- **Segredos**: nada sensível no client; `VITE_*` é público.
- **SDD**: escreva a spec (`docs/specs/<módulo>/`) antes de codar.

## Comandos

```bash
npm run dev      # dev server (porta 3000)
npm run lint     # tsc --noEmit
npm run test     # vitest (sem specs unitárias do portal nesta fase)
npm run test:e2e # Playwright Python contra servidor local
npm run build    # build de produção
```

## Antes de declarar pronto

1. `npm run lint`, `npm run test` e `npm run build` passam?
2. Se mexeu em fluxo, navegação, PWA ou UI do portal, rode `npm run test:e2e` quando o ambiente permitir abrir navegador headless.
3. Mexeu em UI/regra? Conferiu o DESIGN_SYSTEM.md e a paridade mobile/desktop?
4. Criou/alterou módulo? Atualizou a spec (`03-tasks.md`)?
5. Mudou algo estrutural? Atualizou este índice?

## Health Stack

- typecheck: tsc --noEmit
- unit test: vitest run --passWithNoTests
- e2e: python3 scripts/with_server.py --server "npm run dev" --port 3000 -- python3 src/test/e2e/portal.test.py
