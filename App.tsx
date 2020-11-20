import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {AppContext} from 'wHooks';
import {ThemeProvider, themes} from 'wStyled';
import {AppContextType, AppState} from 'wTypes';
import ModalStack from './src/ModalStack';

const App: React.FC = () => {
  const scheme = useColorScheme() || 'light';
  const theme = themes[scheme];
  const barStyle = scheme === 'light' ? 'dark-content' : 'light-content';

  const [state, updateState] = useState<AppState>({
    filter: null,
    filterVersion: Date.now(),
  });

  const setState = (updates: Partial<AppContextType>) =>
    updateState((prevState) => ({...prevState, ...updates}));

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppContext.Provider
          value={{...state, updateContext: (update) => setState(update)}}>
          <ModalStack />
        </AppContext.Provider>
      </NavigationContainer>
      <StatusBar barStyle={barStyle} />
    </ThemeProvider>
  );
};

export default App;
