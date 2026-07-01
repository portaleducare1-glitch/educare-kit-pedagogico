# Educare — Kit Pedagógico 5.0
## Guia de Deploy e Handoff Técnico

> Este documento é para quem vai receber o projeto e fazer o deploy em produção.
> Leia do início ao fim antes de rodar qualquer comando.

---

## O que é este projeto

O **Kit Pedagógico 5.0** é o primeiro produto da plataforma Educare. É uma SPA (Single-Page Application) com um único módulo:

- **Portal de Materiais** — rota `/portal` — 220 materiais pedagógicos organizados, pesquisáveis e filtráveis. PWA instalável no celular.

A rota `/` redireciona automaticamente para `/portal`.

Este produto faz parte do ecossistema futuro da Educare:
- **Kit Pedagógico** (este repo) — entrega imediata, produto autônomo
- **Validador de Certificados** — produto separado, repo proprio (`educare-validador-certificados`)
- **Assistente Pedagógico** — produto maior que incluirá o Kit (roadmap futuro)
- **Portal do Aluno** — plataforma interna para alunos (roadmap futuro)

---

## Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| CSS | Tailwind CSS v4 |
| Componentes | shadcn/ui (Radix) |
| PWA | vite-plugin-pwa + Workbox |
| Analytics | Google Analytics 4 (G-B4VE78DNRF) + Microsoft Clarity (mcj559upll) |
| Backend | Nenhum — 100% client-side na Fase 1 |
| Banco de dados | Nenhum — dados estáticos em `src/features/portal-materiais/data/materiais.ts` |

**Não há servidor, não há banco de dados, não há variáveis de ambiente obrigatórias para o deploy básico.**

---

## Como fazer o deploy (EasyPanel, real — atualizado em 30/06/2026)

### Estado desta entrega para o Giovanni

- Commit de referencia: `696587d` (branch `main`, 01/07/2026).
- Versao visivel do portal: `v1.1.3`.
- Verificacao local mais recente: TypeScript OK, Vitest OK, build de producao OK (2.01s), E2E Playwright 46/46 passando.
- Correcoes acumuladas desde o handoff anterior (`077b829`):
  - Splash duplicada resolvida no Android standalone (Chrome)
  - Toast de favorito com cor correta
  - Travessao (em dash) removido de textos visiveis ao usuario
  - Paginas /privacidade e /termos sem icone de tema orfao
  - Politica de privacidade com data 01/07/2026 e sem mencao a "fase de testes"
  - Versao v1.1.3 no rodape das paginas legais
  - Instrucoes Android na pagina Instalar sempre visiveis (botao e passos manuais juntos)
  - 29 titulos e 19 descricoes de materiais com acentuacao corrigida
  - Bolha de avaliacao (Typebot): passiva (nao abre forcado), dispara so em ficha de material apos 9s


**Não é deploy manual de site estático.** É Docker. O EasyPanel usa o
`Dockerfile` deste repo, mas o auto-deploy por push falhou nas últimas rodadas.
Fluxo seguro atual: fazer `git push` no `main` e pedir para o Giovanni disparar
o rebuild no EasyPanel. Depois disso, verificar produção de verdade.

O EasyPanel builda usando o `Dockerfile` deste repo (3 estágios: instala
dependências com `npm ci` usando o `.npmrc` do projeto → builda com
`npm run build` → serve a pasta `dist/` com `nginx:alpine`, usando o
`nginx.conf` deste repo como config — não Apache, não Caddy). Confirmado
batendo direto no domínio do EasyPanel: o servidor responde `Server: nginx`.

**Antes de dar push, garantir:**
- `npm run build` local limpo (mesmo comando que o Docker vai rodar)
- `nginx.conf` está com a config que deve valer em produção — é a **única**
  fonte real de verdade pros headers de segurança/CSP (`.htaccess` e
  `netlify.toml` existem só como alternativa caso a hospedagem mude um dia
  pra Apache/Netlify; mudar CSP/header sem replicar nos três é o tipo de
  divergência que já causou bug real nesta sessão — ver `03-tasks.md`)

