import { useState, useCallback } from 'react';
import { useLevelStore } from '../store/userLevel';

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || '';

interface UseClaudeStreamOptions {
  onUpdate: (content: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export function useClaudeStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { level } = useLevelStore();

  const systemPrompts: Record<string, string> = {
    L1: '学生基础薄弱，从零搭建知识体系，用生活化类比讲解',
    L2: '学生概念有了但解题不稳定，需系统强化例题→变式→总结',
    L3: '学生掌握主干知识，拓展多解法策略，对比解法优劣',
    L4: '学生超纲拓展，开放性问题讨论，数学思维深化',
  };

  const stream = useCallback(async (messages: Array<{role: 'user'|'assistant'; content: string}>, options: UseClaudeStreamOptions) => {
    setIsStreaming(true);
    setError(null);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-access': 'enable',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `你是 MathMentor，高中数学 AI 导师。
当前学生水平：${level}
教学策略：${systemPrompts[level]}

核心原则：
1. 自适应难度，实时感知学生水平
2. 苏格拉底式引导，三级提示系统（方向提示→第一步提示→完整解答）
3. 情绪感知，先照顾状态再推进学习
4. 不用直接给答案
5. 使用 LaTeX 渲染数学公式`,
          messages: messages.map(m => ({
            role: m.role,
            content: m.content
          })),
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'content_block_delta' && data.delta.type === 'text_delta') {
                options.onUpdate(data.delta.text);
              }
            } catch {}
          }
        }
      }

      options.onComplete();
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Unknown error');
      setError(e);
      options.onError(e);
    } finally {
      setIsStreaming(false);
    }
  }, [level]);

  return { stream, isStreaming, error };
}