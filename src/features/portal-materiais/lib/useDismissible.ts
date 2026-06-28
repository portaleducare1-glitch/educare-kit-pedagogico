import { useEffect, useState } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/safeStorage';

/** Lembra (via localStorage) que um aviso/banner foi dispensado, pra não mostrar de novo. */
export function useDismissible(key: string) {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    setIsDismissed(!!safeGetItem(key));
  }, [key]);

  function dismiss() {
    safeSetItem(key, '1');
    setIsDismissed(true);
  }

  return { isDismissed, dismiss };
}
