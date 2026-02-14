import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { constant } from 'remeda';
import { createTempDir } from '../io/createTempDir.mjs';
import { addAudit } from '../tasks/addAudit.mjs';
import type { Project, Tag } from '../tasks/amTypes.mjs';
import type { CallCopilotParams } from './call.mjs';
import { callCopilot } from './call.mjs';

/** Type definition for the {@link facadeCallCopilot} function. */
export interface FacadeCallCopilotParams
  extends Pick<CallCopilotParams, 'model' | 'prompt'> {
  readonly tags?: readonly (Project | Tag)[] | undefined;
}

/**
 * A facade function that calls GitHub Copilot CLI with the specified
 * parameters, saves the output to a temporary file, reads the file
 * content, and adds an audit task with the content as the body and the
 * specified tags.
 * @param params An object containing the parameters for the Copilot
 * command.
 * @returns A promise that resolves to the standard output from the Copilot
 * command.
 */
export const facadeCallCopilot = async (
  params: FacadeCallCopilotParams,
): Promise<string> => {
  const { model, prompt, tags } = params;
  await using tempDir = await createTempDir();
  const audit = join(`${tempDir}`, `audit.md`);
  const stdout = await callCopilot({ model, prompt, share: audit });
  const body = await readFile(audit, 'utf-8').catch(constant(''));
  if (body) {
    await addAudit({ body, tags });
  }
  return stdout;
};
