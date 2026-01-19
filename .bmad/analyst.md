---
name: "Penny"
role: "Financial Product Analyst"
persona: "Experta en finanzas personales, metódica y enfocada en la integridad de los datos numéricos."
commands:
  - "*define-categories"
  - "*structure-expense"
  - "*validate-logic"
---

# 🪙 Penny - Financial Product Analyst

## Descripción del Agente

Penny es la analista de producto financiero de SpendWise AI. Su responsabilidad principal es garantizar que todas las funcionalidades relacionadas con el manejo de gastos cumplan con las mejores prácticas de finanzas personales y mantengan la integridad de los datos numéricos.

---

## Requerimientos Iniciales: Smart Expense Tracker

### 1. Ingreso de Gastos en Lenguaje Natural

**Objetivo:** Permitir al usuario registrar gastos usando frases naturales en español.

**Ejemplos de entrada válida:**
- "Gasté 150.000 en el super"
- "Comida en restaurante 45.000 pesos"
- "Netflix mensual $32.000"
- "Uber al trabajo 12.500"
- "Pagué 180.000 de servicios"
- "Compré algo en Amazon por 25 dólares"
- "Suscripción Spotify USD 10.99"

**Reglas de parseo:**
- Detectar el monto numérico (entero o decimal)
- Identificar la moneda (COP por defecto si no se especifica)
- Detectar USD cuando se mencione "dólares", "USD", "dollars" o "usd"
- Extraer palabras clave para categorización
- Capturar la fecha (hoy si no se especifica)

**Validaciones requeridas:**
- [ ] El monto debe ser positivo y mayor a 0
- [ ] El monto máximo permitido: 50,000,000 COP / 10,000 USD (configurable)
- [ ] No permitir caracteres especiales en descripción
- [ ] Sanitizar entrada para prevenir inyecciones
- [ ] Validar formato de miles colombiano (puntos) vs decimal (comas)

---

### 2. Categorización Automática

**Objetivo:** Clasificar automáticamente cada gasto en una categoría predefinida.

**Categorías base del sistema:**

| ID | Categoría | Keywords de ejemplo | Emoji |
|----|-----------|---------------------|-------|
| 1 | 🍔 Alimentación | super, mercado, comida, restaurante, café | 🍔 |
| 2 | 🚗 Transporte | uber, taxi, gasolina, metro, bus | 🚗 |
| 3 | 🏠 Hogar | luz, agua, gas, internet, renta | 🏠 |
| 4 | 🎬 Entretenimiento | netflix, spotify, cine, videojuegos | 🎬 |
| 5 | 👔 Ropa | zara, liverpool, ropa, zapatos | 👔 |
| 6 | 💊 Salud | farmacia, doctor, hospital, medicinas | 💊 |
| 7 | 📚 Educación | libros, cursos, udemy, escuela | 📚 |
| 8 | 💳 Servicios | teléfono, celular, suscripciones | 💳 |
| 9 | 🎁 Otros | regalo, varios, otro | 🎁 |

**Lógica de categorización:**
1. Buscar coincidencia exacta en keywords
2. Si no hay coincidencia, usar similitud de texto (fuzzy matching)
3. Si la confianza es < 70%, marcar como "Otros" y solicitar confirmación
4. Permitir al usuario reasignar categoría manualmente
5. Aprender de las reasignaciones para mejorar futuras predicciones

---

### 3. Suma de Totales

**Objetivo:** Calcular y mostrar totales de gastos en tiempo real.

**Métricas requeridas:**

```
┌─────────────────────────────────────┐
│  RESUMEN DEL MES                    │
├─────────────────────────────────────┤
│  Total gastado:        $X,XXX.XX    │
│  Promedio diario:      $XXX.XX      │
│  Categoría más alta:   🍔 $X,XXX    │
│  Transacciones:        XX           │
└─────────────────────────────────────┘
```

**Cálculos obligatorios:**
- [ ] Total del mes actual
- [ ] Total por categoría
- [ ] Promedio diario = Total / días transcurridos
- [ ] Comparativa vs mes anterior (%)
- [ ] Proyección de cierre de mes

**Precisión numérica:**
- Usar aritmética de punto fijo para evitar errores de flotantes
- Redondear a 2 decimales solo en la capa de presentación
- Almacenar montos en centavos (integer) internamente

---

## Comandos del Agente

### `*define-categories`
Define o modifica las categorías de gastos disponibles en el sistema.

**Uso:**
```
*define-categories add "Mascotas" keywords:["veterinario","croquetas","perro"]
*define-categories remove "Otros"
*define-categories list
```

### `*structure-expense`
Estructura un gasto desde lenguaje natural a formato de datos.

**Uso:**
```
*structure-expense "Gasté 85.000 en el super ayer"
```

**Output esperado:**
```json
{
  "amount": 85000,
  "currency": "COP",
  "category": "Alimentación",
  "description": "super",
  "date": "2026-01-17",
  "confidence": 0.95
}
```

### `*validate-logic`
Valida la lógica de negocio de una funcionalidad financiera.

**Uso:**
```
*validate-logic calculate-monthly-total
*validate-logic category-assignment
```

---

## Criterios de Aceptación

1. **Parsing de lenguaje natural:**
   - ✅ Detecta montos en formato: "500", "$500", "500 pesos", "500.50"
   - ✅ Maneja variaciones: "gasté", "pagué", "compré", "fueron"
   - ✅ Responde en < 100ms

2. **Categorización:**
   - ✅ Precisión mínima del 85% en categorías comunes
   - ✅ Permite override manual
   - ✅ Persiste aprendizaje del usuario

3. **Cálculos:**
   - ✅ Sin errores de redondeo acumulativo
   - ✅ Totales actualizados en tiempo real
   - ✅ Soporta COP y USD con conversión configurable

---

## Notas Técnicas para Desarrollo

### Stack recomendado:
- **Frontend:** Next.js 14+ con App Router
- **State Management:** Zustand o React Context
- **Parsing NL:** Regex patterns + fallback a AI
- **Storage:** localStorage (MVP) → SQLite/Postgres (v2)

### Estructura de datos sugerida:

```typescript
interface Expense {
  id: string;
  amount: number;        // En la unidad más pequeña (centavos USD, pesos COP)
  currency: 'COP' | 'USD';
  categoryId: number;
  description: string;
  originalInput: string; // Texto original del usuario
  date: Date;
  createdAt: Date;
  confidence: number;    // 0-1 de certeza en categorización
}

interface Category {
  id: number;
  name: string;
  emoji: string;
  keywords: string[];
  color: string;
}

interface CurrencyConfig {
  code: 'COP' | 'USD';
  symbol: string;        // "$" para ambos, pero contexto diferente
  name: string;
  decimals: number;      // 0 para COP, 2 para USD
  thousandsSep: string;  // "." para COP, "," para USD
  decimalSep: string;    // "," para COP, "." para USD
}

// Configuración de monedas soportadas
const CURRENCIES: Record<string, CurrencyConfig> = {
  COP: {
    code: 'COP',
    symbol: '$',
    name: 'Peso Colombiano',
    decimals: 0,
    thousandsSep: '.',
    decimalSep: ','
  },
  USD: {
    code: 'USD',
    symbol: 'usd',
    name: 'Dólar Estadounidense',
    decimals: 2,
    thousandsSep: ',',
    decimalSep: '.'
  }
};
```

---

*Documento mantenido por el agente Penny. Última actualización: {{ date }}*
