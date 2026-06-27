import { Link } from 'react-router-dom';
import { Heart, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useFavoritos } from '../lib/useFavoritos';
import { useVisitados } from '../lib/useVisitados';
import { useToast } from '@/lib/toast';
import type { Material, Secao } from '../types';
import { SECAO_ICON, SECAO_LABELS } from '../types';

const SECAO_BAR: Record<Secao, string> = {
  apostilas: '#4890d0',
  atividades: '#60c088',
  documentos: '#f07830',
};

const SECAO_TEXTO: Record<Secao, string> = {
  apostilas: 'text-brand-blue-text',
  atividades: 'text-brand-green-text',
  documentos: 'text-brand-orange-text',
};

interface Props {
  material: Material;
}

export function MaterialCard({ material }: Props) {
  const { isFavorito, toggleFavorito } = useFavoritos();
  const { foiVisitado } = useVisitados();
  const { mostrar } = useToast();
  const Icon = SECAO_ICON[material.secao];
  const favorito = isFavorito(material.id);
  const visitado = foiVisitado(material.id);
  const isNovo = !!(material.novidadeAte && new Date() <= new Date(material.novidadeAte));

  return (
    <Link
      to={`/portal/m/${material.id}`}
      className={cn(
        'relative flex overflow-hidden rounded-lg border bg-card',
        'border-border hover:border-primary/40 hover:shadow-sm transition-all',
      )}
    >
      {/* Barra colorida da seção — identifica o tipo sem badge */}
      <div className="w-[3px] shrink-0" style={{ backgroundColor: SECAO_BAR[material.secao] }} />

      {/* Conteúdo */}
      <div className="flex flex-col gap-1.5 py-3.5 pl-3.5 pr-12 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className={cn('flex items-center gap-1', SECAO_TEXTO[material.secao])}>
            <Icon className="size-3 shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {SECAO_LABELS[material.secao]}
            </span>
          </div>
          {isNovo && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-success/15 text-brand-green-text leading-none">
              Novo
            </span>
          )}
          {visitado && (
            <span className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-border text-muted-foreground leading-none">
              <Check className="size-2.5" />
              Visto
            </span>
          )}
        </div>
        <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
          {material.titulo}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{material.descricao}</p>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          const novoFavorito = !favorito;
          toggleFavorito(material.id);
          mostrar(
            novoFavorito ? 'Salvo nos favoritos ♥' : 'Removido dos favoritos',
            novoFavorito ? 'sucesso' : 'padrao',
          );
        }}
        className={cn(
          'absolute top-2 right-2 p-3 rounded-full transition-colors',
          favorito ? 'text-brand-coral' : 'text-muted-foreground hover:text-brand-coral',
        )}
        aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart className={cn('size-4', favorito && 'fill-brand-coral')} />
      </button>
    </Link>
  );
}
