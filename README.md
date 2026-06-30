# Educare · Kit Pedagógico

Portal de Materiais do **Kit Pedagógico** da Educare.

Fase 1: biblioteca estática com materiais pedagógicos organizados para consulta,
busca, favoritos, histórico de visitados, download/preview de PDFs, PWA instalável
e rastreamento de uso com GA4 + Microsoft Clarity. O app não tem login nem backend
nesta fase.

## Stack

Vite + React 19 + TypeScript · Tailwind CSS 4 · shadcn/ui (Radix) ·
vite-plugin-pwa + Workbox · pronto para Capacitor (iOS/Android) e Supabase.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000/portal
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build |
| `npm run lint` | Type-check (`tsc --noEmit`) |
| `npm run test` | Testes unitários (vitest; hoje não há specs unitárias do portal) |
| `npm run test:e2e` | Sobe servidor local e roda a suíte E2E do portal no Chromium |
| `npm run test:e2e:webkit` | Mesma suíte no WebKit/Safari |

## Documentação

- [CLAUDE.md](CLAUDE.md) - índice geral.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - cores, tipografia, tema.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - arquitetura e roadmap.
- [docs/MODULE_GUIDE.md](docs/MODULE_GUIDE.md) - como criar novos módulos (SDD).
- [docs/SECURITY.md](docs/SECURITY.md) - segurança e privacidade.
- [docs/specs/](docs/specs/) - especificações por módulo.

## Nativo (futuro)

```bash
npm run build
npx cap add ios && npx cap add android
npx cap sync
```

## Supabase (futuro)

Copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` e
`VITE_SUPABASE_ANON_KEY`. O client (`src/lib/supabase.ts`) já está pronto, mas
não é usado na Fase 1.
