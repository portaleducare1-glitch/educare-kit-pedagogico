# Educare · Guia para Agentes

> Índice. Não duplica conteúdo, aponta. Identifique a task e abra só o doc relevante.

## Sessão de negócio (apostila, funil, copy, análise)?

Carregue primeiro: `Vault/Projetos/Educare/guia-ia.md` — tem o mapa completo de qual contexto carregar para cada tipo de tarefa de negócio.

---

**Stack:** Vite + React 19 + TypeScript · Tailwind CSS 4 · shadcn/ui (Radix) ·
pdf.js + tesseract.js (validação client-side) · Capacitor (iOS/Android, futuro) ·
Supabase (stub, futuro).

**O que é:** plataforma Educare. A Fase 1 entrega um **validador público de
certificados** que roda 100% no navegador, sem backend.

---

## Antes de mexer, leia o doc da área

| Vai mexer em... | Doc |
|---|---|
| UI, cores, tipografia, tema, a11y | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| Criar/alterar um módulo (passo a passo SDD) | [docs/MODULE_GUIDE.md](docs/MODULE_GUIDE.md) |
| Decisões de arquitetura, nativo, Supabase | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Segurança, privacidade, hospedagem | [docs/SECURITY.md](docs/SECURITY.md) |
| Lógica do validador (regras, parse, OCR) | [docs/specs/certificate-validator/](docs/specs/certificate-validator/) |
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
npm run test     # vitest
npm run build    # build de produção
```

## Antes de declarar pronto

1. `npm run lint` e `npm run test` passam?
2. Mexeu em UI/regra? Conferiu o DESIGN_SYSTEM.md e a paridade mobile/desktop?
3. Criou/alterou módulo? Atualizou a spec (`03-tasks.md`)?
4. Mudou algo estrutural? Atualizou este índice?
