/**
 * Storage Service - localStorage persistence
 * @see architect.md - Service Layer
 * @see dev.md - Error handling patterns
 */

import type { Expense } from '@/types';

const STORAGE_KEYS = {
  EXPENSES: 'spendwise_expenses',
  SETTINGS: 'spendwise_settings',
} as const;

/**
 * Custom error for storage failures
 */
export class StorageError extends Error {
  constructor(
    message: string,
    public readonly code: 'READ_ERROR' | 'WRITE_ERROR' | 'NOT_FOUND'
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Checks if localStorage is available
 */
const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Storage Service - localStorage persistence layer
 */
export const storageService = {
  /**
   * Retrieves all expenses from storage
   * @throws {StorageError} If read fails
   */
  getExpenses: (): Expense[] => {
    try {
      if (!isStorageAvailable()) {
        console.warn('[storageService] localStorage not available');
        return [];
      }

      const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      if (!data) return [];

      const parsed = JSON.parse(data) as Expense[];

      // Validate and convert dates
      return parsed.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
        createdAt: new Date(expense.createdAt),
        updatedAt: new Date(expense.updatedAt),
      }));
    } catch (error) {
      console.error('[storageService] Error reading expenses:', error);
      throw new StorageError('Error al leer los gastos guardados', 'READ_ERROR');
    }
  },

  /**
   * Saves a new expense to storage
   * @throws {StorageError} If write fails
   */
  saveExpense: (expense: Expense): void => {
    try {
      if (!isStorageAvailable()) {
        throw new StorageError('Almacenamiento no disponible', 'WRITE_ERROR');
      }

      const expenses = storageService.getExpenses();
      expenses.push(expense);

      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (error) {
      if (error instanceof StorageError) throw error;
      console.error('[storageService] Error saving expense:', error);
      throw new StorageError('Error al guardar el gasto', 'WRITE_ERROR');
    }
  },

  /**
   * Updates an existing expense
   * @returns The updated expense, or null if not found
   */
  updateExpense: (id: string, updates: Partial<Expense>): Expense | null => {
    try {
      const expenses = storageService.getExpenses();
      const index = expenses.findIndex((e) => e.id === id);

      if (index === -1) return null;

      const updatedExpense: Expense = {
        ...expenses[index],
        ...updates,
        updatedAt: new Date(),
      };

      expenses[index] = updatedExpense;
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));

      return updatedExpense;
    } catch (error) {
      console.error('[storageService] Error updating expense:', error);
      throw new StorageError('Error al actualizar el gasto', 'WRITE_ERROR');
    }
  },

  /**
   * Deletes an expense by ID
   * @returns true if deleted, false if not found
   */
  deleteExpense: (id: string): boolean => {
    try {
      const expenses = storageService.getExpenses();
      const filtered = expenses.filter((e) => e.id !== id);

      if (filtered.length === expenses.length) return false;

      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('[storageService] Error deleting expense:', error);
      throw new StorageError('Error al eliminar el gasto', 'WRITE_ERROR');
    }
  },

  /**
   * Clears all expenses from storage
   */
  clearExpenses: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    } catch (error) {
      console.error('[storageService] Error clearing expenses:', error);
      throw new StorageError('Error al limpiar los gastos', 'WRITE_ERROR');
    }
  },

  /**
   * Exports all expenses as a JSON string (for backup)
   */
  exportData: (): string => {
    const expenses = storageService.getExpenses();
    return JSON.stringify(expenses, null, 2);
  },

  /**
   * Imports expenses from a JSON string (for restore)
   * @throws {StorageError} If import fails
   */
  importData: (jsonData: string): number => {
    try {
      const expenses = JSON.parse(jsonData) as Expense[];

      if (!Array.isArray(expenses)) {
        throw new Error('Invalid data format');
      }

      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
      return expenses.length;
    } catch (error) {
      console.error('[storageService] Error importing data:', error);
      throw new StorageError('Error al importar los datos', 'WRITE_ERROR');
    }
  },
};
