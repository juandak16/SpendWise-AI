# SpendWise AI - Source Tree

> **Generated:** 2026-01-20  
> **Maintained by:** Archi (System Architect)  
> **Status:** 🟢 Canonical Reference

This document is the **authoritative source** for the project's folder structure. All agents must consult this file before creating new files or directories.

---

## 📁 Project Root Structure

```
spendwise-ai/
├── .bmad-core/                 # 🤖 BMAD Framework v6 (DO NOT MODIFY)
├── app/                        # 📱 Next.js App Router
├── src/                        # 📦 Source Code (Main Development Area)
├── public/                     # 📁 Static Assets
└── [config files]              # Root configuration files
```

---

## 📱 App Directory (Next.js App Router)

```
app/
├── globals.css                 # Global styles + Tailwind directives
├── layout.tsx                  # Root layout (metadata, providers)
└── page.tsx                    # Main dashboard page
```

**Expansion Rules:**
- New routes: `app/(group)/route-name/page.tsx`
- API routes: `app/api/[endpoint]/route.ts`
- Layouts: `app/(group)/layout.tsx`

---

## 📦 Source Directory (src/)

### Components - Atomic Design Hierarchy

```
src/components/
├── index.ts                    # 🔄 Barrel export for all components
│
├── atoms/                      # ⚛️ ATOMS - Indivisible UI elements
│   ├── index.ts                # Barrel export
│   ├── badge.tsx               # Badge/label component
│   ├── badge.stories.tsx       # 📖 Storybook stories
│   ├── button.tsx              # Button component (variants)
│   ├── button.stories.tsx      # 📖 Storybook stories
│   ├── card.tsx                # Card container component
│   ├── card.stories.tsx        # 📖 Storybook stories
│   ├── input.tsx               # Input field component
│   ├── input.stories.tsx       # 📖 Storybook stories
│   ├── spinner.tsx             # Loading spinner
│   └── spinner.stories.tsx     # 📖 Storybook stories
│
├── molecules/                  # 🔬 MOLECULES - Atom combinations
│   ├── index.ts                # Barrel export
│   ├── category-badge.tsx      # Badge with category emoji/color
│   ├── category-badge.stories.tsx
│   ├── currency-display.tsx    # Formatted currency amount
│   ├── currency-display.stories.tsx
│   ├── expense-card.tsx        # Card displaying single expense
│   ├── expense-card.stories.tsx
│   ├── expense-input.tsx       # NL input + add button
│   ├── expense-input.stories.tsx
│   ├── stat-card.tsx           # Statistic card with icon
│   └── stat-card.stories.tsx
│
├── organisms/                  # 🦠 ORGANISMS - Complete UI sections
│   ├── index.ts                # Barrel export
│   ├── expense-list.tsx        # List of ExpenseCard components
│   ├── expense-list.stories.tsx
│   ├── header.tsx              # App header with branding
│   ├── header.stories.tsx
│   ├── monthly-summary.tsx     # Monthly stats dashboard
│   └── monthly-summary.stories.tsx
│
├── templates/                  # 📄 TEMPLATES - Page layouts
│   ├── index.ts                # Barrel export
│   ├── dashboard-layout.tsx    # Main dashboard layout
│   └── dashboard-layout.stories.tsx
│
└── providers/                  # 🔌 PROVIDERS - Context providers
    ├── index.ts                # Barrel export
    └── toaster-provider.tsx    # Toast notification provider
```

### Storybook Configuration

```
.storybook/                     # 📖 Storybook configuration
├── main.ts                     # Storybook main config
├── preview.tsx                 # Global decorators & themes (JSX)
└── manager.ts                  # Storybook UI theme (dark mode)
```

**Import Hierarchy (STRICT):**
| Level | Can Import | Cannot Import |
|-------|-----------|---------------|
| atoms | libs, utils | molecules, organisms, templates |
| molecules | atoms, libs, utils | organisms, templates |
| organisms | atoms, molecules, libs, utils | templates |
| templates | all above | - |
| providers | all | - |

