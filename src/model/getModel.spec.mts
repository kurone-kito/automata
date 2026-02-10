import { describe, expect, it, vi } from 'vitest';
import { getModel } from './getModel.mjs';

const randomPick = vi.hoisted(() => vi.fn());
vi.mock('@kurone-kito/web-toybox', () => ({ randomPick }));

describe('getModel', () => {
  it('returns the input string if it is not a valid category', () => {
    const input = 'custom-model-name';
    expect(getModel(input)).toBe(input);
  });

  it('returns a model name from the "hi" category', () => {
    randomPick.mockReturnValue('claude-opus-4.6');
    expect(getModel('hi')).toBe('claude-opus-4.6');
    expect(randomPick).toHaveBeenCalledWith(['claude-opus-4.6']);
  });

  it('returns a model name from the "mid" category', () => {
    randomPick.mockReturnValue('gpt-5.2');
    expect(getModel('mid')).toBe('gpt-5.2');
    expect(randomPick).toHaveBeenCalledWith([
      'claude-sonnet-4.5',
      'gemini-3-pro-preview',
      'gpt-5.2',
    ]);
  });

  it('returns a model name from the "lo" category', () => {
    randomPick.mockReturnValue('gpt-5.1-codex-mini');
    expect(getModel('lo')).toBe('gpt-5.1-codex-mini');
    expect(randomPick).toHaveBeenCalledWith([
      'claude-haiku-4.5',
      'gpt-5.1-codex-mini',
    ]);
  });
});
