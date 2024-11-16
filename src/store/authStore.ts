import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password, remember) => {
    // Simulated login - replace with actual API call
    const user = { email, name: email.split('@')[0] };
    set({ user, isAuthenticated: true });
    if (remember) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  },
}));