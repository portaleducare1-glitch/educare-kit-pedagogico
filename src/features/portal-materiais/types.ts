export type Secao = 'apostilas' | 'atividades' | 'documentos';

export type Etapa =
  | 'maternal'
  | 'infantil'
  | 'alfabetizacao'
  | 'fund-iniciais'
  | 'fund-finais'
  | 'todos';

export type Tema =
  | 'tea'
  | 'tdah'
  | 'aee'
  | 'caa'
  | 'libras'
  | 'braille'
  | 'superdotacao'
  | 'socioemocional'
  | 'matematica'
  | 'leitura'
  | 'grafomotricidade'
  | 'inclusao';

export type Situacao =
  | 'aluno-nao-fala'
  | 'aluno-agitado'
  | 'atividade-pronta'
  | 'pei-pdi'
  | 'inclusao-especial'
  | 'altas-habilidades'
  | 'leitura-alfabetizacao'
  | 'tarefa-para-casa'
  | 'matematica';

export interface Material {
  id: string;
  titulo: string;
  url: string;
  wp_id?: number;
  secao: Secao;
  categoria: string;
  etapas: Etapa[];
  temas: Tema[];
  situacoes: Situacao[];
  descricao: string;
  quando_usar: string;
  como_usar: string;
  /** ISO date string (YYYY-MM-DD). Badge "Novo" aparece enquanto a data atual for anterior ou igual. */
  novidadeAte?: string;
}

export const SECAO_LABELS: Record<Secao, string> = {
  apostilas: 'Apostilas de Estudo',
  atividades: 'Atividades Prontas',
  documentos: 'Documentos e Ferramentas',
};

export const SECAO_DESC: Record<Secao, string> = {
  apostilas: 'Para estudar, aprofundar e planejar',
  atividades: 'Prontas para imprimir e aplicar em sala',
  documentos: 'Fichas, checklists e recursos de uso contínuo',
};

export const ETAPA_LABELS: Record<Etapa, string> = {
  maternal: 'Berçário e Maternal',
  infantil: 'Educação Infantil',
  alfabetizacao: 'Alfabetização (1º ao 3º ano)',
  'fund-iniciais': 'Fund. Anos Iniciais (1º ao 5º ano)',
  'fund-finais': 'Fund. Anos Finais (6º ao 9º ano)',
  todos: 'Todas as etapas',
};

export const TEMA_LABELS: Record<Tema, string> = {
  tea: 'TEA / Autismo',
  tdah: 'TDAH',
  aee: 'AEE',
  caa: 'CAA',
  libras: 'LIBRAS',
  braille: 'Braille',
  superdotacao: 'Altas Habilidades',
  socioemocional: 'Socioemocional',
  matematica: 'Matemática',
  leitura: 'Leitura',
  grafomotricidade: 'Grafomotricidade',
  inclusao: 'Inclusão',
};

export const SITUACAO_LABELS: Record<Situacao, string> = {
  'aluno-nao-fala': 'Aluno que não se comunica verbalmente',
  'aluno-agitado': 'Aluno agitado ou sem foco',
  'atividade-pronta': 'Preciso de atividade pronta para amanhã',
  'pei-pdi': 'Preciso organizar PEI ou PDI',
  'inclusao-especial': 'Turma com aluno de necessidade especial',
  'altas-habilidades': 'Aluno com altas habilidades',
  'leitura-alfabetizacao': 'Dificuldade de leitura ou alfabetização',
  'tarefa-para-casa': 'Tarefa para casa',
  'matematica': 'Atividade de matemática',
};
