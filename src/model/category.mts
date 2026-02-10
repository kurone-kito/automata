import type { LiteralUnion } from 'type-fest';

/** Type definition for model costs categories. */
export type ModelCategory = 'hi' | 'lo' | 'mid';

/** Type definition for possibly unknown model categories. */
export type MaybeModelCategory = LiteralUnion<ModelCategory, string>;

/**
 * Check if the input string is a valid {@link ModelCategory}.
 * @param input The string to check.
 * @returns True if the input is a {@link ModelCategory}, false otherwise.
 */
export const isCategory = (input: MaybeModelCategory): input is ModelCategory =>
  input === 'hi' || input === 'mid' || input === 'lo';
