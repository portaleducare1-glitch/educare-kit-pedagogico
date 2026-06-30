import { useEffect, useState } from 'react';
import { Check, Copy, Smartphone, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInstall } from '../lib/useInstall';
import { isIOSSafari } from '../lib/platform';

function Step({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-card border border-border p-3">
      <span className="flex items-center justify-center size-7 rounded-full bg-primary/10 text-primary font-bold shrink-0 text-sm">
        {num}
      </span>
      <p className="text-sm text-foreground/90 leading-relaxed pt-0.5">{children}</p>
    </div>
  );
}

export function PortalInstalar() {
  const { platform, isStandalone, installAndroid } = useInstall();
  const [copiado, setCopiado] = useState(false);
  const iosForaDoSafari = platform === 'ios' && !isIOSSafari();

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/portal`);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* clipboard indisponivel - a orientacao manual continua visivel no texto */
    }
  }

  useEffect(() => {
    document.title = 'Instalar como App · Educare';
    return () => {
      document.title = 'Kit Pedagógico · Portal de Materiais';
    };
  }, []);

  if (isStandalone) {
    return (
      <div className="py-20 text-center space-y-3">
        <h1 className="sr-only">Instalar como App</h1>
        <Smartphone className="mx-auto size-12 text-success" aria-hidden="true" />
        <p className="font-bold text-base text-foreground">App já instalado!</p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Você já está usando o Kit Pedagógico diretamente da tela inicial.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-black text-foreground leading-tight">Instalar como app</h1>
        <p className="text-sm text-muted-foreground">
          Adicione o Kit Pedagógico à tela inicial e abra sem precisar do navegador.
        </p>
      </div>

      {/* Android */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">🤖</span>
          <h2 className="font-bold text-base text-foreground">Android (Chrome)</h2>
        </div>

        {platform === 'android' ? (
          <Button onClick={installAndroid} className="w-full gap-2">
            <Download className="size-4" />
            Instalar agora
          </Button>
        ) : (
          <div className="space-y-2">
            <Step num={1}>
              Toque nos <strong>3 pontos</strong> (⋮) no canto superior direito do Chrome
            </Step>
            <Step num={2}>
              Selecione <strong>"Adicionar a tela inicial"</strong> ou{' '}
              <strong>"Instalar aplicativo"</strong>
            </Step>
            <Step num={3}>
              Confirme tocando em <strong>Instalar</strong>
            </Step>
          </div>
        )}
      </section>

      <div className="border-t border-border" />

      {/* iOS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">🍎</span>
          <h2 className="font-bold text-base text-foreground">iPhone e iPad (Safari)</h2>
        </div>

        <div className="space-y-2">
          <Step num={1}>
            No Safari, toque em{' '}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary border border-border text-xs font-medium">
              <Share2 className="size-3" aria-hidden="true" /> Compartilhar
            </span>{' '}
            na barra inferior. Se não aparecer, toque nas{' '}
            <strong>3 barras ≡</strong> ao lado da barra de endereços.
          </Step>
          <Step num={2}>
            Role a lista de opções para baixo. Se não encontrar, toque em{' '}
            <strong>"Ver Mais"</strong> primeiro. Depois toque em{' '}
            <strong>"Adicionar a Tela Inicial"</strong>.
          </Step>
          <Step num={3}>
            Confirme tocando em <strong>Adicionar</strong> no canto superior direito.
          </Step>
        </div>

        <div className="rounded-xl bg-secondary/50 border border-border p-3 text-xs text-muted-foreground leading-relaxed space-y-3">
          <p>
            <strong className="text-foreground">Use o Safari.</strong> Chrome e outros
            navegadores no iPhone não permitem instalar apps pela web. Se estiver em outro
            navegador, copie o link e abra no Safari.
          </p>
          {iosForaDoSafari && (
            <Button onClick={copiarLink} variant="outline" size="sm" className="w-full gap-2">
              {copiado ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copiado ? 'Link copiado' : 'Copiar link do portal'}
            </Button>
          )}
        </div>
      </section>

      <div className="border-t border-border" />

      <div className="space-y-2 text-center pb-2">
        <Smartphone className="mx-auto size-8 text-muted-foreground/40" aria-hidden="true" />
        <p className="text-xs text-muted-foreground">
          Após instalar, o ícone do Kit Pedagógico aparece na sua tela inicial. Funciona
          como qualquer outro app, sem precisar abrir o navegador.
        </p>
      </div>
    </div>
  );
}
