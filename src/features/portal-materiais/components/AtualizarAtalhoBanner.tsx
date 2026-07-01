import { Copy, Check } from 'lucide-react';
import { useAtualizarAtalho } from '../lib/useAtualizarAtalho';
import { useCopiarLink } from '../lib/useCopiarLink';
import { FloatingBanner } from './FloatingBanner';

export function AtualizarAtalhoBanner() {
  const { showBanner, dismiss } = useAtualizarAtalho();
  const { copiado, copiarLink } = useCopiarLink(`${window.location.origin}/portal`);

  if (!showBanner) return null;

  return (
    <FloatingBanner onDismiss={dismiss} position="bottom">
      <p className="text-sm font-semibold text-foreground">Atualizamos nosso ícone! 💜</p>
      <p className="text-xs text-muted-foreground mt-0.5 mb-3">
        Pra ver o novo na tela inicial, copie o link, abra no Safari e adicione de novo em
        Compartilhar &gt; Adicionar à Tela de Início.
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={copiarLink}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
        >
          {copiado ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copiado ? 'Copiado!' : 'Copiar link'}
        </button>
      </div>
    </FloatingBanner>
  );
}
