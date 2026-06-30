# Educare · Segurança e Privacidade

> Revisado em 30/06/2026. Este documento descrevia o validador de certificados
> (processamento OCR 100% local), que saiu deste repo em 11/06/2026. Reescrito
> para o que de fato roda aqui: o Portal de Materiais do Kit Pedagógico 5.0.

## Princípios (válidos para qualquer módulo deste repo)

- **Sem segredos no client**: nada sensível no bundle. As variáveis `VITE_*` são
  públicas por natureza; use-as apenas para chaves públicas (ex.: Supabase anon
  key, quando entrar na Fase 2).
- **Sanitização de saída**: todo conteúdo que vier de uma fonte que o usuário
  controla (formulário, upload) passa por `sanitizeText` antes de ser exibido.
  Hoje, o catálogo de materiais é 100% controlado pela Educare (não há campo de
  usuário no portal), então isso ainda não se aplica a `portal-materiais` — mas
  vale para qualquer módulo futuro com formulário ou comentário.
- **Transparência de rastreamento**: qualquer ferramenta de analytics/gravação de
  sessão (hoje GA4 + Microsoft Clarity) precisa estar refletida com exatidão na
  Política de Privacidade e, na primeira visita, avisada ao usuário dentro do
  produto. Corrigido em 26/06/2026 — ver changelog do módulo `portal-materiais`.
- **Rotação de credencial exposta**: qualquer chave/senha que aparecer em log,
  print, export de chat ou repositório é considerada comprometida e deve ser
  rotacionada, mesmo que o vazamento pareça de baixo risco. (Pendência conhecida:
  senha WP `duhmachado` e JWT Nutror/Eduzz expostos em 09/06/2026, rotação ainda
  não feita por dependência de múltiplos lugares — ver
  `Vault/Projetos/Educare/kit-pedagogico-portal-status.md`.)

## Achados de segurança em aberto (registrados 26/06/2026)

- **CORS do WordPress está aberto demais**: `Access-Control-Allow-Origin` reflete
  qualquer `Origin` enviado pela requisição (testado com `curl`), em vez de
  restringir a uma lista de domínios conhecidos
  (`app.educarepedagogia.com.br` e `educarepedagogia.com.br`). Isso facilita qualquer
  site de terceiro ler dados do `wp-json` em nome de um visitante. Não é
  bloqueador para o lançamento da Fase 1 (não há dado sensível de usuário
  trafegando), mas é uma porta aberta que precisa ser fechada antes de qualquer
  endpoint com dado de aluno (Fase 2).
- **Domínio de produção atual**: desde 30/06/2026, o endereço operacional do
  portal é `https://app.educarepedagogia.com.br/portal`. O domínio antigo
  `kit.educarepedagogia.com.br` e o caminho `/portal-kit-pedagogico` ficam apenas
  como histórico e não devem ser usados em comunicações novas.

## Antes de qualquer dado de usuário entrar no projeto (Fase 2 e além)

Esta seção existe porque o projeto vai escalar para uma base grande (centenas de
milhares de leads/alunos em pagamento recorrente) e qualquer atalho de segurança
tomado agora, com poucos usuários, vira incidente caro depois. Regras
inegociáveis a partir do momento em que houver login, banco ou dado pessoal além
do que já está documentado:

- **RLS (Row Level Security) obrigatório** em toda tabela Supabase com dado de
  aluno. Nunca confiar em filtro de query do front como camada de segurança —
  o front pode ser inspecionado e contornado por qualquer pessoa.
- **Nenhuma chave privada (service role, secret) no client.** Toda operação que
  precisar de privilégio elevado roda em Edge Function/backend, nunca no bundle.
- **Rate limiting** em qualquer endpoint que aceite escrita pública (formulário,
  comentário, recuperação de senha) — sem isso, qualquer funcionalidade nova
  pode virar vetor de abuso em escala assim que o tráfego crescer.
- **CORS restrito a domínios conhecidos**, nunca refletindo qualquer origem (ver
  achado acima — corrigir antes de adicionar qualquer endpoint novo com dado de
  usuário).
- **Cookies de sessão/autenticação**: `httpOnly` + `Secure` + `SameSite`, nunca
  acessíveis via JavaScript do client.

## Recomendações de hospedagem (válidas hoje)

- `Content-Security-Policy` restritivo (já configurado em `public/.htaccess` e
  `netlify.toml`, permitindo apenas GA4, Clarity e WordPress).
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` (HTTPS obrigatório).
- `X-Frame-Options: SAMEORIGIN`

## Nativo (Capacitor, ainda não iniciado neste módulo)

- `allowMixedContent: false` deve ser mantido ao configurar o Android.
- Qualquer plugin nativo (Filesystem, Share) que toque em arquivo do usuário
  precisa do mesmo princípio de sanitização desta página.
