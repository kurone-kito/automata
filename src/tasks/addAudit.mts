import dargs from 'dargs';
import type { Options } from 'execa';
import { execa } from 'execa';
import type { Project, Tag } from './amTypes.mjs';

/**
 * Type definition for the parameters that can be passed to the
 * {@link addAudit} function.
 */
export interface AddAuditParams {
  /**
   * The body of the audit task to be added to TaskWarrior.
   *
   * This is a required parameter. It should be a string containing the
   * description of the audit task, which may include details about the
   * audit and any relevant information that should be included in the task
   * description.
   */
  readonly body: string;

  /**
   * An array of tags to be associated with the audit task.
   *
   * This is an optional parameter. If provided, it should be an array of
   * strings, where each string is a tag that categorizes the audit task.
   * Tags can be used to filter and organize tasks within TaskWarrior.
   */
  readonly tags?: readonly (Project | Tag)[] | undefined;
}

/**
 * Static arguments that are always included when creating an audit task in
 * TaskWarrior.
 */
const staticArgs = [
  'add',
  'project:am:management',
  'priority:L',
  '+audit',
] as const;

/**
 * Create a command string for adding an audit task to TaskWarrior based on
 * the given parameters.
 * @param params An object containing the parameters for the audit task,
 * including the body of the task and any relevant tags.
 * @returns A command string that can be used to add an audit task to
 * TaskWarrior with the specified parameters.
 */
export const createTaskCommand = (
  params: AddAuditParams,
): `task ${string} '${string}'` => {
  const { body, tags = [] } = params;
  const args = [...staticArgs, ...tags.map((tag) => `+${tag}`)];
  const desc = (body.split('---').at(-2) ?? body)?.trim();
  return `task ${dargs({ _: args }).join(' ')} '${desc}'` as const;
};

/**
 * The options to be passed to the execa function when calling TaskWarrior.
 */
const options = { shell: true } as const satisfies Options;

/**
 * Add an audit task to TaskWarrior based on the given parameters.
 * @param params An object containing the parameters for the audit task,
 * including the body of the task and any relevant tags.
 * @returns A promise that resolves to the standard output from the
 * TaskWarrior command, which may include information about the added task.
 */
export const addAudit = async (params: AddAuditParams): Promise<string> => {
  const { stdout } = await execa(createTaskCommand(params), options);
  return stdout;
};
