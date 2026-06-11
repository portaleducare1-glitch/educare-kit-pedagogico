# Educare

Plataforma da **Educare · Cursos de Aperfeiçoamento em Pedagogia**.

Fase 1: **validador público de certificados**. Envie o PDF de um certificado e o
sistema confere, no próprio navegador (sem enviar nada para servidores), se ele
corresponde ao padrão dos certificados emitidos pela Educare.

## Stack

Vite + React 19 + TypeScript · Tailwind CSS 4 · shadcn/ui (Radix) ·
pdf.js + tesseract.js (OCR) · pronto para Capacitor (iOS/Android) e Supabase.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

Para validar: abra a página e arraste o PDF (há um exemplo em
`public/certificado-teste.pdf`).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build |
| `npm run lint` | Type-check (`tsc --noEmit`) |
| `npm run test` | Testes (vitest) |

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
