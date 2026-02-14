import prompt from '../../assets/research/industry.md?raw';
import { facadeCallCopilot } from '../../copilot/facade.mjs';
import type {
  Agent,
  Predicate,
  RouteItem,
} from '../../facade/createAgentRouter.mjs';
import { getTasksCount } from '../../tasks/getTasks.mjs';

/**
 * Research industry information using GitHub Copilot CLI and add it to
 * the audit.
 * @param model The model to use for GitHub Copilot CLI.
 * @return The output from GitHub Copilot CLI.
 */
export const agent: Agent = (model) =>
  facadeCallCopilot({ model, prompt, tags: ['industry', 'research'] });

/**
 * Predicate function that determines whether the industry research route
 * should be taken.
 * @returns A promise that resolves to a percentage chance
 * (a number between 0 and 100) that the route should be taken.
 */
export const predicate: Predicate = async () =>
  Math.max((100 - (await getTasksCount('research', ['industry']))) * 5, 1);

/**
 * Title for the industry research agent, which is used in the logging
 * when the agent is executed.
 */
const title = '業種リサーチ';

/**
 * Route item for the industry research agent, which includes the agent
 * function, the percentage of execution, and the predicate function.
 */
export const searchIndustry: RouteItem = { agent, predicate, title };
