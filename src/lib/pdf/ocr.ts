/*
  Wrapper de OCR sobre tesseract.js.

  - Import DINÂMICO: a biblioteca (vários MB de wasm) só é baixada quando o
    usuário realmente envia um certificado. Mantém o carregamento inicial leve.
  - Idioma `por`. O modelo de idioma é baixado pelo tesseract de um CDN no
    primeiro uso e fica em cache do navegador. (Para uso offline/nativo,
    self-hospedar os assets. Ver docs/SECURITY.md.)
  - A imagem do certificado NÃO sai do dispositivo: o reconhecimento roda
    em web worker local.
*/

export interface OcrProgress {
  /** 0 a 1 */
  progress: number;
  status: string;
}

/**
 * Roda OCR em português sobre um canvas/imagem e retorna o texto reconhecido.
 * `onProgress` recebe atualizações do andamento (download do modelo e
 * reconhecimento).
 */
export async function ocrImage(
  image: HTMLCanvasElement | HTMLImageElement,
  onProgress?: (p: OcrProgress) => void,
): Promise<string> {
  const { createWorker } = await import('tesseract.js');

  const worker = await createWorker('por', 1, {
    logger: (m: { status: string; progress: number }) => {
      onProgress?.({ status: m.status, progress: m.progress });
    },
  });

  try {
    const {
      data: { text },
    } = await worker.recognize(image);
    return text;
  } finally {
    await worker.terminate();
  }
}
