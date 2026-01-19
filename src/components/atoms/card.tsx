/**
 * ⚛️ ÁTOMO: Card
 * Contenedor con estilos de tarjeta
 */

import { type FC, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-5 pb-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p
      className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('flex items-center p-5 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};
