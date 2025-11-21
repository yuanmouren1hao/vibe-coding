import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthStore} from '@store/authStore';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {RootStackParamList} from './types';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../theme/colors';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const {isAuthenticated, isLoading, loadUser} = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary}}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
