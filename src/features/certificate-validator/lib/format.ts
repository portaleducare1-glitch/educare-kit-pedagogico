import DOMPurify from 'dompurify';
import type { IdentifierType } from './types';

/** Mantém apenas dígitos de uma string. */
export const onlyDigits = (s: string): string => s.replace(/\D+/g, '');

/** Classifica um identificador por quantidade de dígitos. */
export function identifierType(digits: string): IdentifierType | null {
  if (digits.length === 11) return 'cpf';
  if (digits.length === 14) return 'cnpj';
  return null;
}

/** Mascara CPF para exibição: ***.456.789-** (oculta primeiro grupo e dígitos verificadores). */
export function maskCpf(digits: string): string {
  return `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**`;
}

/** Formata CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00). */
export function formatIdentifier(digits: string): string {
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  if (digits.length === 14) {
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return digits;
}

/** Converte uma data dd/mm/yyyy para Date local, ou null se inválida. */
export function parseBrDate(value: string | null): Date | null {
  if (!value) return null;
  const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const date = new Date(year, month - 1, day);
  // Rejeita overflow (ex.: 31/02 viraria 03/03).
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
    return null;
  }
  return date;
}

/** Verdadeiro se a string é uma data dd/mm/yyyy válida. */
export const isValidBrDate = (value: string | null): boolean => parseBrDate(value) !== null;

/**
 * Sanitiza texto extraído antes de exibir. A renderização via React já
 * escapa, mas removemos tags e caracteres de controle por defesa em
 * profundidade (o conteúdo vem de um arquivo enviado pelo usuário).
 * Iteramos por code point para evitar regex frágil de escape.
 */
export function sanitizeText(value: string): string {
  const noTags = DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  let out = '';
  for (const ch of noTags) {
    const code = ch.codePointAt(0) ?? 0;
    const isControl = code < 0x20 && ch !== '\n' && ch !== '\t';
    const isDel = code === 0x7f;
    if (!isControl && !isDel) out += ch;
  }
  return out.trim();
}
