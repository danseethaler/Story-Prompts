import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider, themes} from 'wStyled';
import Dashboard from './src/Dashboard';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={themes.light}>
        <Dashboard />
        <StatusBar barStyle="light-content" />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
