import type { Meta, StoryObj } from '@storybook/react';
import { CategoryBadge } from './category-badge';
import { DEFAULT_CATEGORIES } from '@/config/categories.config';
import { DefaultCategoryId } from '@/types';

/**
 * 🔬 MOLECULE: CategoryBadge Stories
 * Badge that displays category emoji, name, and color
 * US-STORY-010
 */

const meta: Meta<typeof CategoryBadge> = {
  title: 'Molecules/CategoryBadge',
  component: CategoryBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge de categoría que combina el emoji, nombre y color configurados para cada categoría del sistema.',
      },
    },
  },
  argTypes: {
    categoryId: {
      control: { type: 'select' },
      options: DEFAULT_CATEGORIES.map((c) => c.id),
      description: 'ID de la categoría a mostrar',
    },
    showName: {
      control: 'boolean',
      description: 'Mostrar u ocultar el nombre de la categoría',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
      description: 'Tamaño del badge',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CategoryBadge>;

// ============================================
// 🎨 ALL CATEGORIES
// ============================================

export const Alimentacion: Story = {
  args: {
    categoryId: DefaultCategoryId.FOOD,
    showName: true,
    size: 'md',
  },
};

export const Transporte: Story = {
  args: {
    categoryId: DefaultCategoryId.TRANSPORT,
    showName: true,
    size: 'md',
  },
};

export const Hogar: Story = {
  args: {
    categoryId: DefaultCategoryId.HOME,
    showName: true,
    size: 'md',
  },
};

export const Entretenimiento: Story = {
  args: {
    categoryId: DefaultCategoryId.ENTERTAINMENT,
    showName: true,
    size: 'md',
  },
};

export const Ropa: Story = {
  args: {
    categoryId: DefaultCategoryId.CLOTHING,
    showName: true,
    size: 'md',
  },
};

export const Salud: Story = {
  args: {
    categoryId: DefaultCategoryId.HEALTH,
    showName: true,
    size: 'md',
  },
};

export const Educacion: Story = {
  args: {
    categoryId: DefaultCategoryId.EDUCATION,
    showName: true,
    size: 'md',
  },
};

export const Servicios: Story = {
  args: {
    categoryId: DefaultCategoryId.SERVICES,
    showName: true,
    size: 'md',
  },
};

export const CuidadoPersonal: Story = {
  args: {
    categoryId: DefaultCategoryId.PERSONAL_CARE,
    showName: true,
    size: 'md',
  },
};

export const Familia: Story = {
  args: {
    categoryId: DefaultCategoryId.FAMILY,
    showName: true,
    size: 'md',
  },
};

export const Otros: Story = {
  args: {
    categoryId: DefaultCategoryId.OTHER,
    showName: true,
    size: 'md',
  },
};

// ============================================
// 📏 SIZE VARIATIONS
// ============================================

export const TamanoSmall: Story = {
  name: 'Tamaño Small (sm)',
  args: {
    categoryId: DefaultCategoryId.FOOD,
    showName: true,
    size: 'sm',
  },
};

export const TamanoMedium: Story = {
  name: 'Tamaño Medium (md)',
  args: {
    categoryId: DefaultCategoryId.FOOD,
    showName: true,
    size: 'md',
  },
};

// ============================================
// 🔤 NAME VISIBILITY
// ============================================

export const SoloEmoji: Story = {
  name: 'Solo Emoji (sin nombre)',
  args: {
    categoryId: DefaultCategoryId.ENTERTAINMENT,
    showName: false,
    size: 'md',
  },
};

export const ConNombre: Story = {
  name: 'Con Nombre',
  args: {
    categoryId: DefaultCategoryId.ENTERTAINMENT,
    showName: true,
    size: 'md',
  },
};

// ============================================
// ❌ EDGE CASES
// ============================================

export const SinCategoria: Story = {
  name: 'Sin Categoría (fallback)',
  args: {
    categoryId: undefined,
    showName: true,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando no se proporciona categoría, muestra un badge genérico de "Sin categoría".',
      },
    },
  },
};

export const CategoriaInvalida: Story = {
  name: 'Categoría Inválida',
  args: {
    categoryId: 9999, // Non-existent ID
    showName: true,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Si el ID no existe, también muestra el badge de fallback.',
      },
    },
  },
};

// ============================================
// 🎨 ALL CATEGORIES GRID
// ============================================

export const TodasLasCategorias: Story = {
  name: 'Todas las Categorías',
  render: () => (
    <div className="flex flex-wrap gap-3 max-w-md">
      {DEFAULT_CATEGORIES.map((category) => (
        <CategoryBadge key={category.id} categoryId={category.id} showName={true} size="md" />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vista de todas las categorías disponibles en el sistema.',
      },
    },
  },
};

export const SoloEmojisTodas: Story = {
  name: 'Solo Emojis (Todas)',
  render: () => (
    <div className="flex flex-wrap gap-2">
      {DEFAULT_CATEGORIES.map((category) => (
        <CategoryBadge key={category.id} categoryId={category.id} showName={false} size="md" />
      ))}
    </div>
  ),
};

export const CompactasSmall: Story = {
  name: 'Compactas (sm)',
  render: () => (
    <div className="flex flex-wrap gap-2">
      {DEFAULT_CATEGORIES.map((category) => (
        <CategoryBadge key={category.id} categoryId={category.id} showName={true} size="sm" />
      ))}
    </div>
  ),
};

// ============================================
// 💡 USAGE IN CONTEXT
// ============================================

export const EnListaDeGastos: Story = {
  name: 'En Lista de Gastos',
  render: () => (
    <div className="space-y-2 w-80">
      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <CategoryBadge categoryId={DefaultCategoryId.FOOD} showName={false} size="md" />
          <span className="text-sm text-slate-700 dark:text-slate-300">Pizza con amigos</span>
        </div>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">$12.16</span>
      </div>
      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <CategoryBadge categoryId={DefaultCategoryId.TRANSPORT} showName={false} size="md" />
          <span className="text-sm text-slate-700 dark:text-slate-300">Uber al trabajo</span>
        </div>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">$3.38</span>
      </div>
      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <CategoryBadge categoryId={DefaultCategoryId.ENTERTAINMENT} showName={false} size="md" />
          <span className="text-sm text-slate-700 dark:text-slate-300">Netflix mensual</span>
        </div>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">$8.65</span>
      </div>
    </div>
  ),
};
