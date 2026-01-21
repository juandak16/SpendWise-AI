import type { Meta, StoryObj } from '@storybook/react';
import { ExpenseCard } from './expense-card';
import { DefaultCategoryId } from '@/types';
import type { Expense } from '@/types';

/**
 * 🔬 MOLECULE: ExpenseCard Stories
 * Displays a single expense with category, amount, and actions
 * US-STORY-008
 */

// Mock expense data factory
const createMockExpense = (overrides: Partial<Expense> = {}): Expense => ({
  id: '1',
  amount: 50000,
  currency: 'COP',
  categoryId: DefaultCategoryId.FOOD,
  description: 'Almuerzo en restaurante',
  originalInput: '50000 almuerzo',
  date: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  confidence: 0.85,
  isManualCategory: false,
  ...overrides,
});

const meta: Meta<typeof ExpenseCard> = {
  title: 'Molecules/ExpenseCard',
  component: ExpenseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tarjeta de gasto individual que muestra la categoría, descripción, monto en USD (con conversión de COP si aplica), y opciones de acción.',
      },
    },
  },
  argTypes: {
    expense: {
      description: 'Objeto de gasto con todos los datos',
    },
    onDelete: {
      action: 'deleted',
      description: 'Callback al eliminar el gasto',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExpenseCard>;

// ============================================
// 📌 CATEGORY EXAMPLES
// ============================================

export const Alimentacion: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.FOOD,
      description: 'Pizza con amigos',
      amount: 45000,
      currency: 'COP',
    }),
  },
};

export const Transporte: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.TRANSPORT,
      description: 'Uber al trabajo',
      amount: 12500,
      currency: 'COP',
    }),
  },
};

export const Hogar: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.HOME,
      description: 'Pago de servicios',
      amount: 180000,
      currency: 'COP',
    }),
  },
};

export const Entretenimiento: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.ENTERTAINMENT,
      description: 'Suscripción Netflix',
      amount: 32000,
      currency: 'COP',
    }),
  },
};

export const Salud: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.HEALTH,
      description: 'Medicinas farmacia',
      amount: 85000,
      currency: 'COP',
    }),
  },
};

export const Educacion: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.EDUCATION,
      description: 'Curso de programación',
      amount: 150000,
      currency: 'COP',
    }),
  },
};

export const CuidadoPersonal: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.PERSONAL_CARE,
      description: 'Corte de cabello',
      amount: 35000,
      currency: 'COP',
    }),
  },
};

export const Familia: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.FAMILY,
      description: 'Ayuda a mamá',
      amount: 200000,
      currency: 'COP',
    }),
  },
};

export const Otros: Story = {
  args: {
    expense: createMockExpense({
      categoryId: DefaultCategoryId.OTHER,
      description: 'Gasto varios',
      amount: 25000,
      currency: 'COP',
    }),
  },
};

// ============================================
// 💱 CURRENCY EXAMPLES
// ============================================

export const MontoEnCOP: Story = {
  name: 'Monto en COP (con conversión)',
  args: {
    expense: createMockExpense({
      amount: 185000,
      currency: 'COP',
      description: 'Mercado semanal',
    }),
  },
};

export const MontoEnUSD: Story = {
  name: 'Monto en USD (sin conversión)',
  args: {
    expense: createMockExpense({
      amount: 50,
      currency: 'USD',
      description: 'Compra en Amazon',
      categoryId: DefaultCategoryId.OTHER,
    }),
  },
};

// ============================================
// ⚠️ LOW CONFIDENCE STATE
// ============================================

export const BajaConfianza: Story = {
  name: 'Baja Confianza (<70%)',
  args: {
    expense: createMockExpense({
      confidence: 0.45,
      description: 'Gasto sin categoría clara',
      categoryId: DefaultCategoryId.OTHER,
    }),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Cuando la confianza de categorización es menor al 70%, se muestra una alerta de "Baja confianza".',
      },
    },
  },
};

export const AltaConfianza: Story = {
  name: 'Alta Confianza (>90%)',
  args: {
    expense: createMockExpense({
      confidence: 0.95,
      description: 'Netflix mensual',
      categoryId: DefaultCategoryId.ENTERTAINMENT,
    }),
  },
};

// ============================================
// 📅 DATE EXAMPLES
// ============================================

export const GastoHoy: Story = {
  name: 'Gasto de Hoy',
  args: {
    expense: createMockExpense({
      date: new Date(),
      description: 'Café de la mañana',
      amount: 8500,
    }),
  },
};

export const GastoAyer: Story = {
  name: 'Gasto de Ayer',
  args: {
    expense: createMockExpense({
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      description: 'Cena con amigos',
      amount: 75000,
    }),
  },
};

export const GastoAntiguo: Story = {
  name: 'Gasto Antiguo',
  args: {
    expense: createMockExpense({
      date: new Date('2026-01-10'),
      description: 'Compra de libros',
      amount: 120000,
      categoryId: DefaultCategoryId.EDUCATION,
    }),
  },
};

// ============================================
// 🎨 ALL CATEGORIES GRID
// ============================================

export const TodasLasCategorias: Story = {
  name: 'Todas las Categorías',
  render: () => (
    <div className="space-y-3 w-[400px]">
      <ExpenseCard
        expense={createMockExpense({
          categoryId: DefaultCategoryId.FOOD,
          description: 'Almuerzo',
          amount: 25000,
        })}
      />
      <ExpenseCard
        expense={createMockExpense({
          categoryId: DefaultCategoryId.TRANSPORT,
          description: 'Uber',
          amount: 15000,
        })}
      />
      <ExpenseCard
        expense={createMockExpense({
          categoryId: DefaultCategoryId.HOME,
          description: 'Servicios',
          amount: 200000,
        })}
      />
      <ExpenseCard
        expense={createMockExpense({
          categoryId: DefaultCategoryId.ENTERTAINMENT,
          description: 'Spotify',
          amount: 18000,
        })}
      />
      <ExpenseCard
        expense={createMockExpense({
          categoryId: DefaultCategoryId.HEALTH,
          description: 'Farmacia',
          amount: 45000,
        })}
      />
      <ExpenseCard
        expense={createMockExpense({
          categoryId: DefaultCategoryId.PERSONAL_CARE,
          description: 'Peluquería',
          amount: 35000,
        })}
      />
      <ExpenseCard
        expense={createMockExpense({
          categoryId: DefaultCategoryId.FAMILY,
          description: 'Mamá',
          amount: 150000,
        })}
      />
    </div>
  ),
};
