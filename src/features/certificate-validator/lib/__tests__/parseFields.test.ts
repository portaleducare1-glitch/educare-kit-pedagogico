import { describe, expect, it } from 'vitest';
import { parseOcrFields, parseTextLayerFields } from '../parseFields';

// Texto extraído da camada de texto da página 1 (via pdf.js / pdftotext).
const TEXT_LAYER = [
  'Educare Cursos Pedagógicos',
  'INÍCIO: 15/04/2025',
  '28719923000117',
  'TÉRMINO: 10/02/2021',
].join('\n');

// Texto que o OCR retorna sobre a imagem do template (aproximado).
const OCR_TEXT = `CERTIFICADO
Certificamos que o aluno(a):
Educare Cursos Pedagógicos
Concluiu o CURSO DE APERFEIÇOAMENTO EM ALFABETIZAÇÃO E LETRAMENTO, cumprindo os módulos e avaliação, obtendo 100% de aproveitamento e frequência. Com uma carga horária de 360h.
INÍCIO: 15/04/2025
TÉRMINO: 10/02/2021
BRUNA PATUSSI
COORDENADORA PEDAGÓGICA
EDUCARE CURSOS PEDAGOGIA - CNPJ: 28.719.923/0001-17`;

describe('parseTextLayerFields', () => {
  it('extrai nome, identificador e datas', () => {
    const f = parseTextLayerFields(TEXT_LAYER);
    expect(f.studentName).toBe('Educare Cursos Pedagógicos');
    expect(f.identifier).toBe('28719923000117');
    expect(f.identifierType).toBe('cnpj');
    expect(f.startDate).toBe('15/04/2025');
    expect(f.endDate).toBe('10/02/2021');
  });

  it('não confunde data com identificador', () => {
    const f = parseTextLayerFields(TEXT_LAYER);
    expect(f.identifier).not.toContain('/');
  });
});

describe('parseOcrFields', () => {
  it('extrai nome do curso e carga horaria', () => {
    const f = parseOcrFields(OCR_TEXT);
    expect(f.courseName).toBe('CURSO DE APERFEIÇOAMENTO EM ALFABETIZAÇÃO E LETRAMENTO');
    expect(f.workloadHours).toBe(360);
  });
});
