/*
  Stub do client Supabase. NÃO é usado pela Fase 1 (o Portal do Kit roda
  100% client-side, sem login ou banco). Está aqui pronto para uma fase futura:
  autenticação, progresso individual e dados de uso por aluno.

  Uso futuro:
    import { getSupabase } from '@/lib/supabase';
    const supabase = getSupabase();
    const { data } = await supabase.from('usuarios').select('*');
*/
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/** Retorna (e memoiza) o client. Lança se as variáveis de ambiente faltarem. */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env',
    );
  }

  client = createClient(url, anonKey);
  return client;
}

/** Indica se o Supabase já pode ser usado (variáveis presentes). */
export const isSupabaseConfigured = (): boolean =>
  Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
