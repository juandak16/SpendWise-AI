/**
 * 🧩 React Components (Atomic Design)
 * @see architect.md - Component structure
 *
 * Hierarchy:
 * - atoms/     → Basic UI elements (Button, Input, Badge)
 * - molecules/ → Atom combinations (ExpenseInput, ExpenseCard)
 * - organisms/ → Complete sections (ExpenseList, MonthlySummary)
 * - templates/ → Page layouts (DashboardLayout)
 * - providers/ → Context providers (ToasterProvider)
 */

// ⚛️ Atoms
export * from './atoms';

// 🔬 Molecules
export * from './molecules';

// 🦠 Organisms
export * from './organisms';

// 📄 Templates
export * from './templates';

// 🔌 Providers
export * from './providers';
