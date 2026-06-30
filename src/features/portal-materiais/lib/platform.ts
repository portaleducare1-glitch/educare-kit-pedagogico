export type MobilePlatform = 'ios' | 'android' | null;

export function detectMobilePlatform(): MobilePlatform {
  const ua = navigator.userAgent;
  // Detecta iPad Pro (reporta MacIntel mas tem touchPoints)
  const isIOS =
    (/iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;
  if (isIOS) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return null;
}

export function isIOSSafari(): boolean {
  const ua = navigator.userAgent;
  const isIOS = detectMobilePlatform() === 'ios';
  const isSafari = /Safari/i.test(ua);
  const isOtherIOSBrowser =
    /CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|GSA|FBAN|FBAV|Instagram|Line|MicroMessenger/i.test(ua);

  return isIOS && isSafari && !isOtherIOSBrowser;
}

export function isStandaloneDisplay(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    !!(navigator as unknown as { standalone?: boolean }).standalone
  );
}

export function isMacDesktop(): boolean {
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints <= 1;
}

/** Lê `?preview=algo` da URL — só pra forçar avisos/banners na tela durante
 * QA visual, sem precisar simular plataforma/localStorage de verdade. */
export function getPreviewParam(): string | null {
  return new URLSearchParams(window.location.search).get('preview');
}
