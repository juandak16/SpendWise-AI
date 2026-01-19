/**
 * Códigos de moneda soportados por SpendWise AI
 * @see analyst.md - Sección de monedas (COP y USD)
 */
export type CurrencyCode = 'COP' | 'USD';

/**
 * Configuración de formato para cada moneda
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
 * Mapa de configuraciones de moneda
 */
export type CurrencyMap = Record<CurrencyCode, CurrencyConfig>;
