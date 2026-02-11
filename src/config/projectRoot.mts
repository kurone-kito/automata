import { join, normalize } from 'node:path';

/**
 * The project root folder.
 *
 * The post-build path is `dist/bin.mjs`. To specify the folder one level
 * above it, this refers to the project root folder.
 */
export const projectRoot = normalize(join(import.meta.dirname, '..'));
