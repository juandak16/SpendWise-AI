import type { CurrencyCode } from './currency.types';

/**
 * Resumen mensual de gastos
 * @see analyst.md - Métricas requeridas
 */
export interface MonthlySummary {
  readonly month: number;            // 1-12
  readonly year: number;
  readonly currency: CurrencyCode;
  readonly totalAmount: number;
  readonly transactionCount: number;
  readonly dailyAverage: number;
  readonly topCategory: {
    categoryId: number;
    amount: number;
    percentage: number;
  };
  readonly projectedTotal: number;   // Proyección a fin de mes
  readonly vsLastMonth: {
    amount: number;
    percentage: number;
    trend: 'up' | 'down' | 'stable';
  };
}

/**
 * Totales agrupados por categoría
 */
export interface CategoryTotal {
  readonly categoryId: number;
  readonly amount: number;
  readonly count: number;
  readonly percentage: number;       // Del total mensual
}

/**
 * Estadísticas diarias para gráficas
 */
export interface DailyStats {
  readonly date: Date;
  readonly amount: number;
  readonly count: number;
}
