# Shell do Dashboard · Requisitos (RASCUNHO · Fase 2)

> Status: não implementado. Documenta o pedido original para execução futura.
> Nada aqui está no código ainda.

## Objetivo

Área autenticada do Educare com navegação moderna, otimizada para desktop e
mobile, base para os próximos módulos administrativos.

## Requisitos

- **S1** Sidebar moderna no desktop, com itens e subitens (expansíveis),
  destaque do item ativo e estado recolhido/expandido.
- **S2** Header fixo no topo com campo de gerenciar usuário contendo: foto, nome
  e cargo, mais uma seta que abre um menu dropdown.
- **S3** O dropdown do usuário DEVE dar acesso a: configurações de perfil, tema e
  sair.
- **S4** No mobile, a navegação DEVE virar um menu adequado (drawer ou barra
  inferior), preservando itens e subitens.
- **S5** Layout responsivo com as mesmas rotas em desktop e mobile.
- **S6** Rotas protegidas por autenticação (Supabase Auth), com redirecionamento
  para login quando não autenticado.

## Componentes previstos

- `components/layout/AppShell.tsx` (grid sidebar + header + conteúdo)
- `components/layout/Sidebar.tsx` (itens/subitens, colapsável)
- `components/layout/Header.tsx` (título + `UserMenu`)
- `components/layout/UserMenu.tsx` (foto/nome/cargo + dropdown via Radix)
- `components/layout/MobileNav.tsx` (drawer/bottom-nav)
- `features/auth/` (login, sessão, guarda de rota)

## Dependências a avaliar

- `@radix-ui/react-dropdown-menu`, `@radix-ui/react-avatar` (ou avatar próprio).
- `@supabase/supabase-js` (já instalado) + tabela de perfis (foto, nome, cargo).

## Notas de design

- Reusar os tokens do `DESIGN_SYSTEM.md` e os componentes `ui/` já existentes.
- A foto do usuário precisa de upload/crop futuramente (avaliar `react-easy-crop`,
  como no Aerogestor).
