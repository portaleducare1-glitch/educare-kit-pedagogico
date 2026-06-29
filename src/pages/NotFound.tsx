import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="font-display text-6xl font-black text-primary">404</p>
      <h1 className="font-display text-2xl font-extrabold">Página não encontrada</h1>
      <p className="text-muted-foreground">O endereço acessado não existe.</p>
      <Button asChild>
        <Link to="/">Ir para o início</Link>
      </Button>
    </div>
  );
}
