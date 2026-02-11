import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Gets the oldest file in a directory.
 * @param dirPath The directory path
 * @returns The path of the oldest file, or undefined if no files exist.
 */
export const getOldestFile = async (
  dirPath: string,
): Promise<string | undefined> => {
  type Tuple = readonly [file: string, tick: number];
  const [file] = await (await readdir(dirPath)).reduce<Promise<Tuple>>(
    (acc, cur) =>
      acc.then(async (prev) => {
        const fstat = await stat(join(dirPath, cur));
        if (!fstat.isFile()) {
          return prev;
        }
        const [, pTick] = prev;
        const tick = fstat.mtime.getTime();
        return pTick === 0 || tick < pTick ? ([cur, tick] as const) : prev;
      }),
    Promise.resolve(['', 0]),
  );
  return file ? join(dirPath, file) : undefined;
};
