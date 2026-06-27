import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { safeGetItem, safeSetItem } from '@/lib/safeStorage';
import { contarVisitados } from './useVisitados';

const ULTIMA_VISITA_KEY = 'educare-ultima-visita';
const NUM_VISITAS_KEY = 'educare-num-visitas';
const DISPARADO_KEY = 'educare-avaliacao-disparada';

const VISITAS_MINIMAS = 2;
const MATERIAIS_MINIMOS = 2;

// Tempo em que o botão de suporte fica escondido depois que a avaliação
// aparece. O widget do Typebot não avisa quando ela é fechada (não expõe
// esse evento), então não dá pra saber com certeza quando ele volta a ser
// só o ícone pequeno — esse tempo é uma estimativa de sobra pra ela
// responder ou fechar a pesquisa de 2 perguntas.
const OCULTAR_SUPORTE_MS = 60_000;

interface AvaliacaoPortalState {
  mostrarAvaliacao: boolean;
  ocultarSuporte: boolean;
}

/** Conta uma nova visita só na primeira vez que o app abre em cada dia. */
function registrarVisitaDoDia(): number {
  const hoje = new Date().toISOString().slice(0, 10);
  const ultima = safeGetItem(ULTIMA_VISITA_KEY);
  let numVisitas = Number(safeGetItem(NUM_VISITAS_KEY) ?? '0');

  if (ultima !== hoje) {
    numVisitas += 1;
    safeSetItem(ULTIMA_VISITA_KEY, hoje);
    safeSetItem(NUM_VISITAS_KEY, String(numVisitas));
  }

  return numVisitas;
}

/**
 * Decide se deve mostrar a pesquisa de avaliação (Typebot), uma única vez por
 * aparelho, quando a professora atinge a 2ª visita (dia diferente da
 * primeira) E já abriu pelo menos 2 materiais — sinal de uso real, não só
 * curiosidade da primeira visita. Quem renderiza o widget é o componente
 * `AvaliacaoBubble`, carregado sob demanda só quando isto retornar `true`.
 *
 * Também retorna `ocultarSuporte`: enquanto a avaliação está recém-aberta,
 * o chat ocupa a tela quase inteira e tampa o botão de WhatsApp (mesmo
 * estando em cantos "opostos") — então o botão de suporte fica escondido
 * por um tempo curto, depois volta sozinho.
 */
export function useAvaliacaoPortal(): AvaliacaoPortalState {
  const location = useLocation();
  const [mostrarAvaliacao, setMostrarAvaliacao] = useState(false);
  const [ocultarSuporte, setOcultarSuporte] = useState(false);

  useEffect(() => {
    const numVisitas = registrarVisitaDoDia();
    const jaDisparado = !!safeGetItem(DISPARADO_KEY);
    if (jaDisparado) return;

    const numMateriais = contarVisitados();
    if (numVisitas >= VISITAS_MINIMAS && numMateriais >= MATERIAIS_MINIMOS) {
      safeSetItem(DISPARADO_KEY, '1');
      setMostrarAvaliacao(true);
      setOcultarSuporte(true);
      setTimeout(() => setOcultarSuporte(false), OCULTAR_SUPORTE_MS);
    }
  }, [location.pathname]);

  return { mostrarAvaliacao, ocultarSuporte };
}
