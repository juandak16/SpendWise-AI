/**
 * Servicio de cálculos financieros
 * @see analyst.md - Sección "Suma de Totales" y "Precisión numérica"
 * 
 * NOTA: Todos los totales se calculan en USD como moneda base.
 * Los gastos en COP se convierten usando la tasa de cambio configurada.
 */

import type { Expense, MonthlySummary, CategoryTotal, DailyStats } from '@/types';
import { DefaultCategoryId } from '@/types';
import { convertToUSD, EXCHANGE_RATE_COP_TO_USD } from '@/config';

/**
 * Servicio de cálculos financieros
 */
export const calculatorService = {
  /**
   * Calcula el resumen mensual de gastos
   * Convierte todos los gastos a USD para el total
   */
  calculateMonthlySummary: (
    expenses: Expense[],
    month: number,
    year: number
  ): MonthlySummary => {
    try {
      // Filtrar gastos del mes (todas las monedas)
      const filtered = expenses.filter((e) => {
        const d = new Date(e.date);
        return (
          d.getMonth() + 1 === month &&
          d.getFullYear() === year
        );
      });

      // Convertir todos los gastos a USD (centavos) y sumar
      const totalAmountUSD = filtered.reduce((sum, e) => {
        return sum + convertToUSD(e.amount, e.currency);
      }, 0);

      const transactionCount = filtered.length;

      // Calcular días transcurridos
      const today = new Date();
      const isCurrentMonth =
        today.getMonth() + 1 === month && today.getFullYear() === year;
      const daysElapsed = isCurrentMonth
        ? today.getDate()
        : new Date(year, month, 0).getDate();

      // Promedio diario (en centavos USD)
      const dailyAverage =
        daysElapsed > 0 ? Math.round(totalAmountUSD / daysElapsed) : 0;

      // Top categoría (calculada en USD)
      const categoryTotals = calculatorService.calculateCategoryTotals(filtered);
      const topCategory = categoryTotals[0] || {
        categoryId: DefaultCategoryId.OTHER,
        amount: 0,
        percentage: 0,
        count: 0,
      };

      // Proyección a fin de mes (en centavos USD)
      const daysInMonth = new Date(year, month, 0).getDate();
      const projectedTotal =
        daysElapsed > 0
          ? Math.round((totalAmountUSD / daysElapsed) * daysInMonth)
          : 0;

      // Comparativa con mes anterior
      const vsLastMonth = calculatorService.compareWithLastMonth(
        expenses,
        month,
        year,
        totalAmountUSD
      );

      return {
        month,
        year,
        currency: 'USD', // Siempre reportamos en USD
        totalAmount: totalAmountUSD,
        transactionCount,
        dailyAverage,
        topCategory: {
          categoryId: topCategory.categoryId,
          amount: topCategory.amount,
          percentage: topCategory.percentage,
        },
        projectedTotal,
        vsLastMonth,
      };
    } catch (error) {
      console.error('[calculatorService] calculateMonthlySummary error:', error);
      
      return {
        month,
        year,
        currency: 'USD',
        totalAmount: 0,
        transactionCount: 0,
        dailyAverage: 0,
        topCategory: {
          categoryId: DefaultCategoryId.OTHER,
          amount: 0,
          percentage: 0,
        },
        projectedTotal: 0,
        vsLastMonth: {
          amount: 0,
          percentage: 0,
          trend: 'stable',
        },
      };
    }
  },

  /**
   * Calcula totales por categoría (en USD)
   */
  calculateCategoryTotals: (expenses: Expense[]): CategoryTotal[] => {
    try {
      const totals = new Map<number, { amount: number; count: number }>();
      
      // Calcular total general en USD
      const grandTotal = expenses.reduce((sum, e) => {
        return sum + convertToUSD(e.amount, e.currency);
      }, 0);

      // Agrupar por categoría (convertido a USD)
      for (const expense of expenses) {
        const amountUSD = convertToUSD(expense.amount, expense.currency);
        const current = totals.get(expense.categoryId) || { amount: 0, count: 0 };
        totals.set(expense.categoryId, {
          amount: current.amount + amountUSD,
          count: current.count + 1,
        });
      }

      return Array.from(totals.entries())
        .map(([categoryId, { amount, count }]) => ({
          categoryId,
          amount,
          count,
          percentage:
            grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0,
        }))
        .sort((a, b) => b.amount - a.amount);
    } catch (error) {
      console.error('[calculatorService] calculateCategoryTotals error:', error);
      return [];
    }
  },

  /**
   * Compara con el mes anterior (en USD)
   */
  compareWithLastMonth: (
    expenses: Expense[],
    month: number,
    year: number,
    currentTotalUSD: number
  ): MonthlySummary['vsLastMonth'] => {
    try {
      const lastMonth = month === 1 ? 12 : month - 1;
      const lastYear = month === 1 ? year - 1 : year;

      // Filtrar gastos del mes anterior
      const lastMonthExpenses = expenses.filter((e) => {
        const d = new Date(e.date);
        return (
          d.getMonth() + 1 === lastMonth &&
          d.getFullYear() === lastYear
        );
      });

      // Calcular total del mes anterior en USD
      const lastTotalUSD = lastMonthExpenses.reduce((sum, e) => {
        return sum + convertToUSD(e.amount, e.currency);
      }, 0);

      const diff = currentTotalUSD - lastTotalUSD;
      const percentage =
        lastTotalUSD > 0 ? Math.round((diff / lastTotalUSD) * 100) : 0;

      let trend: 'up' | 'down' | 'stable';
      if (diff > 0) {
        trend = 'up';
      } else if (diff < 0) {
        trend = 'down';
      } else {
        trend = 'stable';
      }

      return {
        amount: diff,
        percentage,
        trend,
      };
    } catch (error) {
      console.error('[calculatorService] compareWithLastMonth error:', error);
      return {
        amount: 0,
        percentage: 0,
        trend: 'stable',
      };
    }
  },

  /**
   * Calcula estadísticas diarias (en USD)
   */
  calculateDailyStats: (
    expenses: Expense[],
    month: number,
    year: number
  ): DailyStats[] => {
    try {
      const daysInMonth = new Date(year, month, 0).getDate();
      const dailyMap = new Map<string, { amount: number; count: number }>();

      // Inicializar todos los días del mes
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dailyMap.set(dateKey, { amount: 0, count: 0 });
      }

      // Agregar gastos (convertidos a USD)
      for (const expense of expenses) {
        const d = new Date(expense.date);
        if (d.getMonth() + 1 === month && d.getFullYear() === year) {
          const dateKey = d.toISOString().split('T')[0];
          const current = dailyMap.get(dateKey) || { amount: 0, count: 0 };
          const amountUSD = convertToUSD(expense.amount, expense.currency);
          dailyMap.set(dateKey, {
            amount: current.amount + amountUSD,
            count: current.count + 1,
          });
        }
      }

      return Array.from(dailyMap.entries())
        .map(([dateStr, { amount, count }]) => ({
          date: new Date(dateStr),
          amount,
          count,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());
    } catch (error) {
      console.error('[calculatorService] calculateDailyStats error:', error);
      return [];
    }
  },

  /**
   * Calcula el total de gastos (en USD)
   */
  calculateTotal: (expenses: Expense[]): number => {
    return expenses.reduce((sum, e) => sum + convertToUSD(e.amount, e.currency), 0);
  },

  /**
   * Calcula el promedio de gastos (en USD)
   */
  calculateAverage: (expenses: Expense[]): number => {
    if (expenses.length === 0) return 0;
    return Math.round(calculatorService.calculateTotal(expenses) / expenses.length);
  },

  /**
   * Obtiene la tasa de cambio actual
   */
  getExchangeRate: (): number => {
    return EXCHANGE_RATE_COP_TO_USD;
  },
};
