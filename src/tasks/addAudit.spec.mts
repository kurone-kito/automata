import { describe, expect, it } from 'vitest';
import { createTaskCommand } from './addAudit.mjs';

describe('createTaskCommand', () => {
  it('should create a command string for TaskWarrior based on the given body and tags', () => {
    const params = {
      body: 'This is an\naudit task.\n\n---\n\nDetails about\nthe audit.\n\n---',
      tags: ['research', 'occupation'] as const,
    };
    const expected =
      "task add project:am:management priority:L +audit +research +occupation 'Details about\nthe audit.'";
    expect(createTaskCommand(params)).toBe(expected);
  });

  it('should create a command string for TaskWarrior with only the body when no tags are provided', () => {
    const params = {
      body: 'This is an audit task without tags.',
    };
    const expected =
      "task add project:am:management priority:L +audit 'This is an audit task without tags.'";
    expect(createTaskCommand(params)).toBe(expected);
  });
});
