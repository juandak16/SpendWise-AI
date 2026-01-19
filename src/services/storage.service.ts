/**
 * Servicio de persistencia de datos
 * MVP: localStorage
 * v2: Migrar a SQLite/Postgres
 * @see architect.md - Service Layer
 * @see coder.md - Manejo de errores con try/catch
 */

import type { Expense, Category } from '@/types';

/**
 * Claves de almacenamiento
 */
const STORAGE_KEYS = {
  EXPENSES: 'spendwise_expenses',
  CATEGORIES: 'spendwise_custom_categories',
  USER_KEYWORDS: 'spendwise_user_keywords',
  SETTINGS: 'spendwise_settings',
} as const;

/**
 * Error personalizado para el servicio de almacenamiento
 */
export class StorageError extends Error {
  constructor(
    message: string,
    public readonly code: 'READ_ERROR' | 'WRITE_ERROR' | 'DELETE_ERROR' | 'NOT_FOUND'
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Verifica si localStorage está disponible
 */
const isStorageAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Servicio de persistencia de datos
 */
export const storageService = {
  // ==================== EXPENSES ====================

  /**
   * Obtiene todos los gastos almacenados
   */
  getExpenses: (): Expense[] => {
    try {
      if (!isStorageAvailable()) return [];

      const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      if (!data) return [];

      const parsed = JSON.parse(data);
      
      // Convertir strings de fecha a objetos Date
      return parsed.map((expense: Expense) => ({
        ...expense,
        date: new Date(expense.date),
        createdAt: new Date(expense.createdAt),
        updatedAt: new Date(expense.updatedAt),
      }));
    } catch (error) {
      console.error('[storageService] getExpenses error:', error);
      return [];
    }
  },

  /**
   * Guarda un nuevo gasto
   */
  saveExpense: (expense: Expense): void => {
    try {
      if (!isStorageAvailable()) {
        throw new StorageError('localStorage no disponible', 'WRITE_ERROR');
      }

      const expenses = storageService.getExpenses();
      expenses.push(expense);
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (error) {
      if (error instanceof StorageError) throw error;
      console.error('[storageService] saveExpense error:', error);
      throw new StorageError('No se pudo guardar el gasto', 'WRITE_ERROR');
    }
  },

  /**
   * Actualiza un gasto existente
   */
  updateExpense: (id: string, updates: Partial<Expense>): Expense | null => {
    try {
      if (!isStorageAvailable()) {
        throw new StorageError('localStorage no disponible', 'WRITE_ERROR');
      }

      const expenses = storageService.getExpenses();
      const index = expenses.findIndex((e) => e.id === id);

      if (index === -1) {
        throw new StorageError('Gasto no encontrado', 'NOT_FOUND');
      }

      const updated: Expense = {
        ...expenses[index],
        ...updates,
        updatedAt: new Date(),
      };

      expenses[index] = updated;
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));

      return updated;
    } catch (error) {
      if (error instanceof StorageError) throw error;
      console.error('[storageService] updateExpense error:', error);
      throw new StorageError('No se pudo actualizar el gasto', 'WRITE_ERROR');
    }
  },

  /**
   * Elimina un gasto
   */
  deleteExpense: (id: string): boolean => {
    try {
      if (!isStorageAvailable()) {
        throw new StorageError('localStorage no disponible', 'DELETE_ERROR');
      }

      const expenses = storageService.getExpenses();
      const filtered = expenses.filter((e) => e.id !== id);

      if (filtered.length === expenses.length) {
        return false; // No se encontró el gasto
      }

      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('[storageService] deleteExpense error:', error);
      throw new StorageError('No se pudo eliminar el gasto', 'DELETE_ERROR');
    }
  },

  /**
   * Obtiene un gasto por ID
   */
  getExpenseById: (id: string): Expense | null => {
    try {
      const expenses = storageService.getExpenses();
      return expenses.find((e) => e.id === id) || null;
    } catch (error) {
      console.error('[storageService] getExpenseById error:', error);
      return null;
    }
  },

  // ==================== CUSTOM CATEGORIES ====================

  /**
   * Obtiene categorías personalizadas del usuario
   */
  getCustomCategories: (): Category[] => {
    try {
      if (!isStorageAvailable()) return [];

      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) return [];

      const parsed = JSON.parse(data);
      return parsed.map((cat: Category) => ({
        ...cat,
        createdAt: new Date(cat.createdAt),
      }));
    } catch (error) {
      console.error('[storageService] getCustomCategories error:', error);
      return [];
    }
  },

