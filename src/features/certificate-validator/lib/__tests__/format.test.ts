import { describe, expect, it } from 'vitest';
import {
  formatIdentifier,
  identifierType,
  isValidBrDate,
  maskCpf,
  onlyDigits,
  parseBrDate,
  sanitizeText,
} from '../format';

describe('format', () => {
  it('mantem apenas digitos', () => {
    expect(onlyDigits('28.719.923/0001-17')).toBe('28719923000117');
  });

  it('classifica CPF (11) e CNPJ (14)', () => {
    expect(identifierType('12345678901')).toBe('cpf');
    expect(identifierType('28719923000117')).toBe('cnpj');
    expect(identifierType('123')).toBeNull();
  });

  it('formata CPF e CNPJ', () => {
    expect(formatIdentifier('12345678901')).toBe('123.456.789-01');
    expect(formatIdentifier('28719923000117')).toBe('28.719.923/0001-17');
  });

  it('mascara CPF ocultando primeiro grupo e digitos verificadores', () => {
    expect(maskCpf('12345678901')).toBe('***.456.789-**');
  });

  it('valida datas dd/mm/yyyy', () => {
    expect(isValidBrDate('15/04/2025')).toBe(true);
    expect(parseBrDate('31/02/2025')).toBeNull(); // overflow
    expect(isValidBrDate('2025-04-15')).toBe(false);
    expect(isValidBrDate(null)).toBe(false);
  });

  it('sanitiza tags e caracteres de controle', () => {
    expect(sanitizeText('<b>Educare</b>')).toBe('Educare');
    expect(sanitizeText(`Nome${String.fromCharCode(0)}Aluno`)).toBe('NomeAluno');
    expect(sanitizeText('  Espaco  ')).toBe('Espaco');
  });
});
