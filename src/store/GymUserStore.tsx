import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
}

type AuthStore = {
  user: User | null;
  accessToken: string | null;
  isLoggenIn: boolean;
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      accessToken: null,
      isLoggenIn: false,
      // Iniciar sesion
      login: (userData) => {
        set((state) => ({
          user: (state.user = userData.user),
          token: (state.accessToken = userData.token),
          isLoggenIn: (state.isLoggenIn = true),
        }));
      },
      logout: () => {
        set(() => ({
          user: null,
          token: null,
          isLoggenIn: false,
        }));
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
