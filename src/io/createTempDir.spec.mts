import { stat } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { createTempDir } from './createTempDir.mjs';

describe('createTempDir', () => {
  it('should create a temporary directory and remove it on dispose', async () => {
    const tempDir = await createTempDir();
    expect(tempDir).matches(/.+\/?automata-.+$/);
    try {
      // Check if the temporary directory exists
      expect((await stat(`${tempDir}`)).isDirectory()).toBe(true);
    } finally {
      // Dispose of the temporary directory
      await tempDir[Symbol.asyncDispose]();
      // Check if the temporary directory has been removed
      await expect(stat(`${tempDir}`)).rejects.toThrow();
    }
  });
});
