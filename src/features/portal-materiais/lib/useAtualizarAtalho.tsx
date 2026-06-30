import { useEffect, useState } from 'react';
import { detectMobilePlatform, getPreviewParam, isStandaloneDisplay } from './platform';
import { useDismissible } from './useDismissible';

/** Bumpar este número sempre que o ícone do app mudar — reabre o aviso pra
 * quem já tinha dispensado uma versão anterior dele. */
const ICONE_VERSAO_ATUAL = '1';
const DISMISSED_KEY = `educare-atualizar-atalho-dismissed-v${ICONE_VERSAO_ATUAL}`;

export function useAtualizarAtalho() {
  // QA visual: ?preview=atualizar-atalho força o aviso na tela
  const previewParam = getPreviewParam();
  const isPreview = previewParam === 'atualizar-atalho';

  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const { isDismissed, dismiss } = useDismissible(DISMISSED_KEY, isPreview);

  useEffect(() => {
    setIsIOS(isPreview ? true : detectMobilePlatform() === 'ios');
    setIsStandalone(isPreview ? true : isStandaloneDisplay());
  }, [isPreview]);

  // Se ?preview= está ativo pra OUTRO aviso, este banner fica escondido —
  // senão a detecção real (app já instalado, aviso ainda não dispensado)
  // mostra os dois juntos.
  const previewDeOutroAviso = previewParam !== null && !isPreview;
  const showBanner = !previewDeOutroAviso && isIOS && isStandalone && !isDismissed;

  return {
    showBanner,
    dismiss,
  };
}
