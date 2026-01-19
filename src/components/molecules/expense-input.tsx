'use client';

/**
 * 🔬 MOLÉCULA: ExpenseInput
 * Input para agregar gastos con estilo premium
 */

import { type FC, useState, useCallback, type KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';

import { useExpenseStore } from '@/stores';
import { cn } from '@/lib/utils';

const PLACEHOLDERS = [
  'Ej: 50.000 en el super',
  'Ej: Uber 12.500',
  'Ej: Netflix 32.000',
];

const getRandomPlaceholder = () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];

export const ExpenseInput: FC = () => {
  const [input, setInput] = useState('');
  const [placeholder] = useState(getRandomPlaceholder);
  const [isFocused, setIsFocused] = useState(false);

  const { isLoading, addExpenseFromInput } = useExpenseStore();

  const handleSubmit = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    const success = addExpenseFromInput(trimmedInput);
    if (success) setInput('');
  }, [input, addExpenseFromInput]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Registra un gasto
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Escribe en lenguaje natural
          </p>
        </div>
      </div>

      {/* Input Row */}
      <div className="flex gap-2">
        <div
          className={cn(
            'flex-1 relative rounded-xl transition-all duration-200',
            isFocused && 'ring-2 ring-emerald-500/30'
          )}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isLoading}
            autoComplete="off"
            className={cn(
              'w-full px-4 py-3 rounded-xl text-sm font-medium',
              'bg-slate-50 dark:bg-slate-700/50',
              'border border-slate-200 dark:border-slate-600',
              'text-slate-900 dark:text-slate-100',
              'placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-colors duration-200'
            )}
            style={{ color: 'white' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            'bg-gradient-to-r from-emerald-500 to-teal-500',
            'shadow-lg shadow-emerald-500/20',
            'hover:shadow-emerald-500/30 hover:scale-105',
            'active:scale-95',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
            'transition-all duration-200'
          )}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-1.5">
        {['50.000 super', '12.500 uber', '32.000 netflix'].map((example) => (
          <button
            key={example}
            onClick={() => setInput(example)}
            className="px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};
