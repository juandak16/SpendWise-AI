import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, type KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Input } from '@/components/atoms';
import { cn } from '@/lib/utils';

/**
 * ExpenseInput - Natural language expense entry
 *
 * This molecule allows users to enter expenses using natural Spanish phrases.
 * It includes a premium input field, submit button, and quick example buttons.
 *
 * **UI Language:** Spanish (as per project rules)
 */

// Standalone component for Storybook (without Zustand dependency)
interface ExpenseInputDemoProps {
  isLoading?: boolean;
  onSubmit?: (value: string) => void;
  initialValue?: string;
  placeholder?: string;
}

const ExpenseInputDemo: React.FC<ExpenseInputDemoProps> = ({
  isLoading = false,
  onSubmit,
  initialValue = '',
  placeholder = 'Ej: 50.000 en el super',
}) => {
  const [input, setInput] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    onSubmit?.(trimmedInput);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Registra un gasto
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Escribe en lenguaje natural
          </p>
        </div>
      </div>

      {/* Input Row */}
      <div className="flex gap-2">
        <div
          className={cn(
            'flex-1 relative rounded-xl transition-all duration-200',
            isFocused && 'ring-2 ring-emerald-500/30'
          )}
        >
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isLoading}
            autoComplete="off"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            'bg-gradient-to-r from-emerald-500 to-teal-500',
            'shadow-lg shadow-emerald-500/20',
            'hover:shadow-emerald-500/30 hover:scale-105',
            'active:scale-95',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
            'transition-all duration-200'
          )}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-1.5">
        {['50.000 super', '12.500 uber', '32.000 netflix'].map((example) => (
          <button
            key={example}
            onClick={() => setInput(example)}
            disabled={isLoading}
            className="px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600/50 disabled:opacity-50 transition-colors"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof ExpenseInputDemo> = {
  title: 'Molecules/ExpenseInput',
  component: ExpenseInputDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
El componente **ExpenseInput** permite a los usuarios registrar gastos usando lenguaje natural en español.

### Características:
- 📝 Input con placeholder dinámico
- ⚡ Botón de envío con estados visual
- 🏷️ Botones de ejemplos rápidos
- 🔄 Estado de carga animado
- ⌨️ Envío con tecla Enter

### Formatos de entrada soportados:
- \`50.000 en el super\` (COP implícito)
- \`25 USD netflix\` (USD explícito)
- \`80.000 COP en gas\` (COP explícito)
        `,
      },
    },
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Muestra el estado de carga',
    },
    initialValue: {
      control: 'text',
      description: 'Valor inicial del input',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback cuando se envía el formulario',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExpenseInputDemo>;

/**
 * Estado por defecto del componente
 */
export const Default: Story = {
  args: {
    isLoading: false,
    placeholder: 'Ej: 50.000 en el super',
  },
};

/**
 * Input con valor pre-cargado
 */
export const WithValue: Story = {
  args: {
    initialValue: '150.000 mercado semanal',
    isLoading: false,
  },
};

/**
 * Estado de carga mientras se procesa el gasto
 */
export const Loading: Story = {
  args: {
    initialValue: '25.000 almuerzo',
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el spinner de carga mientras se procesa el gasto. El input y los botones de ejemplo quedan deshabilitados.',
      },
    },
  },
};

/**
 * Placeholder para gastos en USD
 */
export const USDPlaceholder: Story = {
  args: {
    placeholder: 'Ej: 25 USD en Netflix',
    isLoading: false,
  },
};

/**
 * Placeholder para gastos en COP
 */
export const COPPlaceholder: Story = {
  args: {
    placeholder: 'Ej: 80.000 COP en gas',
    isLoading: false,
  },
};

/**
 * Demostración interactiva de los botones de ejemplo
 */
export const QuickExamplesDemo: Story = {
  render: () => {
    const [lastSubmitted, setLastSubmitted] = React.useState<string | null>(null);

    return (
      <div className="space-y-4">
        <ExpenseInputDemo
          onSubmit={(value) => setLastSubmitted(value)}
        />
        {lastSubmitted && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              ✓ Gasto enviado: <strong>{lastSubmitted}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Haz clic en los botones de ejemplo para pre-llenar el input, luego envía con Enter o el botón.',
      },
    },
  },
};

/**
 * Todos los estados del componente
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <div>
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
          Estado Normal
        </p>
        <ExpenseInputDemo placeholder="Ej: 50.000 en el super" />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
          Con Valor
        </p>
        <ExpenseInputDemo initialValue="75.000 restaurante" />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
          Cargando
        </p>
        <ExpenseInputDemo initialValue="32.000 netflix" isLoading />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparación de todos los estados visuales del componente.',
      },
    },
  },
};

/**
 * Ejemplos de entradas válidas
 */
export const ValidInputExamples: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          📝 Formatos de entrada válidos
        </h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            <code className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">50.000 en el super</code>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            <code className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Uber 12.500</code>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            <code className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Netflix 15 USD</code>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            <code className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">80.000 COP en gas</code>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            <code className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Almuerzo ayer 25.000</code>
          </li>
        </ul>
      </div>

      <ExpenseInputDemo placeholder="Prueba uno de los formatos..." />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Muestra ejemplos de formatos de entrada válidos que el parser de lenguaje natural puede interpretar.',
      },
    },
  },
};
