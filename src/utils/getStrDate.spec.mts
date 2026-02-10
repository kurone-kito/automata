import { describe, expect, it } from 'vitest';
import { getStrDate } from './getStrDate.mjs';

describe('getStrDate', () => {
  it('should return the current date in YYYY-MM-DD format when no date is provided', () => {
    const today = new Date();
    const expected = today.toISOString().split('T')[0];
    expect(getStrDate()).toBe(expected);
  });

  it('should return the correct date string for a given date', () => {
    const date = new Date('2023-10-05T12:34:56Z');
    const expected = '2023-10-05';
    expect(getStrDate(date)).toBe(expected);
  });

  it('should handle leap years correctly', () => {
    const leapDate = new Date('2020-02-29T00:00:00Z');
    const expected = '2020-02-29';
    expect(getStrDate(leapDate)).toBe(expected);
  });

  it('should handle dates at the end of the year correctly', () => {
    const endOfYearDate = new Date('2021-12-31T23:59:59Z');
    const expected = '2021-12-31';
    expect(getStrDate(endOfYearDate)).toBe(expected);
  });
});
