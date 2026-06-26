/**
 * @typebot.io/js não publica os arquivos .d.ts no pacote (bug conhecido do
 * pacote), embora o JS funcione normalmente em runtime. Declaração mínima
 * só com o que o app usa.
 *
 * `initBubble` vem do export default de "@typebot.io/js/web" (registra o
 * web component). `open`/`close`/`toggle` são comandos via postMessage,
 * exportados nomeados pelo pacote raiz "@typebot.io/js".
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
