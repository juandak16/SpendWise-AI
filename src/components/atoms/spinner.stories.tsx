import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

/**
 * Spinner - Loading indicator
 *
 * The Spinner atom provides visual feedback during
 * asynchronous operations like saving expenses.
 */
const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/**
 * Default medium spinner
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Small spinner for inline use
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Large spinner for page loading
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <Spinner size="sm" />
        <p className="text-xs text-slate-500 mt-2">Small</p>
      </div>
      <div className="text-center">
        <Spinner size="md" />
        <p className="text-xs text-slate-500 mt-2">Medium</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-xs text-slate-500 mt-2">Large</p>
      </div>
    </div>
  ),
};

/**
 * Loading state example
 */
export const LoadingContext: Story = {
  render: () => (
    <div className="flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
      <Spinner size="sm" />
      <span className="text-sm text-slate-600 dark:text-slate-300">
        Guardando gasto...
      </span>
    </div>
  ),
};
