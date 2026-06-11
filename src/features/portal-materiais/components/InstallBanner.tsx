import { useState, useEffect, useRef } from 'react';
import { X, Share2, Download } from 'lucide-react';

const STORAGE_KEY = 'educare-install-dismissed';

type Prompt = { prompt(): Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallBanner() {
  const [plataforma, setPlataforma] = useState<'ios' | 'android' | null>(null);
  const promptRef = useRef<Prompt | null>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const ua = navigator.userAgent;
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      !!(navigator as unknown as { standalone?: boolean }).standalone;

    if (standalone) return;

    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      setPlataforma('ios');
      return;
    }

    if (isAndroid) {
      const handler = (e: Event) => {
        e.preventDefault();
        promptRef.current = e as unknown as Prompt;
        // Aguarda 3s para não aparecer logo ao abrir
        setTimeout(() => setPlataforma('android'), 3000);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  if (!plataforma) return null;

  function dispensar() {
    localStorage.setItem(STORAGE_KEY, '1');
    setPlataforma(null);
  }

  async function instalarAndroid() {
    if (!promptRef.current) return;
    await promptRef.current.prompt();
    const { outcome } = await promptRef.current.userChoice;
    if (outcome === 'accepted') dispensar();
  }

  return (
    <div className="fixed bottom-20 inset-x-0 z-50 px-4 pb-2 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-sm rounded-2xl border border-border bg-card shadow-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Adicionar ao celular
            </p>

            {plataforma === 'android' ? (
              <>
                <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                  Instale o Kit Pedagógico como app — acesso direto sem precisar do navegador.
                </p>
                <button
                  onClick={instalarAndroid}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold w-full justify-center"
                >
                  <Download className="size-3.5" />
                  Instalar como aplicativo
                </button>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mt-0.5 mb-2.5">
                  Salve na tela inicial para abrir como um app.
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary font-bold shrink-0 text-[10px]">1</span>
                    <span>Toque em <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary border border-border font-medium"><Share2 className="size-3" /></span> na barra inferior do Safari</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary font-bold shrink-0 text-[10px]">2</span>
                    <span>Role e toque em <strong>"Adicionar à Tela Inicial"</strong></span>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={dispensar}
            className="shrink-0 p-1 -mt-0.5 -mr-0.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
