import type { CurrencyCode } from './currency.types';
import type { Category } from './category.types';

/**
 * Gasto registrado en el sistema
 * @see analyst.md - Interface Expense
 */
export interface Expense {
  readonly id: string;
  readonly amount: number;           // Almacenado en unidad mínima (pesos COP, centavos USD)
  readonly currency: CurrencyCode;
  readonly categoryId: number;
  readonly description: string;
  readonly originalInput: string;    // Texto original del usuario
  readonly date: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly confidence: number;       // 0-1, certeza de categorización
  readonly isManualCategory: boolean; // true si el usuario reasignó la categoría
}

/**
 * Resultado del parsing de lenguaje natural
 * @see analyst.md - Comando *structure-expense
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
 * Input para crear un nuevo gasto
 */
export interface CreateExpenseInput {
  naturalLanguageInput: string;
}

/**
 * Input para actualizar un gasto existente
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
 * Filtros para consultar gastos
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
 * Gasto con su categoría expandida (para UI)
 */
export interface ExpenseWithCategory extends Expense {
  category: Category;
}
