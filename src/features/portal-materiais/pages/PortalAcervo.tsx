import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { trackBusca, trackBuscaSemResultado, trackTemaFiltro, trackEtapaFiltro, trackSecaoFiltro } from '@/lib/analytics';
import { Search, BookOpen, Sparkles, ClipboardList, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { materiais } from '../data/materiais';
import { buscar } from '../lib/busca';
import { MaterialCard } from '../components/MaterialCard';
import type { Secao, Etapa, Situacao, Tema } from '../types';
import { SECAO_LABELS, ETAPA_LABELS, SITUACAO_LABELS, TEMA_LABELS } from '../types';

const SECAO_ICON: Record<Secao, React.ElementType> = {
  apostilas: BookOpen,
  atividades: Sparkles,
  documentos: ClipboardList,
};

const SECAO_ATIVA: Record<Secao, string> = {
  apostilas: 'bg-blue-50 text-brand-blue-text border-brand-blue/30 shadow-none',
  atividades: 'bg-green-50 text-brand-green-text border-brand-green/30 shadow-none',
  documentos: 'bg-orange-50 text-brand-orange-text border-brand-orange/30 shadow-none',
};

const ETAPAS: Etapa[] = ['maternal', 'infantil', 'alfabetizacao', 'fund-iniciais', 'fund-finais'];

export function PortalAcervo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryInicial = searchParams.get('q') ?? '';
  const secaoInicial = (searchParams.get('secao') as Secao) ?? undefined;
  const situacaoInicial = (searchParams.get('situacao') as Situacao) ?? undefined;
  const novidadeInicial = searchParams.get('novo') === '1';

  const [query, setQuery] = useState(queryInicial);
  const [secao, setSecao] = useState<Secao | undefined>(secaoInicial);
  const [etapa, setEtapa] = useState<Etapa | undefined>();
  const [tema, setTema] = useState<Tema | undefined>();
  const [situacao, setSituacao] = useState<Situacao | undefined>(situacaoInicial);
  const [novidade, setNovidade] = useState(novidadeInicial);
  const [limite, setLimite] = useState(30);

  const resultado = useMemo(
    () =>
      buscar(materiais, {
        query: query || undefined,
        secao,
        etapa,
        tema,
        situacao,
        novidade,
      }),
    [query, secao, etapa, tema, situacao, novidade],
  );

  // Reseta paginação e sobe ao topo ao trocar filtros
  useEffect(() => {
    setLimite(30);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [query, secao, etapa, tema, situacao, novidade]);

  // Sincroniza estado com URL (substituindo — sem criar entradas no histórico)
  useEffect(() => {
    const params: Record<string, string> = {};
    if (query) params.q = query;
    if (secao) params.secao = secao;
    if (situacao) params.situacao = situacao;
    if (novidade) params.novo = '1';
    setSearchParams(params, { replace: true });
  }, [query, secao, situacao, novidade]); // etapa e tema são filtros locais apenas

  function limparNovidade() {
    setNovidade(false);
  }

  function toggleSecao(s: Secao) {
    trackSecaoFiltro(s);
    setSecao((prev) => (prev === s ? undefined : s));
  }

  function toggleEtapa(e: Etapa) {
    trackEtapaFiltro(e);
    setEtapa((prev) => (prev === e ? undefined : e));
  }

  function toggleTema(t: Tema) {
    trackTemaFiltro(t);
    setTema((prev) => (prev === t ? undefined : t));
  }

  function limparSituacao() {
    setSituacao(undefined);
  }

  function limparFiltros() {
    setQuery('');
    setSecao(undefined);
    setEtapa(undefined);
    setTema(undefined);
    setSituacao(undefined);
    setNovidade(false);
  }

  // Debounce de 600ms para não disparar evento GA4 a cada tecla digitada
  const trackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (trackTimer.current) clearTimeout(trackTimer.current);
    trackTimer.current = setTimeout(() => {
      const termo = query.trim();
      if (termo.length <= 1) return;
      if (resultado.length === 0) {
        trackBuscaSemResultado(termo);
      } else {
        trackBusca(termo, resultado.length);
      }
    }, 600);
    return () => { if (trackTimer.current) clearTimeout(trackTimer.current); };
  }, [query, resultado.length]);

  const titulo = novidade
    ? 'Adicionados recentemente'
    : situacao
      ? SITUACAO_LABELS[situacao]
      : secao
        ? SECAO_LABELS[secao]
        : 'Todos os materiais';

  useEffect(() => {
    document.title = `${titulo} · Educare`;
    return () => { document.title = 'Educare · Assistente Pedagógico'; };
  }, [titulo]);

  return (
    <div className="space-y-5">
      {/* Titulo e contagem */}
      <div className="flex items-baseline justify-between gap-2">
        <h1 className="text-xl font-bold text-foreground truncate">{titulo}</h1>
        <span className="text-sm text-muted-foreground shrink-0">{resultado.length} itens</span>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar materiais pedagógicos"
          placeholder="Buscar..."
          className={cn(
            'w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-card',
            'text-sm placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          )}
        />
      </div>

      {/* Filtros por secao */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-wrap lg:overflow-visible">
          {(Object.keys(SECAO_LABELS) as Secao[]).map((s) => {
            const Icon = SECAO_ICON[s];
            return (
              <button
                key={s}
                onClick={() => toggleSecao(s)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm whitespace-nowrap shrink-0',
                  'transition-all cursor-pointer',
                  secao === s
                    ? SECAO_ATIVA[s] + ' font-semibold'
                    : 'border-border bg-card text-muted-foreground shadow-sm hover:bg-secondary hover:shadow-none',
                )}
              >
                <Icon className="size-3.5" />
                {SECAO_LABELS[s]}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-10 bg-linear-to-l from-background to-transparent lg:hidden" />
      </div>

      {/* Badge de situacao ou novidade ativa */}
      {(situacao || novidade) && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Filtrando por:</span>
          {situacao && (
            <button
              onClick={limparSituacao}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-primary/40 bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors max-w-[260px]"
            >
              <span className="truncate">{SITUACAO_LABELS[situacao]}</span>
              <X className="size-3 shrink-0" />
            </button>
          )}
          {novidade && (
            <button
              onClick={limparNovidade}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-primary/40 bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors max-w-[260px]"
            >
              <span className="truncate">Adicionados recentemente</span>
              <X className="size-3 shrink-0" />
            </button>
          )}
        </div>
      )}

      {/* Filtros por etapa */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-wrap lg:overflow-visible">
          {ETAPAS.map((e) => (
            <button
              key={e}
              onClick={() => toggleEtapa(e)}
              className={cn(
                'px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap shrink-0',
                'transition-all cursor-pointer',
                etapa === e
                  ? 'border-primary bg-primary/10 text-primary font-semibold shadow-none'
                  : 'border-border bg-card text-muted-foreground shadow-sm hover:bg-secondary hover:shadow-none',
              )}
            >
              {ETAPA_LABELS[e]}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-10 bg-linear-to-l from-background to-transparent lg:hidden" />
      </div>

      {/* Filtros por tema */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-wrap lg:overflow-visible">
          {(Object.keys(TEMA_LABELS) as Tema[]).map((t) => (
            <button
              key={t}
              onClick={() => toggleTema(t)}
              className={cn(
                'px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap shrink-0',
                'transition-all cursor-pointer',
                tema === t
                  ? 'border-primary bg-primary/10 text-primary font-semibold shadow-none'
                  : 'border-border bg-card text-muted-foreground shadow-sm hover:bg-secondary hover:shadow-none',
              )}
            >
              {TEMA_LABELS[t]}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-10 bg-linear-to-l from-background to-transparent lg:hidden" />
      </div>

      {/* Grade de materiais */}
      {resultado.length === 0 ? (
        <div className="py-12 text-center space-y-4">
          <p className="text-2xl" aria-hidden="true">🔍</p>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Nenhum material encontrado.</p>
            <p className="text-xs text-muted-foreground">Tente palavras diferentes ou explore por situacao:</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
            {(['inclusao-especial', 'atividade-pronta', 'leitura-alfabetizacao'] as Situacao[]).map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(''); setSecao(undefined); setEtapa(undefined); setTema(undefined); setSituacao(s); }}
                className="px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs hover:bg-primary/15 transition-colors"
              >
                {SITUACAO_LABELS[s]}
              </button>
            ))}
          </div>
          <button
            onClick={limparFiltros}
            className="text-xs text-primary underline underline-offset-2"
          >
            Ver todo o acervo
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resultado.slice(0, limite).map((m) => (
              <MaterialCard key={m.id} material={m} />
            ))}
          </div>
          {resultado.length > limite && (
            <button
              onClick={() => setLimite((l) => l + 30)}
              className="w-full py-3 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Mostrar mais ({resultado.length - limite} {resultado.length - limite === 1 ? 'material' : 'materiais'})
            </button>
          )}
        </>
      )}
    </div>
  );
}
