import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { defaultConfig, getConfig } from './getConfig.mjs';

describe('getConfig', () => {
  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'automata-getConfig-'));
  });

  afterAll(() => rm(tempDir, { recursive: true, force: true }));

  it('should return the default config when no config file is present', () =>
    expect(getConfig(tempDir)).resolves.toEqual(defaultConfig));

  it('should load config from a file if present', async () => {
    const configContent = `
model: "hi"
github:
  personalAccessToken: "test-token"
  userId: "kurone-kito"
sessionThreshold: 75
`;
    await writeFile(join(tempDir, 'config.yml'), configContent);
    await expect(getConfig(tempDir)).resolves.toEqual({
      model: 'hi',
      github: {
        personalAccessToken: 'test-token',
        userId: 'kurone-kito',
      },
      sessionThreshold: 75,
    });
  });
});
