import { useEffect, useState } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/safeStorage';

/** Lembra (via localStorage) que um aviso/banner foi dispensado, pra não mostrar de novo.
 * `forceShow` ignora o localStorage — usado pelo modo `?preview=` de QA visual. */
export function useDismissible(key: string, forceShow = false) {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    setIsDismissed(forceShow ? false : !!safeGetItem(key));
  }, [key, forceShow]);

  function dismiss() {
    safeSetItem(key, '1');
    setIsDismissed(true);
  }

  return { isDismissed, dismiss };
}
