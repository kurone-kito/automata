import { describe, expect, it, vi } from 'vitest';
import { isNextDay } from './isNextDay.mjs';

const getNonVolatileState = vi.hoisted(() => vi.fn());
vi.mock('./nonVolatileState.mjs', () => ({ getNonVolatileState }));

describe('isNextDay', () => {
  it('should return true if it is the next day since the last run', async () => {
    const lastRunTick = new Date();
    lastRunTick.setDate(lastRunTick.getDate() - 1);
    getNonVolatileState.mockResolvedValueOnce({
      lastRunTick: lastRunTick.getTime(),
    });
    await expect(isNextDay()).resolves.toBe(true);
  });

  it('should return false if it is the same day as the last run', async () => {
    const lastRunTick = new Date();
    getNonVolatileState.mockResolvedValueOnce({
      lastRunTick: lastRunTick.getTime(),
    });
    await expect(isNextDay()).resolves.toBe(false);
  });
});
