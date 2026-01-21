/**
 * 🔬 MOLECULE: CategoryBadge
 * Combines Badge + category data (emoji, name, color)
 * @see architect.md - Atomic Design (Molecules)
 */

import { type FC } from 'react';
import { Badge } from '@/components/atoms';
import type { Category } from '@/types';
import { getCategoryById } from '@/config';

export interface CategoryBadgeProps {
  category?: Category;
  categoryId?: number;
  showName?: boolean;
  size?: 'sm' | 'md';
}

export const CategoryBadge: FC<CategoryBadgeProps> = ({
  category,
  categoryId,
  showName = true,
  size = 'md',
}) => {
  // If only categoryId provided, look up the category
  const resolvedCategory = category || (categoryId ? getCategoryById(categoryId) : undefined);

  if (!resolvedCategory) {
    return (
      <Badge size={size} variant="default">
        🎁 Sin categoría
      </Badge>
    );
  }

  return (
    <Badge
      size={size}
      style={{
        backgroundColor: `${resolvedCategory.color}20`,
        color: resolvedCategory.color,
      }}
    >
      <span>{resolvedCategory.emoji}</span>
      {showName && <span>{resolvedCategory.name}</span>}
    </Badge>
  );
};
