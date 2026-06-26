import { useEffect, useState } from 'react';

const DISMISSED_KEY = 'educare-tracking-notice-dismissed';

export function useTrackingNotice() {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    setIsDismissed(!!localStorage.getItem(DISMISSED_KEY));
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, '1');
    setIsDismissed(true);
  }

  return { showNotice: !isDismissed, dismiss };
}
