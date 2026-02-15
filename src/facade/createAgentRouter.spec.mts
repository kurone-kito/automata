import { doNothing } from 'remeda';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { createAgentRouter } from './createAgentRouter.mjs';

describe('createAgentRouter', () => {
  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(doNothing);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should call the correct agent based on the predicate', async () => {
    const agent1 = vi.fn().mockResolvedValue('agent1');
    const agent2 = vi.fn().mockResolvedValue('agent2');
    const router = createAgentRouter(
      { predicate: () => 0, agent: agent1, title: 'Agent 1' },
      { predicate: () => 100, agent: agent2, title: 'Agent 2' },
    );
    const result = await router('model');
    expect(result).toBe('agent2');
    expect(agent1).not.toHaveBeenCalled();
    expect(agent2).toHaveBeenCalledWith('model');
  });

  it('should call the fallback agent if no predicates match', async () => {
    const agent1 = vi.fn().mockResolvedValue('agent1');
    const router = createAgentRouter({
      predicate: () => 0,
      agent: agent1,
      title: 'Agent 1',
    });
    const result = await router('model');
    expect(result).toBe(
      '目的を全て達成したため、AI エージェントを呼び出しませんでした。',
    );
    expect(agent1).not.toHaveBeenCalled();
  });
});
