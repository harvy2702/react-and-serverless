import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { msalInstance, loginRequest } from '@/config/msal.config';
import type { AccountInfo, AuthenticationResult } from '@azure/msal-browser';

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
  logout: () => Promise<void>;
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
            // Initialize MSAL if not already initialized
            await msalInstance.initialize();
            
            // Trigger login popup with Azure Entra ID External tenant
            // This will show the user flow which includes Google as an identity provider
            const response: AuthenticationResult = await msalInstance.loginPopup({
              ...loginRequest,
              // The user flow will present Google as an option
              // Users can choose to sign in with Google or other configured providers
            });
            
            const account: AccountInfo | null = response.account;
            
            if (!account) {
              throw new Error('No account information received');
            }
            
            // Extract user information from the account
            const user: User = {
              id: account.homeAccountId,
              email: account.username,
              name: account.name || account.username.split('@')[0],
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${account.username}`,
            };
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            // Handle user cancellation gracefully
            if (error instanceof Error && error.message.includes('user_cancelled')) {
              set({ isLoading: false, error: null });
              return;
            }
            
            set({
              error: error instanceof Error ? error.message : 'Google login failed',
              isLoading: false,
            });
          }
        },

        loginWithMicrosoft: async () => {
          set({ isLoading: true, error: null });
          
          try {
            // Initialize MSAL if not already initialized
            await msalInstance.initialize();
            
            // Trigger login popup with Azure Entra ID External tenant
            const response: AuthenticationResult = await msalInstance.loginPopup(loginRequest);
            
            const account: AccountInfo | null = response.account;
            
            if (!account) {
              throw new Error('No account information received');
            }
            
            // Extract user information from the account
            const user: User = {
              id: account.homeAccountId,
              email: account.username,
              name: account.name || account.username.split('@')[0],
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${account.username}`,
            };
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            // Handle user cancellation gracefully
            if (error instanceof Error && error.message.includes('user_cancelled')) {
              set({ isLoading: false, error: null });
              return;
            }
            
            set({
              error: error instanceof Error ? error.message : 'Microsoft login failed',
              isLoading: false,
            });
          }
        },

        logout: async () => {
          try {
            await msalInstance.initialize();
            const account = msalInstance.getAllAccounts()[0];
            
            if (account) {
              await msalInstance.logoutPopup({
                account,
                postLogoutRedirectUri: import.meta.env.VITE_AZURE_AD_POST_LOGOUT_REDIRECT_URI || 'http://localhost:5173',
              });
            }
            
            set({
              user: null,
              isAuthenticated: false,
              error: null,
            });
          } catch (error) {
            console.error('Logout error:', error);
            // Still clear local state even if logout fails
            set({
              user: null,
              isAuthenticated: false,
              error: null,
            });
          }
        },
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