  /**
   * Guarda una categoría personalizada
   */
  saveCustomCategory: (category: Category): void => {
    try {
      if (!isStorageAvailable()) {
        throw new StorageError('localStorage no disponible', 'WRITE_ERROR');
      }

      const categories = storageService.getCustomCategories();
      categories.push(category);
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (error) {
      if (error instanceof StorageError) throw error;
      console.error('[storageService] saveCustomCategory error:', error);
      throw new StorageError('No se pudo guardar la categoría', 'WRITE_ERROR');
    }
  },

  /**
   * Elimina una categoría personalizada
   */
  deleteCustomCategory: (id: number): boolean => {
    try {
      if (!isStorageAvailable()) {
        throw new StorageError('localStorage no disponible', 'DELETE_ERROR');
      }

      const categories = storageService.getCustomCategories();
      const filtered = categories.filter((c) => c.id !== id);

      if (filtered.length === categories.length) {
        return false;
      }

      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('[storageService] deleteCustomCategory error:', error);
      throw new StorageError('No se pudo eliminar la categoría', 'DELETE_ERROR');
    }
  },

  // ==================== USER KEYWORDS (Aprendizaje) ====================

  /**
   * Guarda una asociación palabra-categoría aprendida
   */
  saveUserKeyword: (keyword: string, categoryId: number): void => {
    try {
      if (!isStorageAvailable()) return;

      const data = localStorage.getItem(STORAGE_KEYS.USER_KEYWORDS);
      const keywords: Record<string, number> = data ? JSON.parse(data) : {};

      keywords[keyword.toLowerCase()] = categoryId;
      localStorage.setItem(STORAGE_KEYS.USER_KEYWORDS, JSON.stringify(keywords));
    } catch (error) {
      console.error('[storageService] saveUserKeyword error:', error);
    }
  },

  /**
   * Obtiene las asociaciones palabra-categoría aprendidas
   */
  getUserKeywords: (): Record<string, number> => {
    try {
      if (!isStorageAvailable()) return {};

      const data = localStorage.getItem(STORAGE_KEYS.USER_KEYWORDS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('[storageService] getUserKeywords error:', error);
      return {};
    }
  },

  // ==================== UTILITIES ====================

  /**
   * Limpia todos los datos almacenados
   * ⚠️ Usar con precaución
   */
  clearAll: (): void => {
    try {
      if (!isStorageAvailable()) return;

      localStorage.removeItem(STORAGE_KEYS.EXPENSES);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.USER_KEYWORDS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    } catch (error) {
      console.error('[storageService] clearAll error:', error);
    }
  },

  /**
   * Exporta todos los datos como JSON
   */
  exportData: (): string => {
    try {
      const data = {
        expenses: storageService.getExpenses(),
        customCategories: storageService.getCustomCategories(),
        userKeywords: storageService.getUserKeywords(),
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
      };
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('[storageService] exportData error:', error);
      throw new StorageError('No se pudieron exportar los datos', 'READ_ERROR');
    }
  },

  /**
   * Importa datos desde JSON
   */
  importData: (jsonString: string): void => {
    try {
      if (!isStorageAvailable()) {
        throw new StorageError('localStorage no disponible', 'WRITE_ERROR');
      }

      const data = JSON.parse(jsonString);

      if (data.expenses && Array.isArray(data.expenses)) {
        localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(data.expenses));
      }

      if (data.customCategories && Array.isArray(data.customCategories)) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.customCategories));
      }

      if (data.userKeywords && typeof data.userKeywords === 'object') {
        localStorage.setItem(STORAGE_KEYS.USER_KEYWORDS, JSON.stringify(data.userKeywords));
      }
    } catch (error) {
      console.error('[storageService] importData error:', error);
      throw new StorageError('No se pudieron importar los datos', 'WRITE_ERROR');
    }
  },
};
