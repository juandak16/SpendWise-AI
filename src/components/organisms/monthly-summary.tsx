'use client';

/**
 * 🦠 ORGANISMO: MonthlySummary
 * Grid de estadísticas - Todo convertido a USD
 */

import { type FC } from 'react';
import { Wallet, Receipt, TrendingUp, Tag, RefreshCw } from 'lucide-react';
import { useExpenseStore } from '@/stores';
import { formatUSD, getCategoryById, getExchangeRateLabel } from '@/config';
import { cn } from '@/lib/utils';

export const MonthlySummary: FC = () => {
  const getMonthlySummary = useExpenseStore((state) => state.getMonthlySummary);
  const expenses = useExpenseStore((state) => state.expenses);
  
  const now = new Date();
  const summary = getMonthlySummary(now.getMonth() + 1, now.getFullYear());
  const topCategory = getCategoryById(summary.topCategory.categoryId);

  // Estado vacío
  if (expenses.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center"
          >
            <span className="text-xs text-slate-400">Sin datos</span>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total gastado',
      value: formatUSD(summary.totalAmount),
      icon: Wallet,
      color: 'emerald',
      trend: summary.vsLastMonth.percentage !== 0 ? {
        value: Math.abs(summary.vsLastMonth.percentage),
        isUp: summary.vsLastMonth.trend === 'up',
      } : null,
    },
    {
      title: 'Transacciones',
      value: summary.transactionCount.toString(),
      subtitle: `~${formatUSD(summary.dailyAverage)}/día`,
      icon: Receipt,
      color: 'blue',
    },
    {
      title: 'Proyección',
      value: formatUSD(summary.projectedTotal),
      subtitle: 'Estimado fin de mes',
      icon: TrendingUp,
      color: 'violet',
    },
    {
      title: 'Mayor gasto',
      value: topCategory?.name || 'N/A',
      emoji: topCategory?.emoji,
      subtitle: `${summary.topCategory.percentage}% del total`,
      icon: Tag,
      color: 'amber',
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; shadow: string }> = {
    emerald: {
      bg: 'from-emerald-500 to-teal-500',
      icon: 'text-white',
      shadow: 'shadow-emerald-500/20',
    },
    blue: {
      bg: 'from-blue-500 to-indigo-500',
      icon: 'text-white',
      shadow: 'shadow-blue-500/20',
    },
    violet: {
      bg: 'from-violet-500 to-purple-500',
      icon: 'text-white',
      shadow: 'shadow-violet-500/20',
    },
    amber: {
      bg: 'from-amber-500 to-orange-500',
      icon: 'text-white',
      shadow: 'shadow-amber-500/20',
    },
  };

  return (
    <div className="space-y-3">
      {/* Exchange rate label */}
      <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <RefreshCw className="w-3 h-3" />
        <span>{getExchangeRateLabel()}</span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const colors = colorMap[stat.color];
          const Icon = stat.icon;
          
          return (
            <div
              key={stat.title}
              className={cn(
                'relative p-5 rounded-2xl overflow-hidden',
                'bg-white dark:bg-slate-800/50',
                'border border-slate-100 dark:border-slate-700/50',
                'shadow-sm'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center mb-4',
                  'bg-gradient-to-br shadow-lg',
                  colors.bg,
                  colors.shadow
                )}
              >
                <Icon className={cn('w-5 h-5', colors.icon)} />
              </div>

              {/* Label */}
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                {stat.title}
              </p>
              
              {/* Value */}
              <div className="flex items-center gap-2">
                {stat.emoji && <span className="text-xl">{stat.emoji}</span>}
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
                  {stat.value}
                </p>
              </div>

              {/* Subtitle */}
              {stat.subtitle && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  {stat.subtitle}
                </p>
              )}

              {/* Trend badge */}
              {stat.trend && (
                <div
                  className={cn(
                    'absolute top-4 right-4 px-2 py-1 rounded-full text-[10px] font-semibold',
                    stat.trend.isUp
                      ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
                      : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  )}
                >
                  {stat.trend.isUp ? '↑' : '↓'} {stat.trend.value}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
