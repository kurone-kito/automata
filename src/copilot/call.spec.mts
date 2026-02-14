import { describe, expect, it } from 'vitest';
import { createCopilotCommand } from './call.mjs';

describe('createCopilotCommand', () => {
  it('should create a command string with all parameters', () => {
    const params = {
      customAgent: 'my-agent',
      model: 'gpt-4',
      prompt: 'Hello, Copilot!',
      share: 'output.md',
    };
    const expectedCommand =
      "copilot --allow-all --experimental --silent --yolo --agent my-agent --model gpt-4 --prompt 'Hello, Copilot!' --share output.md";
    expect(createCopilotCommand(params)).toBe(expectedCommand);
  });

  it('should create a command string with only required parameters', () => {
    const params = {
      prompt: 'Hello, Copilot!',
    };
    const expectedCommand =
      "copilot --allow-all --experimental --silent --yolo --prompt 'Hello, Copilot!'";
    expect(createCopilotCommand(params)).toBe(expectedCommand);
  });

  it('should create a command string with some optional parameters', () => {
    const params = {
      model: 'gpt-3.5-turbo',
      prompt: 'Hello\nCopilot!',
    };
    const expectedCommand =
      "copilot --allow-all --experimental --silent --yolo --model gpt-3.5-turbo --prompt 'Hello\nCopilot!'";
    expect(createCopilotCommand(params)).toBe(expectedCommand);
  });
});
