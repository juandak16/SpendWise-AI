'use client';

/**
 * 🦠 ORGANISMO: ExpenseList
 * Lista de gastos con expansión
 */

import { type FC, useEffect, useState } from 'react';
import { Receipt, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useExpenseStore } from '@/stores';
import { ExpenseCard } from '@/components/molecules';

export interface ExpenseListProps {
  limit?: number;
}

export const ExpenseList: FC<ExpenseListProps> = ({ limit = 5 }) => {
  const { expenses, isLoading, loadExpenses, deleteExpense } = useExpenseStore();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const sortedExpenses = [...expenses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Aplicar límite solo si no se muestra todo
  const displayedExpenses = showAll ? sortedExpenses : sortedExpenses.slice(0, limit);
  const hasMore = expenses.length > limit;

  // Loading
  if (isLoading && expenses.length === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    );
  }

  // Empty
  if (expenses.length === 0) {
    return (
      <div className="py-12 px-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
            <Receipt className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
            Sin gastos registrados
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">
            Usa el formulario de arriba para registrar tu primer gasto
          </p>
          <div className="flex items-center gap-1 mt-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Escribe algo como "20 uber"</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Últimos gastos
        </h2>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {expenses.length} {expenses.length === 1 ? 'registro' : 'registros'}
        </span>
      </div>

      {/* List */}
      <div className="space-y-2">
        {displayedExpenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onDelete={deleteExpense}
          />
        ))}
      </div>

      {/* Toggle button */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Mostrar menos
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Ver todos ({expenses.length})
            </>
          )}
        </button>
      )}
    </div>
  );
};
