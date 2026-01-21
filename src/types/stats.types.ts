/**
 * Monthly expense summary
 * @see analyst.md - Required metrics
 */
export interface MonthlySummary {
  readonly month: number;            // 1-12
  readonly year: number;
  readonly totalAmount: number;      // In USD (cents)
  readonly transactionCount: number;
  readonly dailyAverage: number;
  readonly projectedTotal: number;   // Month-end projection
  readonly categoryBreakdown: CategoryBreakdown[];
  readonly topCategory: {
    categoryId: number;
    percentage: number;
  };
  readonly vsLastMonth: {
    amount: number;
    percentage: number;
    trend: 'up' | 'down' | 'same';
  };
}

/**
 * Category totals grouped
 */
export interface CategoryTotal {
  readonly categoryId: number;
  readonly amount: number;
  readonly count: number;
  readonly percentage: number;       // Of monthly total
}

/**
 * Daily statistics for charts
 */
export interface DailyStats {
  readonly date: Date;
  readonly amount: number;
  readonly count: number;
}

/**
 * Category breakdown for reports
 * @see calculator.service.ts
 */
export interface CategoryBreakdown {
  categoryId: number;
  categoryName: string;
  totalAmount: number;
  percentage: number;
  transactionCount: number;
}
