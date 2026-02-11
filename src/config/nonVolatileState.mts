import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Type definition for non-volatile state. */
export interface NonVolatileState {
  /** The last run tick timestamp. */
  readonly lastRunTick: number;

  /** The current step number. */
  readonly step: number;
}

/** Type definition for setting non-volatile state options. */
export interface SetNonVolatileStateOptions {
  /**
   * The current working directory.
   * @default process.cwd()
   */
  readonly cwd?: string | undefined;

  /** The non-volatile state to set. */
  readonly state?: Partial<NonVolatileState> | undefined;
}

/** The filename for storing non-volatile state. */
const filename = 'state.json';

/** The default non-volatile state. */
const defaultState = {
  lastRunTick: Date.now(),
  step: 0,
} as const satisfies NonVolatileState;

/**
 * Get the non-volatile state.
 * @param cwd The current working directory. Defaults to `process.cwd()`.
 * @returns The non-volatile state.
 */
export const getNonVolatileState = async (
  cwd: string = process.cwd(),
): Promise<NonVolatileState> => {
  const path = join(cwd, filename);
  const body = await import(path, { with: { type: 'json' } }).catch(() => null);
  return { ...defaultState, ...body?.['default'] };
};

/**
 * Set the non-volatile state.
 * @param params The parameters.
 */
export const setNonVolatileState = (
  params: SetNonVolatileStateOptions,
): Promise<void> => {
  const { cwd = process.cwd(), state } = params;
  const body = JSON.stringify({ ...defaultState, ...state }, undefined, 2);
  return writeFile(join(cwd, filename), body, 'utf-8');
};
