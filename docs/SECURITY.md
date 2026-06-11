# Educare · Segurança e Privacidade

## Princípios

- **Processamento local**: o validador lê, renderiza e faz OCR do PDF inteiramente
  no dispositivo. Nenhum arquivo é enviado a servidores. O modelo de idioma do
  OCR é baixado de um CDN (só o modelo, nunca o documento do usuário).
- **Sem segredos no client**: nada sensível no bundle. As variáveis `VITE_*` são
  públicas por natureza; use-as apenas para chaves públicas (ex.: Supabase anon).
- **Defesa em profundidade na entrada**: `loadPdf` valida tipo, assinatura
  (`%PDF`) e tamanho (máx. 15 MB) antes de processar.
- **Sanitização de saída**: todo texto extraído passa por `sanitizeText`
  (DOMPurify + remoção de caracteres de controle) antes de ser exibido.
- **Mensagens de erro discretas**: em caso de inválido, listamos as verificações
  que falharam sem detalhar como burlar a validação.

## Limites conhecidos da validação (Fase 1)

A robustez é intencionalmente leve nesta fase (a pedido). A validação se baseia
em uma "impressão digital" do PDF (gerador, estrutura, campos, título e texto do
corpo via OCR). Isso detecta arquivos fora do padrão da empresa, mas não é prova
criptográfica de autenticidade. Camadas futuras podem incluir:

- Consulta por código/CPF em uma base de certificados emitidos (Supabase).
- Assinatura digital/QR autocontido verificável por chave pública.
- Regras adicionais de anti-falsificação a definir com o time.

## Recomendações de hospedagem (domínio público)

Configure cabeçalhos de segurança no host/CDN:

- `Content-Security-Policy` restritiva (permitir o CDN do tesseract em
  `script-src`/`connect-src`/`worker-src`, ou self-hospedar e remover o CDN).
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` (HTTPS obrigatório).
- `X-Frame-Options: DENY` (ou `frame-ancestors 'none'` no CSP).

## Nativo (Capacitor)

- Para OCR offline e CSP estrita, self-hospede os assets do tesseract (worker,
  core wasm e `por.traineddata`) e aponte a configuração do worker para eles.
- `allowMixedContent: false` já definido no Android.
