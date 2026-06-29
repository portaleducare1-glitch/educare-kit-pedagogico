import { useState } from 'react';
import { Share, Download } from 'lucide-react';
import { useInstall } from '../lib/useInstall';
import { FloatingBanner } from './FloatingBanner';

export function InstallBanner() {
  const { platform, showBanner, dismiss, installAndroid } = useInstall();
  const [mostrarVariacoes, setMostrarVariacoes] = useState(false);

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
                Toque no ícone de <strong>Compartilhar</strong>{' '}
                <button
                  onClick={() => setMostrarVariacoes((v) => !v)}
                  className="text-primary underline font-medium"
                >
                  não sei onde fica
                </button>
              </span>
            </div>

            {/* O Safari mudou de layout entre versões — não dá pra adivinhar qual
                a professora tem na tela, então mostra as 3 variações reais em
                vez de uma instrução só que pode estar errada pra ela. */}
            {mostrarVariacoes && (
              <div className="ml-7 pl-2 border-l-2 border-border space-y-1 text-[11px] text-muted-foreground">
                <p>
                  Vê <strong>3 pontinhos (•••)</strong>? Toque neles, depois em "Compartilhar".
                </p>
                <p>
                  Vê um ícone <Share className="inline size-3 -mt-0.5" /> direto na tela? Toque nele.
                </p>
                <p>
                  Vê <strong>3 barrinhas (≡)</strong>? Toque nelas, depois em "Compartilhar".
                </p>
              </div>
            )}

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
