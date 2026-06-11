import { createContext, useContext, useState, useCallback, type ReactNode, createElement } from 'react';

const STORAGE_KEY = 'portal-favoritos';

function lerFavoritos(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

function salvarFavoritos(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch { /* storage bloqueado (ex: Safari privado) — ignora */ }
}

interface FavoritosContextValue {
  isFavorito: (id: string) => boolean;
  toggleFavorito: (id: string) => void;
  favoritos: string[];
}

const FavoritosContext = createContext<FavoritosContextValue | null>(null);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<Set<string>>(lerFavoritos);

  const toggleFavorito = useCallback((id: string) => {
    setFavoritos((prev) => {
      const prox = new Set(prev);
      if (prox.has(id)) prox.delete(id);
      else prox.add(id);
      salvarFavoritos(prox);
      return prox;
    });
  }, []);

  const isFavorito = useCallback((id: string) => favoritos.has(id), [favoritos]);

  return createElement(
    FavoritosContext.Provider,
    { value: { isFavorito, toggleFavorito, favoritos: [...favoritos] } },
    children,
  );
}

export function useFavoritos() {
  const ctx = useContext(FavoritosContext);
  if (!ctx) throw new Error('useFavoritos deve ser usado dentro de FavoritosProvider');
  return ctx;
}
