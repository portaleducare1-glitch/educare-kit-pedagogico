/** Severidade de uma verificação no motor de regras. */
export type Severity = 'critical' | 'warning';

/** Resultado de uma regra avaliada sobre o certificado. */
export interface CheckResult {
  id: string;
  label: string;
  severity: Severity;
  passed: boolean;
  detail?: string;
}

/** Tipo do identificador do aluno extraído. */
export type IdentifierType = 'cpf' | 'cnpj';

/** Campos extraídos do certificado (texto e OCR). `null` = não encontrado. */
export interface ExtractedFields {
  studentName: string | null;
  identifier: string | null; // somente dígitos (11 = CPF, 14 = CNPJ)
  identifierType: IdentifierType | null;
  startDate: string | null; // dd/mm/yyyy (texto original)
  endDate: string | null; // dd/mm/yyyy
  courseName: string | null; // via OCR
  workloadHours: number | null; // via OCR
}

/** Metadados estruturais do PDF (impressão digital do gerador). */
export interface CertificateMeta {
  producer: string;
  creator: string;
  title: string;
  numPages: number;
  pageWidth: number;
  pageHeight: number;
}

export type ValidationStatus = 'valid' | 'invalid';

/** Relatório final retornado por validateCertificate(). */
export interface ValidationReport {
  status: ValidationStatus;
  fields: ExtractedFields;
  checks: CheckResult[];
  meta: CertificateMeta;
  /** Texto reconhecido por OCR (sanitizado) ou null se não rodou. */
  ocrText: string | null;
  ranOcr: boolean;
}
