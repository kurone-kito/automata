import { constant } from 'remeda';
import type { Promisable } from 'type-fest';
import { percentage } from '../utils/percentage.mts';

/**
 * Type definition for an AI agent function.
 *
 * An agent function takes a model string as an argument and returns a
 * promise that resolves to a string. This is the type of function that
 * will be called by the agent router when a route is matched.
 */
export type Agent = (model: string) => Promise<string>;

/**
 * Type definition for a predicate function that determines whether a route
 * should be taken.
 *
 * A predicate function returns a promise that resolves to a percentage
 * chance (a number between 0 and 100) that a route should be taken. The
 * agent router will evaluate the predicate functions of the routes in
 * order, and will take the first route whose predicate returns a
 * percentage chance that is greater than or equal to a randomly generated
 * number between 0 and 100.
 */
export type Predicate = () => Promisable<number>;

/**
 * Type definition for a route item in the agent router.
 *
 * Each route item consists of a predicate function that determines whether
 * the route should be taken, and an agent function that is called if the
 * predicate returns true. The agent function takes a model string as an
 * argument and returns a promise that resolves to a string.
 */
export interface RouteItem {
  /**
   * The agent function that is called if the predicate returns true.
   *
   * This function takes a model string as an argument and returns a promise
   * that resolves to a string. The model string can be used by the agent
   * function to determine how to respond to the request.
   */
  readonly agent: Agent;

  /**
   * The predicate function that determines whether this route should be
   * taken.
   *
   * This function returns a promise that resolves to a percentage chance
   * (a number between 0 and 100) that this route should be taken. The
   * agent router will evaluate the predicate functions of the routes in
   * order, and will take the first route whose predicate returns a
   * percentage chance that is greater than or equal to a randomly
   * generated number between 0 and 100.
   *
   * If the predicate function is not provided, it defaults to a function
   * that always returns 100, meaning that this route will always be taken
   * if it is reached in the order of evaluation.
   */
  readonly predicate?: Predicate | undefined;

  /**
   * The title of the route, which is used for logging and debugging
   * purposes.
   *
   * This is a string that describes the route and can be used to identify
   * it in logs and debugging output. It is not used by the agent router
   * for any functional purpose, but it can be helpful for understanding
   * the behavior of the system and diagnosing issues.
   */
  readonly title: string;
}

/**
 * A fallback agent that is called when no routes match.
 *
 * This agent simply returns a message indicating that all objectives have
 * been achieved and no AI agent was called.
 * @returns A promise that resolves to a string message indicating that all
 * objectives have been achieved.
 */
const fallbackAgent: Agent = async () =>
  '目的を全て達成したため、AI エージェントを呼び出しませんでした。';

/**
 * A fallback predicate that always returns 100, meaning that the route will
 * always be taken if it is reached in the order of evaluation.
 */
const fallbackPercentage = constant(100);

/**
 * Call the appropriate agent based on the current state of the system.
 * @param routes A list of routes for the AI agent to take based on the
 * current state of the system.
 * @return A function that takes a model string as an argument and returns
 * a promise that resolves to a string.
 *
 * This function will call the appropriate agent based on the current state
 * of the system.
 */
export const createAgentRouter =
  (...routes: readonly RouteItem[]) =>
  async (model: string): Promise<string> => {
    const agent = await routes.reduce<Promise<Agent | undefined>>(
      (acc, { agent, predicate: p = fallbackPercentage, title }) =>
        acc.then(async (a) => {
          const result = a ?? (percentage(await p()) ? agent : undefined);
          if (result === agent) {
            console.log(`"${title}" エージェントを実行します。`);
          }
          return result;
        }),
      Promise.resolve(undefined),
    );
    return await (agent ?? fallbackAgent)(model);
  };
