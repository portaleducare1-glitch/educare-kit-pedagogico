import { useState, useCallback } from 'react';

const STORAGE_KEY = 'educare-visitados';

function lerVisitados(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === 'string');
  } catch {
    return [];
  }
}

function salvarVisitados(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch { /* storage cheio — ignora */ }
}

export function useVisitados() {
  const [visitados, setVisitados] = useState<string[]>(() => lerVisitados());

  const marcarVisitado = useCallback((id: string) => {
    setVisitados((prev) => {
      // Remove se já existe e reinsere no fim (mais recente = último)
      const filtrado = prev.filter((v) => v !== id);
      const novo = [...filtrado, id];
      salvarVisitados(novo);
      return novo;
    });
  }, []);

  const foiVisitado = useCallback((id: string) => visitados.includes(id), [visitados]);

  // Últimos visitados em ordem decrescente (mais recente primeiro)
  const recentes = visitados.slice().reverse();

  return { foiVisitado, marcarVisitado, recentes };
}
