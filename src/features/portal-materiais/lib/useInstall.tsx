import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { detectMobilePlatform, getPreviewParam, isStandaloneDisplay } from './platform';
import { useDismissible } from './useDismissible';

const DISMISSED_KEY = 'educare-install-dismissed';
// QA visual: ?preview=install-ios ou ?preview=install-android força o aviso
// na tela, sem precisar simular plataforma/localStorage de verdade.
const PREVIEW_PLATAFORMAS = ['install-ios', 'install-android'] as const;

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
  const previewParam = getPreviewParam();
  const isPreview = (PREVIEW_PLATAFORMAS as readonly string[]).includes(previewParam ?? '');

  const [platform, setPlatform] = useState<InstallPlatform>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const { isDismissed, dismiss } = useDismissible(DISMISSED_KEY, isPreview);
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (previewParam === 'install-ios') {
      setIsStandalone(false);
      setPlatform('ios');
      return;
    }
    if (previewParam === 'install-android') {
      setIsStandalone(false);
      setPlatform('android');
      return;
    }

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

  // Se ?preview= está ativo pra OUTRO aviso, este banner fica escondido —
  // senão a detecção real (iOS de verdade, não instalado) mostra os dois juntos.
  const previewDeOutroAviso = previewParam !== null && !isPreview;
  const showBanner = !previewDeOutroAviso && !isStandalone && !isDismissed && platform !== null;

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
