---
name: "Archi"
role: "System Architect"
persona: "Pragmático, experto en Next.js, TypeScript y patrones de diseño. Prioriza la mantenibilidad y el tipado estricto."
commands:
  - "*define-boilerplate"
  - "*setup-types"
  - "*enforce-standards"
---

# 🏗️ Archi - System Architect

## Descripción del Agente

Archi es el arquitecto de sistemas de SpendWise AI. Su responsabilidad es definir la estructura técnica del proyecto, garantizar el tipado estricto con TypeScript, y establecer patrones de diseño que faciliten la mantenibilidad y escalabilidad del código.

> **Referencia:** Este documento se basa en los requerimientos funcionales definidos por **Penny** en [`analyst.md`](./analyst.md).

---

## 1. Estructura de Carpetas (Next.js 14 App Router)

```
spendwise-ai/
├── .bmad/                      # 🤖 Configuración de agentes BMAD
│   ├── analyst.md              # Penny - Requerimientos de producto
│   ├── architect.md            # Archi - Arquitectura técnica
│   └── ...
│
├── app/                        # 📱 Next.js App Router
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Estilos globales + Tailwind
│   │
│   ├── (dashboard)/            # Grupo de rutas del dashboard
│   │   ├── layout.tsx          # Layout compartido del dashboard
│   │   ├── page.tsx            # /dashboard - Vista principal
│   │   ├── expenses/
│   │   │   └── page.tsx        # /dashboard/expenses - Lista de gastos
│   │   ├── categories/
│   │   │   └── page.tsx        # /dashboard/categories - Gestión categorías
│   │   └── reports/
│   │       └── page.tsx        # /dashboard/reports - Reportes y gráficas
│   │
│   └── api/                    # 🔌 API Routes (si se necesitan)
│       └── expenses/
│           └── route.ts
│
├── components/                 # 🧩 Componentes React (Atomic Design)
│   │
│   ├── atoms/                  # ⚛️ ÁTOMOS - Elementos UI básicos e indivisibles
│   │   ├── button.tsx          # Botón base
│   │   ├── input.tsx           # Input de texto
│   │   ├── badge.tsx           # Badge/etiqueta
│   │   ├── spinner.tsx         # Loading spinner
│   │   ├── icon.tsx            # Wrapper de iconos
│   │   └── index.ts
│   │
│   ├── molecules/              # 🔬 MOLÉCULAS - Combinación de átomos con función específica
│   │   ├── expense-input.tsx   # Input + Button para agregar gastos
│   │   ├── expense-card.tsx    # Card + Badge + CurrencyDisplay
│   │   ├── category-badge.tsx  # Badge con emoji y color de categoría
│   │   ├── currency-display.tsx # Monto formateado con símbolo
│   │   ├── stat-card.tsx       # Card con título, valor y tendencia
│   │   ├── search-input.tsx    # Input con icono de búsqueda
│   │   └── index.ts
│   │
│   ├── organisms/              # 🦠 ORGANISMOS - Secciones completas de UI
│   │   ├── expense-list.tsx    # Lista completa de gastos (molecules)
│   │   ├── expense-form.tsx    # Formulario completo de edición
│   │   ├── category-picker.tsx # Selector con lista de categorías
│   │   ├── monthly-summary.tsx # Resumen mensual con stats
│   │   ├── category-chart.tsx  # Gráfica de gastos por categoría
│   │   ├── header.tsx          # Header de la app
│   │   ├── sidebar.tsx         # Navegación lateral
│   │   └── index.ts
│   │
│   ├── templates/              # 📄 TEMPLATES - Layouts de página
│   │   ├── dashboard-layout.tsx # Layout del dashboard
│   │   ├── auth-layout.tsx     # Layout de autenticación (futuro)
│   │   └── index.ts
│   │
│   └── providers/              # 🔌 PROVIDERS - Context providers
│       ├── toaster-provider.tsx # Sistema de notificaciones
│       └── index.ts
│
├── lib/                        # 📚 Utilidades y lógica compartida
│   ├── utils.ts                # Utilidades generales (cn, formatters)
│   └── constants.ts            # Constantes globales
│
├── services/                   # 🔧 Service Layer (Lógica de negocio)
│   ├── expense-parser.service.ts    # Parseo de lenguaje natural
│   ├── categorizer.service.ts       # Categorización automática
│   ├── calculator.service.ts        # Cálculos financieros
│   └── storage.service.ts           # Persistencia de datos
│
├── stores/                     # 🗄️ Estado global (Zustand)
│   ├── expense.store.ts        # Store de gastos
│   ├── category.store.ts       # Store de categorías
│   └── settings.store.ts       # Store de configuración
│
├── types/                      # 📝 Definiciones de TypeScript
│   ├── expense.types.ts        # Tipos relacionados a gastos
│   ├── category.types.ts       # Tipos de categorías
│   ├── currency.types.ts       # Tipos de monedas
│   └── index.ts                # Barrel export
│
├── hooks/                      # 🪝 Custom React Hooks
│   ├── use-expenses.ts         # Hook para operaciones de gastos
│   ├── use-categories.ts       # Hook para categorías
│   └── use-currency-format.ts  # Hook para formateo de moneda
│
├── config/                     # ⚙️ Configuración
│   ├── categories.config.ts    # Categorías por defecto
│   └── currencies.config.ts    # Configuración de monedas
│
└── public/                     # 📁 Assets estáticos
    └── icons/
```

