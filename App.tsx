import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import ModalStack from './src/ModalStack';
import {ThemeProvider, themes} from 'wStyled';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={themes.light}>
      <NavigationContainer>
        <ModalStack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </ThemeProvider>
  );
};

export default App;
