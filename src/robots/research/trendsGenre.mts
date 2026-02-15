import prompt from '../../assets/research/trendsGenre.md?raw';
import { facadeCallCopilot } from '../../copilot/facade.mjs';
import type {
  Agent,
  Predicate,
  RouteItem,
} from '../../facade/createAgentRouter.mjs';
import { getTasksCount } from '../../tasks/getTasks.mjs';

/**
 * Research trends genre information using GitHub Copilot CLI and add it to
 * the audit.
 * @param model The model to use for GitHub Copilot CLI.
 * @return The output from GitHub Copilot CLI.
 */
export const agent: Agent = (model) =>
  facadeCallCopilot({ model, prompt, tags: ['trends_genre', 'research'] });

/**
 * Predicate function that determines whether the trends genre research route
 * should be taken.
 * @returns A promise that resolves to a percentage chance
 * (a number between 0 and 100) that the route should be taken.
 */
export const predicate: Predicate = async () =>
  Math.max((100 - (await getTasksCount('research', ['trends_genre']))) * 5, 1);

/**
 * Title for the trends genre research agent, which is used in the logging
 * when the agent is executed.
 */
const title = 'トレンドジャンルのリサーチ';

/**
 * Route item for the trends genre research agent, which includes the agent
 * function, the percentage of execution, and the predicate function.
 */
export const searchTrendsGenre: RouteItem = { agent, predicate, title };
