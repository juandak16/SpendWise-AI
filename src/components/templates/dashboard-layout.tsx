/**
 * 📄 TEMPLATE: DashboardLayout
 * Main dashboard page layout
 * @see architect.md - Atomic Design (Templates)
 */

import { type FC, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface DashboardLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  header,
  sidebar,
  className,
}) => {
  return (
    <div className={cn('min-h-screen', className)}>
      {/* Header */}
      {header && (
        <div className="w-full max-w-4xl mx-auto pt-8 px-6">
          {header}
        </div>
      )}

      {/* Main content */}
      <div className="flex">
        {/* Sidebar (future expansion) */}
        {sidebar && (
          <aside className="w-64 shrink-0">
            {sidebar}
          </aside>
        )}

        {/* Content */}
        <main className="flex-1 w-full max-w-4xl mx-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
