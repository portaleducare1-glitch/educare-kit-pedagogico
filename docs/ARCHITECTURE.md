# Educare · Arquitetura

> Revisado em 26/06/2026. Este documento descrevia o validador de certificados,
> que saiu deste repositório em 11/06/2026 e virou produto próprio
> (`educare-validador-certificados`). Reescrito para refletir o produto que
> realmente vive aqui hoje: o **Portal de Materiais do Kit Pedagógico 5.0**.

## O ecossistema Educare (multi-repo, propositalmente separado)

```
educare-kit-pedagogico (este repo)     → Portal de Materiais, produto atual
educare-validador-certificados         → validador OCR de certificado, separado 11/06/2026
siteeducare (Giovanni)                 → portal institucional/vendas, stack própria
Assistente Pedagógico (futuro SaaS)    → ainda não iniciado, ver docs/specs futuro
```

Repos separados por decisão deliberada (11/06/2026): produtos com ciclo de vida e
dono técnico diferentes não devem compartilhar deploy nem lockfile. Antes de
iniciar qualquer módulo novo, confirme em qual desses repositórios ele pertence.

## Visão em camadas (este repo)

```
+---------------------------------------------------------+
|  UI (React + shadcn/ui)                                  |
|    components/layout · components/ui · features/*/components
+---------------------------------------------------------+
|  Domínio (por módulo)                                     |
|    features/<módulo>/lib  (regras, parsers, orquestração) |
+---------------------------------------------------------+
|  Infra client-side                                       |
|    lib/analytics (GA4) · lib/cn · lib/supabase (stub)    |
+---------------------------------------------------------+
|  Plataforma                                              |
|    Navegador (web)  ·  WebView Capacitor (iOS/Android, futuro) |
+---------------------------------------------------------+
```

Regra de ouro: a UI não fala com bibliotecas pesadas ou serviços externos
diretamente; ela chama a camada de domínio do módulo (`lib/`), que isola a infra.
Isso mantém a UI testável e permite trocar a infra (ex.: WordPress → Supabase) sem
reescrever componente.

## Princípio de modularidade (formalizado 26/06/2026)

Este é um projeto que vai crescer para uma base de centenas de milhares de leads
em pagamento recorrente (contexto de negócio: 400 mil+ leads ativos somando
Educare e Life). A partir de agora, **cada módulo em `src/features/<módulo>/` é
uma unidade isolada**:

- Um módulo só pode importar de `src/lib`, `src/components/ui` e de si mesmo —
  nunca de dentro de outro módulo (`src/features/outro-modulo/lib`, por exemplo).
- Se dois módulos precisam compartilhar lógica, essa lógica sobe para `src/lib`
  como código genérico, não fica importada de módulo para módulo.
- Mexer em um módulo não deve exigir mexer em outro. Se exigir, é sinal de que o
  limite do módulo está errado e precisa ser revisto antes de continuar.
- Toda mudança estrutural num módulo atualiza a spec dele em `docs/specs/<módulo>/`
  (ver `docs/MODULE_GUIDE.md`). Isso é o que permite a qualquer desenvolvedor
  contratado, ou qualquer outra IA, entender o projeto lendo a spec em vez de ler
  todo o código.

## Estado atual (Fase 1)

- App SPA estática, sem backend. Toda a lógica roda no cliente.
- Único módulo de produto: `portal-materiais` (`/portal`). Rotas públicas de apoio:
  `/privacidade`, `/termos`.
- Sem autenticação, sem banco de dados. Catálogo de conteúdo é estático
  (`src/features/portal-materiais/data/materiais.ts`), hospedado em PDFs públicos
  no WordPress (`educarepedagogia.com.br`).
- Deploy: build Docker → EasyPanel (VPS do Giovanni). Ver `DEPLOY.md`.

## Alinhamento de stack com o resto da Educare

A Educare tem dois ambientes técnicos hoje, deliberadamente divergentes nesta
fase: o portal institucional do Giovanni (`siteeducare`, Next.js + Supabase +
Tailwind v3 + EasyPanel) e este repo (Vite SPA + Tailwind v4, mesmo EasyPanel de
deploy). A divergência é aceitável **enquanto este módulo for estático e sem
conta de usuário** (Fase 1). No momento em que este repo precisar de
autenticação, banco ou SSR (Fase 2), a decisão a tomar é migrar para o mesmo
padrão do Giovanni (Next.js App Router + Supabase + Tailwind v3) em vez de manter
dois padrões divergentes — ver tabela completa de comparação e racional em
`Vault/Projetos/Educare/stack-giovanni.md` (fonte de verdade do padrão dele,
mantida fora deste repo porque descreve decisão de outra pessoa/outro repo).

| Camada | Hoje (este repo) | Padrão Giovanni | Decisão |
|---|---|---|---|
| Framework | Vite + React SPA | Next.js App Router | Migrar no início da Fase 2 |
| Tailwind | v4 | v3 | Migrar no início da Fase 2 |
| Auth/DB | nenhum | Supabase | Adotar Supabase quando entrar auth |
| Deploy | EasyPanel (Docker) | EasyPanel (Docker) | Já alinhado |
| Tracking | GA4 + Clarity (script direto) | Meta Pixel + CAPI + GA4 via GTM | Avaliar GTM na Fase 2 |

## Decisões-chave

1. **Vite + React** nesta fase porque o portal é puramente estático (sem
   servidor, sem autenticação) — trocar para Next.js antes disso seria
   complexidade sem benefício.
2. **Conteúdo client-side, sem backend**: custo zero de infra na Fase 1; a fonte
   de verdade do catálogo é um arquivo TypeScript versionado no Git, não um CMS.
3. **WordPress como CDN de arquivo público**: domínio já controlado, upload via
   REST API, URLs permanentes, sem custo adicional. Ver `02-design.md` do módulo
   `portal-materiais` para o pipeline completo de conteúdo.
4. **Design system via CSS vars + Tailwind v4**: troca de tema sem rebuild.

## Roadmap

### Fase 2 — Autenticação e progresso individual
- Migrar para Supabase (Auth + tabelas de progresso/favoritos por usuário).
- Reavaliar nesse ponto a migração de stack completa para Next.js (ver tabela
  acima), em vez de adicionar Supabase a uma SPA Vite.
- Toda tabela com dado sensível DEVE ter RLS (Row Level Security) — nunca confiar
  em filtro do front como camada de segurança.

### Nativo (Capacitor, ainda não iniciado neste módulo)
- `npm run build && npx cap add ios && npx cap add android && npx cap sync`.
- Regra: mudou JS? rode `npm run build && npx cap sync` (o WebView é embedado).

### Assistente Pedagógico (SaaS maior, fora do escopo atual)
- Ver `Vault/Projetos/Educare/assistente-pedagogico.md` para a visão de produto.
  Quando esse módulo for iniciado de fato neste ou em outro repo, ele precisa de
  spec própria em `docs/specs/`, seguindo o mesmo padrão SDD.
