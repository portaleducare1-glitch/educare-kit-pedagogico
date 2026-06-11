import { normalize } from '@/lib/cn';
import { onlyDigits, parseBrDate } from './format';
import type { CertificateMeta, CheckResult, ExtractedFields } from './types';

/*
  Impressão digital de um certificado autêntico da Educare.
  Estes valores vêm do certificado-modelo (src/test/fixtures/certificado-teste.pdf) e
  são o ponto de extensão para novas regras ("depois definimos mais regras").

  Atenção: as chaves de comparação abaixo (producer, creator, title,
  bodyMarkers, company, companyArea) ficam SEM acento de propósito, pois são
  comparadas contra texto já normalizado (sem acentos). Não acentue.
*/
export const EDUCARE_FINGERPRINT = {
  producer: 'skia/pdf',
  creator: 'headlesschrome',
  pages: 2,
  // A4 em pontos (gerador Chrome). Paisagem => largura > altura.
  a4LongSide: 842.88,
  a4ShortSide: 595.92,
  sizeTolerancePt: 24,
  title: 'certificado',
  // Marcadores do CORPO do certificado. O OCR lê esta região de forma
  // confiável (fonte grande), ao contrário do rodapé minúsculo. Exigimos
  // pelo menos `bodyMarkersMin` para confirmar que é um certificado Educare.
  // (chaves normalizadas, sem acento)
  bodyMarkers: [
    'certificamos que o aluno',
    'concluiu o',
    'aperfeicoamento',
    'cumprindo',
    'aproveitamento',
    'frequencia',
    'carga horaria',
    'coordenadora pedagogica',
  ],
  bodyMarkersMin: 2,
  // Rodapé: confirma a marca/CNPJ quando legível, mas é só um AVISO porque o
  // texto é pequeno e o OCR costuma falhar ali. (chaves normalizadas)
  company: 'educare',
  companyArea: 'pedagogia',
  cnpjDigits: '28719923000117',
  cnpjFormatted: '28.719.923',
  // Tokens fixos na camada de texto invisível do PDF (texto branco sobre fundo branco).
  // Os 3 devem estar presentes para a verificação de assinatura interna passar.
  hiddenTokens: ['vnpk4mxr7qzbt3', 'jc8wdl2hs5frge', 'yt6nab9qxm3pvk'],
} as const;

/** Verdadeiro se as dimensões batem com A4 paisagem (com tolerância). */
function isA4Landscape(width: number, height: number): boolean {
  const { a4LongSide, a4ShortSide, sizeTolerancePt: t } = EDUCARE_FINGERPRINT;
  const longSide = Math.max(width, height);
  const shortSide = Math.min(width, height);
  const matchesA4 =
    Math.abs(longSide - a4LongSide) <= t && Math.abs(shortSide - a4ShortSide) <= t;
  return matchesA4 && width >= height; // paisagem
}

export interface RuleContext {
  meta: CertificateMeta;
  fields: ExtractedFields;
  ocrText: string | null;
  ranOcr: boolean;
  rawText: string;
}

/**
 * Avalia as regras sobre o certificado e devolve a lista de verificações.
 * O status final (válido/inválido) é decidido por quem chama: válido se e
 * somente se todas as checagens `critical` passarem. `warning` nunca reprova.
 */
