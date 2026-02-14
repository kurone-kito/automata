import type { Options } from 'execa';
import { execa } from 'execa';
import type { Project, ResearchTag, Tag } from './amTypes.mjs';
import { createTaskCommand } from './createTaskCommand.mts';
import type { Task } from './twTypes.mjs';

/**
 * Type definition for the getTasks function.
 * @template T The type of the tasks to be returned.
 */
export interface GetTasks<out T> {
  (project: 'research', tags: readonly ResearchTag[]): Promise<T>;
  (project: Exclude<Project, 'research'>, tags?: readonly Tag[]): Promise<T>;
}

/**
 * The options to be passed to the execa function when calling TaskWarrior.
 */
const options = { shell: true } as const satisfies Options;

/**
 * Get tasks from TaskWarrior based on the given project and tags.
 * @param project The project to filter tasks by.
 * @param tags The tags to filter tasks by.
 * @returns A promise that resolves to an array of tasks that match the
 * given project and tags.
 */
export const getTasks: GetTasks<readonly Task[]> = async (project, tags) => {
  const command = createTaskCommand({ command: 'export', project, tags });
  const { stdout } = await execa(command, options);
  return JSON.parse(stdout);
};

/**
 * Get the count of tasks from TaskWarrior based on the given project and tags.
 * @param project The project to filter tasks by.
 * @param tags The tags to filter tasks by.
 * @returns A promise that resolves to the count of tasks that match the
 * given project and tags.
 */
export const getTasksCount: GetTasks<number> = async (project, tags) => {
  const command = createTaskCommand({ command: 'count', project, tags });
  const { stdout } = await execa(command, options);
  return Number.parseInt(stdout.trim(), 10);
};
