import { extractPageText } from '@/lib/pdf/extractText';
import { getPageSize, getPdfMeta, loadPdf } from '@/lib/pdf/loadPdf';
import { ocrImage, type OcrProgress } from '@/lib/pdf/ocr';
import { renderPageToCanvas } from '@/lib/pdf/renderPage';
import { sanitizeText } from './format';
import { parseOcrFields, parseTextLayerFields } from './parseFields';
import { deriveStatus, evaluateRules } from './rules';
import type { CertificateMeta, ValidationReport } from './types';

export type ValidationPhase = 'reading' | 'extracting' | 'ocr' | 'evaluating' | 'done';

export interface ValidateOptions {
  /** Liga/desliga o OCR (curso, carga horária, rodapé). Padrão: ligado. */
  runOcr?: boolean;
  /** Notifica a fase atual do processo (para a interface). */
  onPhase?: (phase: ValidationPhase) => void;
  /** Progresso do OCR (download do modelo e reconhecimento). */
  onOcrProgress?: (p: OcrProgress) => void;
}

/**
 * Valida um certificado da Educare 100% no navegador:
 * carrega o PDF, lê metadados e texto, opcionalmente roda OCR e aplica o
 * motor de regras. Nenhum dado é enviado para servidores.
 */
export async function validateCertificate(
  file: File,
  opts: ValidateOptions = {},
): Promise<ValidationReport> {
  const { runOcr = true, onPhase, onOcrProgress } = opts;

  onPhase?.('reading');
  const { doc, numPages } = await loadPdf(file);

  try {
    const meta0 = await getPdfMeta(doc);
    const size = await getPageSize(doc, 1);
    const meta: CertificateMeta = {
      ...meta0,
      numPages,
      pageWidth: size.width,
      pageHeight: size.height,
    };

    onPhase?.('extracting');
    const textLayer = await extractPageText(doc, 1);
    let fields = parseTextLayerFields(textLayer);

    let ocrText: string | null = null;
    let ranOcr = false;
    if (runOcr) {
      try {
        onPhase?.('ocr');
        const canvas = await renderPageToCanvas(doc, 1, 2);
        const raw = await ocrImage(canvas, onOcrProgress);
        ocrText = sanitizeText(raw);
        ranOcr = true;
        fields = { ...fields, ...parseOcrFields(ocrText) };
      } catch {
        // Degrada com elegância: segue só com as regras de texto/estrutura.
        ocrText = null;
        ranOcr = false;
      }
    }

    onPhase?.('evaluating');
    const checks = evaluateRules({ meta, fields, ocrText, ranOcr, rawText: textLayer });
    const status = deriveStatus(checks);

    onPhase?.('done');
    return { status, fields, checks, meta, ocrText, ranOcr };
  } finally {
    // Libera recursos do worker do pdf.js.
    void doc.destroy();
  }
}
