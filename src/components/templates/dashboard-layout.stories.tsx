import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DashboardLayout } from './dashboard-layout';
import { Sparkles, Calendar, Wallet, Receipt, TrendingUp, Tag, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 📄 TEMPLATE: DashboardLayout Stories
 * Main dashboard page layout template
 * US-STORY-015
 */

// Mock Header component
const MockHeader: React.FC = () => (
  <header className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <span className="text-xl">💰</span>
      </div>
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
          SpendWise<span className="text-emerald-500">AI</span>
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Calendar className="w-3 h-3" />
          <span className="capitalize">martes, 21 de enero 2026</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
      <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
        IA Activa
      </span>
    </div>
  </header>
);

// Mock Stats Grid
const MockStatsGrid: React.FC = () => {
  const stats = [
    { title: 'Total gastado', value: '$1,234.56', icon: Wallet, color: 'emerald' },
    { title: 'Transacciones', value: '24', icon: Receipt, color: 'blue' },
    { title: 'Proyección', value: '$2,800.00', icon: TrendingUp, color: 'violet' },
    { title: 'Mayor gasto', value: '🍔 Alimentación', icon: Tag, color: 'amber' },
  ];

  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-500 to-teal-500',
    blue: 'from-blue-500 to-indigo-500',
    violet: 'from-violet-500 to-purple-500',
    amber: 'from-amber-500 to-orange-500',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400">
        <RefreshCw className="w-3 h-3" />
        <span>TC: 1 USD = 3.700 COP</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center mb-4',
                  'bg-gradient-to-br shadow-lg',
                  colorMap[stat.color]
                )}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-slate-500 mb-2">{stat.title}</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Mock Expense Input
const MockExpenseInput: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Registra un gasto
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Escribe en lenguaje natural</p>
      </div>
    </div>
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Ej: 50.000 en el super"
        className="flex-1 h-12 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400"
        disabled
      />
      <button className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white">
        →
      </button>
    </div>
  </div>
);

// Mock Expense List
const MockExpenseList: React.FC = () => {
  const expenses = [
    { emoji: '🍔', desc: 'Pizza con amigos', amount: '$12.16', time: 'Hoy' },
    { emoji: '🚗', desc: 'Uber al trabajo', amount: '$3.38', time: 'Hoy' },
    { emoji: '🎬', desc: 'Netflix mensual', amount: '$8.65', time: 'Ayer' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Últimos gastos
        </h2>
        <span className="text-xs text-slate-400">3 registros</span>
      </div>
      <div className="space-y-2">
        {expenses.map((exp, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl">
              {exp.emoji}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{exp.desc}</p>
              <span className="text-xs text-slate-400">{exp.time}</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{exp.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Template principal del dashboard de SpendWise AI. Define la estructura de la página con header, contenido principal y sidebar opcional.',
      },
    },
  },
  argTypes: {
    header: {
      description: 'Componente del header',
    },
    sidebar: {
      description: 'Componente del sidebar (futuro)',
    },
    children: {
      description: 'Contenido principal',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

// ============================================
// 📄 MAIN LAYOUT
// ============================================

export const Default: Story = {
  args: {
    header: <MockHeader />,
    children: (
      <div className="space-y-8">
        <section>
          <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Resumen del mes
          </h2>
          <MockStatsGrid />
        </section>
        <section>
          <MockExpenseInput />
        </section>
        <section>
          <MockExpenseList />
        </section>
      </div>
    ),
  },
};

export const SoloHeader: Story = {
  name: 'Solo Header',
  args: {
    header: <MockHeader />,
    children: (
      <div className="h-96 flex items-center justify-center text-slate-400">
        Contenido principal aquí
      </div>
    ),
  },
};

export const SinHeader: Story = {
  name: 'Sin Header',
  args: {
    children: (
      <div className="space-y-8">
        <section>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Resumen del mes
          </h2>
          <MockStatsGrid />
        </section>
      </div>
    ),
  },
};

// ============================================
// 📱 CONTENT VARIATIONS
// ============================================

export const ConResumenMensual: Story = {
  name: 'Con Resumen Mensual',
  args: {
    header: <MockHeader />,
    children: (
      <section>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Resumen del mes
        </h2>
        <MockStatsGrid />
      </section>
    ),
  },
};

export const ConInputDeGastos: Story = {
  name: 'Con Input de Gastos',
  args: {
    header: <MockHeader />,
    children: <MockExpenseInput />,
  },
};

export const ConListaDeGastos: Story = {
  name: 'Con Lista de Gastos',
  args: {
    header: <MockHeader />,
    children: <MockExpenseList />,
  },
};

// ============================================
// 🖼️ SIDEBAR EXAMPLES
// ============================================

export const ConSidebar: Story = {
  name: 'Con Sidebar (Futuro)',
  args: {
    header: <MockHeader />,
    sidebar: (
      <div className="h-full p-4 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          >
            <Wallet className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <Receipt className="w-4 h-4" />
            <span className="text-sm font-medium">Gastos</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Reportes</span>
          </a>
        </nav>
      </div>
    ),
    children: (
      <div className="space-y-8">
        <section>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Resumen del mes
          </h2>
          <MockStatsGrid />
        </section>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo con sidebar para futuras expansiones de la aplicación.',
      },
    },
  },
};

// ============================================
// 🎨 THEME VARIATIONS
// ============================================

export const TemaClaro: Story = {
  name: 'Tema Claro',
  args: {
    header: <MockHeader />,
    children: (
      <div className="space-y-8">
        <section>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Resumen del mes
          </h2>
          <MockStatsGrid />
        </section>
        <section>
          <MockExpenseInput />
        </section>
        <section>
          <MockExpenseList />
        </section>
      </div>
    ),
    className: 'bg-slate-50',
  },
};

export const TemaOscuro: Story = {
  name: 'Tema Oscuro',
  args: {
    header: <MockHeader />,
    children: (
      <div className="space-y-8">
        <section>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Resumen del mes
          </h2>
          <MockStatsGrid />
        </section>
        <section>
          <MockExpenseInput />
        </section>
        <section>
          <MockExpenseList />
        </section>
      </div>
    ),
    className: 'bg-slate-900',
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// 📱 RESPONSIVE
// ============================================

export const VistaMovil: Story = {
  name: 'Vista Móvil',
  args: {
    header: <MockHeader />,
    children: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Resumen
          </h2>
          <MockStatsGrid />
        </section>
        <section>
          <MockExpenseInput />
        </section>
        <section>
          <MockExpenseList />
        </section>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// ============================================
// 📄 EMPTY STATE
// ============================================

export const EstadoVacio: Story = {
  name: 'Estado Vacío (Nuevo Usuario)',
  args: {
    header: <MockHeader />,
    children: (
      <div className="space-y-8">
        {/* Empty stats */}
        <section>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Resumen del mes
          </h2>
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
        </section>

        {/* Input */}
        <section>
          <MockExpenseInput />
        </section>

        {/* Empty list */}
        <section>
          <div className="py-12 px-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <Receipt className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Sin gastos registrados
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">
                Usa el formulario de arriba para registrar tu primer gasto
              </p>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Vista del dashboard cuando un nuevo usuario no tiene gastos registrados.',
      },
    },
  },
};
