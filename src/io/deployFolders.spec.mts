import { mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { deployFolders } from './deployFolders.mjs';

describe('deployFolders', () => {
  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'automata-deployFolders-'));
  });

  afterAll(() => rm(tempDir, { recursive: true, force: true }));

  it.each([
    'blog',
    join('requests', 'accepted'),
    join('tasks', '0-inbox'),
    join('tasks', '1-doing'),
    join('tasks', '2-projects'),
    join('tasks', '3-waiting'),
    join('tasks', '4-todos'),
    join('tasks', '5-refs'),
    join('tasks', '6-icebox'),
    join('tasks', '7-trash'),
    join('tasks', '8-done'),
  ])('should create the folder: %s', async (folder) => {
    await deployFolders(tempDir);
    expect((await stat(join(tempDir, folder))).isDirectory()).toBeTruthy();
  });
});
