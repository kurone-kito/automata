import which from 'which';

/** Type definition for the pathes of the required commands. */
export interface Pathes {
  /* The path of the TaskWarrior command. */
  readonly taskWarrior: string;
}

/**
 * Get the path of the given command.
 * @param name The name of the command to find.
 * @returns The path of the command if found, or null if not found.
 */
export const getPath = (name: string): Promise<string | null> =>
  which(name, { nothrow: true });

/** Cache for the pathes of the required commands. */
let pathes: Pathes | undefined;

/**
 * Get the pathes of the required commands.
 * @returns The pathes of the required commands.
 * @throws If any of the required commands is not found in PATH.
 */
export const getPathes = async (): Promise<Pathes> => {
  if (pathes) {
    return pathes;
  }
  const taskWarrior = await getPath('task');
  if (!taskWarrior) {
    throw new Error('TaskWarrior is not found in PATH');
  }
  pathes = { taskWarrior };
  return pathes;
};
