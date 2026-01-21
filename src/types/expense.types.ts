import type { CurrencyCode } from './currency.types';
import type { Category } from './category.types';

/**
 * Expense registered in the system
 * @see analyst.md - Interface Expense
 */
export interface Expense {
  readonly id: string;
  readonly amount: number;           // Stored in minimum unit (COP pesos, USD cents)
  readonly currency: CurrencyCode;
  readonly categoryId: number;
  readonly description: string;
  readonly originalInput: string;    // Original user input text
  readonly date: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly confidence: number;       // 0-1, categorization certainty
  readonly isManualCategory: boolean; // true if user reassigned the category
}

/**
 * Result of natural language parsing
 * @see analyst.md - Command *structure-expense
 */
export interface ParsedExpense {
  amount: number;
  currency: CurrencyCode;
  categoryId: number;
  description: string;
  date: Date;
  confidence: number;
  suggestedCategories?: Array<{
    categoryId: number;
    confidence: number;
  }>;
}

/**
 * Input for creating a new expense
 */
export interface CreateExpenseInput {
  naturalLanguageInput: string;
}

/**
 * Input for updating an existing expense
 */
export interface UpdateExpenseInput {
  id: string;
  amount?: number;
  currency?: CurrencyCode;
  categoryId?: number;
  description?: string;
  date?: Date;
}

/**
 * Filters for querying expenses
 */
export interface ExpenseFilters {
  startDate?: Date;
  endDate?: Date;
  categoryIds?: number[];
  currency?: CurrencyCode;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
}

/**
 * Expense with expanded category (for UI)
 */
export interface ExpenseWithCategory extends Expense {
  category: Category;
}
