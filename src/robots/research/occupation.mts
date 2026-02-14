import prompt from '../../assets/research/occupation.md?raw';
import { facadeCallCopilot } from '../../copilot/facade.mjs';

/**
 * Research occupation information using GitHub Copilot CLI and add it to
 * the audit.
 * @param model The model to use for GitHub Copilot CLI.
 * @return The output from GitHub Copilot CLI.
 */
export const searchOccupation = (model: string): Promise<string> =>
  facadeCallCopilot({ model, prompt, tags: ['occupation', 'research'] });
