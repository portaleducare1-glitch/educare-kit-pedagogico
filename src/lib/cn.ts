import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Une classes condicionais e resolve conflitos do Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Remove acentos para buscas/comparações insensíveis a diacríticos. */
export const normalize = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
