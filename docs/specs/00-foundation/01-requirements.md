# Fundação do Educare · Requisitos

> Status: implementado (Fase 1), revisado em 26/06/2026. Esta spec descrevia o
> validador de certificados (saiu do repo em 11/06/2026). Atualizada para
> refletir o produto atual e formalizar a exigência de estrutura/segurança
> pensando em escala (a Educare tem hoje 400 mil+ leads ativos somando suas
> marcas; qualquer atalho na fundação custa caro depois que isso virar base
> grande de pagamento recorrente).

## Objetivo

Estabelecer uma base técnica forte, segura, modular e documentada, de forma que:

1. Qualquer módulo novo possa ser adicionado ou modificado sem precisar tocar em
   outros módulos.
2. Um desenvolvedor contratado no futuro, sem contexto prévio, consiga entender
   o que existe e como mexer só lendo `docs/`.
3. Qualquer IA (não só a que escreveu o código) consiga ler a spec e entender a
   estrutura e as convenções a seguir, sem depender de memória de conversa.

## Requisitos

- **F1** Stack web moderna: Vite + React + TypeScript + Tailwind CSS 4 (Fase 1).
  Reavaliar migração para Next.js + Tailwind v3 quando entrar autenticação
  (alinhamento com o padrão Giovanni, ver `ARCHITECTURE.md`).
- **F2** Design system próprio, derivado da logo, com tema claro e escuro.
- **F3** Componentes de UI acessíveis (shadcn/ui + Radix).
- **F4** Pronto para empacotar como app nativo (Capacitor configurado, ainda não
  usado neste módulo).
- **F5** Pronto para integrar o Supabase no futuro (Fase 2), sem usá-lo agora.
- **F6** Documentação SDD obrigatória: todo módulo com requisitos, design e
  tarefas em `docs/specs/<módulo>/`, seguindo `docs/MODULE_GUIDE.md`.
- **F7** Qualidade: type-check (`tsc`), testes (vitest) e build sem erros antes
  de qualquer deploy.
- **F8** Segurança por padrão: sem segredos no client, sanitização de conteúdo
  vindo do usuário, RLS obrigatório em qualquer tabela com dado pessoal a partir
  da Fase 2. Ver `SECURITY.md`.
- **F9 (novo, 26/06/2026)** Modularidade real: um módulo em `src/features/`
  importa só de `src/lib`, `src/components/ui` e de si mesmo. Nunca de outro
  módulo. Violar isso é sinal de limite de módulo errado, a ser corrigido antes
  de prosseguir.
- **F10 (novo, 26/06/2026)** Qualquer decisão estrutural (escolha de stack,
  divergência ou alinhamento com o padrão de outro time/repo da Educare,
  separação de produto em outro repositório) precisa estar registrada em
  `ARCHITECTURE.md`, não apenas decidida em conversa.

## Ecossistema multi-repo (decisão estrutural registrada 26/06/2026)

A Educare é, hoje, mais de um repositório com ciclos de vida e times diferentes:
este repo (`educare-kit-pedagogico`), o validador de certificados (repo próprio),
o portal institucional do Giovanni e o futuro Assistente Pedagógico. Cada produto
com infraestrutura/deploy/lockfile separado é decisão deliberada, não
fragmentação acidental. Ver `ARCHITECTURE.md` para o detalhamento.

## Fora de escopo (Fase 1)

- Autenticação e shell do dashboard (sidebar/header/dropdown): ver
  `docs/specs/app-shell/`.
- Banco de dados e backend.
- Publicação nas lojas (Capacitor configurado, não usado ainda).
