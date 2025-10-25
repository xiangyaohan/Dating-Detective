import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  phone: string;
  email?: string;
  realName: string;
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  queryCount: number;
  isVerified: boolean;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: { phone: string; password: string }) => Promise<void>;
  register: (userData: { phone: string; password: string; realName: string; verificationCode: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // 模拟登录成功
          const mockUser: User = {
            id: '1',
            phone: credentials.phone,
            email: 'user@example.com',
            realName: '张三',
            subscriptionPlan: 'basic',
            queryCount: 2,
            isVerified: true,
            avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait&image_size=square'
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : '登录失败'
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // 模拟注册成功
          const mockUser: User = {
            id: Date.now().toString(),
            phone: userData.phone,
            realName: userData.realName,
            subscriptionPlan: 'basic',
            queryCount: 0,
            isVerified: false
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : '注册失败'
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);