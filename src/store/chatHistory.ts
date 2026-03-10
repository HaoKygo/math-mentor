import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatHistoryStore {
  messages: Message[];
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  clearHistory: () => void;
}

export const useChatHistoryStore = create<ChatHistoryStore>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (role, content) => set((state) => ({
        messages: [...state.messages, {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          role,
          content,
          timestamp: Date.now(),
        }]
      })),
      clearHistory: () => set({ messages: [] }),
    }),
    {
      name: 'mathmentor_chat_history',
    }
  )
);