# Validador de Certificados · Design

## Visão geral

Pipeline 100% client-side: o PDF é lido pelo `pdf.js` (em web worker), os campos
de texto são extraídos por regex, a página 1 é renderizada para um canvas e o
`tesseract.js` (carregado sob demanda) faz OCR do curso/carga/corpo. Um motor de
regras declarativo decide o veredito.

```
File (PDF)
  -> loadPdf            guardas (tipo, tamanho, %PDF) + abre no pdf.js
  -> getPdfMeta         Producer / Creator / Title
  -> getPageSize        dimensões da página 1
  -> extractPageText    camada de texto -> parseTextLayerFields
  -> renderPageToCanvas página 1 -> canvas (scale 2)
  -> ocrImage (lazy)    tesseract.js -> texto -> parseOcrFields
  -> evaluateRules      lista de CheckResult
  -> deriveStatus       válido se todas as críticas passam
  => ValidationReport
```

## Camadas e arquivos

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| PDF | `src/lib/pdf/loadPdf.ts` | Abrir PDF, guardas, metadados, dimensões |
| PDF | `src/lib/pdf/extractText.ts` | Texto da página |
| PDF | `src/lib/pdf/renderPage.ts` | Página -> canvas |
| PDF | `src/lib/pdf/ocr.ts` | OCR lazy (tesseract.js) |
| Domínio | `.../lib/parseFields.ts` | Regex de campos (texto e OCR) |
| Domínio | `.../lib/rules.ts` | `EDUCARE_FINGERPRINT`, `evaluateRules`, `deriveStatus` |
| Domínio | `.../lib/validateCertificate.ts` | Orquestrador |
| Domínio | `.../lib/format.ts` | CPF/CNPJ, datas, sanitização |
| UI | `.../components/*` | Dropzone, Result, FieldRow, ChecksList, Page |

## Tipos centrais

`ExtractedFields`, `CertificateMeta`, `CheckResult` (`{id,label,severity,passed,detail}`),
`ValidationReport` (`{status, fields, checks, meta, ocrText, ranOcr}`). Ver
`src/features/certificate-validator/lib/types.ts`.

## Decisões de desempenho

- `validateCertificate` é importado dinamicamente pela `ValidatorPage` no momento
  do envio: o pdf.js fica em um chunk separado (`validateCertificate-*.js`).
- O `tesseract.js` é importado dinamicamente dentro de `ocr.ts`: só baixa quando
  há um arquivo. O modelo de idioma `por` é baixado de um CDN e fica em cache.
- O parse e o OCR rodam em web workers; a main thread fica livre.

## Degradação graciosa

Se o OCR falhar (rede, ambiente), `ranOcr` fica `false`: as regras de OCR
(`title`, `content`) não são aplicadas e o veredito recai sobre `generator` +
`structure` + `fields`. Um aviso `ocr` informa que curso/rodapé não foram lidos.

## Extensibilidade (novas regras)

Adicionar uma regra = inserir um `CheckResult` em `evaluateRules` e, se for
constante, em `EDUCARE_FINGERPRINT`. `severity: 'critical'` reprova; `'warning'`
apenas informa. Nada mais muda na UI.