---

## 2. Definiciones de TypeScript

> **Fuente:** Basado en la estructura sugerida por Penny en [`analyst.md`](./analyst.md#estructura-de-datos-sugerida).

### `types/currency.types.ts`

```typescript
/**
 * Códigos de moneda soportados por SpendWise AI
 * @see analyst.md - Sección de monedas
 */
export type CurrencyCode = 'COP' | 'USD';

/**
 * Configuración de formato para cada moneda
 */
export interface CurrencyConfig {
  readonly code: CurrencyCode;
  readonly symbol: string;
  readonly name: string;
  readonly decimals: number;
  readonly thousandsSep: string;
  readonly decimalSep: string;
}

/**
 * Mapa de configuraciones de moneda
 */
export type CurrencyMap = Record<CurrencyCode, CurrencyConfig>;
```

### `types/category.types.ts`

```typescript
/**
 * Categoría de gasto
 * @see analyst.md - Tabla de categorías base
 */
export interface Category {
  readonly id: number;
  readonly name: string;
  readonly emoji: string;
  readonly keywords: readonly string[];
  readonly color: string;
  readonly isDefault: boolean;
  readonly createdAt: Date;
}

/**
 * IDs de categorías predefinidas (inmutables)
 */
export enum DefaultCategoryId {
  FOOD = 1,
  TRANSPORT = 2,
  HOME = 3,
  ENTERTAINMENT = 4,
  CLOTHING = 5,
  HEALTH = 6,
  EDUCATION = 7,
  SERVICES = 8,
  OTHER = 9,
}

/**
 * Input para crear una categoría personalizada
 */
export interface CreateCategoryInput {
  name: string;
  emoji: string;
  keywords: string[];
  color: string;
}
```

### `types/expense.types.ts`

```typescript
import type { CurrencyCode } from './currency.types';
import type { Category } from './category.types';

/**
 * Gasto registrado en el sistema
 * @see analyst.md - Interface Expense
 */
export interface Expense {
  readonly id: string;
  readonly amount: number;           // Almacenado en unidad mínima (pesos COP, centavos USD)
  readonly currency: CurrencyCode;
  readonly categoryId: number;
  readonly description: string;
  readonly originalInput: string;    // Texto original del usuario
  readonly date: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly confidence: number;       // 0-1, certeza de categorización
  readonly isManualCategory: boolean; // true si el usuario reasignó la categoría
}

/**
 * Resultado del parsing de lenguaje natural
 * @see analyst.md - Comando *structure-expense
 */
export interface ParsedExpense {
  amount: number;
  currency: CurrencyCode;
  categoryId: number;
  description: string;
  date: Date;
  confidence: number;
  suggestedCategories?: Array<{
    categoryId: number;
    confidence: number;
  }>;
}

/**
 * Input para crear un nuevo gasto
 */
export interface CreateExpenseInput {
  naturalLanguageInput: string;
}

/**
 * Input para actualizar un gasto existente
 */
export interface UpdateExpenseInput {
  id: string;
  amount?: number;
  currency?: CurrencyCode;
  categoryId?: number;
  description?: string;
  date?: Date;
}

/**
 * Filtros para consultar gastos
 */
export interface ExpenseFilters {
  startDate?: Date;
  endDate?: Date;
  categoryIds?: number[];
  currency?: CurrencyCode;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
}

/**
 * Gasto con su categoría expandida (para UI)
 */
export interface ExpenseWithCategory extends Expense {
  category: Category;
}
```

### `types/stats.types.ts`

```typescript
import type { CurrencyCode } from './currency.types';

/**
 * Resumen mensual de gastos
 * @see analyst.md - Métricas requeridas
 */
export interface MonthlySummary {
  readonly month: number;            // 1-12
  readonly year: number;
  readonly currency: CurrencyCode;
  readonly totalAmount: number;
  readonly transactionCount: number;
  readonly dailyAverage: number;
  readonly topCategory: {
    categoryId: number;
    amount: number;
    percentage: number;
  };
  readonly projectedTotal: number;   // Proyección a fin de mes
  readonly vsLastMonth: {
    amount: number;
    percentage: number;
    trend: 'up' | 'down' | 'stable';
  };
}

/**
 * Totales agrupados por categoría
 */
export interface CategoryTotal {
  readonly categoryId: number;
  readonly amount: number;
  readonly count: number;
  readonly percentage: number;       // Del total mensual
}

/**
 * Estadísticas diarias para gráficas
 */
export interface DailyStats {
  readonly date: Date;
  readonly amount: number;
  readonly count: number;
}
```

### `types/index.ts` (Barrel Export)

```typescript
// Currency
export type { CurrencyCode, CurrencyConfig, CurrencyMap } from './currency.types';

// Category
export type { Category, CreateCategoryInput } from './category.types';
export { DefaultCategoryId } from './category.types';

// Expense
export type {
  Expense,
  ParsedExpense,
  CreateExpenseInput,
  UpdateExpenseInput,
  ExpenseFilters,
  ExpenseWithCategory,
} from './expense.types';

// Stats
export type {
  MonthlySummary,
  CategoryTotal,
  DailyStats,
} from './stats.types';
```

---

## 3. Estrategia de Componentes (Atomic Design)

### Metodología Atomic Design

SpendWise AI utiliza **Atomic Design** para organizar componentes de forma escalable y mantenible.

```
┌─────────────────────────────────────────────────────────────────┐
│                      ATOMIC DESIGN                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ⚛️ ÁTOMOS        →  Elementos UI indivisibles                 │
│      (atoms/)          Button, Input, Badge, Spinner, Icon      │
│         │                                                       │
│         ▼                                                       │
│   🔬 MOLÉCULAS     →  Combinación de átomos con propósito       │
│      (molecules/)      ExpenseInput, CategoryBadge, StatCard    │
│         │                                                       │
│         ▼                                                       │
│   🦠 ORGANISMOS    →  Secciones completas de UI                 │
│      (organisms/)      ExpenseList, MonthlySummary, Header      │
│         │                                                       │
│         ▼                                                       │
│   📄 TEMPLATES     →  Layouts de página                         │
│      (templates/)      DashboardLayout, AuthLayout              │
│         │                                                       │
│         ▼                                                       │
│   📱 PÁGINAS       →  Instancias de templates con datos         │
│      (app/)            page.tsx en cada ruta                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Reglas de Atomic Design

| Nivel | Puede importar de | NO puede importar de |
|-------|-------------------|----------------------|
| **Atoms** | Solo libs externas, utils | Molecules, Organisms, Templates |
| **Molecules** | Atoms, libs, utils | Organisms, Templates |
| **Organisms** | Atoms, Molecules, libs, utils | Templates |
| **Templates** | Atoms, Molecules, Organisms | - |

### Ejemplos por Nivel

#### ⚛️ Átomos (`components/atoms/`)
Elementos UI básicos, sin lógica de negocio:

```typescript
// atoms/button.tsx
export const Button: FC<ButtonProps> = ({ children, variant, ...props }) => (
  <button className={cn(variants[variant])} {...props}>{children}</button>
);

// atoms/badge.tsx
export const Badge: FC<BadgeProps> = ({ children, color }) => (
  <span className={cn('badge', color)}>{children}</span>
);
```

#### 🔬 Moléculas (`components/molecules/`)
Combinan átomos para una función específica:

```typescript
// molecules/expense-input.tsx - Combina Input + Button
export const ExpenseInput: FC = () => {
  return (
    <div>
      <Input variant="natural" />  {/* Átomo */}
      <Button>Agregar</Button>     {/* Átomo */}
    </div>
  );
};

// molecules/category-badge.tsx - Combina Badge + datos de categoría
export const CategoryBadge: FC<{ category: Category }> = ({ category }) => (
  <Badge color={category.color}>
    {category.emoji} {category.name}
  </Badge>
);
```

#### 🦠 Organismos (`components/organisms/`)
Secciones completas que combinan moléculas:

```typescript
// organisms/expense-list.tsx - Combina múltiples ExpenseCard
export const ExpenseList: FC = () => {
  const { expenses } = useExpenseStore();
  return (
    <div>
      {expenses.map(expense => (
        <ExpenseCard key={expense.id} expense={expense} /> {/* Molécula */}
      ))}
    </div>
  );
};
```

### Principios de Diseño

| Principio | Descripción |
|-----------|-------------|
| **Composición** | Componentes pequeños y composables |
| **Single Responsibility** | Cada componente hace UNA cosa bien |
| **Reusabilidad** | Átomos y moléculas deben ser reutilizables |
| **Server-first** | Server Components por defecto, Client solo cuando necesario |
| **Tipado estricto** | Props tipadas, sin `any`, strict mode habilitado |

### Convención de Componentes

```typescript
// molecules/expense-card.tsx

'use client'; // Solo si necesita interactividad

import { type FC } from 'react';
import { Card } from '@/components/atoms';
import { CategoryBadge, CurrencyDisplay } from '@/components/molecules';
import type { ExpenseWithCategory } from '@/types';

interface ExpenseCardProps {
  expense: ExpenseWithCategory;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ExpenseCard: FC<ExpenseCardProps> = ({
  expense,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CategoryBadge category={expense.category} />
        <CurrencyDisplay
          amount={expense.amount}
          currency={expense.currency}
        />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {expense.description}
        </p>
      </CardContent>
    </Card>
  );
};
```

### Tailwind - Clases Semánticas

Definir clases utilitarias en `globals.css`:

```css
@layer components {
  /* Cards */
  .card-expense {
    @apply rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md;
  }
  
  /* Input de lenguaje natural */
  .input-natural {
    @apply w-full rounded-lg border-2 border-dashed border-muted-foreground/25 
           bg-muted/50 px-4 py-3 text-lg placeholder:text-muted-foreground/50
           focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20;
  }
  
  /* Badges de categoría */
  .badge-category {
    @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium;
  }
}
```

---

## 4. Service Layer

> **Objetivo:** Separar la lógica de negocio de la capa de UI. Los servicios son funciones puras (sin estado) que implementan la lógica definida por Penny.

### `services/expense-parser.service.ts`

```typescript
/**
 * Servicio de parsing de gastos desde lenguaje natural
 * @see analyst.md - Sección "Ingreso de Gastos en Lenguaje Natural"
 */

import type { ParsedExpense, CurrencyCode } from '@/types';
import { categorizerService } from './categorizer.service';

// Patrones regex para detectar montos
const AMOUNT_PATTERNS = {
  // "150.000" o "150,000" o "150000"
  withThousands: /(\d{1,3}(?:[.,]\d{3})+)/,
  // "150.50" decimal
  decimal: /(\d+[.,]\d{1,2})(?!\d)/,
  // "150" simple
  simple: /(\d+)/,
};

// Patrones para detectar USD
const USD_PATTERNS = /\b(usd|dolar|dolares|dollars?)\b/i;

// Verbos de gasto en español
const EXPENSE_VERBS = /\b(gast[eéo]|pagu[eé]|compr[eé]|fueron|cost[oó])\b/i;

export const expenseParserService = {
  /**
   * Parsea una entrada de lenguaje natural a un objeto estructurado
   */
  parse(input: string): ParsedExpense {
    const normalizedInput = input.trim().toLowerCase();
    
    // 1. Detectar moneda
    const currency = this.detectCurrency(normalizedInput);
    
    // 2. Extraer monto
    const amount = this.extractAmount(normalizedInput, currency);
    
    // 3. Extraer descripción (palabras clave)
    const description = this.extractDescription(normalizedInput);
    
    // 4. Detectar fecha
    const date = this.extractDate(normalizedInput);
    
    // 5. Categorizar
    const categorization = categorizerService.categorize(description);
    
    return {
      amount,
      currency,
      categoryId: categorization.categoryId,
      description,
      date,
      confidence: categorization.confidence,
      suggestedCategories: categorization.suggestions,
    };
  },

  detectCurrency(input: string): CurrencyCode {
    return USD_PATTERNS.test(input) ? 'USD' : 'COP';
  },

  extractAmount(input: string, currency: CurrencyCode): number {
    // Lógica de extracción según formato de moneda
    // COP: puntos como separador de miles
    // USD: comas como separador de miles, punto decimal
    // ... implementación
    return 0; // placeholder
  },

  extractDescription(input: string): string {
    // Remover montos, verbos y palabras comunes
    // Retornar las palabras clave relevantes
    return ''; // placeholder
  },

  extractDate(input: string): Date {
    // Detectar "ayer", "hoy", fechas específicas
    // Por defecto: fecha actual
    return new Date();
  },
};
```

### `services/categorizer.service.ts`

```typescript
/**
 * Servicio de categorización automática
 * @see analyst.md - Sección "Categorización Automática"
 */

import { DEFAULT_CATEGORIES } from '@/config/categories.config';
import type { Category } from '@/types';

interface CategorizationResult {
  categoryId: number;
  confidence: number;
  suggestions: Array<{
    categoryId: number;
    confidence: number;
  }>;
}

const CONFIDENCE_THRESHOLD = 0.7; // 70% mínimo según analyst.md
const OTHER_CATEGORY_ID = 9;

export const categorizerService = {
  /**
   * Categoriza una descripción de gasto
   */
  categorize(description: string): CategorizationResult {
    const words = description.toLowerCase().split(/\s+/);
    const scores: Map<number, number> = new Map();

    // 1. Buscar coincidencias exactas en keywords
    for (const category of DEFAULT_CATEGORIES) {
      let score = 0;
      for (const word of words) {
        if (category.keywords.includes(word)) {
          score += 1;
        }
        // Fuzzy matching parcial
        for (const keyword of category.keywords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 0.5;
          }
        }
      }
      if (score > 0) {
        scores.set(category.id, score);
      }
    }

    // 2. Ordenar por score y calcular confianza
    const sorted = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1]);

    if (sorted.length === 0) {
      return {
        categoryId: OTHER_CATEGORY_ID,
        confidence: 0,
        suggestions: [],
      };
    }

    const maxScore = sorted[0][1];
    const totalScore = sorted.reduce((acc, [, score]) => acc + score, 0);
    const confidence = maxScore / (totalScore || 1);

    // 3. Si confianza < 70%, usar "Otros"
    const categoryId = confidence >= CONFIDENCE_THRESHOLD
      ? sorted[0][0]
      : OTHER_CATEGORY_ID;

    return {
      categoryId,
      confidence,
      suggestions: sorted.slice(0, 3).map(([catId, score]) => ({
        categoryId: catId,
        confidence: score / totalScore,
      })),
    };
  },

  /**
   * Registra feedback del usuario para mejorar futuras categorizaciones
   */
  recordFeedback(
    description: string,
    suggestedCategoryId: number,
    selectedCategoryId: number
  ): void {
    // Guardar en localStorage para aprendizaje
    // Esta información mejorará las predicciones futuras
  },
};
```

### `services/calculator.service.ts`

```typescript
/**
 * Servicio de cálculos financieros
 * @see analyst.md - Sección "Suma de Totales" y "Precisión numérica"
 */

