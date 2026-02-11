import { loadConfig } from 'c12';
import { getModel } from '../model/getModel.mjs';
import { projectRoot } from './projectRoot.mjs';
import type { RootConfig } from './types.mjs';

/** The default configuration. */
export const defaultConfig = {
  github: { personalAccessToken: '', userId: '' },
  model: 'lo',
  sessionThreshold: 50,
} as const satisfies RootConfig;

/**
 * Get the configuration.
 * @param cwd The current working directory. Defaults to the project root.
 * @returns The configuration object.
 */
export const getConfig = async (cwd = projectRoot): Promise<RootConfig> => {
  const { config } = await loadConfig<RootConfig>({ cwd, defaultConfig });
  return { ...config, model: getModel(config.model) };
};
