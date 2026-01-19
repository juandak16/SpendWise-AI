import type { Category } from '@/types';
import { DefaultCategoryId } from '@/types';

/**
 * Categorías base del sistema
 * @see analyst.md - Tabla de categorías definida por Penny
 */
export const DEFAULT_CATEGORIES: readonly Category[] = [
  {
    id: DefaultCategoryId.FOOD,
    name: 'Alimentación',
    emoji: '🍔',
    keywords: ['super', 'mercado', 'comida', 'restaurante', 'café', 'almuerzo', 'cena', 'desayuno', 'rappi', 'ifood', 'domicilio', 'pizza', 'hamburguesa', 'sushi', 'pollo', 'arroz', 'pan', 'leche', 'frutas', 'verduras', 'carne', 'snack', 'empanada', 'arepa', 'tacos', 'burrito', 'verduras'],
    color: '#f97316', // orange-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.TRANSPORT,
    name: 'Transporte',
    emoji: '🚗',
    keywords: ['uber', 'taxi', 'gasolina', 'metro', 'bus', 'transmilenio', 'didi', 'beat', 'parqueadero', 'peaje'],
    color: '#3b82f6', // blue-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.HOME,
    name: 'Hogar',
    emoji: '🏠',
    keywords: ['luz', 'agua', 'gas', 'internet', 'renta', 'arriendo', 'alquiler', 'administración', 'aseo', 'limpieza', 'epm', 'vanti', 'condominio'],
    color: '#8b5cf6', // violet-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.ENTERTAINMENT,
    name: 'Entretenimiento',
    emoji: '🎬',
    keywords: ['netflix', 'spotify', 'cine', 'videojuegos', 'disney', 'hbo', 'amazon prime', 'youtube', 'concierto', 'fiesta'],
    color: '#ec4899', // pink-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.CLOTHING,
    name: 'Ropa',
    emoji: '👔',
    keywords: ['zara', 'ropa', 'zapatos', 'falabella', 'éxito', 'tennis', 'adidas', 'nike', 'vestido', 'pantalón'],
    color: '#14b8a6', // teal-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.HEALTH,
    name: 'Salud',
    emoji: '💊',
    keywords: ['farmacia', 'doctor', 'hospital', 'medicinas', 'droguería', 'eps', 'cita', 'examen', 'laboratorio', 'dentista'],
    color: '#ef4444', // red-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.EDUCATION,
    name: 'Educación',
    emoji: '📚',
    keywords: ['libros', 'cursos', 'udemy', 'escuela', 'universidad', 'platzi', 'coursera', 'matrícula', 'seminario', 'capacitación'],
    color: '#f59e0b', // amber-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.SERVICES,
    name: 'Servicios',
    emoji: '💳',
    keywords: ['teléfono', 'celular', 'suscripciones', 'claro', 'movistar', 'tigo', 'plan', 'membresía', 'gimnasio', 'netuno' , 'democrata', 'dsc'],
    color: '#6366f1', // indigo-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.PERSONAL_CARE,
    name: 'Cuidado Personal',
    emoji: '💇',
    keywords: ['peluquería', 'barbería', 'corte', 'cabello', 'pelo', 'uñas', 'manicure', 'pedicure', 'spa', 'masaje', 'facial', 'skincare', 'maquillaje', 'crema', 'shampoo', 'perfume', 'barber', 'salon', 'belleza'],
    color: '#f472b6', // pink-400
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.FAMILY,
    name: 'Familia',
    emoji: '👨‍👩‍👧',
    keywords: ['mama', 'mamá', 'papa', 'papá', 'padre', 'madre', 'hermano', 'hermana', 'tio', 'tía', 'tia', 'sobrino', 'sobrina', 'primo', 'prima', 'abuelo', 'abuela', 'pareja', 'esposo', 'esposa', 'novia', 'novio', 'familia', 'ayuda', 'apoyo', 'envio', 'envío', 'remesa', 'mesada'],
    color: '#f43f5e', // rose-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: DefaultCategoryId.OTHER,
    name: 'Otros',
    emoji: '🎁',
    keywords: ['regalo', 'varios', 'otro', 'misceláneo', 'general'],
    color: '#64748b', // slate-500
    isDefault: true,
    createdAt: new Date('2026-01-01'),
  },
] as const;

/**
 * Obtiene una categoría por su ID
 */
export const getCategoryById = (id: number): Category | undefined => {
  return DEFAULT_CATEGORIES.find((cat) => cat.id === id);
};

/**
 * Obtiene la categoría "Otros" (fallback)
 */
export const getOtherCategory = (): Category => {
  return DEFAULT_CATEGORIES.find((cat) => cat.id === DefaultCategoryId.OTHER)!;
};
