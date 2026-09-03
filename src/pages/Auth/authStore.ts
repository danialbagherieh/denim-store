import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  email: string;
  name?: string;
};

type AuthStore = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // key for localStorage
    }
  )
);