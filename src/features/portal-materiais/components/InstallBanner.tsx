import { Share, Download } from 'lucide-react';
import { useInstall } from '../lib/useInstall';
import { FloatingBanner } from './FloatingBanner';

export function InstallBanner() {
  const { platform, showBanner, dismiss, installAndroid } = useInstall();

  if (!showBanner) return null;

  return (
    <FloatingBanner onDismiss={dismiss} position="bottom">
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
                  <Share className="size-3" />
                </span>{' '}
                Compartilhar, ou nas <strong>3 barras ≡</strong> ao lado do endereço
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
    </FloatingBanner>
  );
}
