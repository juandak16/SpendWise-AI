'use client';

/**
 * 🔬 MOLÉCULA: ExpenseCard
 * Tarjeta de gasto con conversión a USD
 */

import { type FC, useState } from 'react';
import { Trash2, AlertCircle, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCategoryById, convertToUSD, formatUSD, formatCurrency } from '@/config';
import type { Expense } from '@/types';

export interface ExpenseCardProps {
  expense: Expense;
  onDelete?: (id: string) => void;
  className?: string;
}

const formatDate = (date: Date): string => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Hoy';
  if (d.toDateString() === yesterday.toDateString()) return 'Ayer';

  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
};

export const ExpenseCard: FC<ExpenseCardProps> = ({
  expense,
  onDelete,
  className,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const category = getCategoryById(expense.categoryId);
  const isLowConfidence = expense.confidence < 0.7;
  
  // Convertir a USD si está en COP
  const amountInUSD = convertToUSD(expense.amount, expense.currency);
  const showConversion = expense.currency === 'COP';

  return (
    <div
      className={cn(
        'group flex items-center gap-4 p-4 rounded-2xl',
        'bg-white dark:bg-slate-800/50',
        'border border-slate-100 dark:border-slate-700/50',
        'hover:border-slate-200 dark:hover:border-slate-600',
        'transition-all duration-200',
        className
      )}
    >
      {/* Emoji en círculo */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ backgroundColor: category ? `${category.color}15` : '#f1f5f9' }}
      >
        {category?.emoji || '📦'}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Título */}
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          {expense.description || 'Gasto'}
        </p>
        
        {/* Meta info */}
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-md"
            style={{
              backgroundColor: category ? `${category.color}15` : '#f1f5f9',
              color: category?.color || '#64748b',
            }}
          >
            {category?.name || 'Otros'}
          </span>
          <span className="text-[11px] text-slate-400">•</span>
          <span className="text-[11px] text-slate-400">{formatDate(expense.date)}</span>
          
          {/* Low confidence badge */}
          {isLowConfidence && (
            <span className="flex items-center gap-1 text-[11px] text-amber-500">
              <AlertCircle className="w-3 h-3" />
              <span className="hidden sm:inline">Baja confianza</span>
            </span>
          )}
        </div>
      </div>

      {/* Amount - ahora muestra ambas monedas */}
      <div className="shrink-0 text-right">
        {/* Monto en USD (principal) */}
        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {formatUSD(amountInUSD)}
        </p>
        
        {/* Monto original en COP si es conversión */}
        {showConversion && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {formatCurrency(expense.amount, 'COP')}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="relative shrink-0">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
            'hover:bg-slate-100 dark:hover:bg-slate-700',
            'opacity-0 group-hover:opacity-100',
            'transition-all duration-200'
          )}
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-full mt-1 z-20 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 min-w-[120px]">
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(expense.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
