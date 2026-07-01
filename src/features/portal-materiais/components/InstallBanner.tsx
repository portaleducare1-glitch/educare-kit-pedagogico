import { useState } from 'react';
import { Check, Copy, Share, Download } from 'lucide-react';
import { useInstall } from '../lib/useInstall';
import { useCopiarLink } from '../lib/useCopiarLink';
import { getPreviewParam, isIOSSafari } from '../lib/platform';
import { FloatingBanner } from './FloatingBanner';

export function InstallBanner() {
  const { platform, showBanner, dismiss, installAndroid, promptReady } = useInstall();
  const [mostrarVariacoes, setMostrarVariacoes] = useState(false);
  const { copiado, copiarLink } = useCopiarLink(`${window.location.origin}/portal`);

  if (!showBanner) return null;

  const previewParam = getPreviewParam();
  const iosForaDoSafari = platform === 'ios' && previewParam !== 'install-ios' && !isIOSSafari();

  return (
    <FloatingBanner onDismiss={dismiss} position="bottom">
      <p className="text-sm font-semibold text-foreground">Adicionar ao celular</p>

      {platform === 'android' ? (
        <>
          <p className="text-xs text-muted-foreground mt-0.5 mb-3">
            Instale o Kit Pedagógico como app e acesse direto da tela inicial.
          </p>
          {promptReady ? (
            <button
              onClick={installAndroid}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold w-full justify-center"
            >
              <Download className="size-3.5" />
              Instalar como aplicativo
            </button>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-foreground/80">
                <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary font-bold shrink-0 text-[10px]">1</span>
                <span>Toque nos <strong>3 pontos ⋮</strong> no Chrome e selecione <strong>"Adicionar à tela inicial"</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/80">
                <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary font-bold shrink-0 text-[10px]">2</span>
                <span>Confirme tocando em <strong>Instalar</strong></span>
              </div>
            </div>
          )}
        </>
      ) : iosForaDoSafari ? (
        <>
          <p className="text-xs text-muted-foreground mt-0.5 mb-3">
            No iPhone, a instalação pela tela inicial só funciona pelo Safari. Copie o link,
            abra no Safari e use Compartilhar &gt; Adicionar à Tela de Início.
          </p>
          <button
            onClick={copiarLink}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold w-full"
          >
            {copiado ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copiado ? 'Copiado!' : 'Copiar link'}
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

            {/* Safari varia o layout entre versões, então mostra as 3 variações reais */}
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
