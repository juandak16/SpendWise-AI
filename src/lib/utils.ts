import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de Tailwind de forma inteligente
 * Utilidad estándar de Shadcn/UI
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
