import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { detectMobilePlatform, isStandaloneDisplay } from './platform';
import { useDismissible } from './useDismissible';

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
  const { isDismissed, dismiss } = useDismissible(DISMISSED_KEY);
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const standalone = isStandaloneDisplay();

    setIsStandalone(standalone);

    if (standalone) return;

    const mobilePlatform = detectMobilePlatform();

    if (mobilePlatform === 'ios') {
      setPlatform('ios');
      return;
    }

    if (mobilePlatform === 'android') {
      const handler = (e: Event) => {
        e.preventDefault();
        promptRef.current = e as BeforeInstallPromptEvent;
        setTimeout(() => setPlatform('android'), 3000);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

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
