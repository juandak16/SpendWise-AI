'use client';

/**
 * ⚛️ ATOM: Input
 * Basic text input field
 * @see architect.md - Atomic Design
 */

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'natural';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: cn(
        'w-full rounded-xl px-4 py-3 text-sm font-medium',
        'bg-slate-50 dark:bg-slate-700/50',
        'border border-slate-200 dark:border-slate-600',
        'text-slate-900 dark:text-slate-100',
        'placeholder:text-slate-400 dark:placeholder:text-slate-500',
        'focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400',
        'focus:ring-2 focus:ring-emerald-500/20',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-200'
      ),
      natural: cn(
        'w-full rounded-2xl px-5 py-4 text-base font-medium',
        'bg-white dark:bg-slate-800',
        'border border-slate-200 dark:border-slate-700',
        'text-slate-900 dark:text-slate-100',
        'placeholder:text-slate-400 dark:placeholder:text-slate-500',
        'focus:outline-none focus:ring-4 focus:ring-emerald-500/20',
        'focus:border-emerald-500 dark:focus:border-emerald-400',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-all duration-200'
      ),
    };

    return (
      <input
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
