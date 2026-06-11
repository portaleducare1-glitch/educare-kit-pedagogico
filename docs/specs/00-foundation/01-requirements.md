# Fundação do Educare · Requisitos

> Status: implementado (Fase 1).

## Objetivo

Estabelecer uma base técnica forte, segura, responsiva e portável (web hoje,
Android/iOS via Capacitor amanhã), com documentação que acelere a criação de
novos módulos.

## Requisitos

- **F1** Stack web moderna: Vite + React + TypeScript + Tailwind CSS 4.
- **F2** Design system próprio, derivado da logo, com tema claro e escuro.
- **F3** Componentes de UI acessíveis (shadcn/ui + Radix).
- **F4** Pronto para empacotar como app nativo (Capacitor configurado).
- **F5** Pronto para integrar o Supabase no futuro, sem usá-lo agora.
- **F6** Documentação SDD: cada módulo com requisitos, design e tarefas.
- **F7** Qualidade: type-check (`tsc`), testes (vitest) e build sem erros.
- **F8** Segurança por padrão: processamento client-side, sem segredos no client,
  sanitização de conteúdo vindo do usuário.

## Fora de escopo (Fase 1)

- Autenticação e shell do dashboard (sidebar/header/dropdown): ver
  `docs/specs/app-shell/`.
- Banco de dados e backend.
- Publicação nas lojas.
