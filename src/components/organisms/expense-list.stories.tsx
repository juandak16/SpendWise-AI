import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Receipt, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { ExpenseCard } from '@/components/molecules';
import { DefaultCategoryId } from '@/types';
import type { Expense } from '@/types';

/**
 * 🦠 ORGANISM: ExpenseList Stories
 * List of expenses with expand/collapse functionality
 * US-STORY-012
 */

// Mock expense factory
const createMockExpense = (
  id: string,
  description: string,
  amount: number,
  categoryId: number,
  daysAgo: number = 0,
  confidence: number = 0.85
): Expense => ({
  id,
  amount,
  currency: 'COP',
  categoryId,
  description,
  originalInput: `${amount} ${description}`,
  date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
  createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
  updatedAt: new Date(),
  confidence,
  isManualCategory: false,
});

// Sample expenses for stories
const MOCK_EXPENSES: Expense[] = [
  createMockExpense('1', 'Pizza con amigos', 45000, DefaultCategoryId.FOOD, 0),
  createMockExpense('2', 'Uber al trabajo', 12500, DefaultCategoryId.TRANSPORT, 0),
  createMockExpense('3', 'Netflix mensual', 32000, DefaultCategoryId.ENTERTAINMENT, 1),
  createMockExpense('4', 'Mercado semanal', 185000, DefaultCategoryId.FOOD, 2),
  createMockExpense('5', 'Gasolina', 80000, DefaultCategoryId.TRANSPORT, 2, 0.95),
  createMockExpense('6', 'Farmacia', 45000, DefaultCategoryId.HEALTH, 3),
  createMockExpense('7', 'Spotify', 18000, DefaultCategoryId.ENTERTAINMENT, 4),
  createMockExpense('8', 'Peluquería', 35000, DefaultCategoryId.PERSONAL_CARE, 5),
  createMockExpense('9', 'Ayuda a mamá', 200000, DefaultCategoryId.FAMILY, 6, 0.9),
  createMockExpense('10', 'Curso Udemy', 50000, DefaultCategoryId.EDUCATION, 7, 0.6),
];

// Standalone ExpenseList component for Storybook (without Zustand)
interface ExpenseListDemoProps {
  expenses: Expense[];
  limit?: number;
  isLoading?: boolean;
  onDelete?: (id: string) => void;
}

const ExpenseListDemo: React.FC<ExpenseListDemoProps> = ({
  expenses,
  limit = 5,
  isLoading = false,
  onDelete,
}) => {
  const [showAll, setShowAll] = useState(false);

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const displayedExpenses = showAll ? sortedExpenses : sortedExpenses.slice(0, limit);
  const hasMore = expenses.length > limit;

  // Loading state
  if (isLoading && expenses.length === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    );
  }

  // Empty state
  if (expenses.length === 0) {
    return (
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
          <div className="flex items-center gap-1 mt-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Escribe algo como "20 uber"</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Últimos gastos
        </h2>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {expenses.length} {expenses.length === 1 ? 'registro' : 'registros'}
        </span>
      </div>

      {/* Expense list */}
      <div className="space-y-2">
        {displayedExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} onDelete={onDelete} />
        ))}
      </div>

      {/* Toggle button */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Mostrar menos
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Ver todos ({expenses.length})
            </>
          )}
        </button>
      )}
    </div>
  );
};

const meta: Meta<typeof ExpenseListDemo> = {
  title: 'Organisms/ExpenseList',
  component: ExpenseListDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Lista expandible de gastos. Muestra los últimos gastos con opción de ver todos o colapsar la vista.',
      },
    },
  },
  argTypes: {
    expenses: {
      description: 'Array de gastos a mostrar',
    },
    limit: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Número de gastos a mostrar inicialmente',
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carga',
    },
    onDelete: {
      action: 'deleted',
      description: 'Callback al eliminar un gasto',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExpenseListDemo>;

// ============================================
// 📊 MAIN STATES
// ============================================

export const ConDatos: Story = {
  name: 'Con Datos',
  args: {
    expenses: MOCK_EXPENSES.slice(0, 5),
    limit: 5,
    isLoading: false,
  },
};

export const ListaVacia: Story = {
  name: 'Lista Vacía (Empty State)',
  args: {
    expenses: [],
    limit: 5,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado cuando no hay gastos registrados. Muestra un mensaje guía para el usuario.',
      },
    },
  },
};

export const Cargando: Story = {
  name: 'Estado de Carga',
  args: {
    expenses: [],
    limit: 5,
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeletons de carga mientras se obtienen los datos.',
      },
    },
  },
};

// ============================================
// 📏 LIST LENGTH VARIATIONS
// ============================================

export const PocosGastos: Story = {
  name: 'Pocos Gastos (3)',
  args: {
    expenses: MOCK_EXPENSES.slice(0, 3),
    limit: 5,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando hay menos gastos que el límite, no se muestra el botón de expandir.',
      },
    },
  },
};

