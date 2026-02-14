import { describe, expect, it } from 'vitest';
import { getPath, getPathes } from './getPathes.mjs';

describe('getPath', () => {
  it('should return the path of an existing command', () =>
    expect(getPath('node')).resolves.toMatch(/node/));

  it('should return null for a non-existing command', () =>
    expect(getPath('non-existing-command')).resolves.toBeNull());
});

describe('getPathes', () => {
  it('should return the pathes of the required commands', async () => {
    const pathes = await getPathes();
    expect(pathes).toHaveProperty(
      'taskWarrior',
      expect.stringContaining('task'),
    );
  });
});
