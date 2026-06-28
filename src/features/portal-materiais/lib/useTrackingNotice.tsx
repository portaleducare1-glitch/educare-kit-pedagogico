import { useDismissible } from './useDismissible';

const DISMISSED_KEY = 'educare-tracking-notice-dismissed';

export function useTrackingNotice() {
  const { isDismissed, dismiss } = useDismissible(DISMISSED_KEY);

  return { showNotice: !isDismissed, dismiss };
}