export function evaluateRules({ meta, fields, ocrText, ranOcr, rawText }: RuleContext): CheckResult[] {
  const checks: CheckResult[] = [];
  const producer = normalize(meta.producer);
  const creator = normalize(meta.creator);

  // 1. Gerador (impressão digital do emissor)
  checks.push({
    id: 'generator',
    label: 'Origem do arquivo (gerador oficial)',
    severity: 'critical',
    passed:
      producer.includes(EDUCARE_FINGERPRINT.producer) &&
      creator.includes(EDUCARE_FINGERPRINT.creator),
    detail: meta.producer ? `Gerado por ${meta.producer}` : 'Sem metadados de gerador',
  });

  // 2. Estrutura do documento (A4 paisagem, 2 páginas)
  const structureOk =
    meta.numPages === EDUCARE_FINGERPRINT.pages &&
    isA4Landscape(meta.pageWidth, meta.pageHeight);
  checks.push({
    id: 'structure',
    label: 'Estrutura do documento (formato e páginas)',
    severity: 'critical',
    passed: structureOk,
    detail: `${meta.numPages} página(s), ${Math.round(meta.pageWidth)}x${Math.round(
      meta.pageHeight,
    )} pt`,
  });

  // 3. Campos obrigatórios (texto)
  const startValid = parseBrDate(fields.startDate) !== null;
  const endValid = parseBrDate(fields.endDate) !== null;
  const idValid = !!fields.identifier && [11, 14].includes(fields.identifier.length);
  const fieldsOk = !!fields.studentName && idValid && startValid && endValid;
  const missing: string[] = [];
  if (!fields.studentName) missing.push('nome');
  if (!idValid) missing.push('CPF/CNPJ');
  if (!startValid) missing.push('data de início');
  if (!endValid) missing.push('data de término');
  checks.push({
    id: 'fields',
    label: 'Campos do aluno (nome, documento e datas)',
    severity: 'critical',
    passed: fieldsOk,
    detail: fieldsOk ? 'Todos os campos presentes' : `Faltando: ${missing.join(', ')}`,
  });

  // 4. Assinatura interna: tokens fixos na camada de texto invisível do PDF
  const rawNorm = normalize(rawText);
  const allTokensPresent = EDUCARE_FINGERPRINT.hiddenTokens.every((t) => rawNorm.includes(t));
  checks.push({
    id: 'signature',
    label: 'Assinatura interna do documento',
    severity: 'critical',
    passed: allTokensPresent,
    detail: allTokensPresent ? undefined : 'Assinatura interna ausente ou inválida',
  });

  // Regras baseadas em OCR (só quando o reconhecimento visual rodou)
  if (ranOcr && ocrText) {
    const ocr = normalize(ocrText);
    const ocrDigits = onlyDigits(ocrText);

    // Título (lê de forma confiável)
    checks.push({
      id: 'title',
      label: 'Título "CERTIFICADO" presente',
      severity: 'critical',
      passed: ocr.includes(EDUCARE_FINGERPRINT.title),
    });

    // Corpo do certificado: impressão digital textual da Educare
    const matched = EDUCARE_FINGERPRINT.bodyMarkers.filter((m) => ocr.includes(m));
    const contentOk = matched.length >= EDUCARE_FINGERPRINT.bodyMarkersMin;
    checks.push({
      id: 'content',
      label: 'Texto padrão do certificado Educare',
      severity: 'critical',
      passed: contentOk,
      detail: contentOk
        ? `${matched.length} marcadores reconhecidos`
        : 'O texto do certificado não corresponde ao modelo da Educare',
    });

    // Rodapé/CNPJ: confirmação adicional (só aviso, OCR do rodapé é instável)
    const footerOk =
      ocr.includes(EDUCARE_FINGERPRINT.company) &&
      (ocr.includes(EDUCARE_FINGERPRINT.companyArea) ||
        ocr.includes(EDUCARE_FINGERPRINT.cnpjFormatted) ||
        ocrDigits.includes(EDUCARE_FINGERPRINT.cnpjDigits));
    checks.push({
      id: 'footer',
      label: 'Marca e CNPJ no rodapé',
      severity: 'warning',
      passed: footerOk,
      detail: footerOk
        ? 'Marca e CNPJ conferem'
        : 'Rodapé ilegível por OCR (não impede a validação)',
    });
  } else {
    checks.push({
      id: 'ocr',
      label: 'Verificação visual por OCR',
      severity: 'warning',
      passed: false,
      detail: 'Não foi possível rodar o OCR; curso e rodapé não verificados.',
    });
  }

  // Aviso (não reprova): ordem das datas. O modelo de teste viola isso.
  const start = parseBrDate(fields.startDate);
  const end = parseBrDate(fields.endDate);
  if (start && end) {
    checks.push({
      id: 'dateOrder',
      label: 'Ordem das datas (término após início)',
      severity: 'warning',
      passed: end.getTime() >= start.getTime(),
      detail:
        end.getTime() >= start.getTime()
          ? undefined
          : 'A data de término é anterior à de início.',
    });
  }

  return checks;
}

/** Status final a partir das checagens: válido se todas as críticas passam. */
export function deriveStatus(checks: CheckResult[]): 'valid' | 'invalid' {
  return checks.every((c) => c.severity !== 'critical' || c.passed) ? 'valid' : 'invalid';
}
