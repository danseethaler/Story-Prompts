import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {AppContext} from 'wHooks';
import {ThemeProvider, themes} from 'wStyled';
import {AppContextType, AppState} from 'wTypes';
import ModalStack from './src/ModalStack';

const App: React.FC = () => {
  const [state, updateState] = useState<AppState>({filter: null});

  const setState = (updates: Partial<AppContextType>) =>
    updateState((prevState) => ({...prevState, ...updates}));

  return (
    <ThemeProvider theme={themes.light}>
      <NavigationContainer>
        <AppContext.Provider
          value={{...state, updateContext: (update) => setState(update)}}>
          <ModalStack />
        </AppContext.Provider>
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </ThemeProvider>
  );
};

export default App;
