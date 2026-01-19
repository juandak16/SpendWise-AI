/**
 * 🔬 MOLÉCULA: CurrencyDisplay
 * Muestra un monto formateado con símbolo de moneda
 */

import { type FC } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/config';
import type { CurrencyCode } from '@/types';

export interface CurrencyDisplayProps {
  amount: number;
  currency: CurrencyCode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSign?: boolean;
}

export const CurrencyDisplay: FC<CurrencyDisplayProps> = ({
  amount,
  currency,
  size = 'md',
  className,
  showSign = false,
}) => {
  const formattedAmount = formatCurrency(amount, currency);
  const isNegative = amount < 0;

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold',
    xl: 'text-2xl font-bold',
  };

  return (
    <span
      className={cn(
        sizes[size],
        isNegative ? 'text-red-500' : 'text-slate-900 dark:text-slate-100',
        className
      )}
    >
      {showSign && amount > 0 && '+'}
      {formattedAmount}
    </span>
  );
};
