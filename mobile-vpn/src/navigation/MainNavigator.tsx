import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';
import HomeScreen from '@screens/main/HomeScreen';
import ServersScreen from '@screens/main/ServersScreen';
import SubscriptionsScreen from '@screens/main/SubscriptionsScreen';
import ProfileScreen from '@screens/main/ProfileScreen';
import Icon from '@components/MaterialCommunityIcons';
import {colors} from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.border.default,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <Icon name="shield-check" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Servers"
        component={ServersScreen}
        options={{
          tabBarLabel: '服务器',
          tabBarIcon: ({color, size}) => (
            <Icon name="server-network" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{
          tabBarLabel: '订阅',
          tabBarIcon: ({color, size}) => (
            <Icon name="link-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
