import { useState } from 'react';

export function useCopiarLink(url: string) {
  const [copiado, setCopiado] = useState(false);

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* clipboard indisponível — orientação manual continua visível */
    }
  }

  return { copiado, copiarLink };
}
