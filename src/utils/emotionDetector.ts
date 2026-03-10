export type Emotion = 'confused' | 'frustrated' | 'bored' | 'excited' | 'neutral';

const emotionPatterns: Array<{ pattern: RegExp; emotion: Emotion }> = [
  { pattern: /我不会|完全不懂|看不懂|不明白|什么意思/i, emotion: 'confused' },
  { pattern: /怎么算|怎么解|怎么做/i, emotion: 'confused' },
  { pattern: /好难|算了|放弃|不想做了|太难了/i, emotion: 'frustrated' },
  { pattern: /不会做|做不出|看不懂啊/i, emotion: 'frustrated' },
  { pattern: /太简单|没意思|太容易了/i, emotion: 'bored' },
  { pattern: /我懂了|明白了|原来如此|谢谢/i, emotion: 'excited' },
];

export function detectEmotion(text: string): Emotion {
  for (const { pattern, emotion } of emotionPatterns) {
    if (pattern.test(text)) return emotion;
  }
  return 'neutral';
}

export function getEmotionResponse(emotion: Emotion): string {
  const responses: Record<Emotion, string> = {
    confused: '别着急，我们换个方式重新理解这道题。',
    frustrated: '遇到困难很正常，我们先休息一下？',
    bored: '掌握得很好！要不要挑战更有难度的题目？',
    excited: '太棒了！趁热打铁，来试试进阶题目！',
    neutral: '',
  };
  return responses[emotion];
}