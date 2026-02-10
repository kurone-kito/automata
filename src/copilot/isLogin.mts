import { homedir } from 'node:os';
import { join } from 'node:path';

/** Path to the GitHub Copilot CLI configuration file. */
const configPath = join(homedir(), '.copilot', 'config.json');

/**
 * Check if the user is logged in to GitHub Copilot CLI.
 * @returns True if logged in, false otherwise.
 */
export const isLogin = async (): Promise<boolean> =>
  !!(
    await import(configPath, { with: { type: 'json' } }).catch(() => undefined)
  )?.['default']?.['logged_in_users']?.[0]?.['login'];
