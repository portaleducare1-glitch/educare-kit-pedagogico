import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/safeStorage';

const DISMISSED_KEY = 'educare-install-dismissed';

type BeforeInstallPromptEvent = Event & {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

export type InstallPlatform = 'ios' | 'android' | null;

interface InstallContextValue {
  platform: InstallPlatform;
  isStandalone: boolean;
  isDismissed: boolean;
  showBanner: boolean;
  dismiss(): void;
  installAndroid(): Promise<void>;
}

const InstallContext = createContext<InstallContextValue | null>(null);

export function InstallProvider({ children }: { children: ReactNode }) {
  const [platform, setPlatform] = useState<InstallPlatform>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      !!(navigator as unknown as { standalone?: boolean }).standalone;

    setIsStandalone(standalone);
    setIsDismissed(!!safeGetItem(DISMISSED_KEY));

    if (standalone) return;

    const ua = navigator.userAgent;
    // Detecta iPad Pro (reporta MacIntel mas tem touchPoints)
    const isIOS =
      (/iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;
    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      setPlatform('ios');
      return;
    }

    if (isAndroid) {
      const handler = (e: Event) => {
        e.preventDefault();
        promptRef.current = e as BeforeInstallPromptEvent;
        setTimeout(() => setPlatform('android'), 3000);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  function dismiss() {
    safeSetItem(DISMISSED_KEY, '1');
    setIsDismissed(true);
  }

  async function installAndroid() {
    if (!promptRef.current) return;
    await promptRef.current.prompt();
    const { outcome } = await promptRef.current.userChoice;
    if (outcome === 'accepted') dismiss();
  }

  const showBanner = !isStandalone && !isDismissed && platform !== null;

  return (
    <InstallContext.Provider
      value={{ platform, isStandalone, isDismissed, showBanner, dismiss, installAndroid }}
    >
      {children}
    </InstallContext.Provider>
  );
}

export function useInstall() {
  const ctx = useContext(InstallContext);
  if (!ctx) throw new Error('useInstall precisa estar dentro de InstallProvider');
  return ctx;
}
