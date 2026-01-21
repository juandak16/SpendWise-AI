/**
 * Calculator Service - Financial calculations
 * @see architect.md - Service Layer
 * @see analyst.md - Fixed-point arithmetic requirement
 */

import type { Expense, MonthlySummary, CategoryBreakdown } from '@/types';
import { CATEGORIES, convertToUSD } from '@/config';

/**
 * Gets the number of days in a specific month
 */
const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

/**
 * Filters expenses for a specific month
 */
const filterExpensesByMonth = (
  expenses: Expense[],
  month: number,
  year: number
): Expense[] => {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year
    );
  });
};

/**
 * Calculator Service - Financial calculations and statistics
 */
export const calculatorService = {
  /**
   * Calculates the total amount for an array of expenses (converted to USD)
   */
  calculateTotal: (expenses: Expense[]): number => {
    return expenses.reduce((sum, expense) => {
      // Convert each expense to USD before summing
      const amountInUSD = convertToUSD(expense.amount, expense.currency);
      return sum + amountInUSD;
    }, 0);
  },

  /**
   * Calculates category breakdown for a set of expenses
   */
  calculateCategoryBreakdown: (expenses: Expense[]): CategoryBreakdown[] => {
    // Calculate totals per category
    const categoryTotals = new Map<number, number>();

    for (const expense of expenses) {
      const current = categoryTotals.get(expense.categoryId) || 0;
      const amountInUSD = convertToUSD(expense.amount, expense.currency);
      categoryTotals.set(expense.categoryId, current + amountInUSD);
    }

    // Calculate overall total
    const total = Array.from(categoryTotals.values()).reduce((a, b) => a + b, 0);

    // Build breakdown
    const breakdown: CategoryBreakdown[] = [];

    for (const [categoryId, amount] of categoryTotals) {
      const category = CATEGORIES.find((c) => c.id === categoryId);
      breakdown.push({
        categoryId,
        categoryName: category?.name || 'Otros',
        totalAmount: amount,
        percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
        transactionCount: expenses.filter((e) => e.categoryId === categoryId).length,
      });
    }

    // Sort by total amount (descending)
    return breakdown.sort((a, b) => b.totalAmount - a.totalAmount);
  },

  /**
   * Calculates the complete monthly summary (all amounts in USD)
   */
  calculateMonthlySummary: (
    expenses: Expense[],
    month: number,
    year: number
  ): MonthlySummary => {
    const currentMonthExpenses = filterExpensesByMonth(expenses, month, year);
    const totalAmount = calculatorService.calculateTotal(currentMonthExpenses);
    const transactionCount = currentMonthExpenses.length;

    // Days elapsed in current month
    const today = new Date();
    const isCurrentMonth =
      today.getMonth() + 1 === month && today.getFullYear() === year;
    const daysElapsed = isCurrentMonth ? today.getDate() : getDaysInMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);

    // Daily average
    const dailyAverage = daysElapsed > 0 ? Math.round(totalAmount / daysElapsed) : 0;

    // Month-end projection
    const projectedTotal = Math.round(dailyAverage * daysInMonth);

    // Category breakdown
    const categoryBreakdown = calculatorService.calculateCategoryBreakdown(
      currentMonthExpenses
    );
    const topCategory = categoryBreakdown[0] || {
      categoryId: 0,
      categoryName: 'N/A',
      totalAmount: 0,
      percentage: 0,
      transactionCount: 0,
    };

    // Comparison with previous month
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonthExpenses = filterExpensesByMonth(expenses, prevMonth, prevYear);
    const prevMonthTotal = calculatorService.calculateTotal(prevMonthExpenses);

    let vsLastMonth = {
      amount: 0,
      percentage: 0,
      trend: 'same' as const,
    };

    if (prevMonthTotal > 0) {
      const difference = totalAmount - prevMonthTotal;
      const percentageChange = Math.round((difference / prevMonthTotal) * 100);
      vsLastMonth = {
        amount: Math.abs(difference),
        percentage: Math.abs(percentageChange),
        trend: difference > 0 ? 'up' : difference < 0 ? 'down' : 'same',
      };
    }

    return {
      month,
      year,
      totalAmount,
      transactionCount,
      dailyAverage,
      projectedTotal,
      categoryBreakdown,
      topCategory: {
        categoryId: topCategory.categoryId,
        percentage: topCategory.percentage,
      },
      vsLastMonth,
    };
  },

  /**
   * Calculates cumulative totals over time
   */
  calculateCumulativeTotal: (
    expenses: Expense[],
    startDate: Date,
    endDate: Date
  ): { date: string; total: number }[] => {
    const sortedExpenses = [...expenses]
      .filter((e) => {
        const date = new Date(e.date);
        return date >= startDate && date <= endDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let cumulativeTotal = 0;
    const result: { date: string; total: number }[] = [];

    for (const expense of sortedExpenses) {
      const amountInUSD = convertToUSD(expense.amount, expense.currency);
      cumulativeTotal += amountInUSD;
      result.push({
        date: new Date(expense.date).toISOString().split('T')[0],
        total: cumulativeTotal,
      });
    }

    return result;
  },
};
