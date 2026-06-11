import type { PDFDocumentProxy } from 'pdfjs-dist';

/**
 * Renderiza uma página do PDF para um canvas.
 * Serve de insumo para o OCR (nome do curso, carga horária, rodapé) e
 * para um possível preview visual. `scale` maior melhora o OCR ao custo
 * de memória; 2.0 é um bom equilíbrio para texto de certificado.
 */
export async function renderPageToCanvas(
  doc: PDFDocumentProxy,
  pageNumber = 1,
  scale = 2,
): Promise<HTMLCanvasElement> {
  const page = await doc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Contexto 2D do canvas indisponível neste ambiente.');
  }

  await page.render({ canvasContext: context, viewport }).promise;
  return canvas;
}
