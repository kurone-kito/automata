import { afterEach, describe, expect, it, vi } from 'vitest';
import { percentage } from './percentage.mjs';

describe('percentage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when random is less than the percentage', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(percentage(60)).toBeTruthy();
  });

  it('returns false when random is greater than the percentage', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.7);
    expect(percentage(40)).toBeFalsy();
  });

  it('returns true when random is equal to the percentage', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(percentage(50)).toBeTruthy();
  });
});
