import { useEffect } from 'react';

const TYPEBOT_PUBLIC_ID = 'pesquisa-avalia-o-portal-de-materiais-kit-pedag-gico-dothg4n';
const TYPEBOT_API_HOST = 'https://materialgratis.educarepedagogia.com.br';

/**
 * Renderiza a pesquisa de avaliação em modo Bolha (não Popup — o Popup deste
 * Typebot não tem botão de fechar, confirmado no código-fonte e na prática;
 * a Bolha tem). Usa @typebot.io/js (genérico, não @typebot.io/react) porque
 * a versão React oficial não suporta React 19.
 *
 * O pacote (~170kB gzip, traz DOMPurify + UI do chat) só é importado quando
 * este componente é montado — quem decide montar ou não é `useAvaliacaoPortal`.
 */
export function AvaliacaoBubble() {
  useEffect(() => {
    let montado = true;

    import('@typebot.io/js/web').then(({ default: TypebotWeb }) => {
      if (!montado) return;
      TypebotWeb.initBubble({
        typebot: TYPEBOT_PUBLIC_ID,
        apiHost: TYPEBOT_API_HOST,
        theme: { button: { backgroundColor: '#7C5CFC' } },
      });
      import('@typebot.io/js').then(({ open }) => open());
    });

    return () => {
      montado = false;
    };
  }, []);

  return null;
}
