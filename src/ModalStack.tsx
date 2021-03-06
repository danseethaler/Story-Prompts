import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {useStyledTheme} from 'wStyled';
import {ModalStackParamList} from 'wTypes';
import Dashboard from './Dashboard';
import Packs from './Packs';
import {screenHeight} from './styled/sizing';
import Topics from './Topics';

const Stack = createStackNavigator<ModalStackParamList>();

const ModalStack: React.FC = () => {
  const theme = useStyledTheme();

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      mode="modal"
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
        cardStyle: {backgroundColor: 'transparent'},
        gestureResponseDistance: {vertical: screenHeight},
        headerTransparent: true,
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
        headerStyle: {
          shadowOffset: {width: 0, height: 0},
          backgroundColor: theme.colors.background100,
        },
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Topics" component={Topics} />
      <Stack.Screen name="Packs" component={Packs} />
    </Stack.Navigator>
  );
};

export default ModalStack;
