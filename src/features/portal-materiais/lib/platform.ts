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

export function isStandaloneDisplay(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    !!(navigator as unknown as { standalone?: boolean }).standalone
  );
}

export function isMacDesktop(): boolean {
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints <= 1;
}
