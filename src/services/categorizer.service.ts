/**
 * Servicio de categorización automática
 * @see analyst.md - Sección "Categorización Automática"
 * @see coder.md - Manejo de errores con try/catch
 */

import { DEFAULT_CATEGORIES, getOtherCategory } from '@/config';
import { DefaultCategoryId } from '@/types';

/**
 * Resultado de la categorización
 */
export interface CategorizationResult {
  categoryId: number;
  confidence: number;
  suggestions: Array<{
    categoryId: number;
    confidence: number;
  }>;
}

/**
 * Umbral de confianza mínimo
 */
const CONFIDENCE_THRESHOLD = 0.5; // Bajado a 50% para ser menos estricto

/**
 * Pesos para el scoring
 */
const SCORE_WEIGHTS = {
  EXACT_MATCH: 2,      // Coincidencia exacta vale más
  PARTIAL_MATCH: 0.3,  // Coincidencia parcial vale menos
};

/**
 * Servicio de categorización automática de gastos
 */
export const categorizerService = {
  /**
   * Categoriza una descripción de gasto basándose en keywords
   * @see analyst.md - Lógica de categorización
   */
  categorize: (description: string): CategorizationResult => {
    try {
      const words = description
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .split(/\s+/)
        .filter((word) => word.length >= 2); // Incluir palabras de 2+ caracteres

      if (words.length === 0) {
        return {
          categoryId: DefaultCategoryId.OTHER,
          confidence: 0,
          suggestions: [],
        };
      }

      const scores = new Map<number, { exact: number; partial: number }>();

      // 1. Buscar coincidencias en keywords
      for (const category of DEFAULT_CATEGORIES) {
        let exactScore = 0;
        let partialScore = 0;

        const normalizedKeywords = category.keywords.map((k) =>
          k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        );

        for (const word of words) {
          // Coincidencia exacta (prioridad alta)
          if (normalizedKeywords.includes(word)) {
            exactScore += SCORE_WEIGHTS.EXACT_MATCH;
            continue;
          }

          // Fuzzy matching: solo si la palabra es suficientemente larga
          // y no es un substring muy corto
          if (word.length >= 3) {
            for (const keyword of normalizedKeywords) {
              // Solo contar si el match es significativo
              // Evitar que "gas" matchee con "gasolina" si ya hay un match exacto
              if (keyword === word) continue; // Ya se contó arriba
              
              if (keyword.includes(word) && word.length >= keyword.length * 0.5) {
                partialScore += SCORE_WEIGHTS.PARTIAL_MATCH;
                break;
              }
              if (word.includes(keyword) && keyword.length >= word.length * 0.5) {
                partialScore += SCORE_WEIGHTS.PARTIAL_MATCH;
                break;
              }
            }
          }
        }

        const totalCategoryScore = exactScore + partialScore;
        if (totalCategoryScore > 0) {
          scores.set(category.id, { exact: exactScore, partial: partialScore });
        }
      }

      // 2. Ordenar por score total, priorizando coincidencias exactas
      const sorted = Array.from(scores.entries())
        .map(([id, { exact, partial }]) => ({
          id,
          total: exact + partial,
          exact,
        }))
        .sort((a, b) => {
          // Primero por coincidencias exactas, luego por total
          if (b.exact !== a.exact) return b.exact - a.exact;
          return b.total - a.total;
        });

      // 3. Si no hay coincidencias, retornar "Otros"
      if (sorted.length === 0) {
        return {
          categoryId: DefaultCategoryId.OTHER,
          confidence: 0,
          suggestions: [],
        };
      }

      // 4. Calcular confianza basada en el mejor match
      const best = sorted[0];
      const totalScore = sorted.reduce((acc, s) => acc + s.total, 0);
      
      // Si hay coincidencia exacta, dar alta confianza
      let confidence = totalScore > 0 ? best.total / totalScore : 0;
      
      // Bonus de confianza si tiene coincidencias exactas
      if (best.exact > 0) {
        confidence = Math.min(1, confidence + 0.2);
      }

      // 5. Asignar categoría
      const categoryId =
        confidence >= CONFIDENCE_THRESHOLD
          ? best.id
          : DefaultCategoryId.OTHER;

      // 6. Generar top 3 sugerencias
      const suggestions = sorted.slice(0, 3).map((s) => ({
        categoryId: s.id,
        confidence: totalScore > 0 ? s.total / totalScore : 0,
      }));

      return {
        categoryId,
        confidence,
        suggestions,
      };
    } catch (error) {
      // En caso de error, retornar categoría "Otros" de forma segura
      console.error('[categorizerService] Error:', error);
      return {
        categoryId: DefaultCategoryId.OTHER,
        confidence: 0,
        suggestions: [],
      };
    }
  },

  /**
   * Obtiene el umbral de confianza configurado
   */
  getConfidenceThreshold: (): number => {
    return CONFIDENCE_THRESHOLD;
  },
};
