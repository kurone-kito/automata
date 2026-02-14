/** Type definitions for tasks. */
export type Project =
  | 'design'
  | 'development'
  | 'improvement'
  | 'management'
  | 'planning'
  | 'public_relations'
  | 'research'
  | 'testing';

/**
 * Type definitions for management tags.
 *
 * These are used to categorize management tasks.
 */
export type ManagementTag = 'audit';

/**
 * Type definitions for research tags.
 *
 * These are used to categorize research tasks.
 */
export type ResearchTag =
  | 'industry'
  | 'industry_occupation'
  | 'occupation'
  | 'trends'
  | 'trends_genre'
  | 'subTrends';

/**
 * Type definitions for tags.
 *
 * This is a union of all possible tag types.
 */
export type Tag = ManagementTag | ResearchTag;
