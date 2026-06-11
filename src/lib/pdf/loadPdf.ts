import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
// Vite resolve para a URL do worker em build/dev. O worker roda o parse do
// PDF fora da main thread, mantendo a interface responsiva.
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

/** Limite de tamanho do arquivo aceito (privacidade e desempenho). */
export const MAX_PDF_BYTES = 15 * 1024 * 1024; // 15 MB

/** Erro de validação de entrada (arquivo inválido antes do parse de regras). */
export class PdfInputError extends Error {
  constructor(
    message: string,
    readonly code: 'type' | 'size' | 'corrupt' | 'empty',
  ) {
    super(message);
    this.name = 'PdfInputError';
  }
}

/** Confere os magic bytes "%PDF-" no início do arquivo. */
async function hasPdfSignature(file: File): Promise<boolean> {
  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  // %  P  D  F  -
  return (
    head[0] === 0x25 &&
    head[1] === 0x50 &&
    head[2] === 0x44 &&
    head[3] === 0x46 &&
    head[4] === 0x2d
  );
}

export interface LoadedPdf {
  doc: PDFDocumentProxy;
  numPages: number;
}

/**
 * Abre um arquivo como PDF no navegador, sem rede e sem upload.
 * Aplica guardas de tipo, tamanho e assinatura antes do parse.
 */
export async function loadPdf(file: File): Promise<LoadedPdf> {
  if (file.size === 0) {
    throw new PdfInputError('Arquivo vazio.', 'empty');
  }
  if (file.size > MAX_PDF_BYTES) {
    throw new PdfInputError('Arquivo maior que o limite de 15 MB.', 'size');
  }
  const looksPdf =
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!looksPdf || !(await hasPdfSignature(file))) {
    throw new PdfInputError('O arquivo enviado não é um PDF válido.', 'type');
  }

  try {
    const data = new Uint8Array(await file.arrayBuffer());
    const doc = await pdfjsLib.getDocument({ data, isEvalSupported: false }).promise;
    return { doc, numPages: doc.numPages };
  } catch {
    throw new PdfInputError('Não foi possível ler o PDF (arquivo corrompido).', 'corrupt');
  }
}

export interface PdfMeta {
  producer: string;
  creator: string;
  title: string;
}

/** Lê os metadados do documento (Producer, Creator, Title). */
export async function getPdfMeta(doc: PDFDocumentProxy): Promise<PdfMeta> {
  const meta = await doc.getMetadata();
  const info = (meta.info ?? {}) as Record<string, unknown>;
  return {
    producer: String(info.Producer ?? ''),
    creator: String(info.Creator ?? ''),
    title: String(info.Title ?? ''),
  };
}

export interface PageSize {
  width: number;
  height: number;
}

/** Dimensões (em pt) da página informada (1-based). */
export async function getPageSize(doc: PDFDocumentProxy, pageNumber = 1): Promise<PageSize> {
  const page = await doc.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1 });
  return { width: viewport.width, height: viewport.height };
}
