import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * Create an object that implements the AsyncDisposable interface for the
 * given temporary directory. The async dispose method will remove the
 * temporary directory when called.
 * @param tempDir The path of the temporary directory to be disposed of.
 * @returns An object that implements the AsyncDisposable interface, which
 * will remove the specified temporary directory when its async dispose
 * method is called.
 */
const createDispose = (tempDir: string) =>
  ({
    [Symbol.asyncDispose]: () => rm(tempDir, { recursive: true, force: true }),
  }) as const satisfies AsyncDisposable;

/**
 * Create a temporary directory and return its path. The directory will be
 * automatically removed when the returned object is disposed of.
 * @returns A promise that resolves to the path of the created temporary
 * directory, which also has an async dispose method to clean up the
 * directory when it's no longer needed.
 */
export const createTempDir = async (): Promise<string & AsyncDisposable> => {
  const tempDir = await mkdtemp(join(tmpdir(), 'automata-'));
  return Object.assign(tempDir, createDispose(tempDir));
};
