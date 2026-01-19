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
  PERSONAL_CARE = 10,
  FAMILY = 11,
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
