import dargs from 'dargs';
import type { Options } from 'execa';
import { execa } from 'execa';

/**
 * Type definition for the options that can be passed to the dargs function.
 */
export interface CallCopilotParams {
  /**
   * The custom agent to use when calling GitHub Copilot CLI.
   *
   * This is an optional parameter. If not provided, the default agent will
   * be used.
   */
  readonly customAgent?: string | undefined;

  /**
   * The model to use when calling GitHub Copilot CLI.
   *
   * This is an optional parameter. If not provided, the default model will
   * be used.
   */
  readonly model?: string | undefined;

  /**
   * The prompt to send to GitHub Copilot CLI.
   *
   * This is a required parameter. It should be a string containing the
   * prompt that you want to send to Copilot.
   */
  readonly prompt: string;

  /**
   * The file to share the output with when calling GitHub Copilot CLI.
   *
   * This is an optional parameter. If provided, the output from Copilot
   * will be shared with the specified file.
   */
  readonly share?: string | undefined;
}

/**
 * The options to be passed to the execa function when calling GitHub
 * Copilot CLI.
 */
const options = { shell: true } as const satisfies Options;

/**
 * Static arguments that are always included when calling GitHub Copilot
 * CLI.
 */
const staticArgs = {
  allowAll: true,
  experimental: true,
  silent: true,
  yolo: true,
} as const;

/**
 * Create a command string for calling GitHub Copilot CLI with the
 * specified parameters.
 * @param params An object containing the parameters for the Copilot
 * command, including:
 *  - customAgent: Optional. The custom agent to use.
 *  - model: Optional. The model to use.
 *  - prompt: Required. The prompt to send to Copilot.
 *  - share: Optional. The file to share the output with.
 * @returns A command string that can be used to call GitHub Copilot CLI
 * with the specified parameters.
 */
export const createCopilotCommand = (
  params: CallCopilotParams,
): `copilot ${string}` => {
  const { customAgent: agent, model, prompt, share } = params;
  const args = {
    ...staticArgs,
    ...(agent ? { agent } : {}),
    ...(model ? { model } : {}),
    prompt: `'${prompt}'`,
    ...(share ? { share } : {}),
  };
  return `copilot ${dargs(args, { useEquals: false }).join(' ')}` as const;
};

/**
 * Call GitHub Copilot CLI with the specified parameters and return the
 * output.
 * @param params An object containing the parameters for the Copilot
 * command, including:
 *  - customAgent: Optional. The custom agent to use.
 *  - model: Optional. The model to use.
 *  - prompt: Required. The prompt to send to Copilot.
 *  - share: Optional. The file to share the output with.
 * @returns A promise that resolves to the standard output from the Copilot
 * command.
 */
export const callCopilot = async (
  params: CallCopilotParams,
): Promise<string> => {
  const { stdout } = await execa(createCopilotCommand(params), options);
  return stdout;
};
