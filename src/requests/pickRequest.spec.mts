import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { deployFolders } from '../io/deployFolders.mjs';
import { pickRequest } from './pickRequest.mjs';

describe('pickRequest', () => {
  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'automata-pickRequest-'));
    await deployFolders(tempDir);
  });

  afterAll(() => rm(tempDir, { recursive: true, force: true }));

  it('should return undefined when no request files exist', () =>
    expect(pickRequest(tempDir)).resolves.toBeUndefined());

  it('should pick the oldest request file', async () => {
    const requestsPath = join(tempDir, 'requests');
    const file1 = join(requestsPath, 'request1.txt');
    const file2 = join(requestsPath, 'request2.txt');
    // Create two request files with different timestamps
    await writeFile(file1, 'The first request.');
    await new Promise(setImmediate);
    await writeFile(file2, 'The second request.');
    await expect(pickRequest(tempDir)).resolves.toBe(file1);
  });
});
