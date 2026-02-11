import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getOldestFile } from './getOldestFile.mjs';

describe('getOldestFile', () => {
  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'automata-getOldestFile-'));
  });

  afterAll(() => rm(tempDir, { recursive: true, force: true }));

  it('should return undefined when no files exist', () =>
    expect(getOldestFile(tempDir)).resolves.toBeUndefined());

  it('should get the oldest file in the directory', async () => {
    const file1 = join(tempDir, 'file1.txt');
    const file2 = join(tempDir, 'file2.txt');
    // Create two files with different timestamps
    await writeFile(file1, 'The first file.');
    await new Promise(setImmediate);
    await writeFile(file2, 'The second file.');
    await expect(getOldestFile(tempDir)).resolves.toBe(file1);
  });
});
