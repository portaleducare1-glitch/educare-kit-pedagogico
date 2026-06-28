# Portal de Materiais · Design

## Arquitetura

SPA (Vite + React 19 + TypeScript), sem backend. Servida como site estático no
EasyPanel (VPS do Giovanni, build via Docker). Domínio público planejado
`kit.educarepedagogia.com.br`, hoje **sem DNS apontado** (achado de 26/06/2026) —
o link real em produção é o gerado pelo EasyPanel
(`https://site-educare-kitpedagogico.vpqsrq.easypanel.host/portal`).

```
src/features/portal-materiais/
  components/   PortalLayout, InstallBanner, TrackingNotice, cards/filtros
  data/         materiais.ts — fonte única de verdade do catálogo
  lib/          useFavoritos, useInstall, useTrackingNotice (lógica pura)
  pages/        PortalHome, PortalAcervo, PortalMaterial, PortalFavoritos, PortalInstalar
  types.ts      Material, Secao, Etapa, Tema, Situacao
```

## Domínio (atualizado 28/06/2026 — camada de redirecionamento retirada)

`https://app.educarepedagogia.com.br/portal` é o link definitivo, usado direto
em qualquer comunicação — DNS apontado, SSL válido, confirmado servindo o
mesmo app que o link cru do EasyPanel.

O redirecionador via WordPress (`/portal-kit-pedagogico`) que existia desde
26/06 foi retirado (rascunho, não apagado) em 28/06: nunca chegou a ser usado
em nenhuma comunicação real, e o motivo de existir (domínio próprio sem DNS)
deixou de valer com o `app.` funcionando. `kit.educarepedagogia.com.br`
(o domínio antigo planejado) está abandonado.

## Pipeline de conteúdo (Nutror → portal)

```
Curso no Nutror (id)
   │  GET /nutror/v1/courses/{id}/modules   (API expõe módulo, não expõe arquivo)
   ▼
Login manual ou Playwright em my.nutror.com/curso/{id}/conteudo
   │  intercepta producer-api.nutror.com: /modules, /lessons, /lessons/{id} (.files[].title)
   ▼
Download do arquivo (CDN Eduzz, URL com token, expira)
   │
   ▼
Upload no WordPress (POST /wp-json/wp/v2/media) → URL pública permanente
   │
   ▼
Nova entrada em src/features/portal-materiais/data/materiais.ts
```

**Limitação conhecida:** a API pública do Nutror não devolve a lista de arquivos
dentro de um módulo (`GET /nutror/v1/modules/{id}/contents` retorna vazio). Por
isso qualquer auditoria de conteúdo precisa ou de varredura via Playwright logado,
ou de checagem manual pelo Eduardo, nunca só API.

## Rastreamento e privacidade (corrigido 26/06/2026)

- **GA4** (`G-B4VE78DNRF`) e **Microsoft Clarity** (`mcj559upll`) ativos desde a
  Fase 1 (10/06/2026), mas a Política de Privacidade afirmava o contrário até
  26/06/2026 — corrigido.
- `TrackingNotice` (novo componente) avisa na primeira visita, controlado por
  `localStorage['educare-tracking-notice-dismissed']`.
- **Limitação de monitoramento:** a credencial de GA4 disponível
  (`acessos-api.md`) é Measurement Protocol (API Secret), que serve só para
  **enviar** evento, não para **ler** relatório via Data API. Clarity não tem API
  pública documentada. Leitura de comportamento real depende do Eduardo abrir os
  painéis, a menos que se configure acesso de leitura à GA4 Data API numa sessão
  futura.

## Versionamento

A regra geral (o que é patch/minor/major, "vale o de maior peso", quando o
número sobe de verdade) virou protocolo próprio, válido pra qualquer
sistema/projeto, não só este: ver `Vault/protocolo-versionamento.md`. Não
duplicar aqui.

**Específico deste projeto:** o rodapé (`PortalLayout.tsx`) exibe a versão.
**Major candidato já identificado:** Fase 2 (login, progresso individual) é
outra geração do produto — quando chegar lá, vira `v2.0.0`, não um minor a
mais em cima do `v1.x`.

## Histórico de incidente de deploy (achado e confirmado 26/06/2026)

O primeiro deploy no EasyPanel falhou: Giovani reportou erro no `npm ci`. Causa
raiz: o lockfile foi gerado com `legacy-peer-deps=true` (`.npmrc`), mas o
`Dockerfile` só copiava `package*.json`, então `npm ci` rodava em modo estrito e
falhava nas peer deps de `@testing-library/react`. **Já corrigido** no commit
`df5f941` (21/06/2026), presente no `main` — o próximo deploy não deve repetir
esse erro. Esse incidente nunca tinha sido registrado no changelog do Vault, só no
commit; registrado aqui e em `kit-pedagogico-portal-status.md` agora.
