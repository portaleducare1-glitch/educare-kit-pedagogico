// Google Analytics 4 — eventos do portal
// GA4 ID hardcoded em index.html (tag gtag.js embutida diretamente)

declare function gtag(...args: unknown[]): void;

function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof gtag === 'undefined') return;
  gtag('event', eventName, params);
}

// Busca executada (query + numero de resultados)
export function trackBusca(query: string, resultados: number) {
  track('busca_portal', {
    search_term: query,
    resultados,
  });
}

// Busca que nao retornou resultados — gap no acervo
export function trackBuscaSemResultado(query: string) {
  track('busca_sem_resultado', {
    search_term: query,
  });
}

// Clique em situacao na home ("Aluno com TEA", etc.)
export function trackSituacao(situacao: string) {
  track('click_situacao', {
    situacao,
  });
}

// Abertura da ficha de um material
export function trackAbrirMaterial(id: string, titulo: string, secao: string) {
  track('abrir_material', {
    material_id: id,
    material_titulo: titulo,
    secao,
  });
}

// Download de PDF iniciado
export function trackDownload(id: string, titulo: string) {
  track('download_pdf', {
    material_id: id,
    material_titulo: titulo,
  });
}

// Favorito adicionado
export function trackFavoritoAdd(id: string) {
  track('favorito_add', { material_id: id });
}

// Favorito removido
export function trackFavoritoRemove(id: string) {
  track('favorito_remove', { material_id: id });
}

// Compartilhamento via WhatsApp
export function trackWhatsApp(id: string, titulo: string) {
  track('share_whatsapp', { material_id: id, material_titulo: titulo });
}

// Clique no botão flutuante de suporte via WhatsApp
export function trackSuporteWhatsApp() {
  track('contato_suporte_whatsapp');
}

// Filtro por tema aplicado no Acervo
export function trackTemaFiltro(tema: string) {
  track('filtro_tema', { tema });
}

// Filtro por seção aplicado no Acervo
export function trackSecaoFiltro(secao: string) {
  track('filtro_secao', { secao });
}

// Filtro por etapa aplicado no Acervo
export function trackEtapaFiltro(etapa: string) {
  track('filtro_etapa', { etapa });
}
