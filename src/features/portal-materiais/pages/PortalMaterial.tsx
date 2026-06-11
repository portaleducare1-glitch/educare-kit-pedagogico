import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share2, Heart, ExternalLink, BookOpen, Sparkles, ClipboardList, Check, Clock, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { materiais } from '../data/materiais';
import { useFavoritos } from '../lib/useFavoritos';
import { useVisitados } from '../lib/useVisitados';
import { buscarRelacionados } from '../lib/busca';
import { MaterialCard } from '../components/MaterialCard';
import { trackAbrirMaterial, trackDownload, trackFavoritoAdd, trackFavoritoRemove } from '@/lib/analytics';
import { useToast } from '@/lib/toast';
import type { Secao } from '../types';
import { SECAO_LABELS, ETAPA_LABELS } from '../types';

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

const SECAO_ICON: Record<Secao, React.ElementType> = {
  apostilas: BookOpen,
  atividades: Sparkles,
  documentos: ClipboardList,
};

const SECAO_TEXTO: Record<Secao, string> = {
  apostilas: 'text-brand-blue-text',
  atividades: 'text-brand-green-text',
  documentos: 'text-brand-orange-text',
};

export function PortalMaterial() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorito, toggleFavorito } = useFavoritos();
  const { marcarVisitado } = useVisitados();
  const { mostrar } = useToast();

  // Todos os useState/useEffect devem vir antes de qualquer return condicional (Rules of Hooks)
  const [compartilhado, setCompartilhado] = useState(false);
  const [baixando, setBaixando] = useState(false);
  const [iframeCarregado, setIframeCarregado] = useState(false);

  const material = materiais.find((m) => m.id === id);
  const materialId = material?.id ?? '';
  const titulo = material?.titulo ?? '';
  const descricao = material?.descricao ?? '';
  const url = material?.url ?? '';
  const secao = material?.secao ?? 'apostilas';

  useEffect(() => {
    if (!material) return;
    document.title = `${titulo} · Educare`;
    return () => { document.title = 'Educare · Assistente Pedagógico'; };
  }, [titulo, material]);

  useEffect(() => {
    if (!material) return;
    setIframeCarregado(false);
    marcarVisitado(materialId);
    trackAbrirMaterial(materialId, titulo, secao);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialId]);

  if (!material) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-4xl">🤔</p>
        <p className="text-muted-foreground">Material não encontrado.</p>
        <Button variant="outline" onClick={() => navigate('/portal/acervo')}>
          Voltar ao acervo
        </Button>
      </div>
    );
  }

  const Icon = SECAO_ICON[secao];
  const favorito = isFavorito(materialId);
  const relacionados = buscarRelacionados(materiais, material);
  const downloadUrl = `https://educarepedagogia.com.br/wp-json/educare/v1/download?url=${encodeURIComponent(url)}`;

  async function baixar() {
    setBaixando(true);
    trackDownload(materialId, titulo);
    try {
      const resp = await fetch(downloadUrl);
      if (!resp.ok) throw new Error('fetch falhou');
      const blob = await resp.blob();

      if (isIOS) {
        // iOS nao suporta download automatico de PDF. A forma nativa e "Salvar nos Arquivos"
        // via share sheet com o arquivo anexado.
        const file = new File([blob], `${titulo}.pdf`, { type: 'application/pdf' });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: titulo });
          return;
        }
      }

      // Desktop e Android: download direto via blob URL
      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objUrl;
      a.download = `${titulo}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(objUrl), 10000);
    } catch {
      // Fallback: abrir o endpoint diretamente
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setBaixando(false);
    }
  }

  async function compartilhar() {
    const portalUrl = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: titulo, text: descricao, url: portalUrl }); } catch { /* cancelado */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(portalUrl);
      setCompartilhado(true);
      mostrar('Link copiado!', 'sucesso');
      setTimeout(() => setCompartilhado(false), 2500);
    } catch {
      // Clipboard não disponível — nenhuma ação
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabecalho */}
      <div className="space-y-3">
        {/* Label de seção — sem pill, igual ao MaterialCard */}
        <div className={cn('flex items-center gap-1.5', SECAO_TEXTO[secao])}>
          <Icon className="size-3.5 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">{SECAO_LABELS[secao]}</span>
        </div>

        <h1 className="text-2xl font-black text-foreground leading-snug">
          {material.titulo}
        </h1>

        <p className="text-sm text-muted-foreground">{material.categoria}</p>

        {/* Etapas */}
        {material.etapas.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {material.etapas.map((e) => (
              <span
                key={e}
                className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs"
              >
                {ETAPA_LABELS[e]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Acoes principais */}
      <div className="flex gap-2">
        <Button
          className="flex-1"
          size="lg"
          onClick={() => {
            // Android: abre na mesma aba para o botão Voltar funcionar
            if (isAndroid) { window.location.href = url; return; }
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
        >
          <ExternalLink className="size-4" />
          Ver PDF
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-12"
          onClick={baixar}
          disabled={baixando}
          aria-label={isIOS ? 'Salvar nos Arquivos' : 'Baixar PDF'}
        >
          <Download className={cn('size-4', baixando && 'opacity-40')} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn('size-12 transition-colors', compartilhado && 'border-brand-green/40 bg-brand-green/5 text-brand-green-text')}
          onClick={compartilhar}
          aria-label={compartilhado ? 'Link copiado!' : 'Compartilhar'}
        >
          {compartilhado ? <Check className="size-4" /> : <Share2 className="size-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn('size-12', favorito && 'border-brand-coral/40 bg-brand-coral/5')}
          onClick={() => {
            if (favorito) {
              trackFavoritoRemove(materialId);
              mostrar('Removido dos favoritos');
            } else {
              trackFavoritoAdd(materialId);
              mostrar('Salvo nos favoritos ♥', 'sucesso');
            }
            toggleFavorito(materialId);
          }}
          aria-label={favorito ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        >
          <Heart className={cn('size-4', favorito && 'fill-brand-coral text-brand-coral')} />
        </Button>
      </div>

      {/* Descricao — o que e o material */}
      <section className="rounded-xl bg-secondary/50 border border-border p-4">
        <p className="text-sm text-foreground leading-relaxed">{material.descricao}</p>
      </section>

      {/* Quando usar */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground shrink-0" />
          Quando usar
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{material.quando_usar}</p>
      </section>

      {/* Como usar */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <PenLine className="size-4 text-muted-foreground shrink-0" />
          Como usar em sala
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{material.como_usar}</p>
      </section>

      {/* Preview do PDF — apenas desktop */}
      <div className="hidden sm:block rounded-xl border border-border overflow-hidden bg-muted">
        <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground font-medium">
          Pré-visualização
        </div>
        <div className="relative h-[50vh] min-h-[400px] max-h-[720px]">
          {!iframeCarregado && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted">
              <div className="h-2 w-32 rounded-full bg-border animate-pulse" />
              <p className="text-xs text-muted-foreground">Carregando pré-visualização...</p>
            </div>
          )}
          <iframe
            key={materialId}
            src={material.url}
            title={material.titulo}
            className={cn('w-full h-full border-0 transition-opacity duration-300', iframeCarregado ? 'opacity-100' : 'opacity-0')}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setIframeCarregado(true)}
          />
        </div>
      </div>

      {/* Materiais relacionados */}
      {relacionados.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Materiais relacionados</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relacionados.map((m) => (
              <MaterialCard key={m.id} material={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
