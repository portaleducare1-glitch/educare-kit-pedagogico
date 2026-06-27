import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Home, Search, Smartphone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { useFavoritos, FavoritosProvider } from '../lib/useFavoritos';
import { ToastProvider } from '@/lib/toast';
import { InstallBanner } from './InstallBanner';
import { InstallProvider, useInstall } from '../lib/useInstall';
import { TrackingNotice } from './TrackingNotice';
import { useAvaliacaoPortal } from '../lib/useAvaliacaoPortal';
import { AvaliacaoBubble } from './AvaliacaoBubble';
import { SuporteWhatsAppButton } from './SuporteWhatsAppButton';

function PortalLayoutInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { favoritos } = useFavoritos();
  const isHome = location.pathname === '/portal';
  const isAcervo = location.pathname === '/portal/acervo';
  const isFavoritos = location.pathname === '/portal/favoritos';

  const mostrarAvaliacao = useAvaliacaoPortal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {/* Faixa arco-iris animada */}
      <div className="h-1.5 overflow-hidden">
        <div
          style={{
            width: '200%',
            height: '100%',
            background:
              'linear-gradient(to right, #7c5cfc, #60c088, #f07830, #e6b81e, #ec6a4e, #7c5cfc, #60c088, #f07830, #e6b81e, #ec6a4e)',
            animation: 'stripe-flow 4s linear infinite',
          }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex h-14 w-full max-w-2xl lg:max-w-5xl items-center gap-3 px-4">
          {!isHome && (
            <Button variant="ghost" size="icon" className="-ml-2 shrink-0" onClick={() => navigate(-1)}>
              <ArrowLeft className="size-5" />
              <span className="sr-only">Voltar</span>
            </Button>
          )}
          <Link to="/portal" className="flex items-center gap-2 min-w-0 flex-1">
            <img
              src="/logo-educare.webp"
              alt="Educare"
              className="h-9 w-auto shrink-0"
              width={120}
              height={40}
            />
            <span className="text-sm font-semibold text-muted-foreground truncate hidden sm:block">
              Assistente Pedagógico
            </span>
          </Link>
          <Link
            to="/portal/acervo"
            className={cn(
              'hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isAcervo ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-secondary',
            )}
          >
            <Search className="size-4" />
            Acervo
          </Link>
          <Link
            to="/portal/favoritos"
            className="relative hidden sm:flex p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label={`Meus favoritos${favoritos.length > 0 ? ` (${favoritos.length})` : ''}`}
          >
            <Heart className={isFavoritos ? 'size-5 fill-brand-coral text-brand-coral' : 'size-5 text-muted-foreground'} />
            {favoritos.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-brand-coral text-white text-[10px] font-bold flex items-center justify-center leading-none">
                {favoritos.length > 9 ? '9+' : favoritos.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      <TrackingNotice />

      {/* Conteudo com padding para nao sobrepor o bottom nav no mobile, incluindo safe area do iPhone */}
      <main className="relative mx-auto w-full max-w-2xl lg:max-w-5xl flex-1 px-4 py-6 pb-safe-nav sm:pb-6">
        <Outlet />
      </main>

      <PortalFooter />

      <InstallBanner />

      <SuporteWhatsAppButton />

      {mostrarAvaliacao && <AvaliacaoBubble />}

      {/* Bottom navigation — visivel apenas em mobile */}
      <nav
        className="sm:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-stretch h-16">
          <Link
            to="/portal"
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors',
              isHome ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
            aria-label="Início"
          >
            <Home className="size-5" />
            Início
          </Link>

          <Link
            to="/portal/acervo"
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors',
              isAcervo ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
            aria-label="Acervo"
          >
            <Search className="size-5" />
            Acervo
          </Link>

          <Link
            to="/portal/favoritos"
            className={cn(
              'relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors',
              isFavoritos ? 'text-brand-coral' : 'text-muted-foreground hover:text-foreground',
            )}
            aria-label={`Favoritos${favoritos.length > 0 ? ` (${favoritos.length})` : ''}`}
          >
            <span className="relative">
              <Heart className={cn('size-5', isFavoritos && 'fill-brand-coral text-brand-coral')} />
              {favoritos.length > 0 && (
                <span className="absolute -top-1 -right-1.5 size-3.5 rounded-full bg-brand-coral text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {favoritos.length > 9 ? '9+' : favoritos.length}
                </span>
              )}
            </span>
            Favoritos
          </Link>
        </div>
      </nav>
    </div>
  );
}

function PortalFooter() {
  const { platform, isStandalone } = useInstall();
  const showInstallLink = !isStandalone && platform !== null;

  return (
    <footer
      className="border-t border-border bg-card/50 px-4 pt-5 sm:pb-5 pb-[calc(5rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-foreground">Educare Pedagogia</p>
            <p className="text-[11px] text-muted-foreground">CNPJ 28.719.923/0001-17</p>
          </div>
          {showInstallLink && (
            <Link
              to="/portal/instalar"
              className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
            >
              <Smartphone className="size-3.5" aria-hidden="true" />
              Instalar como app
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <Link to="/privacidade" className="hover:text-foreground transition-colors">
            Privacidade (LGPD)
          </Link>
          <Link to="/termos" className="hover:text-foreground transition-colors">
            Termos de Uso
          </Link>
          <a
            href="https://educarepedagogia.com.br/suporte-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <MessageCircle className="size-3" aria-hidden="true" />
            Suporte
          </a>
          {!showInstallLink && (
            <Link to="/portal/instalar" className="hover:text-foreground transition-colors">
              Instalar como app
            </Link>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground/50">
          Kit Pedagogico 5.0 · v1.0.1
        </p>
      </div>
    </footer>
  );
}

export function PortalLayout() {
  return (
    <InstallProvider>
      <FavoritosProvider>
        <ToastProvider>
          <PortalLayoutInner />
        </ToastProvider>
      </FavoritosProvider>
    </InstallProvider>
  );
}
