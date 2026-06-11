# Educare · Arquitetura

## Visão em camadas

```
+---------------------------------------------------------+
|  UI (React + shadcn/ui)                                  |
|    components/layout · components/ui · features/*/components
+---------------------------------------------------------+
|  Domínio (por módulo)                                    |
|    features/<módulo>/lib  (regras, parsers, orquestração)
+---------------------------------------------------------+
|  Infra client-side                                       |
|    lib/pdf (pdf.js, ocr) · lib/cn · lib/supabase (stub)  |
+---------------------------------------------------------+
|  Plataforma                                              |
|    Navegador (web)  ·  WebView Capacitor (iOS/Android)   |
+---------------------------------------------------------+
```

Regra de ouro: a UI não fala com bibliotecas pesadas diretamente; ela chama a
camada de domínio do módulo, que usa a infra. Isso mantém a UI testável e o
código portável para o nativo.

## Estado atual (Fase 1)

- App SPA estática, sem backend. Toda a lógica roda no cliente.
- Único módulo: `certificate-validator`. Rota pública `/`.
- Sem autenticação, sem banco.

## Decisões-chave

1. **Vite + React + Capacitor** (mesma base do Aerogestor, já nas lojas):
   o mesmo `dist/` vira app nativo via WebView, com mínimo retrabalho.
2. **Processamento client-side**: privacidade (arquivos não sobem) e custo zero
   de backend para o validador.
3. **Code splitting por demanda**: pdf.js e tesseract.js só carregam quando há
   um arquivo. Ver `02-design.md` do validador.
4. **Design system via CSS vars + Tailwind v4**: troca de tema sem rebuild.

## Roadmap

### Nativo (Capacitor)
- `npm run build && npx cap add ios && npx cap add android && npx cap sync`.
- Regra: mudou JS? rode `npm run build && npx cap sync` (o WebView é embedado).
- Avaliar plugins (Filesystem, Share) para abrir PDFs vindos de outros apps.
- OCR offline: self-hospedar worker/core/modelo `por` do tesseract (hoje via CDN).

### Supabase (futuro)
- `lib/supabase.ts` já expõe `getSupabase()` e `isSupabaseConfigured()`.
- Variáveis em `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Casos: Auth para o shell (Fase 2) e base de certificados emitidos para validar
  por código/CPF como segunda camada de confiança.
- Toda tabela com dado sensível deve ter RLS (não confiar em filtros do front).

### Shell autenticado (Fase 2)
- Ver `docs/specs/app-shell/01-requirements.md`.
