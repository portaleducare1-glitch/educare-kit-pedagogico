import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { contarVisitados } from './useVisitados';

const ULTIMA_VISITA_KEY = 'educare-ultima-visita';
const NUM_VISITAS_KEY = 'educare-num-visitas';
const DISPARADO_KEY = 'educare-avaliacao-disparada';

const VISITAS_MINIMAS = 2;
const MATERIAIS_MINIMOS = 2;

/** Conta uma nova visita só na primeira vez que o app abre em cada dia. */
function registrarVisitaDoDia(): number {
  const hoje = new Date().toISOString().slice(0, 10);
  const ultima = localStorage.getItem(ULTIMA_VISITA_KEY);
  let numVisitas = Number(localStorage.getItem(NUM_VISITAS_KEY) ?? '0');

  if (ultima !== hoje) {
    numVisitas += 1;
    localStorage.setItem(ULTIMA_VISITA_KEY, hoje);
    localStorage.setItem(NUM_VISITAS_KEY, String(numVisitas));
  }

  return numVisitas;
}

/**
 * Decide se deve mostrar a pesquisa de avaliação (Typebot), uma única vez por
 * aparelho, quando a professora atinge a 2ª visita (dia diferente da
 * primeira) E já abriu pelo menos 2 materiais — sinal de uso real, não só
 * curiosidade da primeira visita. Quem renderiza o widget é o componente
 * `AvaliacaoBubble`, carregado sob demanda só quando isto retornar `true`.
 */
export function useAvaliacaoPortal(): boolean {
  const location = useLocation();
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const numVisitas = registrarVisitaDoDia();
    const jaDisparado = !!localStorage.getItem(DISPARADO_KEY);
    if (jaDisparado) return;

    const numMateriais = contarVisitados();
    if (numVisitas >= VISITAS_MINIMAS && numMateriais >= MATERIAIS_MINIMOS) {
      localStorage.setItem(DISPARADO_KEY, '1');
      setMostrar(true);
    }
  }, [location.pathname]);

  return mostrar;
}
