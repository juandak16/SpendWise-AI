import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sparkles, Calendar, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 🦠 ORGANISM: Header Stories
 * App header with logo, current date, and status
 * US-STORY-013
 */

// Standalone Header component for Storybook
interface HeaderDemoProps {
  className?: string;
  showAIStatus?: boolean;
  customDate?: string;
  aiStatusText?: string;
}

const HeaderDemo: React.FC<HeaderDemoProps> = ({
  className,
  showAIStatus = true,
  customDate,
  aiStatusText = 'IA Activa',
}) => {
  const now = new Date();

  // Full date format: "Sábado, 18 de enero 2026"
  const fullDate =
    customDate ||
    now.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <header className={cn('flex items-center justify-between', className)}>
      {/* Logo */}
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
            <span className="capitalize">{fullDate}</span>
          </div>
        </div>
      </div>

      {/* AI Status badge */}
      {showAIStatus && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            {aiStatusText}
          </span>
        </div>
      )}
    </header>
  );
};

const meta: Meta<typeof HeaderDemo> = {
  title: 'Organisms/Header',
  component: HeaderDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Header principal de la aplicación. Muestra el logo, la fecha actual y el estado de la IA.',
      },
    },
  },
  argTypes: {
    showAIStatus: {
      control: 'boolean',
      description: 'Mostrar el badge de estado de IA',
    },
    customDate: {
      control: 'text',
      description: 'Fecha personalizada (para testing)',
    },
    aiStatusText: {
      control: 'text',
      description: 'Texto del badge de IA',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[500px] p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeaderDemo>;

// ============================================
// 📌 MAIN STATES
// ============================================

export const Default: Story = {
  args: {
    showAIStatus: true,
    aiStatusText: 'IA Activa',
  },
};

export const SinEstadoIA: Story = {
  name: 'Sin Estado de IA',
  args: {
    showAIStatus: false,
  },
};

export const FechaPersonalizada: Story = {
  name: 'Fecha Personalizada',
  args: {
    showAIStatus: true,
    customDate: 'lunes, 20 de enero 2026',
    aiStatusText: 'IA Activa',
  },
};

// ============================================
// 🤖 AI STATUS VARIATIONS
// ============================================

export const IAProcesando: Story = {
  name: 'IA Procesando',
  render: () => (
    <div className="w-[500px] p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
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

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
          <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
            Procesando...
          </span>
        </div>
      </header>
    </div>
  ),
};

export const IADesconectada: Story = {
  name: 'IA Desconectada',
  render: () => (
    <div className="w-[500px] p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
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

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
          <div className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            IA Offline
          </span>
        </div>
      </header>
    </div>
  ),
};

// ============================================
// 🎨 LAYOUT VARIATIONS
// ============================================

export const ConAccionesExtras: Story = {
  name: 'Con Acciones Extras',
  render: () => (
    <div className="w-[500px] p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
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

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              IA Activa
            </span>
          </div>
        </div>
      </header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Variante con botones de notificaciones y configuración (futuras features).',
      },
    },
  },
};

export const Compacto: Story = {
  name: 'Modo Compacto',
  render: () => (
    <div className="w-[350px] p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <span className="text-base">💰</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
              SpendWise<span className="text-emerald-500">AI</span>
            </h1>
            <span className="text-[10px] text-slate-400 capitalize">21 ene 2026</span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10">
          <Sparkles className="w-3 h-3 text-emerald-500" />
        </div>
      </header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Versión compacta para pantallas más pequeñas.',
      },
    },
  },
};

// ============================================
// 📅 DATE FORMATS
// ============================================

export const FechaCorta: Story = {
  name: 'Fecha Corta',
  render: () => (
    <div className="w-[400px] p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
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
              <span>21 de enero</span>
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
    </div>
  ),
};

// ============================================
// 🌙 THEME SHOWCASE
// ============================================

export const ComparacionTemas: Story = {
  name: 'Comparación de Temas',
  render: () => (
    <div className="space-y-4">
      <div className="w-[500px] p-4 bg-white rounded-xl border border-slate-200">
        <p className="text-xs text-slate-400 mb-3">Tema Claro</p>
        <HeaderDemo showAIStatus={true} aiStatusText="IA Activa" />
      </div>
      <div className="w-[500px] p-4 bg-slate-900 rounded-xl">
        <p className="text-xs text-slate-500 mb-3">Tema Oscuro</p>
        <div className="dark">
          <HeaderDemo showAIStatus={true} aiStatusText="IA Activa" />
        </div>
      </div>
    </div>
  ),
};
