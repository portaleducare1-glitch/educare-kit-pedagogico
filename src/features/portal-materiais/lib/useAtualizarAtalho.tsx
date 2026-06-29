import { useEffect, useState } from 'react';
import { isStandaloneDisplay } from './platform';
import { useDismissible } from './useDismissible';

/** Bumpar este número sempre que o ícone do app mudar — reabre o aviso pra
 * quem já tinha dispensado uma versão anterior dele. */
const ICONE_VERSAO_ATUAL = '1';
const DISMISSED_KEY = `educare-atualizar-atalho-dismissed-v${ICONE_VERSAO_ATUAL}`;

export function useAtualizarAtalho() {
  const [isStandalone, setIsStandalone] = useState(false);
  const { isDismissed, dismiss } = useDismissible(DISMISSED_KEY);

  useEffect(() => {
    setIsStandalone(isStandaloneDisplay());
  }, []);

  return {
    showBanner: isStandalone && !isDismissed,
    dismiss,
  };
}
