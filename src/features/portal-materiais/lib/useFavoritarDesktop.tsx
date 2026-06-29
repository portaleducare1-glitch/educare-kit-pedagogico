import { useEffect, useState } from 'react';
import { detectMobilePlatform, getPreviewParam, isStandaloneDisplay } from './platform';
import { useDismissible } from './useDismissible';

const DISMISSED_KEY = 'educare-favoritar-desktop-dismissed';

export function useFavoritarDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  const { isDismissed, dismiss } = useDismissible(DISMISSED_KEY);

  useEffect(() => {
    const standalone = isStandaloneDisplay();
    const mobilePlatform = detectMobilePlatform();
    setIsDesktop(!standalone && mobilePlatform === null);
  }, []);

  // Se ?preview= está ativo pra outro aviso (mobile), este fica escondido —
  // evita os dois aparecerem juntos durante QA visual.
  const previewDeOutroAviso = getPreviewParam() !== null;

  return {
    showBanner: !previewDeOutroAviso && isDesktop && !isDismissed,
    dismiss,
  };
}
