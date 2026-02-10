/**
 * Get the string representation of a date in 'YYYY-MM-DD' format.
 * @param date The date to format. Defaults to the current date.
 * @returns The formatted date string.
 */
export const getStrDate = (date: Date = new Date()): string => {
  const [result = ''] = date.toISOString().split('T');
  return result;
};
