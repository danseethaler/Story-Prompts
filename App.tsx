import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {getShuffledCards, packsData} from 'wConfig';
import {AppContext, useActiveCards} from 'wHooks';
import {ThemeProvider, useGetThemeData} from 'wStyled';
import {AppContextType, AppState} from 'wTypes';
import ModalStack from './src/ModalStack';

const shuffledCards = getShuffledCards(packsData.quotes.cardData);

const App: React.FC = () => {
  const [state, updateState] = useState<AppState>({
    filter: null,
    packData: packsData.quotes,
    availableCards: shuffledCards,
    cardIndex: 0,
  });

  const setState = (
    updates: Partial<AppContextType> | ((state: AppState) => AppState),
  ) => {
    if (typeof updates === 'function') {
      updateState((prevState) => {
        return updates(prevState);
      });
    } else {
      updateState((prevState) => ({...prevState, ...updates}));
    }
  };

  // Theme data
  const themes = useGetThemeData(state.packData);
  const scheme = useColorScheme() || 'light';
  const theme = themes[scheme];
  const barStyle = scheme === 'light' ? 'dark-content' : 'light-content';

  // Filter only the active cards
  const activeCards = useActiveCards(state);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppContext.Provider
          value={{
            ...state,
            activeCards,
            goToNextCardIndex: () =>
              updateState((currentState) => ({
                ...currentState,
                cardIndex: currentState.cardIndex + 1,
              })),
            updateContext: (update) => setState(update),
          }}>
          <ModalStack />
        </AppContext.Provider>
      </NavigationContainer>
      <StatusBar barStyle={barStyle} />
    </ThemeProvider>
  );
};

export default App;
