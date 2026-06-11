import { describe, expect, it } from 'vitest';
import { parseOcrFields, parseTextLayerFields } from '../parseFields';
import { deriveStatus, evaluateRules } from '../rules';
import type { CertificateMeta } from '../types';

const VALID_META: CertificateMeta = {
  producer: 'Skia/PDF m137',
  creator:
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/137.0.0.0 Safari/537.36',
  title: 'about:blank',
  numPages: 2,
  pageWidth: 842.88,
  pageHeight: 595.92,
};

const TEXT_LAYER = [
  'Educare Cursos Pedagógicos',
  'INÍCIO: 15/04/2025',
  '28719923000117',
  'TÉRMINO: 10/02/2021',
].join('\n');

// Camada de texto com os tokens de assinatura interna embutidos.
const RAW_TEXT_WITH_TOKENS = TEXT_LAYER + '\nvnpk4mxr7qzbt3\njc8wdl2hs5frge\nyt6nab9qxm3pvk';

const OCR_TEXT =
  'CERTIFICADO Concluiu o CURSO DE APERFEIÇOAMENTO EM ALFABETIZAÇÃO E LETRAMENTO, ' +
  'cumprindo os módulos. Com uma carga horária de 360h. ' +
  'EDUCARE CURSOS PEDAGOGIA - CNPJ: 28.719.923/0001-17';

function validFields() {
  return { ...parseTextLayerFields(TEXT_LAYER), ...parseOcrFields(OCR_TEXT) };
}

describe('evaluateRules', () => {
  it('aprova um certificado autêntico (com aviso de ordem de datas)', () => {
    const checks = evaluateRules({
      meta: VALID_META,
      fields: validFields(),
      ocrText: OCR_TEXT,
      ranOcr: true,
      rawText: RAW_TEXT_WITH_TOKENS,
    });
    expect(deriveStatus(checks)).toBe('valid');
    expect(checks.find((c) => c.id === 'content')?.passed).toBe(true);
    // Rodapé é apenas aviso (OCR do rodapé é instável), não reprova.
    expect(checks.find((c) => c.id === 'footer')?.severity).toBe('warning');

    const dateOrder = checks.find((c) => c.id === 'dateOrder');
    expect(dateOrder?.severity).toBe('warning');
    expect(dateOrder?.passed).toBe(false); // termino antes do inicio (modelo de teste)
  });

  it('reprova PDF com gerador e estrutura fora do padrão', () => {
    const checks = evaluateRules({
      meta: {
        producer: 'Adobe Acrobat',
        creator: 'Microsoft Word',
        title: '',
        numPages: 1,
        pageWidth: 595.32,
        pageHeight: 841.92, // retrato A4
      },
      fields: parseTextLayerFields('documento qualquer sem campos'),
      ocrText: 'texto aleatorio sem marca',
      ranOcr: true,
      rawText: '',
    });
    expect(deriveStatus(checks)).toBe('invalid');
    expect(checks.find((c) => c.id === 'generator')?.passed).toBe(false);
    expect(checks.find((c) => c.id === 'structure')?.passed).toBe(false);
    expect(checks.find((c) => c.id === 'content')?.passed).toBe(false);
  });

  it('quando o OCR não roda, não reprova por causa do rodapé/título', () => {
    const checks = evaluateRules({
      meta: VALID_META,
      fields: parseTextLayerFields(TEXT_LAYER),
      ocrText: null,
      ranOcr: false,
      rawText: RAW_TEXT_WITH_TOKENS,
    });
    // Só as regras de texto/estrutura decidem; aqui passam => válido.
    expect(deriveStatus(checks)).toBe('valid');
    expect(checks.find((c) => c.id === 'ocr')?.severity).toBe('warning');
  });
});
