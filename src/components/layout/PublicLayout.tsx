import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function PublicLayout({ children }: { children?: React.ReactNode }) {
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
          <ThemeToggle />
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">
        {children ?? <Outlet />}
      </main>

      <footer className="relative border-t border-border py-8">
        <div className="mx-auto w-full max-w-5xl px-4 text-center text-xs text-muted-foreground space-y-2">
          <p className="font-medium text-foreground/70">
            EDUCARE CURSOS E TREINAMENTOS LTDA · CNPJ 28.719.923/0001-17
          </p>
          <p>Validação feita no seu dispositivo. Nenhum arquivo é enviado.</p>
          <nav className="flex justify-center gap-4" aria-label="Links legais">
            <Link to="/privacidade" className="hover:text-foreground underline underline-offset-2">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="hover:text-foreground underline underline-offset-2">
              Termos de Uso
            </Link>
          </nav>
          <p>© 2020-2026 Educare. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
