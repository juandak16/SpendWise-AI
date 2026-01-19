/**
 * Servicio de parsing de gastos desde lenguaje natural
 * @see analyst.md - Sección "Ingreso de Gastos en Lenguaje Natural"
 * @see coder.md - Manejo de errores con try/catch
 */

import type { ParsedExpense, CurrencyCode } from '@/types';
import { DEFAULT_CURRENCY, AMOUNT_LIMITS, isValidAmount } from '@/config';
import { categorizerService } from './categorizer.service';

/**
 * Error personalizado para el parser de gastos
 */
export class ExpenseParserError extends Error {
  constructor(
    message: string,
    public readonly code: 'EMPTY_INPUT' | 'INVALID_AMOUNT' | 'AMOUNT_EXCEEDED' | 'PARSE_FAILED'
  ) {
    super(message);
    this.name = 'ExpenseParserError';
  }
}

/**
 * Patrones para detectar montos
 */
const AMOUNT_PATTERNS = {
  // "150.000" o "80.000" (miles con punto - formato colombiano)
  withThousandsDot: /(\d{1,3}(?:\.\d{3})+)/g,
  // "1,500" o "80,000" (miles con coma - formato USD)
  withThousandsComma: /(\d{1,3}(?:,\d{3})+)/g,
  // "25.99" o "25,99" (decimales - 1 o 2 dígitos después del separador)
  decimal: /(\d+[.,]\d{1,2})(?!\d)/g,
  // Cualquier número (150000, 80000, 150, etc)
  simple: /(\d+)/g,
};

/**
 * Patrones para detectar moneda
 */
const CURRENCY_PATTERNS = {
  USD: /(?:^|\s|\d)(usd|dolar|dolares|dollars?|us\$)(?:\s|$|[^\w])/i,
  COP: /\b(cop|pesos?|colombiano)\b/i,
};

/**
 * Patrones para detectar fechas relativas
 */
const DATE_PATTERNS = {
  ayer: /\bayer\b/i,
  anteayer: /\banteayer\b|ante\s*ayer\b/i,
  hoy: /\bhoy\b/i,
};

/**
 * Palabras a ignorar al extraer descripción
 */
const NOISE_WORDS = new Set([
  'gaste', 'gasté', 'pague', 'pagué', 'compre', 'compré',
  'fueron', 'costo', 'costó', 'de', 'en', 'el', 'la', 'los', 'las',
  'un', 'una', 'unos', 'unas', 'por', 'para', 'con', 'al',
  'pesos', 'peso', 'dolares', 'dolar', 'usd', 'cop', 'colombiano',
  'ayer', 'hoy', 'anteayer', 'mensual', 'semanal',
]);

/**
 * Servicio de parsing de gastos desde lenguaje natural
 */
