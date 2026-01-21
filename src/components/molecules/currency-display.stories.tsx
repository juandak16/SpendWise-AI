import type { Meta, StoryObj } from '@storybook/react';
import { CurrencyDisplay } from './currency-display';

/**
 * 🔬 MOLECULE: CurrencyDisplay Stories
 * Displays formatted currency amounts
 * US-STORY-011
 */

const meta: Meta<typeof CurrencyDisplay> = {
  title: 'Molecules/CurrencyDisplay',
  component: CurrencyDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente para mostrar montos formateados con símbolo de moneda. Soporta COP (peso colombiano) y USD (dólar estadounidense).',
      },
    },
  },
  argTypes: {
    amount: {
      control: { type: 'number' },
      description: 'Monto a mostrar',
    },
    currency: {
      control: { type: 'radio' },
      options: ['COP', 'USD'],
      description: 'Código de moneda',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del texto',
    },
    showSign: {
      control: 'boolean',
      description: 'Mostrar signo + para valores positivos',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CurrencyDisplay>;

// ============================================
// 💵 COP EXAMPLES
// ============================================

export const PesoColombiano: Story = {
  name: 'Peso Colombiano (COP)',
  args: {
    amount: 50000,
    currency: 'COP',
    size: 'md',
  },
};

export const COPPequeño: Story = {
  name: 'COP - Monto Pequeño',
  args: {
    amount: 5500,
    currency: 'COP',
    size: 'md',
  },
};

export const COPGrande: Story = {
  name: 'COP - Monto Grande',
  args: {
    amount: 1850000,
    currency: 'COP',
    size: 'md',
  },
};

export const COPMuyGrande: Story = {
  name: 'COP - Monto Muy Grande',
  args: {
    amount: 15000000,
    currency: 'COP',
    size: 'md',
  },
};

// ============================================
// 💲 USD EXAMPLES
// ============================================

export const DolarAmericano: Story = {
  name: 'Dólar Americano (USD)',
  args: {
    amount: 125.5,
    currency: 'USD',
    size: 'md',
  },
};

export const USDPequeño: Story = {
  name: 'USD - Monto Pequeño',
  args: {
    amount: 5.99,
    currency: 'USD',
    size: 'md',
  },
};

export const USDGrande: Story = {
  name: 'USD - Monto Grande',
  args: {
    amount: 1234.56,
    currency: 'USD',
    size: 'md',
  },
};

export const USDMuyGrande: Story = {
  name: 'USD - Monto Muy Grande',
  args: {
    amount: 50000,
    currency: 'USD',
    size: 'md',
  },
};

// ============================================
// 📏 SIZE VARIATIONS
// ============================================

export const TamanoSmall: Story = {
  name: 'Tamaño Small (sm)',
  args: {
    amount: 1500.75,
    currency: 'USD',
    size: 'sm',
  },
};

export const TamanoMedium: Story = {
  name: 'Tamaño Medium (md)',
  args: {
    amount: 1500.75,
    currency: 'USD',
    size: 'md',
  },
};

export const TamanoLarge: Story = {
  name: 'Tamaño Large (lg)',
  args: {
    amount: 1500.75,
    currency: 'USD',
    size: 'lg',
  },
};

export const TamanoXLarge: Story = {
  name: 'Tamaño Extra Large (xl)',
  args: {
    amount: 1500.75,
    currency: 'USD',
    size: 'xl',
  },
};

// ============================================
// ➕➖ SIGN DISPLAY
// ============================================

export const ConSignoPositivo: Story = {
  name: 'Con Signo Positivo',
  args: {
    amount: 250,
    currency: 'USD',
    size: 'lg',
    showSign: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el signo + para valores positivos cuando showSign está activo.',
      },
    },
  },
};

export const ValorNegativo: Story = {
  name: 'Valor Negativo',
  args: {
    amount: -150.25,
    currency: 'USD',
    size: 'lg',
    showSign: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Los valores negativos se muestran en rojo automáticamente.',
      },
    },
  },
};

export const ValorCero: Story = {
  name: 'Valor Cero',
  args: {
    amount: 0,
    currency: 'USD',
    size: 'md',
  },
};

// ============================================
// 🔄 CONVERSION DISPLAY
// ============================================

export const ComparacionMonedas: Story = {
  name: 'Comparación COP vs USD',
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 mb-2">Monto Original (COP):</p>
        <CurrencyDisplay amount={185000} currency="COP" size="xl" />
      </div>
      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 mb-2">Convertido a USD (TC: 3700):</p>
        <CurrencyDisplay amount={50} currency="USD" size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de cómo se vería la conversión de COP a USD.',
      },
    },
  },
};

// ============================================
// 📊 SIZE COMPARISON
// ============================================

export const ComparacionTamanos: Story = {
  name: 'Comparación de Tamaños',
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 w-12">sm:</span>
        <CurrencyDisplay amount={1234.56} currency="USD" size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 w-12">md:</span>
        <CurrencyDisplay amount={1234.56} currency="USD" size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 w-12">lg:</span>
        <CurrencyDisplay amount={1234.56} currency="USD" size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 w-12">xl:</span>
        <CurrencyDisplay amount={1234.56} currency="USD" size="xl" />
      </div>
    </div>
  ),
};

// ============================================
// 💡 USAGE IN CONTEXT
// ============================================

export const EnTarjetaDeGasto: Story = {
  name: 'En Tarjeta de Gasto',
  render: () => (
    <div className="w-80 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Almuerzo restaurante
          </p>
          <p className="text-xs text-slate-400">Hoy</p>
        </div>
        <div className="text-right">
          <CurrencyDisplay amount={13.51} currency="USD" size="lg" />
          <p className="text-[11px] text-slate-400">$50.000 COP</p>
        </div>
      </div>
    </div>
  ),
};

export const EnResumenMensual: Story = {
  name: 'En Resumen Mensual',
  render: () => (
    <div className="w-48 p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white">
      <p className="text-xs opacity-80 mb-1">Total Gastado</p>
      <CurrencyDisplay
        amount={2456.78}
        currency="USD"
        size="xl"
        className="!text-white"
      />
      <p className="text-xs opacity-70 mt-2">Enero 2026</p>
    </div>
  ),
};

export const ListaDePreciosUSD: Story = {
  name: 'Lista de Precios (USD)',
  render: () => (
    <div className="space-y-2 w-64">
      {[
        { name: 'Netflix', amount: 15.99 },
        { name: 'Spotify', amount: 9.99 },
        { name: 'Disney+', amount: 12.99 },
        { name: 'Amazon Prime', amount: 14.99 },
      ].map((item) => (
        <div
          key={item.name}
          className="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded-lg"
        >
          <span className="text-sm text-slate-700 dark:text-slate-300">{item.name}</span>
          <CurrencyDisplay amount={item.amount} currency="USD" size="sm" />
        </div>
      ))}
    </div>
  ),
};

export const ListaDePreciosCOP: Story = {
  name: 'Lista de Precios (COP)',
  render: () => (
    <div className="space-y-2 w-64">
      {[
        { name: 'Mercado', amount: 250000 },
        { name: 'Servicios', amount: 180000 },
        { name: 'Transporte', amount: 85000 },
        { name: 'Entretenimiento', amount: 45000 },
      ].map((item) => (
        <div
          key={item.name}
          className="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded-lg"
        >
          <span className="text-sm text-slate-700 dark:text-slate-300">{item.name}</span>
          <CurrencyDisplay amount={item.amount} currency="COP" size="sm" />
        </div>
      ))}
    </div>
  ),
};
