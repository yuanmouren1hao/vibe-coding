import {create} from 'zustand';
import {Subscription} from '@types/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SubscriptionState {
  subscriptions: Subscription[];
  isLoading: boolean;

  // Actions
  addSubscription: (url: string, name?: string) => Promise<void>;
  removeSubscription: (id: string) => Promise<void>;
  updateSubscription: (id: string) => Promise<void>;
  updateAllSubscriptions: () => Promise<void>;
  loadSubscriptions: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscriptions: [],
  isLoading: false,

  addSubscription: async (url: string, name?: string) => {
    try {
      set({isLoading: true});

      const newSubscription: Subscription = {
        id: Date.now().toString(),
        name: name || 'New Subscription',
        url,
        serverCount: 0,
        lastUpdate: new Date().toISOString(),
        autoUpdate: true,
        servers: [],
      };

      const updatedSubscriptions = [...get().subscriptions, newSubscription];
      set({subscriptions: updatedSubscriptions});

      // 保存到AsyncStorage (Web兼容)
      await AsyncStorage.setItem(
        'subscriptions',
        JSON.stringify(updatedSubscriptions),
      );
    } catch (error) {
      console.error('Add subscription failed:', error);
      throw error;
    } finally {
      set({isLoading: false});
    }
  },

  removeSubscription: async (id: string) => {
    try {
      const updatedSubscriptions = get().subscriptions.filter(
        sub => sub.id !== id,
      );
      set({subscriptions: updatedSubscriptions});

      await AsyncStorage.setItem(
        'subscriptions',
        JSON.stringify(updatedSubscriptions),
      );
    } catch (error) {
      console.error('Remove subscription failed:', error);
      throw error;
    }
  },

  updateSubscription: async (id: string) => {
    try {
      set({isLoading: true});

      const subscription = get().subscriptions.find(sub => sub.id === id);
      if (!subscription) {
        throw new Error('Subscription not found');
      }

      const updatedSubscriptions = get().subscriptions.map(sub =>
        sub.id === id
          ? {
              ...sub,
              lastUpdate: new Date().toISOString(),
            }
          : sub,
      );

      set({subscriptions: updatedSubscriptions});

      await AsyncStorage.setItem(
        'subscriptions',
        JSON.stringify(updatedSubscriptions),
      );
    } catch (error) {
      console.error('Update subscription failed:', error);
      throw error;
    } finally {
      set({isLoading: false});
    }
  },

  updateAllSubscriptions: async () => {
    try {
      set({isLoading: true});

      const updatePromises = get().subscriptions.map(sub =>
        get().updateSubscription(sub.id),
      );

      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Update all subscriptions failed:', error);
      throw error;
    } finally {
      set({isLoading: false});
    }
  },

  loadSubscriptions: async () => {
    try {
      const storedData = await AsyncStorage.getItem('subscriptions');
      if (storedData) {
        const subscriptions = JSON.parse(storedData);
        set({subscriptions});
      }
    } catch (error) {
      console.error('Load subscriptions failed:', error);
    }
  },
}));
