import prompt from '../../assets/research/occupation.md?raw';
import { facadeCallCopilot } from '../../copilot/facade.mjs';
import type {
  Agent,
  Predicate,
  RouteItem,
} from '../../facade/createAgentRouter.mjs';
import { getTasksCount } from '../../tasks/getTasks.mjs';

/**
 * Research occupation information using GitHub Copilot CLI and add it to
 * the audit.
 * @param model The model to use for GitHub Copilot CLI.
 * @return The output from GitHub Copilot CLI.
 */
export const agent: Agent = (model) =>
  facadeCallCopilot({ model, prompt, tags: ['occupation', 'research'] });

/**
 * Predicate function that determines whether the occupation research route
 * should be taken.
 * @returns A promise that resolves to a percentage chance
 * (a number between 0 and 100) that the route should be taken.
 */
export const predicate: Predicate = async () =>
  Math.max((100 - (await getTasksCount('research', ['occupation']))) * 5, 1);

/**
 * Title for the occupation research agent, which is used in the logging
 * when the agent is executed.
 */
const title = '職種リサーチ';

/**
 * Route item for the occupation research agent, which includes the agent
 * function, the percentage of execution, and the predicate function.
 */
export const searchOccupation: RouteItem = { agent, predicate, title };
