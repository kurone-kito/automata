import { rename, stat } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { REQUEST_DIR } from './constants.mjs';

/** Accepted requests folder path */
const accepted = join(REQUEST_DIR, 'accepted');

/**
 * Move accepted request file to accepted folder
 * @param file File name
 * @param cwd Current working directory. Default is process.cwd()
 * @returns Whether the file was moved
 */
export const moveAccepted = async (
  file: string,
  cwd = process.cwd(),
): Promise<boolean> => {
  const ad = join(cwd, accepted);
  const joined = join(ad, file);
  const found = await stat(file).then(
    () => file,
    () =>
      stat(joined).then(
        () => joined,
        () => undefined,
      ),
  );
  if (found) {
    await rename(found, join(ad, basename(found)));
  }
  return !!found;
};