Não precisa clonar/instalar/buildar manualmente em lugar nenhum — isso tudo
acontece dentro do container no EasyPanel, automaticamente, a partir do push.

### Domínio de produção
`https://app.educarepedagogia.com.br/portal`

**Status em 28/06:** DNS e SSL confirmados. Este é o link definitivo para
comunicações novas. O domínio antigo `kit.educarepedagogia.com.br` foi
abandonado porque nunca apontou no DNS. O redirecionador WordPress
`/portal-kit-pedagogico` foi retirado e não deve ser usado em comunicação nova.

---

## Variáveis de ambiente

**Não há variáveis obrigatórias.** O projeto funciona sem nenhum `.env`.

Variáveis opcionais (para features futuras com Supabase):
```
VITE_SUPABASE_URL=       # vazio por enquanto
VITE_SUPABASE_ANON_KEY=  # vazio por enquanto
```

---

## Segurança

Os headers de segurança estão configurados em três lugares e **`nginx.conf` é o
único que realmente vale em produção** (o `Dockerfile` builda com `nginx:alpine`
e copia esse arquivo pra `/etc/nginx/conf.d/default.conf` — confirmado em teste
de 26/06 batendo direto no domínio do EasyPanel: o servidor responde `Server:
nginx`, não Apache). `.htaccess` não tem efeito nenhum nesse deploy.

1. **`nginx.conf`** — fonte da verdade, usado pelo `Dockerfile`/EasyPanel
2. **`netlify.toml`** — só se algum dia rodar preview no Netlify
3. **`public/.htaccess`** — só se algum dia migrar pra hospedagem Apache

**Atenção:** os três têm a mesma CSP duplicada. Se mudar um (adicionar domínio
novo de script/widget/analytics), mude os três juntos — foi exatamente a
divergência entre eles (`nginx.conf` defasado, sem Clarity nem Typebot) que
quase foi pro ar no teste de 26/06.

Headers incluídos:
- `Content-Security-Policy` com CSP restritivo (apenas GoogleTagManager, Clarity, WordPress)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security`
- `Referrer-Policy`
- `Permissions-Policy`

### Após o domínio estar confirmado

Atualizar o CORS no WordPress (Code Snippets, ID 8):
- Mudar de `*` para `https://app.educarepedagogia.com.br`

**Atenção, achado no teste de 26/06:** o snippet de CORS atual não está fazendo
allowlist de verdade, ele reflete de volta qualquer `Origin` enviado pelo
navegador (testado com um domínio inventado e ele aceitou). Isso equivale na
prática a um `*`, mesmo já estando "configurado" com o domínio certo. Trocar
para uma comparação estrita contra `https://app.educarepedagogia.com.br`.

### Tarefas de segurança pendentes (Eduardo resolve antes do go-live)
- [ ] Rotacionar senha do usuário WP `duhmachado`
- [ ] Rotacionar JWT Nutror/Eduzz (exposto em 09/06/2026)

---

## Estrutura de pastas

```
src/
├── features/
│   ├── portal-materiais/          # Módulo principal — portal de materiais
│   │   ├── components/            # Componentes React (cards, layout, filtros)
│   │   ├── data/
│   │   │   └── materiais.ts       # 220 materiais — fonte única de verdade
│   │   ├── lib/                   # Lógica pura (busca, favoritos, visitados)
│   │   ├── pages/                 # Páginas: Home, Acervo, Material, Favoritos
│   │   └── types.ts               # Tipos TypeScript + labels de display
├── components/                    # Componentes globais (layout, UI)
├── lib/
│   ├── analytics.ts               # Todos os eventos GA4
│   └── toast.ts                   # Sistema de notificações
└── pages/                         # Páginas públicas (Privacidade, Termos, 404)
```

---

## O que foi construído (Fase 1)

