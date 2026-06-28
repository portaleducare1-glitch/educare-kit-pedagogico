import { useEffect, useState } from 'react';
import { detectMobilePlatform, isStandaloneDisplay } from './platform';
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

  return {
    showBanner: isDesktop && !isDismissed,
    dismiss,
  };
}
