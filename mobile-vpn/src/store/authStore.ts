import {create} from 'zustand';
import {User} from '@types/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      // TODO: 替换为实际API调用
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        subscriptionType: 'free' as any,
        createdAt: new Date().toISOString(),
      };
      const mockToken = 'mock-jwt-token';

      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));

      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  register: async (email: string, username: string, password: string) => {
    try {
      // TODO: 替换为实际API调用
      const mockUser: User = {
        id: '1',
        email,
        username,
        subscriptionType: 'free' as any,
        createdAt: new Date().toISOString(),
      };
      const mockToken = 'mock-jwt-token';

      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));

      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  loadUser: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userStr = await AsyncStorage.getItem('user');

      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({isLoading: false});
      }
    } catch (error) {
      console.error('Load user failed:', error);
      set({isLoading: false});
    }
  },

  updateUser: (userData: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = {...currentUser, ...userData};
      set({user: updatedUser});
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },
}));
