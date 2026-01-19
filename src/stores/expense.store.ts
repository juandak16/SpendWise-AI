/**
 * Store de gastos con Zustand
 * @see architect.md - Stores
 * @see coder.md - Patrón de Errores en Stores (3.3)
 */

import { create } from 'zustand';
import { toast } from 'sonner';

import type { Expense, ParsedExpense, MonthlySummary } from '@/types';

import {
  storageService,
  StorageError,
  expenseParserService,
  ExpenseParserError,
  calculatorService,
} from '@/services';

/**
 * Estado del store de gastos
 */
interface ExpenseState {
  // Estado
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;

  // Acciones
  loadExpenses: () => void;
  addExpenseFromInput: (input: string) => boolean;
  updateExpense: (id: string, updates: Partial<Expense>) => boolean;
  deleteExpense: (id: string) => boolean;
  clearError: () => void;

  // Selectores (ahora sin parámetro de currency - todo en USD)
  getMonthlySummary: (month: number, year: number) => MonthlySummary;
  getExpensesByCategory: (categoryId: number) => Expense[];
  getExpensesByDateRange: (startDate: Date, endDate: Date) => Expense[];
}

/**
 * Genera un ID único para gastos
 */
const generateExpenseId = (): string => {
  return `exp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Store de gastos
 */
export const useExpenseStore = create<ExpenseState>((set, get) => ({
  // ==================== ESTADO INICIAL ====================
  expenses: [],
  isLoading: false,
  error: null,

  // ==================== ACCIONES ====================

  loadExpenses: () => {
    try {
      set({ isLoading: true, error: null });
      const expenses = storageService.getExpenses();
      set({ expenses, isLoading: false });
    } catch (error) {
      const message = 'No se pudieron cargar los gastos';
      console.error('[useExpenseStore] loadExpenses error:', error);
      set({ error: message, isLoading: false });
      toast.error('Error al cargar gastos', { description: message });
    }
  },

  addExpenseFromInput: (input: string): boolean => {
    try {
      set({ isLoading: true, error: null });

      const parsed: ParsedExpense = expenseParserService.parse(input);

      const now = new Date();
      const expense: Expense = {
        id: generateExpenseId(),
        amount: parsed.amount,
        currency: parsed.currency,
        categoryId: parsed.categoryId,
        description: parsed.description,
        originalInput: input.trim(),
        date: parsed.date,
        createdAt: now,
        updatedAt: now,
        confidence: parsed.confidence,
        isManualCategory: false,
      };

      storageService.saveExpense(expense);

      set((state) => ({
        expenses: [...state.expenses, expense],
        isLoading: false,
        error: null,
      }));

      toast.success('¡Gasto registrado!', {
        description: `${parsed.description} registrado correctamente`,
      });

      return true;
    } catch (error) {
      let message = 'Error desconocido al registrar el gasto';

      if (error instanceof ExpenseParserError) {
        message = error.message;
      } else if (error instanceof StorageError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      console.error('[useExpenseStore] addExpenseFromInput error:', error);
      set({ error: message, isLoading: false });
      toast.error('No se pudo registrar el gasto', { description: message });

      return false;
    }
  },

  updateExpense: (id: string, updates: Partial<Expense>): boolean => {
    try {
      set({ isLoading: true, error: null });

      const updated = storageService.updateExpense(id, updates);

      if (!updated) {
        throw new Error('No se encontró el gasto');
      }

      set((state) => ({
        expenses: state.expenses.map((e) =>
          e.id === id ? { ...e, ...updates, updatedAt: new Date() } : e
        ),
        isLoading: false,
        error: null,
      }));

      toast.success('Gasto actualizado');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar';
      console.error('[useExpenseStore] updateExpense error:', error);
      set({ error: message, isLoading: false });
      toast.error('No se pudo actualizar el gasto', { description: message });
      return false;
    }
  },

  deleteExpense: (id: string): boolean => {
    try {
      const deleted = storageService.deleteExpense(id);

      if (!deleted) {
        throw new Error('No se encontró el gasto');
      }

      set((state) => ({
        expenses: state.expenses.filter((e) => e.id !== id),
      }));

      toast.success('Gasto eliminado');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar';
      console.error('[useExpenseStore] deleteExpense error:', error);
      toast.error('No se pudo eliminar el gasto', { description: message });
      return false;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  // ==================== SELECTORES ====================

  /**
   * Obtiene el resumen mensual (todo convertido a USD)
   */
  getMonthlySummary: (month: number, year: number): MonthlySummary => {
    const { expenses } = get();
    return calculatorService.calculateMonthlySummary(expenses, month, year);
  },

  getExpensesByCategory: (categoryId: number): Expense[] => {
    const { expenses } = get();
    return expenses.filter((e) => e.categoryId === categoryId);
  },

  getExpensesByDateRange: (startDate: Date, endDate: Date): Expense[] => {
    const { expenses } = get();
    return expenses.filter((e) => {
      const expenseDate = new Date(e.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  },
}));

/**
 * Selectores standalone
 */
export const expenseSelectors = {
  getExpenses: () => useExpenseStore.getState().expenses,
  getExpenseById: (id: string) =>
    useExpenseStore.getState().expenses.find((e) => e.id === id),
  getExpenseCount: () => useExpenseStore.getState().expenses.length,
  isEmpty: () => useExpenseStore.getState().expenses.length === 0,
};
