/**
 * Categorizer Service - Expense classification
 * @see analyst.md - Category definitions
 * @see dev.md - Error handling patterns
 */

import { CATEGORIES, CategoryId } from '@/config';
import type { CategorizationResult } from '@/types';

/**
 * Calculates the Levenshtein distance between two strings
 * Used for fuzzy matching
 */
const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

/**
 * Checks if two words are similar (fuzzy match)
 * @param word - Input word
 * @param keyword - Keyword to compare
 * @param threshold - Maximum allowed distance (default: 2)
 */
const isSimilar = (word: string, keyword: string, threshold = 2): boolean => {
  // Exact match
  if (word === keyword) return true;

  // If the word is too short relative to the keyword, don't fuzzy match
  if (word.length < keyword.length * 0.5) return false;

  // Prefix match (e.g., "transp" matches "transporte")
  if (keyword.startsWith(word) && word.length >= 3) return true;

  // Levenshtein fuzzy matching
  const distance = levenshteinDistance(word, keyword);
  return distance <= threshold;
};

/**
 * Categorizer Service - Classifies expenses based on keywords
 */
export const categorizerService = {
  /**
   * Categorizes an expense based on its description
   * @param description - Expense description
   * @returns Categorization result with category ID, confidence, and suggestions
   */
  categorize: (description: string): CategorizationResult => {
    const normalizedDescription = description
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    const words = normalizedDescription.split(/\s+/);

    // Calculate scores for each category
    const scores: { categoryId: number; score: number; exactMatch: boolean }[] = [];

    for (const category of CATEGORIES) {
      let score = 0;
      let hasExactMatch = false;

      for (const word of words) {
        for (const keyword of category.keywords) {
          const normalizedKeyword = keyword
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          // Exact match = 2 points
          if (word === normalizedKeyword) {
            score += 2;
            hasExactMatch = true;
          }
          // Fuzzy match = 1 point (only if similar)
          else if (isSimilar(word, normalizedKeyword)) {
            score += 1;
          }
        }
      }

      if (score > 0) {
        scores.push({ categoryId: category.id, score, exactMatch: hasExactMatch });
      }
    }

    // Sort by score (descending)
    scores.sort((a, b) => b.score - a.score);

    // If no matches found, return "Others" with low confidence
    if (scores.length === 0) {
      return {
        categoryId: CategoryId.OTHERS,
        confidence: 0.3,
        suggestions: [
          { categoryId: CategoryId.FOOD, confidence: 0.2 },
          { categoryId: CategoryId.TRANSPORT, confidence: 0.2 },
        ],
      };
    }

    // Calculate confidence based on scores
    const topScore = scores[0];
    const maxPossibleScore = words.length * 2;
    let confidence = Math.min(topScore.score / maxPossibleScore, 1);

    // Boost confidence for exact matches
    if (topScore.exactMatch) {
      confidence = Math.min(confidence + 0.2, 1);
    }

    // Ensure minimum 50% confidence if there's at least one match
    confidence = Math.max(confidence, 0.5);

    // Build suggestions (top 3 excluding the winner)
    const suggestions = scores
      .slice(1, 4)
      .map((s) => ({
        categoryId: s.categoryId,
        confidence: Math.max(s.score / maxPossibleScore * 0.8, 0.1),
      }));

    return {
      categoryId: topScore.categoryId,
      confidence,
      suggestions,
    };
  },

  /**
   * Re-categorizes an expense when user selects a different category
   * @param expenseId - Expense ID
   * @param newCategoryId - New category ID
   * @returns Updated categorization
   */
  recategorize: (expenseId: string, newCategoryId: number): CategorizationResult => {
    return {
      categoryId: newCategoryId,
      confidence: 1.0, // Manual categorization = 100% confidence
      suggestions: [],
    };
  },
};
