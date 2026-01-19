# 💸 SpendWise AI

<div align="center">

![SpendWise AI](https://img.shields.io/badge/SpendWise-AI-gradient?style=for-the-badge&logo=openai&logoColor=white&color=10B981)
![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Gestor de gastos inteligente con procesamiento de lenguaje natural**

*Registra tus gastos escribiendo naturalmente, como lo harías en una conversación.*

[Demo](#) • [Documentación](#arquitectura-del-proyecto) • [Contribuir](#cómo-colaborar-con-la-ia)

</div>

---

## 🎯 ¿Qué es SpendWise AI?

SpendWise AI es un gestor de gastos mensuales inteligente que te permite registrar gastos usando **lenguaje natural**. Olvídate de formularios complicados—simplemente escribe como hablas:

```
"Gasté 150.000 en el super"
"Uber al trabajo 12.500"
"Netflix mensual $15 USD"
"Pagué 80.000 COP en gas"
```

La IA se encarga de:
- ✨ **Extraer el monto** automáticamente
- 🏷️ **Categorizar** el gasto (Alimentación, Transporte, Hogar, etc.)
- 💱 **Detectar la moneda** (COP/USD)
- 📊 **Calcular totales** y proyecciones en tiempo real

---

## 🛠️ Core Technology Stack

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 14.2+ | Framework React con App Router |
| **TypeScript** | 5.4+ | Tipado estricto end-to-end |
| **Zustand** | 4.5+ | Estado global ligero y reactivo |
| **Tailwind CSS** | 3.4+ | Estilos utility-first |
| **Shadcn/UI** | Latest | Componentes accesibles y personalizables |
| **Sonner** | 1.4+ | Sistema de notificaciones toast |
| **Lucide React** | 0.344+ | Iconografía moderna |

---

## 🤖 The BMAD Method™ Implementation

> **BMAD** = **B**MAD **M**ethod for **A**gile AI-**D**riven Development

Este proyecto implementa el **BMAD-METHOD™**, una metodología de desarrollo donde agentes de IA especializados colaboran en diferentes aspectos del software. Cada agente tiene su "conciencia" definida en archivos Markdown que persisten el conocimiento del proyecto.

### 📁 La Carpeta `/.bmad/`

```
/.bmad/
├── analyst.md    # 🪙 Penny - Requerimientos de producto
├── architect.md  # 🏗️ Archi - Arquitectura técnica
└── coder.md      # 💻 Cody - Implementación y estándares
```

Esta carpeta contiene la **fuente de verdad** del proyecto. Cualquier decisión de diseño, patrón de código o requerimiento funcional está documentado aquí.

### 🎭 Los Agentes

#### 🪙 **Penny** — Financial Product Analyst
```yaml
role: "Financial Product Analyst"
persona: "Experta en finanzas personales, metódica y enfocada en la integridad de los datos numéricos."
```

**Responsabilidades:**
- Definir requerimientos funcionales del tracker de gastos
- Establecer categorías base y keywords para categorización
- Validar la lógica de cálculos financieros
- Garantizar precisión numérica (aritmética de punto fijo)

**Comandos:**
- `*define-categories` — Gestionar categorías de gastos
- `*structure-expense` — Estructurar un gasto desde lenguaje natural
- `*validate-logic` — Validar lógica de negocio

---

#### 🏗️ **Archi** — System Architect
```yaml
role: "System Architect"
persona: "Pragmático, experto en Next.js, TypeScript y patrones de diseño. Prioriza la mantenibilidad y el tipado estricto."
```

**Responsabilidades:**
- Definir estructura de carpetas (Next.js 14 App Router)
- Establecer interfaces TypeScript exactas
- Diseñar la estrategia de componentes (Atomic Design)
- Especificar el Service Layer

**Comandos:**
- `*define-boilerplate` — Generar estructura para nuevas features
- `*setup-types` — Crear/actualizar definiciones TypeScript
- `*enforce-standards` — Validar estándares del código

---

#### 💻 **Cody** — Senior Fullstack Developer
```yaml
role: "Senior Fullstack Developer"
persona: "Eficiente, obsesionado con el código limpio, seco (DRY) y el manejo de errores."
```

**Responsabilidades:**
- Implementar código siguiendo el orden: Types → Services → Stores → Components
- Garantizar manejo de errores con try/catch y toasts
- Aplicar estilo de código consistente (Arrow Functions, Named Exports)
- Seguir las directrices de Archi

**Comandos:**
- `*create-component` — Generar componente con convenciones
- `*implement-service` — Implementar servicio de lógica de negocio
- `*refactor-code` — Refactorizar aplicando DRY
- `*add-unit-test` — Generar tests unitarios

---

## 🏛️ Arquitectura del Proyecto

### 📦 Atomic Design para Componentes

SpendWise AI utiliza **Atomic Design** para organizar componentes de forma escalable:

```
components/
├── atoms/        ⚛️  Elementos UI básicos (Button, Input, Badge)
├── molecules/    🔬  Combinación de átomos (ExpenseInput, StatCard)
├── organisms/    🦠  Secciones completas (ExpenseList, Header)
├── templates/    📄  Layouts de página (DashboardLayout)
└── providers/    🔌  Context providers (ToasterProvider)
```

| Nivel | Puede importar | NO puede importar |
|-------|----------------|-------------------|
| **Atoms** | libs, utils | Molecules, Organisms |
| **Molecules** | Atoms, libs | Organisms, Templates |
| **Organisms** | Atoms, Molecules | Templates |
| **Templates** | Todo lo anterior | — |

### 🔧 Service Layer

La lógica de negocio está separada de la UI en servicios puros:

```
services/
├── expense-parser.service.ts    # 📝 Parseo de lenguaje natural
├── categorizer.service.ts       # 🏷️ Categorización automática
├── calculator.service.ts        # 🔢 Cálculos financieros
└── storage.service.ts           # 💾 Persistencia (localStorage MVP)
```

**Flujo de datos:**

```
Usuario escribe → ExpenseParser → Categorizer → Store (Zustand) → Storage → UI actualizada
     "50k super"      ↓                ↓            ↓              ↓
                   {amount: 50000}  {cat: 🍔}    [expenses]    localStorage
```

### 🗄️ Estado Global con Zustand

```typescript
// stores/expense.store.ts
interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadExpenses: () => void;
  addExpenseFromInput: (input: string) => void;
  deleteExpense: (id: string) => void;
}
```

---

## 🚀 Guía de Inicio Rápido

### Prerrequisitos

- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/spendwise-ai.git
cd spendwise-ai

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm dev
```

### Abrir en el navegador

```
http://localhost:3000
```

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo con hot-reload |
| `pnpm build` | Build de producción |
| `pnpm start` | Iniciar servidor de producción |
| `pnpm lint` | Ejecutar ESLint |

---

## 🤝 Cómo Colaborar con la IA

Este proyecto está optimizado para desarrollo con **Cursor IDE** y sus capacidades de IA.

### 📖 Lectura de Contexto

Antes de pedirle a la IA que implemente algo, usa `@` para referenciar los agentes:

```
@architect.md ¿Dónde debo crear un nuevo servicio de presupuestos?

@coder.md Implementa un custom hook para filtrar gastos por categoría

@analyst.md ¿Qué métricas adicionales necesitamos para el dashboard?
```

### ⚡ Usando Comandos de Agentes

Los agentes tienen comandos YAML definidos que puedes invocar:

```
@coder.md *create-component name:BudgetCard path:budgets props:[budget:Budget]

@architect.md *setup-types from:analyst.md section:"Presupuestos"

@analyst.md *validate-logic calculate-budget-remaining
```

### 🔄 Flujo de Trabajo Recomendado

1. **Consulta a Penny** → ¿Cuáles son los requerimientos?
2. **Consulta a Archi** → ¿Dónde va el código y qué tipos necesito?
3. **Instruye a Cody** → Implementa siguiendo las directrices

```
@analyst.md @architect.md @coder.md 

Necesito agregar una feature de presupuestos mensuales.
Penny: Define los requerimientos.
Archi: Define la estructura de archivos y tipos.
Cody: Implementa siguiendo el orden Types → Services → Stores → Components.
```

---

## 📊 Estado del Proyecto

### ✅ MVP Completado

| Feature | Estado | Descripción |
|---------|--------|-------------|
| 🗣️ Ingreso en lenguaje natural | ✅ | "Gasté 50.000 en comida" |
| 🏷️ Categorización automática | ✅ | 11 categorías + fuzzy matching |
| 💱 Soporte multi-moneda | ✅ | COP y USD con conversión |
| 📈 Resumen mensual | ✅ | Total, promedio, proyección |
| 💾 Persistencia local | ✅ | localStorage |
| 🎨 UI moderna | ✅ | Tailwind + Shadcn |
| 🔔 Notificaciones | ✅ | Sonner toasts |

### 🗓️ Roadmap

| Versión | Features Planeadas |
|---------|-------------------|
| **v0.2** | Gráficas de categorías, filtros avanzados |
| **v0.3** | Presupuestos mensuales con alertas |
| **v0.4** | Exportar a CSV/PDF |
| **v1.0** | Autenticación, sincronización cloud |

---

## 📁 Estructura de Carpetas

```
spendwise-ai/
├── .bmad/                    # 🤖 Agentes BMAD
│   ├── analyst.md            # Penny
│   ├── architect.md          # Archi
│   └── coder.md              # Cody
│
├── app/                      # 📱 Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── src/
│   ├── components/           # 🧩 Atomic Design
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── templates/
│   │   └── providers/
│   │
│   ├── services/             # 🔧 Lógica de negocio
│   ├── stores/               # 🗄️ Estado (Zustand)
│   ├── types/                # 📝 TypeScript
│   ├── config/               # ⚙️ Configuración
│   └── lib/                  # 📚 Utilidades
│
└── public/                   # 📁 Assets estáticos
```

---

## 💡 Ejemplos de Uso

### Registrar gastos en español

```
"Gasté 150.000 en el super"           → 🍔 Alimentación | $150.000 COP
"Uber al trabajo 12.500"              → 🚗 Transporte   | $12.500 COP
"Netflix mensual 15 dólares"          → 🎬 Entretenimiento | $15 USD
"Pagué la luz 85.000"                 → 🏠 Hogar | $85.000 COP
"Peluquería 40000"                    → 💅 Cuidado Personal | $40.000 COP
"Le envié 200 USD a mi mamá"          → 👨‍👩‍👧 Familia | $200 USD
```

### Monedas soportadas

| Moneda | Símbolos reconocidos | Formato |
|--------|---------------------|---------|
| 🇨🇴 COP | peso, pesos, cop | 150.000 |
| 🇺🇸 USD | dólar, dólares, usd, dollar | 150.00 |

**Tipo de cambio:** 1 USD = 3.700 COP

---

## 📜 Licencia

MIT © 2026 SpendWise AI

---

<div align="center">

**Construido con 💚 usando el BMAD-METHOD™**

*¿Preguntas? Abre un issue o consulta a los agentes en `/.bmad/`*

</div>
