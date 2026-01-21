'use client';

/**
 * 🦠 ORGANISM: Header
 * App header with logo, current date, and status
 * @see architect.md - Atomic Design (Organisms)
 */

import { type FC } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const now = new Date();
  
  // Full date format: "Sábado, 18 de enero 2026"
  const fullDate = now.toLocaleDateString('es-CO', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className={cn('flex items-center justify-between', className)}>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <span className="text-xl">💰</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
            SpendWise<span className="text-emerald-500">AI</span>
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-3 h-3" />
            <span className="capitalize">{fullDate}</span>
          </div>
        </div>
      </div>

      {/* AI Status badge */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          IA Activa
        </span>
      </div>
    </header>
  );
};
