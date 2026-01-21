import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import '../app/globals.css';

/**
 * Theme decorator that applies dark/light mode classes
 * and proper background colors for SpendWise AI
 */
const withTheme: Decorator = (Story, context) => {
  // Get the selected background from toolbar
  const selectedBackground = context.globals.backgrounds?.value;
  const isDark = selectedBackground === '#0f172a' || 
                 (!selectedBackground && context.parameters.backgrounds?.default === 'dark');

  return (
    <div 
      className={isDark ? 'dark' : ''}
      style={{
        minHeight: '100%',
        padding: '1rem',
      }}
    >
      <div 
        className={`
          min-h-[200px] rounded-xl p-6
          ${isDark 
            ? 'bg-slate-900 text-slate-100' 
            : 'bg-slate-50 text-slate-900'
          }
        `}
      >
        <Story />
      </div>
    </div>
  );
};

const preview: Preview = {
  parameters: {
    // Set dark as default background
    backgrounds: {
      default: 'dark',
      values: [
        { 
          name: 'dark', 
          value: '#0f172a',  // slate-900
        },
        { 
          name: 'light', 
          value: '#f8fafc',  // slate-50
        },
        {
          name: 'app-dark',
          value: '#0f172a',
        },
      ],
    },
    // Control matchers
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Centered layout for components
    layout: 'centered',
    // Next.js configuration
    nextjs: {
      appDirectory: true,
    },
  },

  // Global types for toolbar controls
  globalTypes: {
    theme: {
      name: 'Tema',
      description: 'Cambiar entre tema claro y oscuro',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Tema Claro' },
          { value: 'dark', icon: 'moon', title: 'Tema Oscuro' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  // Decorators
  decorators: [withTheme],

  // Auto-generate docs
  tags: ['autodocs'],
};

export default preview;