import type { Expense, MonthlySummary, CategoryTotal, CurrencyCode } from '@/types';

export const calculatorService = {
  /**
   * Calcula el resumen mensual
   * NOTA: Todos los cálculos internos usan integers para evitar errores de punto flotante
   */
  calculateMonthlySummary(
    expenses: Expense[],
    month: number,
    year: number,
    currency: CurrencyCode
  ): MonthlySummary {
    const filtered = expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() + 1 === month 
        && d.getFullYear() === year 
        && e.currency === currency;
    });

    const totalAmount = filtered.reduce((sum, e) => sum + e.amount, 0);
    const transactionCount = filtered.length;
    
    // Días transcurridos del mes
    const today = new Date();
    const daysElapsed = today.getMonth() + 1 === month && today.getFullYear() === year
      ? today.getDate()
      : new Date(year, month, 0).getDate();
    
    const dailyAverage = transactionCount > 0 
      ? Math.round(totalAmount / daysElapsed)
      : 0;

    // Top categoría
    const categoryTotals = this.calculateCategoryTotals(filtered);
    const topCategory = categoryTotals[0] || { 
      categoryId: 9, 
      amount: 0, 
      percentage: 0, 
      count: 0 
    };

    // Proyección: (total / días transcurridos) * días del mes
    const daysInMonth = new Date(year, month, 0).getDate();
    const projectedTotal = Math.round((totalAmount / daysElapsed) * daysInMonth);

    return {
      month,
      year,
      currency,
      totalAmount,
      transactionCount,
      dailyAverage,
      topCategory: {
        categoryId: topCategory.categoryId,
        amount: topCategory.amount,
        percentage: topCategory.percentage,
      },
      projectedTotal,
      vsLastMonth: this.compareWithLastMonth(expenses, month, year, currency, totalAmount),
    };
  },

  /**
   * Calcula totales por categoría
   */
  calculateCategoryTotals(expenses: Expense[]): CategoryTotal[] {
    const totals = new Map<number, { amount: number; count: number }>();
    const grandTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

    for (const expense of expenses) {
      const current = totals.get(expense.categoryId) || { amount: 0, count: 0 };
      totals.set(expense.categoryId, {
        amount: current.amount + expense.amount,
        count: current.count + 1,
      });
    }

    return Array.from(totals.entries())
      .map(([categoryId, { amount, count }]) => ({
        categoryId,
        amount,
        count,
        percentage: grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  },

  /**
   * Compara con el mes anterior
   */
  compareWithLastMonth(
    expenses: Expense[],
    month: number,
    year: number,
    currency: CurrencyCode,
    currentTotal: number
  ): MonthlySummary['vsLastMonth'] {
    const lastMonth = month === 1 ? 12 : month - 1;
    const lastYear = month === 1 ? year - 1 : year;

    const lastMonthExpenses = expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() + 1 === lastMonth 
        && d.getFullYear() === lastYear 
        && e.currency === currency;
    });

    const lastTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const diff = currentTotal - lastTotal;
    const percentage = lastTotal > 0 
      ? Math.round((diff / lastTotal) * 100) 
      : 0;

    return {
      amount: diff,
      percentage,
      trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'stable',
    };
  },
};
```

### `services/storage.service.ts`

```typescript
/**
 * Servicio de persistencia de datos
 * MVP: localStorage
 * v2: Migrar a SQLite/Postgres
 */

