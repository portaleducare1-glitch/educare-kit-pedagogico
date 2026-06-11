import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';

/**
 * Extrai o texto da página informada como uma única string.
 * No certificado Educare, só os campos variáveis (nome, identificador,
 * datas) são texto real; o restante do template é imagem (ver OCR).
 */
export async function extractPageText(
  doc: PDFDocumentProxy,
  pageNumber = 1,
): Promise<string> {
  const page = await doc.getPage(pageNumber);
  const content = await page.getTextContent();
  return content.items
    .map((item) => ('str' in item ? (item as TextItem).str : ''))
    .join('\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}
