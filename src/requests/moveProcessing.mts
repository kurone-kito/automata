import { rename, stat } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { REQUEST_DIR } from './constants.mts';

/** Processing requests folder path */
const processing = join(REQUEST_DIR, 'processing');

/**
 * Move processing request file to processing folder
 * @param file File name
 * @param cwd Current working directory. Default is process.cwd()
 * @returns Whether the file was moved
 */
export const moveProcessing = async (
  file: string,
  cwd = process.cwd(),
): Promise<boolean> => {
  const ad = join(cwd, processing);
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
