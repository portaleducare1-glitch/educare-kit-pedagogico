# Fundação do Educare · Design

## Stack

| Área | Escolha | Por quê |
|---|---|---|
| Build/SPA | Vite 6 + React 19 + TS 5.8 | Rápido, mesmo padrão do Aerogestor (já publicado nas lojas) |
| Estilo | Tailwind CSS 4 (`@tailwindcss/vite`) | Tokens via CSS vars, sem config JS |
| UI | shadcn/ui + Radix | Acessível, copy-paste, 100% customizável |
| Ícones | lucide-react | Leve, consistente |
| Rotas | react-router-dom 7 | Rota pública agora, protegidas depois |
| PDF | pdfjs-dist | Parse + render no navegador |
| OCR | tesseract.js (lazy) | Lê curso/carga/corpo sem backend |
| Nativo | Capacitor 8 | Empacota o `dist/` como app iOS/Android |
| Futuro | @supabase/supabase-js | Auth + base de certificados (stub pronto) |
| Fontes | Nunito (display) + Inter (corpo), self-hosted | Marca arredondada + leitura; offline-friendly |

## Estrutura de pastas

```
src/
  components/ui        componentes shadcn
  components/layout    PublicLayout
  components/theme     ThemeProvider + toggle
  features/<módulo>/   components + lib + __tests__
  lib/                 cn, supabase (stub), pdf/
  pages/               páginas avulsas (NotFound)
```

Convenção: **um módulo = uma pasta em `features/`** com `components/`, `lib/` e
`__tests__/`. Código compartilhado em `src/lib` e `src/components/ui`.

## Design system

Tokens em `src/index.css` (`:root` e `.dark`) mapeados ao Tailwind v4 via
`@theme inline`. Detalhes em `DESIGN_SYSTEM.md`.

## Aliases e config

- `@/*` aponta para `src/*` (tsconfig + vite).
- `.npmrc` com `legacy-peer-deps=true` (compatibilidade de peers, lição do Aerogestor).
- `tsconfig` só checa `src/`; `vite.config.ts` fica fora (evita conflito com a
  cópia de vite aninhada do vitest).
