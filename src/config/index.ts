/**
 * Configuration - Application settings and constants
 * @see architect.md - Config layer
 */

export {
  CATEGORIES,
  CategoryId,
  getCategoryById,
  getCategoryByName,
} from './categories.config';

export {
  CURRENCIES,
  DEFAULT_CURRENCY,
  EXCHANGE_RATE_COP_TO_USD,
  AMOUNT_LIMITS,
  convertToUSD,
  convertToCOP,
  formatCurrency,
  formatUSD,
  isValidAmount,
  getExchangeRateLabel,
} from './currencies.config';
