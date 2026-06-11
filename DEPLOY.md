# Educare — Kit Pedagógico 5.0
## Guia de Deploy e Handoff Técnico

> Este documento é para quem vai receber o projeto e fazer o deploy em produção.
> Leia do início ao fim antes de rodar qualquer comando.

---

## O que é este projeto

O **Kit Pedagógico 5.0** é o primeiro produto da plataforma Educare. É uma SPA (Single-Page Application) com um único módulo:

- **Portal de Materiais** — rota `/portal` — 136 materiais pedagógicos organizados, pesquisáveis e filtráveis. PWA instalável no celular.

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

## Como fazer o deploy (EasyPanel / VPS)

### Pré-requisitos
- Node.js 20+ na máquina de build
- Git configurado com acesso ao repo

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/portaleducare1-glitch/educare-kit-pedagogico.git
cd educare-kit-pedagogico

# 2. Instalar dependências
npm install

# 3. Build de produção
npm run build
# Gera a pasta dist/ com todos os arquivos estáticos

# 4. Servir a pasta dist/ como site estático
# No EasyPanel: apontar o static serve para a pasta dist/
# O arquivo dist/index.html é o entry point do SPA
```

### Configuração no EasyPanel
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20
- **SPA routing:** obrigatório — todas as rotas devem redirecionar para `index.html`

O arquivo `public/.htaccess` já contém a config de rewrite para Apache. Para Nginx ou Caddy, configure manualmente:

```nginx
# Nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Domínio de produção
`portal.educarepedagogia.com.br`

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

Os headers de segurança já estão configurados em dois lugares:

1. **`netlify.toml`** — para preview no Netlify
2. **`public/.htaccess`** — para o servidor Apache do EasyPanel

Headers incluídos:
- `Content-Security-Policy` com CSP restritivo (apenas GoogleTagManager, Clarity, WordPress)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security`
- `Referrer-Policy`
- `Permissions-Policy`

### Após o domínio estar confirmado

Atualizar o CORS no WordPress (Code Snippets, ID 8):
- Mudar de `*` para `https://portal.educarepedagogia.com.br`

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
│   │   │   └── materiais.ts       # 136 materiais — fonte única de verdade
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
- **136 materiais** do Kit Pedagógico 5.0 organizados em 3 seções (Apostilas, Atividades, Documentos)
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
npm run test     # Testes unitários (vitest)
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
2. Facilitar o acesso das professoras aos 136 materiais do Kit Pedagógico 5.0
3. Coletar dados de comportamento (GA4 + Clarity) para informar as próximas fases

A Fase 2 prevê: backend próprio (Supabase), autenticação de alunos, progresso individual, e integração com o Assistente Pedagógico.
