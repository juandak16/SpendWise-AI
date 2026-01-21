import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

/**
 * Input - Text input field
 *
 * The Input atom is used for text entry throughout SpendWise AI.
 * It supports default and natural language variants.
 */
const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'natural'],
      description: 'Visual style variant',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Default input for standard text entry
 */
export const Default: Story = {
  args: {
    placeholder: 'Escribe aquí...',
    variant: 'default',
  },
};

/**
 * Natural language input for expense entry
 */
export const Natural: Story = {
  args: {
    placeholder: 'Ej: Gasté 50.000 en el super',
    variant: 'default',
  },
};

/**
 * Input with value
 */
export const WithValue: Story = {
  args: {
    defaultValue: '150.000 en mercado',
    variant: 'default',
  },
};

/**
 * Disabled input state
 */
export const Disabled: Story = {
  args: {
    placeholder: 'No disponible',
    disabled: true,
    variant: 'default',
  },
};

/**
 * Input examples for expense tracking
 */
export const ExpenseExamples: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="text-xs text-slate-500 mb-1 block">Formato COP:</label>
        <Input placeholder="Ej: 80.000 COP en gas" />
      </div>
      <div>
        <label className="text-xs text-slate-500 mb-1 block">Formato USD:</label>
        <Input placeholder="Ej: 25 USD en Netflix" />
      </div>
      <div>
        <label className="text-xs text-slate-500 mb-1 block">Sin moneda (default USD):</label>
        <Input placeholder="Ej: 12 uber al trabajo" />
      </div>
    </div>
  ),
};
