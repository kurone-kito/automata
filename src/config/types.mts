import type { MaybeModelCategory } from '../model/category.mjs';

/** Type definition for GitHub-related configuration. */
export interface GitHubConfig {
  /** GitHub Personal Access Token. */
  readonly personalAccessToken: string;

  /** GitHub User ID. */
  readonly userId: string;
}

/** Type definition for the configuration. */
export interface RootConfig {
  /** Model category or specific model name. */
  readonly model: MaybeModelCategory;

  /** GitHub-related configuration. */
  readonly github: GitHubConfig;

  /** Session threshold in megabytes. */
  readonly sessionThreshold: number;
}
