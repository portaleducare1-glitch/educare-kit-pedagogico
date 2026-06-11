# Validador de Certificados · Tarefas

> Status: todas concluídas na Fase 1.

- [x] T1 Camada PDF: `loadPdf` (guardas + metadados + dimensões), `extractText`,
  `renderPage`, `ocr` (lazy).
- [x] T2 Utilitários de domínio: `format.ts` (CPF/CNPJ, datas, `sanitizeText`).
- [x] T3 Parsers: `parseTextLayerFields` (nome, identificador, datas) e
  `parseOcrFields` (curso, carga horária).
- [x] T4 Motor de regras: `EDUCARE_FINGERPRINT`, `evaluateRules`, `deriveStatus`.
- [x] T5 Orquestrador: `validateCertificate` com fases e progresso de OCR.
- [x] T6 UI: `CertificateDropzone`, `FieldRow`, `ChecksList`, `ValidationResult`,
  `ValidatorPage`.
- [x] T7 Testes (vitest): `format`, `parseFields`, `rules` (válido, inválido,
  OCR degradado). 11 testes.
- [x] T8 Verificação com arquivos reais: certificado-modelo (válido) e PDF
  externo (inválido); OCR real confirmado sobre a imagem da página 1.

## Pendências para fases futuras

- [ ] OCR offline/nativo: self-hospedar worker, core e modelo `por` (hoje via CDN).
- [ ] Consulta por código na base de certificados (Supabase) como segunda camada.
- [ ] Regras adicionais de anti-falsificação a definir com o time.
- [ ] Teste e2e em navegador (drag-and-drop real) com Playwright.
