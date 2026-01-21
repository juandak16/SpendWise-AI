import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

/**
 * Button - Basic interactive element
 *
 * The Button atom is the fundamental clickable element in SpendWise AI.
 * It supports multiple variants and sizes for different use cases.
 */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Default primary button
 */
export const Primary: Story = {
  args: {
    children: 'Agregar Gasto',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Secondary button for less prominent actions
 */
export const Secondary: Story = {
  args: {
    children: 'Cancelar',
    variant: 'secondary',
    size: 'md',
  },
};

/**
 * Ghost button for subtle actions
 */
export const Ghost: Story = {
  args: {
    children: 'Ver más',
    variant: 'ghost',
    size: 'md',
  },
};

/**
 * Danger button for destructive actions
 */
export const Danger: Story = {
  args: {
    children: 'Eliminar',
    variant: 'danger',
    size: 'md',
  },
};

/**
 * Small button variant
 */
export const Small: Story = {
  args: {
    children: 'Pequeño',
    variant: 'primary',
    size: 'sm',
  },
};

/**
 * Large button variant
 */
export const Large: Story = {
  args: {
    children: 'Grande',
    variant: 'primary',
    size: 'lg',
  },
};

/**
 * Button in loading state
 */
export const Loading: Story = {
  args: {
    children: 'Guardando...',
    variant: 'primary',
    isLoading: true,
  },
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    children: 'Deshabilitado',
    variant: 'primary',
    disabled: true,
  },
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
