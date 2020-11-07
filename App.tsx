import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider, themes} from 'wStyled';
import Dashboard from './src/Dashboard';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={themes.light}>
      <Dashboard />
      <StatusBar barStyle="light-content" />
    </ThemeProvider>
  );
};

export default App;
