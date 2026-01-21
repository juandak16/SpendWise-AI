import type { Meta, StoryObj } from '@storybook/react';
import { Wallet, Receipt, TrendingUp, Tag, Calendar, DollarSign } from 'lucide-react';
import { StatCard } from './stat-card';

/**
 * 🔬 MOLECULE: StatCard Stories
 * Statistics card with icon and trend indicator
 * US-STORY-009
 */

const meta: Meta<typeof StatCard> = {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tarjeta de estadísticas con ícono, valor principal, subtítulo opcional e indicador de tendencia.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título de la estadística',
    },
    value: {
      control: 'text',
      description: 'Valor principal a mostrar',
    },
    subtitle: {
      control: 'text',
      description: 'Texto secundario (opcional)',
    },
    trend: {
      description: 'Indicador de tendencia vs mes anterior',
    },
    icon: {
      description: 'Ícono de React Node',
    },
    iconBg: {
      control: 'text',
      description: 'Gradiente de fondo del ícono (Tailwind)',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[220px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// ============================================
// 📊 BASIC EXAMPLES
// ============================================

export const Default: Story = {
  args: {
    title: 'Total Gastado',
    value: '$1,234.56',
    icon: <Wallet className="w-5 h-5 text-white" />,
    iconBg: 'from-emerald-500 to-teal-500',
  },
};

export const ConSubtitulo: Story = {
  name: 'Con Subtítulo',
  args: {
    title: 'Transacciones',
    value: '24',
    subtitle: '~$51.44/día promedio',
    icon: <Receipt className="w-5 h-5 text-white" />,
    iconBg: 'from-blue-500 to-indigo-500',
  },
};

export const ConTendenciaAlza: Story = {
  name: 'Tendencia al Alza',
  args: {
    title: 'Total Gastado',
    value: '$1,890.00',
    trend: {
      value: 15,
      direction: 'up',
    },
    icon: <Wallet className="w-5 h-5 text-white" />,
    iconBg: 'from-emerald-500 to-teal-500',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando la tendencia es "up", se muestra en rojo indicando mayor gasto.',
      },
    },
  },
};

export const ConTendenciaBaja: Story = {
  name: 'Tendencia a la Baja',
  args: {
    title: 'Total Gastado',
    value: '$980.00',
    trend: {
      value: 12,
      direction: 'down',
    },
    icon: <Wallet className="w-5 h-5 text-white" />,
    iconBg: 'from-emerald-500 to-teal-500',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando la tendencia es "down", se muestra en verde indicando menor gasto.',
      },
    },
  },
};

export const SinTendencia: Story = {
  name: 'Sin Tendencia (Estable)',
  args: {
    title: 'Total Gastado',
    value: '$1,200.00',
    trend: {
      value: 0,
      direction: 'stable',
    },
    icon: <Wallet className="w-5 h-5 text-white" />,
    iconBg: 'from-emerald-500 to-teal-500',
  },
};

// ============================================
// 🎨 ICON VARIATIONS
// ============================================

export const IconoVerde: Story = {
  name: 'Ícono Verde (Total)',
  args: {
    title: 'Total Gastado',
    value: '$2,456.78',
    icon: <Wallet className="w-5 h-5 text-white" />,
    iconBg: 'from-emerald-500 to-teal-500',
  },
};

export const IconoAzul: Story = {
  name: 'Ícono Azul (Transacciones)',
  args: {
    title: 'Transacciones',
    value: '42',
    subtitle: 'Este mes',
    icon: <Receipt className="w-5 h-5 text-white" />,
    iconBg: 'from-blue-500 to-indigo-500',
  },
};

export const IconoVioleta: Story = {
  name: 'Ícono Violeta (Proyección)',
  args: {
    title: 'Proyección',
    value: '$3,200.00',
    subtitle: 'Estimado fin de mes',
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    iconBg: 'from-violet-500 to-purple-500',
  },
};

export const IconoAmbar: Story = {
  name: 'Ícono Ámbar (Categoría)',
  args: {
    title: 'Mayor Gasto',
    value: '🍔 Alimentación',
    subtitle: '35% del total',
    icon: <Tag className="w-5 h-5 text-white" />,
    iconBg: 'from-amber-500 to-orange-500',
  },
};

// ============================================
// 📱 DASHBOARD SIMULATION
// ============================================

export const GridDeEstadisticas: Story = {
  name: 'Grid de Estadísticas (2x2)',
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[460px]">
      <StatCard
        title="Total Gastado"
        value="$1,234.56"
        trend={{ value: 8, direction: 'up' }}
        icon={<Wallet className="w-5 h-5 text-white" />}
        iconBg="from-emerald-500 to-teal-500"
      />
      <StatCard
        title="Transacciones"
        value="24"
        subtitle="~$51.44/día"
        icon={<Receipt className="w-5 h-5 text-white" />}
        iconBg="from-blue-500 to-indigo-500"
      />
      <StatCard
        title="Proyección"
        value="$2,800.00"
        subtitle="Fin de mes"
        icon={<TrendingUp className="w-5 h-5 text-white" />}
        iconBg="from-violet-500 to-purple-500"
      />
      <StatCard
        title="Mayor Gasto"
        value="🚗 Transporte"
        subtitle="28% del total"
        icon={<Tag className="w-5 h-5 text-white" />}
        iconBg="from-amber-500 to-orange-500"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de cómo se verían las tarjetas en el dashboard principal.',
      },
    },
  },
};

// ============================================
// 🔢 VALUE FORMATS
// ============================================

export const ValorMoneda: Story = {
  name: 'Valor en Moneda',
  args: {
    title: 'Ahorro del Mes',
    value: '$500.00',
    icon: <DollarSign className="w-5 h-5 text-white" />,
    iconBg: 'from-green-500 to-emerald-500',
  },
};

export const ValorNumerico: Story = {
  name: 'Valor Numérico',
  args: {
    title: 'Días Restantes',
    value: '12',
    subtitle: 'Para fin de mes',
    icon: <Calendar className="w-5 h-5 text-white" />,
    iconBg: 'from-slate-500 to-slate-600',
  },
};

export const ValorConEmoji: Story = {
  name: 'Valor con Emoji',
  args: {
    title: 'Categoría Principal',
    value: '🏠 Hogar',
    subtitle: '42% del presupuesto',
    icon: <Tag className="w-5 h-5 text-white" />,
    iconBg: 'from-violet-500 to-purple-500',
  },
};

export const SinIcono: Story = {
  name: 'Sin Ícono',
  args: {
    title: 'Gastos Pendientes',
    value: '3',
    subtitle: 'Por categorizar',
  },
};
