import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { materiais } from '../data/materiais';
import { useFavoritos } from '../lib/useFavoritos';
import { MaterialCard } from '../components/MaterialCard';

export function PortalFavoritos() {
  const navigate = useNavigate();
  const { favoritos } = useFavoritos();

  useEffect(() => {
    document.title = 'Favoritos · Educare';
    return () => { document.title = 'Educare · Assistente Pedagógico'; };
  }, []);

  const meusMateriais = materiais.filter((m) => favoritos.includes(m.id));

  if (meusMateriais.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <p className="text-4xl">💛</p>
        <p className="font-bold text-base text-foreground">Nenhum favorito ainda</p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Toque no coração em qualquer material para salvar aqui.
        </p>
        <Button variant="outline" onClick={() => navigate('/portal/acervo')}>
          Ver todos os materiais
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-black text-foreground whitespace-nowrap">Meus favoritos</h1>
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted-foreground shrink-0">{meusMateriais.length}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {meusMateriais.map((m) => (
          <MaterialCard key={m.id} material={m} />
        ))}
      </div>
    </div>
  );
}