export const MuchosGastos: Story = {
  name: 'Muchos Gastos (10)',
  args: {
    expenses: MOCK_EXPENSES,
    limit: 5,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando hay más gastos que el límite, aparece el botón "Ver todos".',
      },
    },
  },
};

export const UnSoloGasto: Story = {
  name: 'Un Solo Gasto',
  args: {
    expenses: [MOCK_EXPENSES[0]],
    limit: 5,
    isLoading: false,
  },
};

// ============================================
// ⚙️ LIMIT VARIATIONS
// ============================================

export const LimiteTres: Story = {
  name: 'Límite de 3',
  args: {
    expenses: MOCK_EXPENSES,
    limit: 3,
    isLoading: false,
  },
};

export const LimiteDiez: Story = {
  name: 'Límite de 10',
  args: {
    expenses: MOCK_EXPENSES,
    limit: 10,
    isLoading: false,
  },
};

// ============================================
// 🎨 CATEGORY DIVERSITY
// ============================================

export const VariasCategorias: Story = {
  name: 'Varias Categorías',
  args: {
    expenses: [
      createMockExpense('a', 'Almuerzo', 25000, DefaultCategoryId.FOOD, 0),
      createMockExpense('b', 'Uber', 15000, DefaultCategoryId.TRANSPORT, 0),
      createMockExpense('c', 'Netflix', 32000, DefaultCategoryId.ENTERTAINMENT, 1),
      createMockExpense('d', 'Farmacia', 45000, DefaultCategoryId.HEALTH, 1),
      createMockExpense('e', 'Peluquería', 35000, DefaultCategoryId.PERSONAL_CARE, 2),
    ],
    limit: 5,
    isLoading: false,
  },
};

export const TodasAlimentacion: Story = {
  name: 'Solo Alimentación',
  args: {
    expenses: [
      createMockExpense('f1', 'Desayuno café', 12000, DefaultCategoryId.FOOD, 0),
      createMockExpense('f2', 'Almuerzo oficina', 18000, DefaultCategoryId.FOOD, 0),
      createMockExpense('f3', 'Cena restaurante', 45000, DefaultCategoryId.FOOD, 1),
      createMockExpense('f4', 'Mercado', 185000, DefaultCategoryId.FOOD, 2),
      createMockExpense('f5', 'Rappi snacks', 22000, DefaultCategoryId.FOOD, 3),
    ],
    limit: 5,
    isLoading: false,
  },
};

// ============================================
// ⚠️ CONFIDENCE STATES
// ============================================

export const ConBajaConfianza: Story = {
  name: 'Con Baja Confianza',
  args: {
    expenses: [
      createMockExpense('lc1', 'Gasto sin categoría clara', 50000, DefaultCategoryId.OTHER, 0, 0.45),
      createMockExpense('lc2', 'Varios', 30000, DefaultCategoryId.OTHER, 1, 0.55),
      createMockExpense('lc3', 'Compra online', 120000, DefaultCategoryId.OTHER, 2, 0.62),
    ],
    limit: 5,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Gastos con confianza de categorización menor al 70% muestran alerta.',
      },
    },
  },
};

// ============================================
// 💱 CURRENCY MIX
// ============================================

export const MixMonedas: Story = {
  name: 'Mix de Monedas (COP/USD)',
  args: {
    expenses: [
      {
        ...createMockExpense('usd1', 'Amazon purchase', 50, DefaultCategoryId.OTHER, 0),
        currency: 'USD' as const,
      },
      createMockExpense('cop1', 'Mercado local', 185000, DefaultCategoryId.FOOD, 1),
      {
        ...createMockExpense('usd2', 'Netflix US', 15.99, DefaultCategoryId.ENTERTAINMENT, 2),
        currency: 'USD' as const,
      },
      createMockExpense('cop2', 'Uber', 12500, DefaultCategoryId.TRANSPORT, 2),
    ],
    limit: 5,
    isLoading: false,
  },
};

// ============================================
// 🔄 INTERACTIVE DEMO
// ============================================

export const DemoInteractiva: Story = {
  name: 'Demo Interactiva (Expandir/Colapsar)',
  render: () => {
    const DemoWrapper = () => {
      const [expenses, setExpenses] = useState(MOCK_EXPENSES);

      const handleDelete = (id: string) => {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      };

      return (
        <div className="w-[450px]">
          <p className="text-xs text-slate-400 mb-4 text-center">
            Haz clic en "Ver todos" y prueba eliminar gastos
          </p>
          <ExpenseListDemo expenses={expenses} limit={5} onDelete={handleDelete} />
        </div>
      );
    };

    return <DemoWrapper />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demo interactiva donde puedes expandir/colapsar la lista y eliminar gastos.',
      },
    },
  },
};
