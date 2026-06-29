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
import { trackAbrirMaterial, trackDownload, trackFavoritoAdd, trackFavoritoRemove, trackWhatsApp } from '@/lib/analytics';
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
    return () => { document.title = 'Kit Pedagógico · Portal de Materiais'; };
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
        <p className="text-4xl" aria-hidden="true">🤔</p>
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

  function compartilharWhatsApp() {
    const portalUrl = window.location.href;
    trackWhatsApp(materialId, titulo);
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${titulo}\n${portalUrl}`)}`,
      '_blank',
      'noopener,noreferrer',
    );
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

      {/* Descricao — o que e o material (antes das ações para contexto imediato) */}
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
          className="size-12 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/40"
          onClick={compartilharWhatsApp}
          aria-label="Enviar no WhatsApp"
        >
          {/* WhatsApp icon — não disponível no Lucide, SVG inline */}
          <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((m) => (
              <MaterialCard key={m.id} material={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
