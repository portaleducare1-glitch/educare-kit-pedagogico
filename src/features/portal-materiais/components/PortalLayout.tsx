import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { ArrowLeft, Heart, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { useFavoritos, FavoritosProvider } from '../lib/useFavoritos';
import { ToastProvider } from '@/lib/toast';
import { InstallBanner } from './InstallBanner';
import { FavoritarDesktopBanner } from './FavoritarDesktopBanner';
import { AtualizarAtalhoBanner } from './AtualizarAtalhoBanner';
import { InstallProvider } from '../lib/useInstall';
import { TrackingNotice } from './TrackingNotice';
import { useAvaliacaoPortal } from '../lib/useAvaliacaoPortal';
import { AvaliacaoBubble } from './AvaliacaoBubble';
import { SuporteWhatsAppButton } from './SuporteWhatsAppButton';
import { AppFooter } from '@/components/layout/AppFooter';

function PortalLayoutInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { favoritos } = useFavoritos();
  const isHome = location.pathname === '/portal';
  const isAcervo = location.pathname === '/portal/acervo';
  const isFavoritos = location.pathname === '/portal/favoritos';

  const { mostrarAvaliacao, ocultarSuporte } = useAvaliacaoPortal();

  useScrollToTop();

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
              Kit Pedagógico
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

      <AppFooter className="pb-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:pb-8" />

      <InstallBanner />

      <AtualizarAtalhoBanner />

      <FavoritarDesktopBanner />

      {!ocultarSuporte && <SuporteWhatsAppButton />}

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
              isFavoritos
                ? 'text-brand-coral-text bg-brand-coral/10'
                : 'text-muted-foreground hover:text-foreground',
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
