import { searchIndustry } from '../robots/research/industry.mjs';
import { searchMergeIO } from '../robots/research/mergeIO.mjs';
import { searchOccupation } from '../robots/research/occupation.mjs';
import { searchTrendsGenre } from '../robots/research/trendsGenre.mts';
import type { RouteItem } from './createAgentRouter.mjs';
import { createAgentRouter } from './createAgentRouter.mjs';

/**
 * The list of priority routes for the agent router.
 *
 * These routes are evaluated first, and are executed if their predicate
 * functions return a percentage chance that is greater than a random
 * percentage chance. These routes are intended to be more important or
 * urgent than the routes in the shuffle list.
 */
const priorityList = [] as const satisfies readonly RouteItem[];

/**
 * The list of routes for the agent router that are shuffled in order to
 * add randomness to the execution of the agents.
 *
 * These routes are evaluated after the priority routes, and are executed
 * based on their predicate functions and a random percentage chance.
 */
const shuffleList = [
  searchIndustry,
  searchMergeIO,
  searchOccupation,
  searchTrendsGenre,
] as const satisfies readonly RouteItem[];

/**
 * The agent router for the system.
 * @param routes A list of routes for the AI agent to take based on the
 * current state of the system.
 * @return A function that takes a model string as an argument and returns
 * a promise that resolves to a string.
 */
export const agentRouter = createAgentRouter(
  ...priorityList,
  ...shuffleList.toSorted(() => Math.random() - 0.5),
);
