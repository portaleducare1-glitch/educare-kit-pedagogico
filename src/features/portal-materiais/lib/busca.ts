import type { Material, Secao, Etapa, Situacao, Tema } from '../types';

// Remove acentos e normaliza para comparacao tolerante
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Sinonimos e erros comuns para expandir a busca
const SINONIMOS: Record<string, string[]> = {
  autismo: ['tea', 'autista', 'altismo', 'autísmo', 'espectro'],
  tea: ['autismo', 'autista', 'espectro autista'],
  tdah: ['tdha', 'hiperatividade', 'atencao', 'deficit'],
  libras: ['surdo', 'surdez', 'sinais', 'linguagem de sinais'],
  braille: ['cego', 'deficiencia visual', 'baixa visao'],
  aee: ['atendimento especializado', 'sala de recurso', 'recurso multifuncional'],
  caa: ['comunicacao alternativa', 'comunicacao aumentativa', 'nao verbal', 'nao fala'],
  pei: ['plano educacional individualizado', 'plano individualizado'],
  pdi: ['plano de desenvolvimento', 'plano individual'],
  'pei pdi': ['plano', 'individualizado'],
  grafomotricidade: ['grafo', 'coordenacao motora', 'motora fina', 'traco', 'tracado'],
  maternal: ['bercario', 'bebe', 'creche'],
  alfabetizacao: ['alfabetizar', 'letramento', 'silabas', 'leitura inicial'],
  socioemocional: ['emocao', 'emocoes', 'sentimentos', 'comportamento'],
  superdotacao: ['altas habilidades', 'hiperfoco', 'superdotado', 'talento'],
  matematica: ['mate', 'numeros', 'calculo', 'operacoes'],
};

function expandirTermos(query: string): string[] {
  const normalizado = normalizar(query);
  const termos = [normalizado];

  for (const [chave, sinonimosLista] of Object.entries(SINONIMOS)) {
    if (normalizado.includes(normalizar(chave))) {
      sinonimosLista.forEach((s) => termos.push(normalizar(s)));
    }
    sinonimosLista.forEach((s) => {
      if (normalizado.includes(normalizar(s))) {
        termos.push(normalizar(chave));
      }
    });
  }

  return [...new Set(termos)];
}

function pontuar(material: Material, termos: string[]): number {
  const campos = [
    normalizar(material.titulo) + ' ' + normalizar(material.titulo), // peso duplo no titulo
    normalizar(material.descricao),
    normalizar(material.categoria),
    normalizar(material.quando_usar),
    normalizar(material.como_usar),
    material.temas.join(' '),
    material.situacoes.join(' '),
    material.etapas.join(' '),
  ].join(' ');

  let pontos = 0;
  for (const termo of termos) {
    if (campos.includes(termo)) pontos += 1;
    // Bonus se o titulo contem o termo
    if (normalizar(material.titulo).includes(termo)) pontos += 2;
  }
  return pontos;
}

export interface FiltrosBusca {
  query?: string;
  secao?: Secao;
  etapa?: Etapa;
  situacao?: Situacao;
  tema?: Tema;
  /** Quando true, mostra só materiais com novidadeAte vigente, mais recentes primeiro. */
  novidade?: boolean;
}

export function buscar(materiais: Material[], filtros: FiltrosBusca): Material[] {
  let resultado = materiais;

  // Filtros exatos
  if (filtros.secao) {
    resultado = resultado.filter((m) => m.secao === filtros.secao);
  }
  if (filtros.etapa) {
    resultado = resultado.filter(
      (m) => m.etapas.includes(filtros.etapa!) || m.etapas.includes('todos'),
    );
  }
  if (filtros.situacao) {
    resultado = resultado.filter((m) => m.situacoes.includes(filtros.situacao!));
  }
  if (filtros.tema) {
    resultado = resultado.filter((m) => m.temas.includes(filtros.tema!));
  }
  if (filtros.novidade) {
    const hoje = new Date();
    resultado = resultado
      .filter((m) => m.novidadeAte && hoje <= new Date(m.novidadeAte))
      .sort((a, b) => new Date(b.novidadeAte!).getTime() - new Date(a.novidadeAte!).getTime());
  }

  // Busca textual
  if (filtros.query && filtros.query.trim().length > 1) {
    const termos = expandirTermos(filtros.query);
    resultado = resultado
      .map((m) => ({ material: m, pontos: pontuar(m, termos) }))
      .filter(({ pontos }) => pontos > 0)
      .sort((a, b) => b.pontos - a.pontos)
      .map(({ material }) => material);
  }

  return resultado;
}

export function buscarRelacionados(todos: Material[], material: Material, limite = 4): Material[] {
  return todos
    .filter((m) => m.id !== material.id)
    .map((m) => {
      let pontos = 0;
      // Mesma categoria
      if (m.categoria === material.categoria) pontos += 3;
      // Temas em comum
      for (const tema of material.temas) {
        if (m.temas.includes(tema)) pontos += 2;
      }
      // Situacoes em comum
      for (const situacao of material.situacoes) {
        if (m.situacoes.includes(situacao)) pontos += 1;
      }
      return { material: m, pontos };
    })
    .filter(({ pontos }) => pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limite)
    .map(({ material }) => material);
}
