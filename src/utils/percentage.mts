/**
 * Returns `true` with the given percentage chance.
 * @param percent A number between 0 and 100 representing the percentage
 * chance to return `true`.
 * @returns `true` with the given percentage chance, `false` otherwise.
 */
export const percentage = (percent: number): boolean =>
  Math.random() <= percent * 0.01;
