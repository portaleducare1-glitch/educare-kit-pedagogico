import { X, Share2, Download } from 'lucide-react';
import { useInstall } from '../lib/useInstall';

export function InstallBanner() {
  const { platform, showBanner, dismiss, installAndroid } = useInstall();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 inset-x-0 z-50 px-4 pb-2 pointer-events-none sm:bottom-6">
      <div className="pointer-events-auto mx-auto max-w-sm rounded-2xl border border-border bg-card shadow-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Adicionar ao celular</p>

            {platform === 'android' ? (
              <>
                <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                  Instale o Kit Pedagógico como app e acesse direto da tela inicial.
                </p>
                <button
                  onClick={installAndroid}
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
                    <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary font-bold shrink-0 text-[10px]">
                      1
                    </span>
                    <span>
                      Toque em{' '}
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary border border-border font-medium">
                        <Share2 className="size-3" />
                      </span>{' '}
                      Compartilhar — ou nas <strong>3 barras ≡</strong> ao lado do endereço
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary font-bold shrink-0 text-[10px]">
                      2
                    </span>
                    <span>
                      Role e toque em <strong>"Adicionar à Tela Inicial"</strong>
                      <span className="text-muted-foreground"> (ou "Ver Mais" primeiro)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary font-bold shrink-0 text-[10px]">
                      3
                    </span>
                    <span>
                      Confirme tocando em <strong>Adicionar</strong>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={dismiss}
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
