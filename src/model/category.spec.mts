import { describe, expect, it } from 'vitest';
import type { ModelCategory } from './category.mjs';
import { isCategory } from './category.mjs';

describe('isCategory', () => {
  it.each<ModelCategory>([
    'hi',
    'mid',
    'lo',
  ])('should return true for valid category "%s"', (category) =>
    expect(isCategory(category)).toBeTruthy());

  it.each<string>([
    'high',
    'medium',
    'low',
    'unknown',
    '',
  ])('should return false for invalid category "%s"', (category) =>
    expect(isCategory(category)).toBeFalsy());
});
