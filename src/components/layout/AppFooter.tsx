import { Link } from 'react-router-dom';
import { Smartphone } from 'lucide-react';
import { detectMobilePlatform, isStandaloneDisplay } from '@/features/portal-materiais/lib/platform';
import { cn } from '@/lib/cn';

interface AppFooterProps {
  /** Padding extra para não ficar atrás do bottom nav fixo (só em /portal/*) */
  className?: string;
}

export function AppFooter({ className }: AppFooterProps) {
  const showInstall = !isStandaloneDisplay() && detectMobilePlatform() !== null;

  return (
    <footer data-portal-footer className={cn('relative border-t border-border py-8', className)}>
      <div className="mx-auto w-full max-w-5xl px-4 text-center text-xs text-muted-foreground space-y-2">
        <p className="font-medium text-foreground/70">
          EDUCARE CURSOS E TREINAMENTOS LTDA · CNPJ 28.719.923/0001-17
        </p>
        <p>Portal de Materiais do Kit Pedagógico 5.0 · v1.1.4</p>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1" aria-label="Links legais">
          <Link
            to="/privacidade"
            className="hover:text-foreground underline underline-offset-2 transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            to="/termos"
            className="hover:text-foreground underline underline-offset-2 transition-colors"
          >
            Termos de Uso
          </Link>
          {showInstall && (
            <Link
              to="/portal/instalar"
              className="hover:text-foreground underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <Smartphone className="size-3" aria-hidden="true" />
              Instalar como app
            </Link>
          )}
        </nav>
        <p>© 2020-2026 Educare. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
