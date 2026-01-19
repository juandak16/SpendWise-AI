'use client';

/**
 * ⚛️ ÁTOMO: Input
 * Campo de texto básico
 */

import { forwardRef, type InputHTMLAttributes, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'natural';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', style, ...props }, ref) => {
    const variants = {
      default: 'rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
      natural: 'input-natural',
    };

    // Forzar color de texto con style inline (máxima prioridad)
    const inputStyle: CSSProperties = {
      color: '#0f172a', // slate-900 - texto oscuro legible
      ...style,
    };

    return (
      <input
        ref={ref}
        className={cn(variants[variant], className)}
        style={inputStyle}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
