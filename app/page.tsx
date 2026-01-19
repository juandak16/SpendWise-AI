import { Header, ExpenseList, MonthlySummary } from '@/components/organisms'
import { ExpenseInput } from '@/components/molecules'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <main className="relative max-w-xl mx-auto px-4 py-6 sm:py-10">
        
        {/* ========== HEADER ========== */}
        <Header className="mb-8" />

        {/* ========== INPUT SECTION ========== */}
        <section className="mb-8 p-5 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm">
          <ExpenseInput />
        </section>

        {/* ========== STATS SECTION ========== */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            📊 Resumen del mes
          </h2>
          <MonthlySummary />
        </section>

        {/* ========== EXPENSES LIST ========== */}
        <section className="mb-8">
          <ExpenseList limit={10} />
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="text-center py-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            SpendWise AI © 2026 • Gestor de gastos inteligente
          </p>
        </footer>
      </main>
    </div>
  )
}
