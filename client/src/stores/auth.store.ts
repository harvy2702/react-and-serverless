import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            error: null,
          }),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error, isLoading: false }),

        clearError: () => set({ error: null }),

        login: async (email: string, _password: string) => {
          set({ isLoading: true, error: null });
          
          try {
            // TODO: Replace with actual API call
            // Placeholder for backend integration
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            // Mock user data
            const mockUser: User = {
              id: '1',
              email,
              name: email.split('@')[0],
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            };
            
            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false,
            });
          }
        },

        loginWithGoogle: async () => {
          set({ isLoading: true, error: null });
          
          try {
            // TODO: Implement Google OAuth flow
            // Placeholder for Google Sign-In integration
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            const mockUser: User = {
              id: 'google-123',
              email: 'user@gmail.com',
              name: 'Google User',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
            };
            
            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Google login failed',
              isLoading: false,
            });
          }
        },

        loginWithMicrosoft: async () => {
          set({ isLoading: true, error: null });
          
          try {
            // TODO: Implement MSAL authentication
            // Placeholder for Microsoft/Azure AD integration
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            const mockUser: User = {
              id: 'microsoft-123',
              email: 'user@microsoft.com',
              name: 'Microsoft User',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=microsoft',
            };
            
            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Microsoft login failed',
              isLoading: false,
            });
          }
        },

        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
