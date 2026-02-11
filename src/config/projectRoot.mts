import { join, normalize } from 'node:path';

/** The project root directory. */
export const projectRoot = normalize(join(import.meta.dirname, '..'));
