import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { open as abrirTypebot } from '@typebot.io/js';
import { contarVisitados } from './useVisitados';

const TYPEBOT_PUBLIC_ID = 'pesquisa-avalia-o-portal-de-materiais-kit-pedag-gico-dothg4n';
const TYPEBOT_API_HOST = 'https://materialgratis.educarepedagogia.com.br';

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
 * Dispara a pesquisa de avaliação (Typebot) uma única vez por aparelho, quando
 * a professora atinge a 2ª visita (dia diferente da primeira) E já abriu pelo
 * menos 2 materiais — sinal de uso real, não só curiosidade da primeira visita.
 *
 * `@typebot.io/js` (raiz) é só uns comandos via postMessage, poucos bytes.
 * `@typebot.io/js/web` é que traz a UI do chat + DOMPurify (~170kB gzip) — só
 * é carregado sob demanda, no momento em que a condição é atingida, não em
 * toda visita. Mesmo padrão de code splitting já usado pra pdf.js/tesseract.js
 * no validador.
 */
export function useAvaliacaoPortal() {
  const location = useLocation();

  useEffect(() => {
    const numVisitas = registrarVisitaDoDia();
    const jaDisparado = !!localStorage.getItem(DISPARADO_KEY);
    if (jaDisparado) return;

    const numMateriais = contarVisitados();
    if (numVisitas < VISITAS_MINIMAS || numMateriais < MATERIAIS_MINIMOS) return;

    localStorage.setItem(DISPARADO_KEY, '1');

    import('@typebot.io/js/web').then(({ default: TypebotWeb }) => {
      TypebotWeb.initPopup({
        typebot: TYPEBOT_PUBLIC_ID,
        apiHost: TYPEBOT_API_HOST,
      });
      abrirTypebot();
    });
  }, [location.pathname]);
}
