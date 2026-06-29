import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface FloatingBannerProps {
  children: ReactNode;
  onDismiss: () => void;
  /** 'bottom': acima do bottom nav no mobile, canto inferior no desktop.
   *  'top-right': fixo no canto superior direito (ex: aviso de desktop). */
  position?: 'bottom' | 'top-right';
}

/** Moldura compartilhada dos avisos flutuantes dispensáveis (instalar,
 * atualizar atalho, favoritar no desktop) — mesmo cartão, mesmo botão de
 * fechar, só o conteúdo interno muda por aviso. */
export function FloatingBanner({ children, onDismiss, position = 'bottom' }: FloatingBannerProps) {
  return (
    <div
      className={cn(
        'fixed z-50',
        position === 'bottom'
          ? 'bottom-safe-nav inset-x-0 px-4 pb-2 pointer-events-none sm:bottom-6'
          : 'top-4 right-4 max-w-xs',
      )}
    >
      <div className="pointer-events-auto mx-auto max-w-sm rounded-2xl border border-border bg-card shadow-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">{children}</div>
          <button
            onClick={onDismiss}
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
