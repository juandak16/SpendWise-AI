import type { CurrencyConfig, CurrencyCode, CurrencyMap } from '@/types';

/**
 * Configuración de monedas soportadas
 * @see analyst.md - Monedas: COP y USD
 */
export const CURRENCIES: CurrencyMap = {
  COP: {
    code: 'COP',
    symbol: 'COP ',
    name: 'Peso Colombiano',
    decimals: 0,
    thousandsSep: '.',
    decimalSep: ',',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'Dólar Estadounidense',
    decimals: 2,
    thousandsSep: ',',
    decimalSep: '.',
  },
} as const;

/**
 * Moneda base para reportes y totales
 */
export const BASE_CURRENCY: CurrencyCode = 'USD';

/**
 * Moneda por defecto para nuevos gastos
 */
export const DEFAULT_CURRENCY: CurrencyCode = 'USD';

/**
 * Tipo de cambio: COP por 1 USD
 */
export const EXCHANGE_RATE_COP_TO_USD = 3700;

/**
 * Convierte un monto de una moneda a USD
 * @param amount - Monto en la moneda original (COP en pesos, USD en centavos)
 * @param fromCurrency - Moneda de origen
 * @returns Monto en centavos de USD
 */
export const convertToUSD = (amount: number, fromCurrency: CurrencyCode): number => {
  if (fromCurrency === 'USD') {
    return amount; // Ya está en centavos USD
  }
  
  // COP a USD: dividir por tasa de cambio y convertir a centavos
  const usdAmount = amount / EXCHANGE_RATE_COP_TO_USD;
  return Math.round(usdAmount * 100); // Retornar en centavos
};

/**
 * Convierte un monto de USD a otra moneda
 * @param amountInCentsUSD - Monto en centavos de USD
 * @param toCurrency - Moneda de destino
 * @returns Monto en la moneda de destino
 */
export const convertFromUSD = (amountInCentsUSD: number, toCurrency: CurrencyCode): number => {
  if (toCurrency === 'USD') {
    return amountInCentsUSD;
  }
  
  // USD a COP: multiplicar por tasa de cambio
  const usdAmount = amountInCentsUSD / 100;
  return Math.round(usdAmount * EXCHANGE_RATE_COP_TO_USD);
};

/**
 * Formatea la tasa de cambio para mostrar
 */
export const getExchangeRateLabel = (): string => {
  return `1 USD = ${EXCHANGE_RATE_COP_TO_USD.toLocaleString('es-CO')} COP`;
};

/**
 * Límites de monto por moneda
 */
export const AMOUNT_LIMITS: Record<CurrencyCode, { min: number; max: number }> = {
  COP: {
    min: 1,
    max: 50_000_000,
  },
  USD: {
    min: 0.01,
    max: 10_000,
  },
} as const;

/**
 * Obtiene la configuración de una moneda
 */
export const getCurrencyConfig = (code: CurrencyCode): CurrencyConfig => {
  return CURRENCIES[code];
};

/**
 * Formatea un monto según la configuración de su moneda
 */
export const formatCurrency = (amount: number, code: CurrencyCode): string => {
  const config = CURRENCIES[code];
  
  // Para COP, el amount ya está en pesos
  // Para USD, el amount está en centavos
  const displayAmount = code === 'USD' ? amount / 100 : amount;
  
  const formatted = new Intl.NumberFormat(code === 'COP' ? 'es-CO' : 'en-US', {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(displayAmount);

  return `${config.symbol}${formatted}`;
};

/**
 * Formatea un monto en USD (recibe centavos)
 */
export const formatUSD = (amountInCents: number): string => {
  const displayAmount = amountInCents / 100;
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(displayAmount);
  return `$${formatted}`;
};

/**
 * Parsea un string de monto a número según la moneda
 */
export const parseAmountString = (value: string, code: CurrencyCode): number => {
  let cleaned = value.replace(/[^\d.,]/g, '');
  
  if (code === 'COP') {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else {
    cleaned = cleaned.replace(/,/g, '');
  }
  
  const parsed = parseFloat(cleaned);
  
  if (isNaN(parsed)) {
    return 0;
  }
  
  if (code === 'USD') {
    return Math.round(parsed * 100);
  }
  
  return Math.round(parsed);
};

/**
 * Valida si un monto está dentro de los límites permitidos
 */
export const isValidAmount = (amount: number, code: CurrencyCode): boolean => {
  const limits = AMOUNT_LIMITS[code];
  const displayAmount = code === 'USD' ? amount / 100 : amount;
  return displayAmount >= limits.min && displayAmount <= limits.max;
};