### Módulo Portal de Materiais
- **220 materiais** do Kit Pedagógico organizados em 3 seções (Apostilas, Atividades, Documentos)
- **Busca textual** com sinônimos expandidos (TEA/autismo, TDAH, LIBRAS, etc.)
- **Filtros combinados:** seção + etapa escolar + tema + situação
- **12 temas especializados:** TEA, TDAH, AEE, CAA, LIBRAS, Braille, Altas Habilidades, Socioemocional, Matemática, Leitura, Grafomotricidade, Inclusão
- **9 chips de situação** na home ("Preciso de atividade para hoje", "Aluno com necessidade especial", etc.)
- **Favoritos** persistidos em localStorage
- **Histórico de visitados** — "Continue de onde parou"
- **Badge "Novo"** — aparece automaticamente quando `novidadeAte >= hoje` no material
- **Seção "Adicionados recentemente"** na home — baseada no campo `novidadeAte`
- **Compartilhamento WhatsApp** em cada material
- **Preview PDF** desktop-only (iframe)
- **Download PDF** com fallback para iOS (Share Sheet)
- **PWA** instalável no celular/tablet (ícone, splash screen, offline básico)
- **Empty state** com chips de sugestão quando busca não retorna resultados

### Analytics
- **GA4** com eventos customizados: `abrir_material`, `busca_portal`, `busca_sem_resultado`, `download_pdf`, `filtro_tema`, `filtro_secao`, `filtro_etapa`, `share_whatsapp`, `favorito_add`, `favorito_remove`, `click_situacao`
- **Microsoft Clarity** para heatmaps e gravações de sessão

---

## Como adicionar novos materiais

Edite o arquivo `src/features/portal-materiais/data/materiais.ts`.

Cada material segue esta interface:

```typescript
{
  id: string,                    // slug único, kebab-case
  titulo: string,
  url: string,                   // URL do PDF no WordPress
  wp_id?: number,                // ID da mídia no WordPress (opcional)
  secao: 'apostilas' | 'atividades' | 'documentos',
  categoria: string,             // Texto livre para display
  etapas: Etapa[],               // ['maternal', 'infantil', 'alfabetizacao', 'fund-iniciais', 'fund-finais', 'todos']
  temas: Tema[],                 // ['tea', 'tdah', 'aee', 'caa', 'libras', 'braille', 'superdotacao', 'socioemocional', 'matematica', 'leitura', 'grafomotricidade', 'inclusao']
  situacoes: Situacao[],         // ['aluno-nao-fala', 'aluno-agitado', 'atividade-pronta', ...]
  descricao: string,
  quando_usar: string,
  como_usar: string,
  novidadeAte?: string,          // 'YYYY-MM-DD' — exibe badge "Novo" até essa data
}
```

Para marcar um material como "Novo" por 30 dias após adicionar:
```typescript
novidadeAte: '2026-07-11',  // data de hoje + 30 dias
```

---

## Comandos úteis

```bash
npm run dev      # Sobe servidor local em http://localhost:3000
npm run build    # Build de produção → gera dist/
npm run lint     # TypeScript type check (tsc --noEmit)
npm run test     # Testes unitários (vitest; portal sem specs unitárias nesta fase)
npm run test:e2e # Testes E2E do portal (quando o ambiente permitir navegador headless)
```

---

## Saúde do código (na data do handoff — 2026-06-11)

| Check | Resultado |
|-------|-----------|
| TypeScript | 0 erros |
| Testes | Lógica do portal sem testes unitários nesta fase (testes do validador ficaram no repo do validador) |
| Build prod | OK, sem warnings |
| Segredos no bundle | Nenhum |
| npm audit (prod deps) | 0 vulnerabilidades |
| npm audit (dev deps) | 4 moderate/critical — apenas em vitest/vite (não chegam ao bundle) |

---

## Contexto de produto

Este portal substitui a entrega tradicional dos materiais pedagógicos da Educare (antes feita pelo Nutror/Eduzz). O objetivo da Fase 1 é:

1. Ter um produto bonito, funcional e rápido que funcione no celular como app instalado
2. Facilitar o acesso das professoras aos materiais do Kit Pedagógico
3. Coletar dados de comportamento (GA4 + Clarity) para informar as próximas fases

A Fase 2 prevê: backend próprio (Supabase), autenticação de alunos, progresso individual, e integração com o Assistente Pedagógico.
