# Educare · Guia para criar um novo módulo (SDD)

Passo a passo para adicionar funcionalidades mantendo a base organizada. SDD =
Spec-Driven Development: escreva a especificação antes do código.

## 1. Escreva a spec (antes de codar)

Crie `docs/specs/<nome-do-módulo>/` com três arquivos:

- `01-requirements.md` - o que e por quê (estilo EARS: "Quando X, o sistema DEVE Y").
- `02-design.md` - como: camadas, arquivos, tipos, decisões.
- `03-tasks.md` - lista de tarefas marcáveis.

Use a pasta `certificate-validator/` como modelo.

## 2. Crie a pasta do módulo

```
src/features/<módulo>/
  components/      # UI do módulo
  lib/             # domínio: tipos, regras, orquestração (sem React)
  __tests__/       # testes vitest do domínio
```

Regra: **lógica de negócio em `lib/` (pura, testável); React só em `components/`.**
Código reutilizável por vários módulos vai para `src/lib` e `src/components/ui`.

## 3. Reuse o que já existe

- UI: `src/components/ui` (button, card, badge, alert, skeleton, progress).
- Utilitário: `cn()` em `src/lib/cn.ts`.
- Tema: `useTheme()` em `src/components/theme`.
- PDF/OCR: `src/lib/pdf/*` (se o módulo lidar com PDFs).
- Supabase (quando aplicável): `getSupabase()` em `src/lib/supabase.ts`.
- Tokens e regras visuais: `DESIGN_SYSTEM.md`.

## 4. Adicione a rota

Em `src/App.tsx`, adicione `<Route>`. As rotas públicas hoje usam `PublicLayout`.
As rotas autenticadas usarão o `AppShell` (Fase 2).

## 5. Componentes shadcn novos

Siga o padrão dos existentes: `cva` para variantes, `cn` para classes, tokens
semânticos (nunca hex cru). Coloque em `src/components/ui/`.

## 6. Qualidade (antes de concluir)

```bash
npm run lint     # tsc --noEmit
npm run test     # vitest
npm run build    # build de produção
```

- Escreva testes para a `lib/` do módulo (funções puras são fáceis de testar).
- Verifique com dados/arquivos reais quando possível.

## 7. Paridade e nativo

Se a mudança afeta UI/regra de negócio e o app já roda no Capacitor:
`npm run build && npx cap sync` (o WebView é embedado no binário).

## 8. Convenções inegociáveis

- Tudo em português do Brasil, com acentuação correta.
- Texto visível ao usuário: **sem travessão** (em dash/en dash). Ver `DESIGN_SYSTEM.md`.
- Nunca exponha segredos no client. Variáveis `VITE_*` são públicas.
- Conteúdo vindo do usuário (arquivos, formulários): sanitize antes de exibir.
- Atualize a spec (`03-tasks.md`) e o `CLAUDE.md` quando mudar algo estrutural.
