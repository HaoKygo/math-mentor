import { create } from 'zustand';

type Level = 'L1' | 'L2' | 'L3' | 'L4';

interface LevelStore {
  level: Level;
  correctStreak: number;
  wrongStreak: number;
  setLevel: (level: Level) => void;
  upgradeLevel: () => void;
  downgradeLevel: () => void;
  addCorrectStreak: () => void;
  addWrongStreak: () => void;
  resetStreak: () => void;
}

export const useLevelStore = create<LevelStore>((set) => ({
  level: 'L2',
  correctStreak: 0,
  wrongStreak: 0,
  setLevel: (level) => set({ level }),
  upgradeLevel: () => set((state) => ({
    level: state.level === 'L1' ? 'L2' : state.level === 'L2' ? 'L3' : state.level === 'L3' ? 'L4' : 'L4'
  })),
  downgradeLevel: () => set((state) => ({
    level: state.level === 'L4' ? 'L3' : state.level === 'L3' ? 'L2' : state.level === 'L2' ? 'L1' : 'L1'
  })),
  addCorrectStreak: () => set((state) => ({ correctStreak: state.correctStreak + 1, wrongStreak: 0 })),
  addWrongStreak: () => set((state) => ({ wrongStreak: state.wrongStreak + 1, correctStreak: 0 })),
  resetStreak: () => set({ correctStreak: 0, wrongStreak: 0 }),
}));