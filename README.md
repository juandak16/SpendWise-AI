# 💸 SpendWise AI

<div align="center">

![SpendWise AI](https://img.shields.io/badge/SpendWise-AI-gradient?style=for-the-badge&logo=openai&logoColor=white&color=10B981)
![BMAD v6](https://img.shields.io/badge/BMAD--METHOD™-v6-purple?style=for-the-badge)
![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![Storybook](https://img.shields.io/badge/Storybook-8.4-FF4785?style=for-the-badge&logo=storybook)

**AI-Powered Expense Manager with Natural Language Processing**

*Register expenses by typing naturally—no forms, no friction.*

[Quick Start](#-quick-start) • [Architecture](#-architecture) • [Storybook](#-ui-documentation) • [Contributing](#-development-workflow)

</div>

---

## 🎯 Project Overview

SpendWise AI is an intelligent monthly expense tracker that lets users register expenses using **natural language** in Spanish. Simply type as you would speak:

```
"Gasté 150.000 en el super"     →  🍔 Alimentación | $40.54 USD
"Uber al trabajo 12.500"        →  🚗 Transporte   | $3.38 USD
"Netflix mensual $15 USD"       →  🎬 Entretenimiento | $15.00 USD
"Ayuda a mamá 200.000 COP"      →  👨‍👩‍👧 Familia | $54.05 USD
```

**Core Features:**
- ✨ Natural language expense input (Spanish)
- 🏷️ Automatic categorization with 11 categories
- 💱 Dual currency support (COP/USD) with live conversion
- 📊 Monthly summaries, projections, and trend analysis
- 🎨 Modern dark-themed UI built with Atomic Design

---

## 🏛️ Architecture

SpendWise AI follows **Atomic Design** and **Clean Architecture** principles, ensuring scalability and maintainability.

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  ⚛️ ATOMS        →  Button, Input, Badge, Spinner, Card     │
│       ↓                                                     │
│  🔬 MOLECULES    →  ExpenseInput, ExpenseCard, StatCard     │
│       ↓                                                     │
│  🦠 ORGANISMS    →  ExpenseList, Header, MonthlySummary     │
│       ↓                                                     │
│  📄 TEMPLATES    →  DashboardLayout                         │
│       ↓                                                     │
│  📱 PAGES        →  app/page.tsx                            │
└─────────────────────────────────────────────────────────────┘
```

### Service Layer (Business Logic)

| Service | Responsibility |
|---------|---------------|
| `expense-parser` | Parse natural language → structured expense |
| `categorizer` | Match keywords → category with confidence score |
| `calculator` | Financial calculations, summaries, projections |
| `storage` | localStorage CRUD operations |

### Source Tree Reference

> 📁 **Canonical structure defined in:** `.bmad-core/data/source-tree.md`

All structural decisions, naming conventions, and import rules are documented there. **Consult before creating new files.**

---

## 🤖 BMAD-METHOD™ Framework Integration

This project is powered by **BMAD-METHOD™ v6** (Agile AI-Driven Development), a framework where specialized AI agents collaborate on different aspects of the software.

### Agent Orchestra

| Agent | Role | Responsibilities |
|-------|------|------------------|
| 🪙 **Penny** | Financial Product Analyst | Requirements, categorization logic, numerical precision |
| 🏗️ **Archi** | System Architect | Folder structure, TypeScript interfaces, Atomic Design |
| 💻 **Cody** | Senior Developer | Implementation following Types → Services → Stores → Components |
| 🧪 **QA** | Quality Assurance | Testing strategies, validation checklists |

### Agent Files Location

```
.bmad-core/
├── agents/
│   ├── analyst.md       # 🪙 Penny's knowledge & commands
│   ├── architect.md     # 🏗️ Archi's knowledge & commands
│   └── dev.md           # 💻 Cody's knowledge & commands
├── data/
│   ├── source-tree.md   # 📁 Canonical folder structure
│   └── active-sprint.yaml # 📋 Current sprint tracking
└── core-config.yaml     # ⚙️ Project configuration
```

### Using Agents in Cursor

Reference agents with `@` to provide context:

```
@architect.md Where should I create a new filtering component?

@analyst.md What validation rules apply to expense amounts?

@dev.md Implement a hook for filtering expenses by category
```

---

## 📋 Development Workflow

### Sprint Tracking

Active tasks are tracked in `active-sprint.yaml`:

```yaml
sprint:
  id: SPRINT-003
  name: "Storybook Integration"
  status: completed

stories:
  - id: US-STORY-008
    title: "Molecule Stories - ExpenseCard"
    status: done
    file: src/components/molecules/expense-card.stories.tsx
```

**Workflow:**
1. Check `active-sprint.yaml` for current tasks
2. Consult relevant agent for guidance (`@architect.md`, `@analyst.md`)
3. Implement following Cody's order: **Types → Services → Stores → Components**
4. Update story status when complete

### UI Documentation

All components are documented in **Storybook** with Spanish UI text:

```bash
pnpm storybook    # Start Storybook at http://localhost:6006
```

**Coverage:**
- ✅ All Atoms (Button, Input, Badge, Spinner, Card)
- ✅ All Molecules (ExpenseInput, ExpenseCard, StatCard, CategoryBadge, CurrencyDisplay)
- ✅ All Organisms (ExpenseList, Header, MonthlySummary)
- ✅ Templates (DashboardLayout)

Stories include: default states, variants, loading states, empty states, dark/light themes.

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js (App Router) | 14.2+ |
| **Language** | TypeScript (strict) | 5.4+ |
| **State** | Zustand | 4.5+ |
| **Styling** | Tailwind CSS | 3.4+ |
| **Components** | Shadcn/UI | Latest |
| **Icons** | Lucide React | 0.344+ |
| **Toasts** | Sonner | 1.4+ |
| **Docs** | Storybook | 8.4.7 |
| **Package Manager** | pnpm | 8+ |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/spendwise-ai.git
cd spendwise-ai

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server (http://localhost:3000) |
| `pnpm build` | Production build |
| `pnpm storybook` | Storybook (http://localhost:6006) |
| `pnpm lint` | ESLint check |

---

## 📁 Key Files for New Developers

| File | Purpose |
|------|---------|
| `.bmad-core/data/source-tree.md` | **Canonical folder structure** - consult before creating files |
| `.bmad-core/data/active-sprint.yaml` | Current sprint tasks and status |
| `.bmad-core/agents/*.md` | Agent definitions with project knowledge |
| `src/config/categories.config.ts` | Expense categories and keywords |
| `src/config/currencies.config.ts` | Currency settings (COP/USD) |

---

## 🌐 Language Rules

| Context | Language |
|---------|----------|
| Code (variables, functions, comments) | English |
| Documentation (technical) | English |
| UI Text (labels, placeholders, messages) | **Spanish** |
| File & folder names | English (kebab-case) |

---

## 📜 License

MIT © 2026 SpendWise AI

---

<div align="center">

**Built with 💚 using the BMAD-METHOD™ v6**

*Questions? Consult the agents in `.bmad-core/agents/` or open an issue.*

</div>
