import { create } from 'zustand';

interface ILastSeenLocationStore {
  lastSeen: string;
  setLastSeen: (value: string) => void;
}

export const useLastSeenLocationStore = create<ILastSeenLocationStore>(set => ({
  lastSeen: '',
  setLastSeen: (value: string) => set({ lastSeen: value }),
}));
