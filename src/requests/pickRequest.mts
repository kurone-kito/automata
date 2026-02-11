import { join } from 'node:path';
import { getOldestFile } from '../io/getOldestFile.mjs';
import { REQUEST_DIR } from './constants.mjs';

/**
 * Picks the oldest request file from the requests directory.
 * @param cwd Current working directory
 * @returns The path of the oldest request file, or undefined if no files exist.
 */
export const pickRequest = (cwd = process.cwd()): Promise<string | undefined> =>
  getOldestFile(join(cwd, REQUEST_DIR));
