/**
 * Expense category
 * @see analyst.md - Base categories table
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
 * Predefined category IDs (immutable)
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
 * Input for creating a custom category
 */
export interface CreateCategoryInput {
  name: string;
  emoji: string;
  keywords: string[];
  color: string;
}

/**
 * Result of the categorization process
 * @see analyst.md - Automatic categorization
 */
export interface CategorizationResult {
  categoryId: number;
  confidence: number;
  suggestions: Array<{
    categoryId: number;
    confidence: number;
  }>;
}
