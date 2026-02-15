import prompt from '../../assets/research/mergeIO.md?raw';
import { facadeCallCopilot } from '../../copilot/facade.mjs';
import type {
  Agent,
  Predicate,
  RouteItem,
} from '../../facade/createAgentRouter.mjs';
import { getTasksCount } from '../../tasks/getTasks.mjs';

/**
 * Research merge IO information using GitHub Copilot CLI and add it to
 * the audit.
 * @param model The model to use for GitHub Copilot CLI.
 * @return The output from GitHub Copilot CLI.
 */
export const agent: Agent = (model) =>
  facadeCallCopilot({
    model,
    prompt,
    tags: ['industry_occupation', 'research'],
  });

/**
 * Predicate function that determines whether the merge IO research route
 * should be taken.
 * @returns A promise that resolves to a percentage chance
 * (a number between 0 and 100) that the route should be taken.
 */
export const predicate: Predicate = async () => {
  const industries = await getTasksCount('research', ['industry']);
  const occupations = await getTasksCount('research', ['occupation']);
  if (industries <= 1 || occupations <= 1) {
    return 0;
  }
  const ioCount = await getTasksCount('research', ['industry_occupation']);
  return Math.max((10000 - ioCount) * 0.01, 1);
};

/**
 * Title for the merge IO research agent, which is used in the logging
 * when the agent is executed.
 */
const title = '業種・職種のマージと簡易フィルター';

/**
 * Route item for the merge IO research agent, which includes the agent
 * function, the percentage of execution, and the predicate function.
 */
export const searchMergeIO: RouteItem = { agent, predicate, title };
