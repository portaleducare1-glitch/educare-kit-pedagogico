/**
 * @typebot.io/js não publica os arquivos .d.ts no pacote (bug conhecido do
 * pacote), embora o JS funcione normalmente em runtime. Declaração mínima
 * só com o que o app usa.
 *
 * `initBubble` vem do export default de "@typebot.io/js/web" (registra o
 * web component). `open`/`close`/`toggle` são comandos via postMessage,
 * exportados nomeados pelo pacote raiz "@typebot.io/js".
 *
 * Usamos esse pacote genérico (não "@typebot.io/react") porque a versão
 * React oficial só suporta React 16-18, e este projeto está no React 19 —
 * instalar a versão React causa "duas cópias do React" e quebra os hooks.
 */
declare module '@typebot.io/js' {
  export function open(params?: { id?: string }): void;
  export function close(params?: { id?: string }): void;
  export function toggle(params?: { id?: string }): void;
}

declare module '@typebot.io/js/web' {
  interface InitBubbleParams {
    typebot: string;
    apiHost?: string;
    theme?: {
      button?: {
        backgroundColor?: string;
        iconColor?: string;
        size?: 'medium' | 'large' | `${number}px`;
      };
      placement?: 'left' | 'right';
    };
    [key: string]: unknown;
  }

  interface TypebotWeb {
    initBubble(params: InitBubbleParams): void;
    initStandard(params: InitBubbleParams): void;
    initPopup(params: InitBubbleParams): void;
  }

  const Typebot: TypebotWeb;
  export default Typebot;
}