import type { Expense, Category } from '@/types';

const STORAGE_KEYS = {
  EXPENSES: 'spendwise_expenses',
  CATEGORIES: 'spendwise_categories',
  USER_KEYWORDS: 'spendwise_user_keywords',
} as const;

export const storageService = {
  // === EXPENSES ===
  
  getExpenses(): Expense[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
  },

  saveExpense(expense: Expense): void {
    const expenses = this.getExpenses();
    expenses.push(expense);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  },

  updateExpense(id: string, updates: Partial<Expense>): void {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updates, updatedAt: new Date() };
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    }
  },

  deleteExpense(id: string): void {
    const expenses = this.getExpenses().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  },

  // === CATEGORIES ===
  
  getCustomCategories(): Category[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : [];
  },

  saveCategory(category: Category): void {
    const categories = this.getCustomCategories();
    categories.push(category);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },
};
```

---

## Comandos del Agente

### `*define-boilerplate`

Genera la estructura base de archivos para una nueva feature.

**Uso:**
```
*define-boilerplate feature:budgets
```

**Output:** Crea archivos en `components/budgets/`, `types/budget.types.ts`, `services/budget.service.ts`

### `*setup-types`

Genera o actualiza definiciones de TypeScript basadas en requerimientos.

**Uso:**
```
*setup-types from:analyst.md section:"Estructura de datos"
```

### `*enforce-standards`

Valida que el código siga los estándares definidos.

**Uso:**
```
*enforce-standards check:naming
*enforce-standards check:types
*enforce-standards check:structure
```

---

## Dependencias Requeridas

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "zustand": "^4.5.0",
    "date-fns": "^3.3.0",
    "uuid": "^9.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/uuid": "^9.0.0"
  }
}
```

---

*Documento mantenido por el agente Archi. Referencia: [`analyst.md`](./analyst.md)*
