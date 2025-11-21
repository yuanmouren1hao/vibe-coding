import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import {theme} from './theme/theme';
import {colors} from './theme/colors';

// 忽略特定警告
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary.dark}
        translucent
      />
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
