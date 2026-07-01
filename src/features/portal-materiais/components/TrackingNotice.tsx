import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrackingNotice } from '../lib/useTrackingNotice';

export function TrackingNotice() {
  const { showNotice, dismiss } = useTrackingNotice();

  if (!showNotice) return null;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-3">
      <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3">
        <p className="flex-1 text-xs text-foreground/80 leading-relaxed">
          Para melhorar sua experiência, monitoramos o uso de forma anônima — buscas,
          materiais acessados, cliques. Nenhum dado pessoal é coletado.{' '}
          <Link to="/privacidade" className="underline underline-offset-2 hover:text-foreground">
            Saiba mais
          </Link>
          .
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 p-2.5 -mt-2 -mr-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fechar aviso"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
