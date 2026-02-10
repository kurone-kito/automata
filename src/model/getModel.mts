import { randomPick } from '@kurone-kito/web-toybox';
import type { NonEmptyTuple } from 'type-fest';
import type { MaybeModelCategory, ModelCategory } from './category.mjs';
import { isCategory } from './category.mjs';

/** Mapping of model categories to their respective model names. */
const models = new Map<ModelCategory, NonEmptyTuple<string>>([
  ['hi', ['claude-opus-4.6']],
  ['mid', ['claude-sonnet-4.5', 'gemini-3-pro-preview', 'gpt-5.2']],
  ['lo', ['claude-haiku-4.5', 'gpt-5.1-codex-mini']],
]);

/**
 * Get a model name based on the given category.
 * @param category The model category or a specific model name.
 * @returns A model name corresponding to the category, or the input string
 * if it's not a valid category.
 */
export const getModel = (category: MaybeModelCategory): string => {
  if (!isCategory(category)) {
    return category;
  }
  const modelList = models.get(category);
  return modelList ? randomPick(modelList) : category;
};
