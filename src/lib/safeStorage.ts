/**
 * Acesso ao localStorage que nunca lança erro. Em modos de navegação muito
 * restritos (alguns bloqueios de cookies/privacidade) o próprio acesso a
 * `localStorage` pode lançar excecão, não só `getItem`/`setItem` — sem essa
 * proteção, o app quebrava inteiro na inicialização (achado em teste antes
 * do deploy: ThemeProvider crashava com "Algo deu errado" pra qualquer
 * funcionalidade, não só a que dependia do dado).
 */
export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Bloqueado ou sem espaço — a funcionalidade segue, só não persiste.
  }
}

export function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignora.
  }
}
