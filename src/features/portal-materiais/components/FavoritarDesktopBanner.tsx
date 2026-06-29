import { ArrowUp } from 'lucide-react';
import { useFavoritarDesktop } from '../lib/useFavoritarDesktop';
import { isMacDesktop } from '../lib/platform';
import { FloatingBanner } from './FloatingBanner';

export function FavoritarDesktopBanner() {
  const { showBanner, dismiss } = useFavoritarDesktop();

  if (!showBanner) return null;

  const atalho = isMacDesktop() ? '⌘ + D' : 'Ctrl + D';

  return (
    <FloatingBanner onDismiss={dismiss} position="top-right">
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
      </div>
    </FloatingBanner>
  );
}
