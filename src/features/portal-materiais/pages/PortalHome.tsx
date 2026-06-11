import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackSituacao } from '@/lib/analytics';
import { Search, BookOpen, Sparkles, ClipboardList, ChevronRight, History, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { MaterialCard } from '../components/MaterialCard';
import { useVisitados } from '../lib/useVisitados';
import { materiais } from '../data/materiais';
import type { Secao, Situacao } from '../types';
import { SECAO_LABELS, SECAO_DESC } from '../types';

const CONTAGEM_SECAO: Record<Secao, number> = {
  apostilas: materiais.filter((m) => m.secao === 'apostilas').length,
  atividades: materiais.filter((m) => m.secao === 'atividades').length,
  documentos: materiais.filter((m) => m.secao === 'documentos').length,
};

const IDS_DESTAQUE = [
  'caderno-pedagogico',
  'manual-salas-recurso',
  'ebook-grafomotricidade',
  'apostila-aee-360h',
  'jogo-historias-fantasticas',
  'manual-marcos-desenvolvimento',
];

const materiaisDestaque = IDS_DESTAQUE
  .map((id) => materiais.find((m) => m.id === id))
  .filter(Boolean) as typeof materiais;

const _hoje = new Date();
const materiaisNovos = materiais
  .filter((m) => m.novidadeAte && _hoje <= new Date(m.novidadeAte))
  .sort((a, b) => new Date(b.novidadeAte!).getTime() - new Date(a.novidadeAte!).getTime());

const SECAO_BAR_COLOR: Record<Secao, string> = {
  apostilas: '#4890d0',
  atividades: '#60c088',
  documentos: '#f07830',
};

const SECOES: { id: Secao; icon: React.ElementType; corTexto: string }[] = [
  { id: 'apostilas', icon: BookOpen, corTexto: 'text-brand-blue-text' },
  { id: 'atividades', icon: Sparkles, corTexto: 'text-brand-green-text' },
  { id: 'documentos', icon: ClipboardList, corTexto: 'text-brand-orange-text' },
];

const SITUACOES: { id: Situacao; label: string; emoji: string }[] = [
  { id: 'atividade-pronta', label: 'Preciso de atividade para hoje', emoji: '📋' },
  { id: 'inclusao-especial', label: 'Aluno com necessidade especial', emoji: '♿' },
  { id: 'aluno-agitado', label: 'Aluno agitado ou sem foco', emoji: '🌀' },
  { id: 'aluno-nao-fala', label: 'Aluno que não se comunica', emoji: '🤝' },
  { id: 'leitura-alfabetizacao', label: 'Dificuldade de leitura', emoji: '📖' },
  { id: 'pei-pdi', label: 'Plano individual do aluno (PEI/PDI)', emoji: '📝' },
  { id: 'matematica', label: 'Atividade de matemática', emoji: '🔢' },
  { id: 'altas-habilidades', label: 'Aluno com altas habilidades', emoji: '🌟' },
  { id: 'tarefa-para-casa', label: 'Tarefa para casa', emoji: '🏠' },
];

function SectionHeader({
  children,
  action,
  icon: Icon,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      {Icon && <Icon className="size-4 text-muted-foreground shrink-0" />}
      <h2 className="font-bold text-base text-foreground whitespace-nowrap">{children}</h2>
      <div className="h-px flex-1 bg-border" />
      {action}
    </div>
  );
}

export function PortalHome() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { recentes } = useVisitados();

  const materiaisRecentes = useMemo(
    () =>
      recentes
        .slice(0, 3)
        .map((id) => materiais.find((m) => m.id === id))
        .filter(Boolean) as typeof materiais,
    [recentes],
  );

  useEffect(() => {
    document.title = 'Educare · Assistente Pedagógico';
  }, []);

  function handleBusca(e: React.FormEvent) {
    e.preventDefault();
    const termo = query.trim();
    if (termo.length > 1) {
      navigate(`/portal/acervo?q=${encodeURIComponent(termo)}`);
    }
  }

  function handleSituacao(situacao: Situacao) {
    trackSituacao(situacao);
    navigate(`/portal/acervo?situacao=${situacao}`);
  }

  function handleSecao(secao: Secao) {
    navigate(`/portal/acervo?secao=${secao}`);
  }

  return (
    <div className="space-y-8">

      {/* Saudação */}
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-[2.25rem] leading-[1.1] font-black text-foreground">
          Olá, professora!
        </h1>
        <p className="font-display font-semibold italic text-base text-muted-foreground leading-snug">
          {materiais.length} materiais do Kit Pedagógico 5.0.
        </p>
      </div>

      {/* O que você precisa hoje */}
      <section>
        <SectionHeader>O que você precisa hoje?</SectionHeader>
        <div className="flex gap-2 flex-wrap">
          {SITUACOES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSituacao(s.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl',
                'bg-card border border-border shadow-sm',
                'text-sm font-medium text-foreground',
                'hover:border-primary/40 hover:shadow-md hover:bg-primary/5',
                'transition-all cursor-pointer whitespace-nowrap shrink-0',
              )}
            >
              <span aria-hidden="true">{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Continue de onde parou */}
      {materiaisRecentes.length > 0 && (
        <section className="space-y-3">
          <SectionHeader
            icon={History}
            action={
              <button
                onClick={() => { localStorage.removeItem('educare-visitados'); window.location.reload(); }}
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors shrink-0"
              >
                Limpar
              </button>
            }
          >
            Continue de onde parou
          </SectionHeader>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {materiaisRecentes.map((m) => (
              <MaterialCard key={m.id} material={m} />
            ))}
          </div>
        </section>
      )}

      {/* Adicionados recentemente */}
      {materiaisNovos.length > 0 && (
        <section className="space-y-3">
          <SectionHeader icon={Star}>Adicionados recentemente</SectionHeader>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {materiaisNovos.map((m) => (
              <MaterialCard key={m.id} material={m} />
            ))}
          </div>
        </section>
      )}

      {/* Busca */}
      <form onSubmit={handleBusca} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar materiais pedagógicos"
            placeholder="Buscar por tema, atividade ou assunto..."
            className={cn(
              'w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-card',
              'text-sm placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
            )}
          />
        </div>
        <Button type="submit" size="lg" className="h-12 px-5 shrink-0">
          Buscar
        </Button>
      </form>

      {/* Tipos de material */}
      <section>
        <SectionHeader>Tipos de material</SectionHeader>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {SECOES.map(({ id, icon: Icon, corTexto }) => (
            <button
              key={id}
              onClick={() => handleSecao(id)}
              className="relative flex items-center gap-3 p-4 rounded-lg border bg-card text-left overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div
                className="absolute inset-y-0 left-0 w-[3px]"
                style={{ backgroundColor: SECAO_BAR_COLOR[id] }}
              />
              <Icon className={cn('size-5 ml-1.5 shrink-0', corTexto)} />
              <div className="flex-1 min-w-0">
                <p className={cn('font-bold text-sm', corTexto)}>{SECAO_LABELS[id]}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {SECAO_DESC[id]} · <span className="font-medium">{CONTAGEM_SECAO[id]}</span>
                </p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground/60 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </section>

      {/* Comece por aqui */}
      {materiaisDestaque.length > 0 && (
        <section className="space-y-3">
          <SectionHeader>Comece por aqui</SectionHeader>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {materiaisDestaque.map((m) => (
              <MaterialCard key={m.id} material={m} />
            ))}
          </div>
        </section>
      )}

      {/* Ver tudo */}
      <div className="pt-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/portal/acervo')}
        >
          Ver todo o acervo · {materiais.length} materiais
        </Button>
      </div>

    </div>
  );
}