export const expenseParserService = {
  /**
   * Parsea una entrada de lenguaje natural a un objeto estructurado
   * @throws {ExpenseParserError} Si la entrada es inválida
   */
  parse: (input: string): ParsedExpense => {
    try {
      // 1. Validar entrada
      const trimmedInput = input.trim();
      if (!trimmedInput) {
        throw new ExpenseParserError(
          'El texto no puede estar vacío',
          'EMPTY_INPUT'
        );
      }

      const normalizedInput = trimmedInput.toLowerCase();

      // 2. Detectar moneda
      const currency = expenseParserService.detectCurrency(normalizedInput);

      // 3. Extraer monto
      const amount = expenseParserService.extractAmount(trimmedInput, currency);

      if (amount <= 0) {
        throw new ExpenseParserError(
          'No se pudo detectar un monto válido',
          'INVALID_AMOUNT'
        );
      }

      // 4. Validar límites
      if (!isValidAmount(amount, currency)) {
        const limits = AMOUNT_LIMITS[currency];
        throw new ExpenseParserError(
          `El monto debe estar entre ${limits.min} y ${limits.max.toLocaleString()} ${currency}`,
          'AMOUNT_EXCEEDED'
        );
      }

      // 5. Extraer descripción
      const description = expenseParserService.extractDescription(trimmedInput);

      // 6. Detectar fecha
      const date = expenseParserService.extractDate(normalizedInput);

      // 7. Categorizar
      const categorization = categorizerService.categorize(description);

      return {
        amount,
        currency,
        categoryId: categorization.categoryId,
        description: description || 'Gasto',
        date,
        confidence: categorization.confidence,
        suggestedCategories: categorization.suggestions,
      };
    } catch (error) {
      if (error instanceof ExpenseParserError) {
        throw error;
      }

      console.error('[expenseParserService] Error:', error);
      throw new ExpenseParserError(
        'Error al procesar el gasto. Verifica el formato.',
        'PARSE_FAILED'
      );
    }
  },

  /**
   * Detecta la moneda basándose en el texto
   * Prioridad: USD explícito > COP explícito > DEFAULT_CURRENCY
   */
  detectCurrency: (input: string): CurrencyCode => {
    // Si menciona USD explícitamente
    if (CURRENCY_PATTERNS.USD.test(input)) {
      return 'USD';
    }
    // Si menciona COP/pesos explícitamente
    if (CURRENCY_PATTERNS.COP.test(input)) {
      return 'COP';
    }
    // Default
    return DEFAULT_CURRENCY;
  },

  /**
   * Extrae el monto numérico del texto
   */
  extractAmount: (input: string, currency: CurrencyCode): number => {
    // Limpiar símbolos de moneda
    let cleaned = input.replace(/\$|US\$|COP/gi, '');

    // Para COP: buscar formato con puntos como separador de miles (80.000)
    if (currency === 'COP') {
      const withThousands = cleaned.match(AMOUNT_PATTERNS.withThousandsDot);
      if (withThousands && withThousands.length > 0) {
        // Convertir "80.000" -> 80000
        const amountStr = withThousands[0].replace(/\./g, '');
        return parseInt(amountStr, 10);
      }
    }

    // Para USD: buscar formato con comas como separador de miles (1,500)
    if (currency === 'USD') {
      const withThousands = cleaned.match(AMOUNT_PATTERNS.withThousandsComma);
      if (withThousands && withThousands.length > 0) {
        const amountStr = withThousands[0].replace(/,/g, '');
        return Math.round(parseFloat(amountStr) * 100); // Convertir a centavos
      }

      // Buscar decimales (25.99)
      const decimals = cleaned.match(AMOUNT_PATTERNS.decimal);
      if (decimals && decimals.length > 0) {
        return Math.round(parseFloat(decimals[0]) * 100); // Convertir a centavos
      }
    }

    // Fallback: buscar número simple (80000, 150, etc)
    const simpleMatches = cleaned.match(AMOUNT_PATTERNS.simple);
    if (simpleMatches && simpleMatches.length > 0) {
      // Tomar el número más grande (probablemente es el monto)
      const amounts = simpleMatches.map((m) => parseInt(m, 10));
      const maxAmount = Math.max(...amounts);
      
      if (currency === 'USD') {
        // Para USD: asumir que números < 10000 son dólares enteros
        // (nadie escribe "80000" queriendo decir 800 dólares)
        return maxAmount * 100; // Convertir a centavos
      }
      
      // Para COP: el número ya está en pesos
      return maxAmount;
    }

    return 0;
  },

  /**
   * Extrae palabras clave para la descripción
   */
  extractDescription: (input: string): string => {
    const words = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => {
        // Filtrar palabras de ruido y números
        return (
          word.length >= 2 && // Permitir palabras de 2+ caracteres (como "gas")
          !NOISE_WORDS.has(word) &&
          !/^\d+$/.test(word)
        );
      });

    // Retornar las primeras 3-4 palabras relevantes
    return words.slice(0, 4).join(' ');
  },

  /**
   * Extrae la fecha del texto o retorna la fecha actual
   */
  extractDate: (input: string): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (DATE_PATTERNS.anteayer.test(input)) {
      const anteayer = new Date(today);
      anteayer.setDate(anteayer.getDate() - 2);
      return anteayer;
    }

    if (DATE_PATTERNS.ayer.test(input)) {
      const ayer = new Date(today);
      ayer.setDate(ayer.getDate() - 1);
      return ayer;
    }

    // Por defecto: hoy
    return today;
  },
};
