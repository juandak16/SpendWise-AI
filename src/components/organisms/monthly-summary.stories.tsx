import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Wallet, Receipt, TrendingUp, Tag, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/molecules';

/**
 * 🦠 ORGANISM: MonthlySummary Stories
 * Monthly statistics grid with 4 stat cards
 * US-STORY-014
 */

// Mock data types
interface MockSummary {
  totalAmount: number;
  transactionCount: number;
  dailyAverage: number;
  projectedTotal: number;
  topCategory: {
    name: string;
    emoji: string;
    percentage: number;
  };
  vsLastMonth: {
    percentage: number;
    trend: 'up' | 'down' | 'same';
  };
}

// Standalone MonthlySummary component for Storybook
interface MonthlySummaryDemoProps {
  summary: MockSummary;
  isEmpty?: boolean;
  showExchangeRate?: boolean;
  exchangeRateLabel?: string;
}

const MonthlySummaryDemo: React.FC<MonthlySummaryDemoProps> = ({
  summary,
  isEmpty = false,
  showExchangeRate = true,
  exchangeRateLabel = 'TC: 1 USD = 3.700 COP',
}) => {
  const formatUSD = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);

  // Empty state
  if (isEmpty) {
    return (
      <div className="space-y-3">
        {showExchangeRate && (
          <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
            <RefreshCw className="w-3 h-3" />
            <span>{exchangeRateLabel}</span>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center"
            >
              <span className="text-xs text-slate-400">Sin datos</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total gastado',
      value: formatUSD(summary.totalAmount),
      icon: Wallet,
      color: 'emerald',
      trend:
        summary.vsLastMonth.percentage !== 0
          ? {
              value: Math.abs(summary.vsLastMonth.percentage),
              isUp: summary.vsLastMonth.trend === 'up',
            }
          : null,
    },
    {
      title: 'Transacciones',
      value: summary.transactionCount.toString(),
      subtitle: `~${formatUSD(summary.dailyAverage)}/día`,
      icon: Receipt,
      color: 'blue',
    },
    {
      title: 'Proyección',
      value: formatUSD(summary.projectedTotal),
      subtitle: 'Estimado fin de mes',
      icon: TrendingUp,
      color: 'violet',
    },
    {
      title: 'Mayor gasto',
      value: summary.topCategory.name,
      emoji: summary.topCategory.emoji,
      subtitle: `${summary.topCategory.percentage}% del total`,
      icon: Tag,
      color: 'amber',
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; shadow: string }> = {
    emerald: {
      bg: 'from-emerald-500 to-teal-500',
      icon: 'text-white',
      shadow: 'shadow-emerald-500/20',
    },
    blue: {
      bg: 'from-blue-500 to-indigo-500',
      icon: 'text-white',
      shadow: 'shadow-blue-500/20',
    },
    violet: {
      bg: 'from-violet-500 to-purple-500',
      icon: 'text-white',
      shadow: 'shadow-violet-500/20',
    },
    amber: {
      bg: 'from-amber-500 to-orange-500',
      icon: 'text-white',
      shadow: 'shadow-amber-500/20',
    },
  };

  return (
    <div className="space-y-3">
      {/* Exchange rate label */}
      {showExchangeRate && (
        <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          <RefreshCw className="w-3 h-3" />
          <span>{exchangeRateLabel}</span>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const colors = colorMap[stat.color];
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className={cn(
                'relative p-5 rounded-2xl overflow-hidden',
                'bg-white dark:bg-slate-800/50',
                'border border-slate-100 dark:border-slate-700/50',
                'shadow-sm'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center mb-4',
                  'bg-gradient-to-br shadow-lg',
                  colors.bg,
                  colors.shadow
                )}
              >
                <Icon className={cn('w-5 h-5', colors.icon)} />
              </div>

              {/* Label */}
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                {stat.title}
              </p>

              {/* Value */}
              <div className="flex items-center gap-2">
                {stat.emoji && <span className="text-xl">{stat.emoji}</span>}
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
                  {stat.value}
                </p>
              </div>

              {/* Subtitle */}
              {stat.subtitle && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  {stat.subtitle}
                </p>
              )}

              {/* Trend badge */}
              {stat.trend && (
                <div
                  className={cn(
                    'absolute top-4 right-4 px-2 py-1 rounded-full text-[10px] font-semibold',
                    stat.trend.isUp
                      ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
                      : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  )}
                >
                  {stat.trend.isUp ? '↑' : '↓'} {stat.trend.value}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Default mock summary
const DEFAULT_SUMMARY: MockSummary = {
  totalAmount: 1234.56,
  transactionCount: 24,
  dailyAverage: 58.78,
  projectedTotal: 2800,
  topCategory: {
    name: 'Alimentación',
    emoji: '🍔',
    percentage: 35,
  },
  vsLastMonth: {
    percentage: 12,
    trend: 'up',
  },
};

const meta: Meta<typeof MonthlySummaryDemo> = {
  title: 'Organisms/MonthlySummary',
  component: MonthlySummaryDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Resumen mensual con 4 tarjetas de estadísticas: Total gastado, Transacciones, Proyección y Mayor gasto. Todos los montos se muestran en USD.',
      },
    },
  },
  argTypes: {
    isEmpty: {
      control: 'boolean',
      description: 'Mostrar estado vacío',
    },
    showExchangeRate: {
      control: 'boolean',
      description: 'Mostrar label de tipo de cambio',
    },
    exchangeRateLabel: {
      control: 'text',
      description: 'Texto del tipo de cambio',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MonthlySummaryDemo>;

// ============================================
// 📊 MAIN STATES
// ============================================

export const ConDatos: Story = {
  name: 'Con Datos',
  args: {
    summary: DEFAULT_SUMMARY,
    isEmpty: false,
    showExchangeRate: true,
    exchangeRateLabel: 'TC: 1 USD = 3.700 COP',
  },
};

export const SinDatos: Story = {
  name: 'Estado Vacío (Empty State)',
  args: {
    summary: DEFAULT_SUMMARY,
    isEmpty: true,
    showExchangeRate: true,
    exchangeRateLabel: 'TC: 1 USD = 3.700 COP',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando no hay gastos registrados, se muestran placeholders con borde punteado.',
      },
    },
  },
};

// ============================================
// 📈 TREND VARIATIONS
// ============================================

export const TendenciaAlAlza: Story = {
  name: 'Tendencia al Alza (+15%)',
  args: {
    summary: {
      ...DEFAULT_SUMMARY,
      vsLastMonth: {
        percentage: 15,
        trend: 'up',
      },
    },
    isEmpty: false,
    showExchangeRate: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando se gasta más que el mes anterior, el badge es rojo.',
      },
    },
  },
};

export const TendenciaALaBaja: Story = {
  name: 'Tendencia a la Baja (-8%)',
  args: {
    summary: {
      ...DEFAULT_SUMMARY,
      totalAmount: 980.25,
      vsLastMonth: {
        percentage: 8,
        trend: 'down',
      },
    },
    isEmpty: false,
    showExchangeRate: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando se gasta menos que el mes anterior, el badge es verde.',
      },
    },
  },
};

export const SinTendencia: Story = {
  name: 'Sin Tendencia (Igual)',
  args: {
    summary: {
      ...DEFAULT_SUMMARY,
      vsLastMonth: {
        percentage: 0,
        trend: 'same',
      },
    },
    isEmpty: false,
    showExchangeRate: true,
  },
};

// ============================================
// 🏆 TOP CATEGORY VARIATIONS
// ============================================

export const TopTransporte: Story = {
  name: 'Top: Transporte',
  args: {
    summary: {
      ...DEFAULT_SUMMARY,
      topCategory: {
        name: 'Transporte',
        emoji: '🚗',
        percentage: 28,
      },
    },
    isEmpty: false,
    showExchangeRate: true,
  },
};

export const TopEntretenimiento: Story = {
  name: 'Top: Entretenimiento',
  args: {
    summary: {
      ...DEFAULT_SUMMARY,
      topCategory: {
        name: 'Entretenimiento',
        emoji: '🎬',
        percentage: 22,
      },
    },
    isEmpty: false,
    showExchangeRate: true,
  },
};

export const TopHogar: Story = {
  name: 'Top: Hogar',
  args: {
    summary: {
      ...DEFAULT_SUMMARY,
      topCategory: {
        name: 'Hogar',
        emoji: '🏠',
        percentage: 42,
      },
    },
    isEmpty: false,
    showExchangeRate: true,
  },
};

// ============================================
// 💰 AMOUNT VARIATIONS
// ============================================

export const GastoBajo: Story = {
  name: 'Gasto Bajo (<$500)',
  args: {
    summary: {
      totalAmount: 325.5,
      transactionCount: 8,
      dailyAverage: 40.68,
      projectedTotal: 850,
      topCategory: {
        name: 'Alimentación',
        emoji: '🍔',
        percentage: 45,
      },
      vsLastMonth: {
        percentage: 25,
        trend: 'down',
      },
    },
    isEmpty: false,
    showExchangeRate: true,
  },
};

export const GastoAlto: Story = {
  name: 'Gasto Alto (>$3000)',
  args: {
    summary: {
      totalAmount: 3456.78,
      transactionCount: 67,
      dailyAverage: 164.6,
      projectedTotal: 5200,
      topCategory: {
        name: 'Hogar',
        emoji: '🏠',
        percentage: 38,
      },
      vsLastMonth: {
        percentage: 18,
        trend: 'up',
      },
    },
    isEmpty: false,
    showExchangeRate: true,
  },
};

// ============================================
// 💱 EXCHANGE RATE DISPLAY
// ============================================

export const SinTipoDeCambio: Story = {
  name: 'Sin Tipo de Cambio',
  args: {
    summary: DEFAULT_SUMMARY,
    isEmpty: false,
    showExchangeRate: false,
  },
};

export const TipoDeCambioPersonalizado: Story = {
  name: 'Tipo de Cambio Personalizado',
  args: {
    summary: DEFAULT_SUMMARY,
    isEmpty: false,
    showExchangeRate: true,
    exchangeRateLabel: 'TC: 1 USD = 4.100 COP (actualizado)',
  },
};

// ============================================
// 📱 RESPONSIVE EXAMPLES
// ============================================

export const VistaMovil: Story = {
  name: 'Vista Móvil (Ancho Reducido)',
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
  args: {
    summary: DEFAULT_SUMMARY,
    isEmpty: false,
    showExchangeRate: true,
  },
};

// ============================================
// 🎨 FULL DASHBOARD PREVIEW
// ============================================

export const VistaCompleta: Story = {
  name: 'Vista Completa del Dashboard',
  render: () => (
    <div className="w-[500px] space-y-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl">
      {/* Header simulation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <span>💰</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100">
              SpendWise<span className="text-emerald-500">AI</span>
            </h1>
            <span className="text-xs text-slate-400">Enero 2026</span>
          </div>
        </div>
      </div>

      {/* Section title */}
      <div>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Resumen del mes
        </h2>
        <MonthlySummaryDemo
          summary={DEFAULT_SUMMARY}
          isEmpty={false}
          showExchangeRate={true}
          exchangeRateLabel="TC: 1 USD = 3.700 COP"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vista del MonthlySummary integrado en el contexto del dashboard.',
      },
    },
  },
};
