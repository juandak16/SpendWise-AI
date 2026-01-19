/**
 * 🧩 Componentes React (Atomic Design)
 * @see architect.md - Estructura de componentes
 *
 * Jerarquía:
 * - atoms/     → Elementos UI básicos (Button, Input, Badge)
 * - molecules/ → Combinación de átomos (ExpenseInput, ExpenseCard)
 * - organisms/ → Secciones completas (ExpenseList, MonthlySummary)
 * - templates/ → Layouts de página (DashboardLayout)
 * - providers/ → Context providers (ToasterProvider)
 */

// ⚛️ Átomos
export * from './atoms';

// 🔬 Moléculas
export * from './molecules';

// 🦠 Organismos
export * from './organisms';

// 📄 Templates
export * from './templates';

// 🔌 Providers
export * from './providers';
