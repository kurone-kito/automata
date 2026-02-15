import { describe, expect, it } from 'vitest';
import type { CreateTaskCommandParams } from './createTaskCommand.mjs';
import { createTaskCommand } from './createTaskCommand.mjs';

describe('createTaskCommand', () => {
  it.each<[params: CreateTaskCommandParams, expected: string]>([
    [
      { project: 'research', tags: ['occupation'], command: 'export' },
      'task project:am:research status:pending +occupation export',
    ],
    [
      {
        project: 'development',
        tags: ['audit', 'occupation'],
        command: 'export',
      },
      'task project:am:development status:pending +audit +occupation export',
    ],
    [
      { project: 'design', tags: [], command: 'count' },
      'task project:am:design status:pending count',
    ],
  ])('should create a command string for TaskWarrior based on the given %o params and return %o', (params, expected) =>
    expect(createTaskCommand(params)).toBe(expected));
});
