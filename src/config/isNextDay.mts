import { getNonVolatileState } from './nonVolatileState.mjs';

/**
 * Check if it is the next day since the last run.
 * @returns `true` if it is the next day, otherwise `false`.
 */
export const isNextDay = async (): Promise<boolean> => {
  const { lastRunTick } = await getNonVolatileState();
  const lastRunDate = new Date(lastRunTick);
  const currentDate = new Date();
  return (
    lastRunDate.getFullYear() !== currentDate.getFullYear() ||
    lastRunDate.getMonth() !== currentDate.getMonth() ||
    lastRunDate.getDate() !== currentDate.getDate()
  );
};
