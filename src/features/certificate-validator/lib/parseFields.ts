import { normalize } from '@/lib/cn';
import { identifierType, onlyDigits, sanitizeText } from './format';
import type { ExtractedFields } from './types';

const DATE_RE = /(\d{2}\/\d{2}\/\d{4})/;
const START_RE = /in[ií]cio\s*:?\s*(\d{2}\/\d{2}\/\d{4})/i;
const END_RE = /t[eé]rmino\s*:?\s*(\d{2}\/\d{2}\/\d{4})/i;
// Sequência de exatamente 11 (CPF) ou 14 (CNPJ) dígitos.
const ID_RE = /(?<!\d)(\d{14}|\d{11})(?!\d)/;

/** Linha que parece rótulo/data e não deve virar nome do aluno. */
function isNoiseLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return true;
  if (DATE_RE.test(trimmed)) return true; // contém data
  if (/^[\d.\-/\s]+$/.test(trimmed)) return true; // só dígitos/pontuação (ex.: CPF)
  // Comparação contra texto normalizado (sem acento): não acentue estas chaves.
  const n = normalize(trimmed);
  if (n.includes('inicio') || n.includes('termino') || n.includes('aluno')) return true;
  return false;
}

/**
 * Extrai os campos que existem como TEXTO na página 1 do certificado Educare:
 * nome do aluno, identificador (CPF/CNPJ) e as datas de início e término.
 */
export function parseTextLayerFields(text: string): ExtractedFields {
  const startDate = text.match(START_RE)?.[1] ?? null;
  const endDate = text.match(END_RE)?.[1] ?? null;

  const idDigits = text.match(ID_RE)?.[1] ?? null;
  const identifier = idDigits ? onlyDigits(idDigits) : null;

  // Nome do aluno: primeira linha "limpa" com letras.
  const lines = text.split('\n').map((l) => l.trim());
  const nameLine = lines.find((l) => !isNoiseLine(l) && /[A-Za-zÀ-ÿ]{2,}/.test(l)) ?? null;

  return {
    studentName: nameLine ? sanitizeText(nameLine) : null,
    identifier,
    identifierType: identifier ? identifierType(identifier) : null,
    startDate,
    endDate,
    courseName: null,
    workloadHours: null,
  };
}

/**
 * Extrai, do texto reconhecido por OCR, o nome do curso e a carga horária
 * (que no PDF estão dentro da imagem do template, não no texto).
 */
export function parseOcrFields(ocrText: string): Pick<ExtractedFields, 'courseName' | 'workloadHours'> {
  let courseName: string | null = null;

  const concluiu = ocrText.match(/concluiu\s+o\s+([\s\S]{4,180}?)\s*,/i);
  const cursoDe = ocrText.match(/(curso\s+de\s+[\s\S]{4,160}?)(?:,|\s+cumprindo)/i);
  const raw = concluiu?.[1] ?? cursoDe?.[1] ?? null;
  if (raw) {
    courseName = sanitizeText(raw.replace(/\s+/g, ' '));
  }

  const carga = ocrText.match(/carga\s+hor[áa]ria\s+de\s+(\d{1,4})\s*h/i);
  const workloadHours = carga ? Number(carga[1]) : null;

  return { courseName, workloadHours };
}
