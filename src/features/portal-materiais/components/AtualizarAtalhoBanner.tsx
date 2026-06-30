import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useAtualizarAtalho } from '../lib/useAtualizarAtalho';
import { FloatingBanner } from './FloatingBanner';

export function AtualizarAtalhoBanner() {
  const { showBanner, dismiss } = useAtualizarAtalho();
  const [copiado, setCopiado] = useState(false);

  if (!showBanner) return null;

  const url = `${window.location.origin}/portal`;

  function abrirNoSafari() {
    // '_system' força navegador externo em vez do webview do atalho instalado —
    // sem isso, não tem como acessar o Compartilhar > Adicionar à Tela de Início de novo
    window.open(url, '_system');
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* clipboard indisponível — botão "Abrir no Safari" continua funcionando */
    }
  }

  return (
    <FloatingBanner onDismiss={dismiss} position="bottom">
      <p className="text-sm font-semibold text-foreground">Atualizamos nosso ícone! 💜</p>
      <p className="text-xs text-muted-foreground mt-0.5 mb-3">
        Pra ver o novo na sua tela inicial, abra no Safari e adicione de novo (Compartilhar →
        Adicionar à Tela de Início).
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={abrirNoSafari}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
        >
          Abrir no Safari
        </button>
        <button
          onClick={copiarLink}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground text-xs font-medium"
        >
          {copiado ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copiado ? 'Copiado!' : 'Copiar link'}
        </button>
      </div>
    </FloatingBanner>
  );
}
