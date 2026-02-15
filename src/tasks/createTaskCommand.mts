import dargs from 'dargs';
import type { Project, Tag } from './amTypes.mjs';

/** Type definition for the createTaskCommand function parameters. */
export interface CreateTaskCommandParams {
  /**
   * The command to be executed by TaskWarrior.
   *
   * - 'export' will return the tasks in JSON format.
   * - 'count' will return the number of tasks that match the criteria.
   */
  readonly command: 'export' | 'count';

  /**
   * The project to filter tasks by.
   *
   * This should be one of the projects defined in the `Project` type.
   */
  readonly project: Project;

  /**
   * The tags to filter tasks by.
   *
   * This should be an array of tags defined in the `Tag` type.
   */
  readonly tags?: readonly Tag[] | undefined;
}

/**
 * Create a command string for TaskWarrior based on the given project and
 * tags.
 * @param params The parameters for creating the task command.
 * @returns A command string that can be used to query TaskWarrior for
 * tasks matching the given project and tags.
 */
export const createTaskCommand = (
  params: CreateTaskCommandParams,
): `task ${string}` => {
  const { command, project, tags = [] } = params;
  const args = [
    `project:am:${project}`,
    'status:pending',
    ...tags.map((tag) => `+${tag}`),
    command,
  ];
  return `task ${dargs({ _: args }).join(' ')}` as const;
};
