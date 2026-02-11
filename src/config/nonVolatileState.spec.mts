import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  getNonVolatileState,
  setNonVolatileState,
} from './nonVolatileState.mjs';

describe('nonVolatileState', () => {
  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'automata-nonVolatileState-'));
  });

  afterAll(() => rm(tempDir, { recursive: true, force: true }));

  it('should return the default state when no state file is present', async () => {
    const expected = await getNonVolatileState(tempDir);
    expect(expected).toHaveProperty('lastRunTick', expect.any(Number));
    expect(expected).toHaveProperty('step', expect.any(Number));
  });

  it('should set and get the non-volatile state correctly', async () => {
    const newState = { lastRunTick: 1234567890, step: 42 };
    await setNonVolatileState({ cwd: tempDir, state: newState });
    await expect(getNonVolatileState(tempDir)).resolves.toEqual(newState);
  });
});
