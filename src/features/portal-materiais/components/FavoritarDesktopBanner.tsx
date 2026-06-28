import { X, ArrowUp } from 'lucide-react';
import { useFavoritarDesktop } from '../lib/useFavoritarDesktop';
import { isMacDesktop } from '../lib/platform';

export function FavoritarDesktopBanner() {
  const { showBanner, dismiss } = useFavoritarDesktop();

  if (!showBanner) return null;

  const atalho = isMacDesktop() ? '⌘ + D' : 'Ctrl + D';

  return (
    <div className="fixed top-4 right-4 z-50 max-w-xs rounded-2xl border border-border bg-card shadow-xl p-4">
      <div className="flex items-start gap-2">
        <ArrowUp className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Quer voltar aqui fácil?</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Aperte{' '}
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-secondary border border-border font-medium text-foreground">
              {atalho}
            </span>{' '}
            pra favoritar esta página
          </p>
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
  );
}
