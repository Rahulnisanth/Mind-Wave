import { create } from "zustand";

export const useDuration = create((set) => ({
  secondsRemaining: 25,
  setSecondsRemaining: (newTiming) => set({ secondsRemaining: newTiming }),
}));
