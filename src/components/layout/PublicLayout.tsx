import { Outlet } from 'react-router-dom';
import { AppFooter } from './AppFooter';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export function PublicLayout({ children }: { children?: React.ReactNode }) {
  useScrollToTop();
  return (
    <div className="relative flex min-h-dvh flex-col bg-background overflow-hidden">
      {/* Blobs decorativos de fundo com as cores da logo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 size-96 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 size-80 rounded-full bg-brand-orange/8 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 size-96 rounded-full bg-brand-yellow/10 blur-3xl" />
        <div className="absolute top-2/3 -right-16 size-72 rounded-full bg-brand-coral/8 blur-3xl" />
      </div>

      {/* Faixa arco-íris com as 5 cores da logo */}
      <div className="h-1.5 bg-linear-to-r from-brand-blue via-brand-green via-40% via-brand-orange via-60% via-brand-yellow to-brand-coral" />

      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4">
          <a href="/" className="flex items-center gap-2" aria-label="Educare, página inicial">
            <img
              src="/logo-educare.webp"
              alt="Educare"
              className="h-9 w-auto"
              width={134}
              height={45}
            />
          </a>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
        {children ?? <Outlet />}
      </main>

      <AppFooter />
    </div>
  );
}
