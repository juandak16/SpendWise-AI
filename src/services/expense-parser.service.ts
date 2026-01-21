/**
 * Expense Parser Service - Natural Language Processing
 * @see analyst.md - "Natural Language Expense Input" section
 * @see dev.md - Error handling with try/catch
 */

import type { ParsedExpense, CurrencyCode } from '@/types';
import { DEFAULT_CURRENCY, AMOUNT_LIMITS, isValidAmount } from '@/config';
import { categorizerService } from './categorizer.service';

/**
 * Custom error for expense parsing failures
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
 * Patterns for amount detection
 */
const AMOUNT_PATTERNS = {
  // "150.000" or "80.000" (thousands with dot - Colombian format)
  withThousandsDot: /(\d{1,3}(?:\.\d{3})+)/g,
  // "1,500" or "80,000" (thousands with comma - USD format)
  withThousandsComma: /(\d{1,3}(?:,\d{3})+)/g,
  // "25.99" or "25,99" (decimals - 1 or 2 digits after separator)
  decimal: /(\d+[.,]\d{1,2})(?!\d)/g,
  // Any number (150000, 80000, 150, etc)
  simple: /(\d+)/g,
};

/**
 * Patterns for currency detection
 */
const CURRENCY_PATTERNS = {
  USD: /(?:^|\s|\d)(usd|dolar|dolares|dollars?|us\$)(?:\s|$|[^\w])/i,
  COP: /\b(cop|pesos?|colombiano)\b/i,
};

/**
 * Patterns for relative date detection
 */
const DATE_PATTERNS = {
  yesterday: /\bayer\b/i,
  dayBeforeYesterday: /\banteayer\b|ante\s*ayer\b/i,
  today: /\bhoy\b/i,
};

/**
 * Noise words to ignore when extracting description
 */
const NOISE_WORDS = new Set([
  'gaste', 'gasté', 'pague', 'pagué', 'compre', 'compré',
  'fueron', 'costo', 'costó', 'de', 'en', 'el', 'la', 'los', 'las',
  'un', 'una', 'unos', 'unas', 'por', 'para', 'con', 'al',
  'pesos', 'peso', 'dolares', 'dolar', 'usd', 'cop', 'colombiano',
  'ayer', 'hoy', 'anteayer', 'mensual', 'semanal',
]);

/**
 * Expense Parser Service - Parses natural language input into structured expense data
 */
export const expenseParserService = {
  /**
   * Parses a natural language input into a structured expense object
   * @throws {ExpenseParserError} If input is invalid
   */
  parse: (input: string): ParsedExpense => {
    try {
      // 1. Validate input
      const trimmedInput = input.trim();
      if (!trimmedInput) {
        throw new ExpenseParserError(
          'El texto no puede estar vacío',
          'EMPTY_INPUT'
        );
      }

      const normalizedInput = trimmedInput.toLowerCase();

      // 2. Detect currency
      const currency = expenseParserService.detectCurrency(normalizedInput);

      // 3. Extract amount
      const amount = expenseParserService.extractAmount(trimmedInput, currency);

      if (amount <= 0) {
        throw new ExpenseParserError(
          'No se pudo detectar un monto válido',
          'INVALID_AMOUNT'
        );
      }

      // 4. Validate limits
      if (!isValidAmount(amount, currency)) {
        const limits = AMOUNT_LIMITS[currency];
        throw new ExpenseParserError(
          `El monto debe estar entre ${limits.min} y ${limits.max.toLocaleString()} ${currency}`,
          'AMOUNT_EXCEEDED'
        );
      }

      // 5. Extract description
      const description = expenseParserService.extractDescription(trimmedInput);

      // 6. Detect date
      const date = expenseParserService.extractDate(normalizedInput);

      // 7. Categorize
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
   * Detects currency based on text content
   * Priority: Explicit USD > Explicit COP > DEFAULT_CURRENCY
   */
  detectCurrency: (input: string): CurrencyCode => {
    // If USD is explicitly mentioned
    if (CURRENCY_PATTERNS.USD.test(input)) {
      return 'USD';
    }
    // If COP/pesos is explicitly mentioned
    if (CURRENCY_PATTERNS.COP.test(input)) {
      return 'COP';
    }
    // Default currency
    return DEFAULT_CURRENCY;
  },

  /**
   * Extracts the numeric amount from text
   */
  extractAmount: (input: string, currency: CurrencyCode): number => {
    // Clean currency symbols
    let cleaned = input.replace(/\$|US\$|COP/gi, '');

    // For COP: Look for dot-separated thousands format (80.000)
    if (currency === 'COP') {
      const withThousands = cleaned.match(AMOUNT_PATTERNS.withThousandsDot);
      if (withThousands && withThousands.length > 0) {
        // Convert "80.000" -> 80000
        const amountStr = withThousands[0].replace(/\./g, '');
        return parseInt(amountStr, 10);
      }
    }

    // For USD: Look for comma-separated thousands format (1,500)
    if (currency === 'USD') {
      const withThousands = cleaned.match(AMOUNT_PATTERNS.withThousandsComma);
      if (withThousands && withThousands.length > 0) {
        const amountStr = withThousands[0].replace(/,/g, '');
        return Math.round(parseFloat(amountStr) * 100); // Convert to cents
      }

      // Look for decimals (25.99)
      const decimals = cleaned.match(AMOUNT_PATTERNS.decimal);
      if (decimals && decimals.length > 0) {
        return Math.round(parseFloat(decimals[0]) * 100); // Convert to cents
      }
    }

    // Fallback: Look for simple numbers (80000, 150, etc)
    const simpleMatches = cleaned.match(AMOUNT_PATTERNS.simple);
    if (simpleMatches && simpleMatches.length > 0) {
      // Take the largest number (most likely the amount)
      const amounts = simpleMatches.map((m) => parseInt(m, 10));
      const maxAmount = Math.max(...amounts);

      if (currency === 'USD') {
        // For USD: Assume numbers < 10000 are whole dollars
        // (nobody writes "80000" meaning 800 dollars)
        return maxAmount * 100; // Convert to cents
      }

      // For COP: The number is already in pesos
      return maxAmount;
    }

    return 0;
  },

  /**
   * Extracts keywords for the description
   */
  extractDescription: (input: string): string => {
    const words = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => {
        // Filter noise words and numbers
        return (
          word.length >= 2 && // Allow 2+ character words (like "gas")
          !NOISE_WORDS.has(word) &&
          !/^\d+$/.test(word)
        );
      });

    // Return the first 3-4 relevant words
    return words.slice(0, 4).join(' ');
  },

  /**
   * Extracts the date from text or returns current date
   */
  extractDate: (input: string): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (DATE_PATTERNS.dayBeforeYesterday.test(input)) {
      const dayBeforeYesterday = new Date(today);
      dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
      return dayBeforeYesterday;
    }

    if (DATE_PATTERNS.yesterday.test(input)) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    }

    // Default: today
    return today;
  },
};
