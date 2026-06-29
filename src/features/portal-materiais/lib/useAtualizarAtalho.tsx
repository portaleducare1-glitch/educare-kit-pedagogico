import { useEffect, useState } from 'react';
import { getPreviewParam, isStandaloneDisplay } from './platform';
import { useDismissible } from './useDismissible';

/** Bumpar este número sempre que o ícone do app mudar — reabre o aviso pra
 * quem já tinha dispensado uma versão anterior dele. */
const ICONE_VERSAO_ATUAL = '1';
const DISMISSED_KEY = `educare-atualizar-atalho-dismissed-v${ICONE_VERSAO_ATUAL}`;

export function useAtualizarAtalho() {
  // QA visual: ?preview=atualizar-atalho força o aviso na tela
  const isPreview = getPreviewParam() === 'atualizar-atalho';

  const [isStandalone, setIsStandalone] = useState(false);
  const { isDismissed, dismiss } = useDismissible(DISMISSED_KEY, isPreview);

  useEffect(() => {
    setIsStandalone(isPreview ? true : isStandaloneDisplay());
  }, [isPreview]);

  return {
    showBanner: isStandalone && !isDismissed,
    dismiss,
  };
}