---

### Services - Business Logic Layer

```
src/services/
├── index.ts                    # 🔄 Barrel export
├── calculator.service.ts       # Financial calculations
├── categorizer.service.ts      # Expense categorization logic
├── expense-parser.service.ts   # Natural language parsing
└── storage.service.ts          # localStorage CRUD operations
```

**Naming Convention:** `{domain}.service.ts`

**Pattern:**
```typescript
export const domainService = {
  methodName: (input: Type): ReturnType => { /* pure function */ },
};
```

---

### Stores - Global State (Zustand)

```
src/stores/
├── index.ts                    # 🔄 Barrel export
└── expense.store.ts            # Expense state management
```

**Naming Convention:** `{domain}.store.ts`

**Future Expansion:**
- `category.store.ts` - Category management
- `settings.store.ts` - User preferences

---

### Types - TypeScript Definitions

```
src/types/
├── index.ts                    # 🔄 Barrel export (MANDATORY)
├── category.types.ts           # Category interface & enums
├── currency.types.ts           # Currency config types
├── expense.types.ts            # Expense & ParsedExpense types
└── stats.types.ts              # MonthlySummary, CategoryTotal
```

**Naming Convention:** `{domain}.types.ts`

---

### Config - Application Configuration

```
src/config/
├── index.ts                    # 🔄 Barrel export
├── categories.config.ts        # Default categories + keywords
└── currencies.config.ts        # Currency configs + formatters
```

**Naming Convention:** `{domain}.config.ts`

---

### Lib - Utilities

```
src/lib/
└── utils.ts                    # cn() helper, common utilities
```

**Future Expansion:**
- `formatters.ts` - Date/currency formatting
- `validators.ts` - Input validation helpers
- `constants.ts` - Global constants

---

## 📏 Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Folders | kebab-case | `expense-list/` |
| Components | kebab-case | `expense-card.tsx` |
| Story files | kebab-case + suffix | `expense-card.stories.tsx` |
| Files (non-component) | kebab-case | `expense-parser.service.ts` |
| Barrel exports | lowercase | `index.ts` |
| Types files | kebab-case + suffix | `expense.types.ts` |
| Service files | kebab-case + suffix | `calculator.service.ts` |
| Store files | kebab-case + suffix | `expense.store.ts` |
| Config files | kebab-case + suffix | `categories.config.ts` |

### Storybook Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Story file | `{component}.stories.tsx` | `button.stories.tsx` |
| Story title | `Atomic Level/ComponentName` | `'Atoms/Button'` |
| Story name | PascalCase (variant) | `Primary`, `Secondary`, `Loading` |
| Args | camelCase | `isLoading`, `variant` |

---

## ✅ Validation Checklist

Before creating a new file or directory, verify:

- [ ] Location matches Atomic Design level (atoms/molecules/organisms)
- [ ] Naming follows kebab-case convention
- [ ] Barrel export (index.ts) updated
- [ ] Import hierarchy respected
- [ ] Not creating in deprecated directories
- [ ] Language is English (no Spanish in paths/names)

---

## 🔄 Expansion Protocol

1. **New Component:**
   - Determine Atomic Design level
   - Create in appropriate `src/components/{level}/`
   - Update barrel export
   - Verify import hierarchy

2. **New Service:**
   - Create in `src/services/`
   - Follow `{domain}.service.ts` naming
   - Update barrel export

3. **New Store:**
   - Create in `src/stores/`
   - Follow `{domain}.store.ts` naming
   - Update barrel export

4. **New Route:**
   - Create in `app/` following App Router conventions
   - Use route groups `(group)` for organization

5. **New Type:**
   - Create in `src/types/`
   - Follow `{domain}.types.ts` naming
   - Update barrel export

6. **New Story (Storybook):**
   - Create in same directory as component
   - Follow `{component}.stories.tsx` naming
   - Include: Default, Variants, States stories
   - Use Spanish text for UI labels (UI_LANGUAGE_RULE)

---

*Document maintained by Archi. Last updated: 2026-01-21*
