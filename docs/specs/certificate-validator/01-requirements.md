# Validador de Certificados · Requisitos

> Status: implementado (Fase 1). Estilo EARS (Easy Approach to Requirements Syntax).

## Objetivo

Permitir que qualquer pessoa, em um domínio público, confirme se um certificado
emitido pela Educare é autêntico, sem login e sem banco de dados, processando o
arquivo no próprio dispositivo.

## Atores

- **Visitante**: envia um PDF e vê o resultado da validação.

## Requisitos funcionais

- **R1** Quando o visitante enviar um arquivo PDF, o sistema DEVE processá-lo
  inteiramente no navegador, sem enviar o arquivo a nenhum servidor.
- **R2** Quando o arquivo não for um PDF válido (tipo, assinatura ou tamanho
  acima de 15 MB), o sistema DEVE recusar com mensagem clara antes de validar.
- **R3** O sistema DEVE extrair da camada de texto: nome do aluno, identificador
  (CPF de 11 ou CNPJ de 14 dígitos), data de início e data de término.
- **R4** O sistema DEVE extrair por OCR (sob demanda): nome do curso e carga
  horária, além de conferir o título e o texto padrão do certificado.
- **R5** O sistema DEVE classificar o certificado como **válido** somente se
  todas as verificações críticas passarem; caso contrário, **não validado /
  possível falsificação**.
- **R6** Quando válido, o sistema DEVE exibir os campos extraídos em verde.
- **R7** Quando inválido, o sistema DEVE listar quais verificações falharam, sem
  expor detalhes que facilitem forjar um certificado.
- **R8** Enquanto processa, o sistema DEVE informar a fase atual e, no OCR, o
  progresso.
- **R9** O sistema DEVE permitir validar outro certificado sem recarregar a página.

## Verificações (impressão digital do padrão Educare)

| ID | Severidade | Regra |
|---|---|---|
| `generator` | crítica | Producer contém `Skia/PDF` e Creator contém `HeadlessChrome` |
| `structure` | crítica | A4 paisagem (842.88 x 595.92 pt, com tolerância) e 2 páginas |
| `fields` | crítica | Nome + identificador (11/14 dígitos) + duas datas válidas |
| `title` | crítica (OCR) | Contém o título "CERTIFICADO" |
| `content` | crítica (OCR) | >= 2 marcadores do corpo (ex.: "concluiu o", "aperfeicoamento", "carga horaria") |
| `footer` | aviso (OCR) | Marca/CNPJ no rodapé (OCR instável; não reprova) |
| `dateOrder` | aviso | Término após início |

## Requisitos não funcionais

- **RNF1 Desempenho**: bibliotecas pesadas (pdf.js, tesseract.js) carregadas sob
  demanda; carregamento inicial leve.
- **RNF2 Segurança/Privacidade**: nenhum dado sai do dispositivo; o texto extraído
  é sanitizado antes de exibir.
- **RNF3 Responsividade**: usável em mobile e desktop.
- **RNF4 Portabilidade**: roda dentro do WebView do Capacitor (Android/iOS).

## Decisões registradas

- O nome do curso e a carga horária NÃO existem como texto no PDF (estão na
  imagem do template), por isso o OCR é necessário para esses campos.
- O OCR lê bem o título e o corpo, mas o rodapé é pequeno e sai ruidoso. Por
  isso o rodapé/CNPJ é apenas **aviso**, e o **corpo** é a checagem crítica de OCR.
- O certificado-modelo tem término anterior ao início; a ordem de datas é **aviso**.
- O identificador do modelo tem 14 dígitos (CNPJ); aceitamos 11 (CPF) ou 14.
