import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

/** Tasks folder name */
const tasks = 'tasks';

/** List of pathes to create */
const pathes = [
  'blog',
  join('requests', 'accepted'),
  join(tasks, '0-inbox'),
  join(tasks, '1-doing'),
  join(tasks, '2-projects'),
  join(tasks, '3-waiting'),
  join(tasks, '4-todos'),
  join(tasks, '5-refs'),
  join(tasks, '6-icebox'),
  join(tasks, '7-trash'),
  join(tasks, '8-done'),
] as const satisfies readonly string[];

/**
 * Deploy some folders
 * @param basePath Base path
 */
export const deployFolders = (basePath = '.'): Promise<unknown> =>
  Promise.all(
    pathes.map((path) => mkdir(join(basePath, path), { recursive: true })),
  );
