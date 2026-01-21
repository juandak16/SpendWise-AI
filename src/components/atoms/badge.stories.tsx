import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

/**
 * Badge - Small label component
 *
 * The Badge atom displays status indicators, categories,
 * and other small pieces of contextual information.
 */
const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Badge size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Default badge
 */
export const Default: Story = {
  args: {
    children: 'Etiqueta',
    variant: 'default',
  },
};

/**
 * Success badge for positive states
 */
export const Success: Story = {
  args: {
    children: '✓ Registrado',
    variant: 'success',
  },
};

/**
 * Warning badge for attention states
 */
export const Warning: Story = {
  args: {
    children: '⚠ Baja confianza',
    variant: 'warning',
  },
};

/**
 * Danger badge for error states
 */
export const Danger: Story = {
  args: {
    children: '✕ Error',
    variant: 'danger',
  },
};

/**
 * Info badge for informational content
 */
export const Info: Story = {
  args: {
    children: 'ℹ Información',
    variant: 'info',
  },
};

/**
 * Small badge size
 */
export const Small: Story = {
  args: {
    children: 'Pequeño',
    size: 'sm',
  },
};

/**
 * Category badges example
 */
export const CategoryExamples: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge style={{ backgroundColor: '#f9731620', color: '#f97316' }}>
        🍔 Alimentación
      </Badge>
      <Badge style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
        🚗 Transporte
      </Badge>
      <Badge style={{ backgroundColor: '#8b5cf620', color: '#8b5cf6' }}>
        🏠 Hogar
      </Badge>
      <Badge style={{ backgroundColor: '#ec489920', color: '#ec4899' }}>
        🎬 Entretenimiento
      </Badge>
      <Badge style={{ backgroundColor: '#64748b20', color: '#64748b' }}>
        🎁 Otros
      </Badge>
    </div>
  ),
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};
