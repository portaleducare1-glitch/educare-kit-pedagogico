import { useEffect, useState } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/safeStorage';

const DISMISSED_KEY = 'educare-tracking-notice-dismissed';

export function useTrackingNotice() {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    setIsDismissed(!!safeGetItem(DISMISSED_KEY));
  }, []);

  function dismiss() {
    safeSetItem(DISMISSED_KEY, '1');
    setIsDismissed(true);
  }

  return { showNotice: !isDismissed, dismiss };
}
