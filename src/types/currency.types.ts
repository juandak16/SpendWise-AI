/**
 * Currency codes supported by SpendWise AI
 * @see analyst.md - Currency section (COP and USD)
 */
export type CurrencyCode = 'COP' | 'USD';

/**
 * Format configuration for each currency
 */
export interface CurrencyConfig {
  readonly code: CurrencyCode;
  readonly symbol: string;
  readonly name: string;
  readonly decimals: number;
  readonly thousandsSep: string;
  readonly decimalSep: string;
}

/**
 * Map of currency configurations
 */
export type CurrencyMap = Record<CurrencyCode, CurrencyConfig>;
