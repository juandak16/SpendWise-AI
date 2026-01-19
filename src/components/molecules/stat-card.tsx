/**
 * 🔬 MOLÉCULA: StatCard
 * Tarjeta de estadística con icono y tendencia
 */

import { type FC, type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string | ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };
  icon?: ReactNode;
  iconBg?: string;
  className?: string;
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBg = 'from-slate-400 to-slate-500',
  className,
}) => {
  const getTrendInfo = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return {
          icon: TrendingUp,
          color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
          label: 'más que el mes pasado',
        };
      case 'down':
        return {
          icon: TrendingDown,
          color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
          label: 'menos que el mes pasado',
        };
      default:
        return {
          icon: Minus,
          color: 'text-slate-500 bg-slate-50 dark:bg-slate-500/10',
          label: 'igual que el mes pasado',
        };
    }
  };

  const trendInfo = trend ? getTrendInfo(trend.direction) : null;
  const TrendIcon = trendInfo?.icon;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-5',
        'bg-white dark:bg-slate-800/50',
        'border border-slate-100 dark:border-slate-700/50',
        'shadow-sm hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        {icon && (
          <div
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-xl',
              'bg-gradient-to-br shadow-lg',
              iconBg
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-1">
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Trend */}
      {trend && trendInfo && TrendIcon && (
        <div className="flex items-center gap-2 mt-3">
          <div
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
              trendInfo.color
            )}
          >
            <TrendIcon className="w-3 h-3" />
            <span>{Math.abs(trend.value)}%</span>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {trendInfo.label}
          </span>
        </div>
      )}

      {/* Decorative gradient */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700/20 dark:to-slate-800/20 rounded-full opacity-50" />
    </div>
  );
};
