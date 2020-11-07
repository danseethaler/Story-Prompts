import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {Animated, Pressable, Text} from 'react-native';
import {useStyledTheme} from 'wStyled';
import GradientHelper from './GradientHelper';
import WContainer from './WContainer';

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

interface Props {
  colors: Animated.AnimatedInterpolation[];
  onPress: () => void;
}

const NextButton: React.FC<Props> = ({colors, onPress}) => {
  const theme = useStyledTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: 40,
        overflow: 'hidden',
      }}>
      <AnimatedGradientHelper
        style={{paddingHorizontal: 100, paddingVertical: 14}}
        color1={colors[0]}
        color2={colors[1]}>
        <WContainer row align="center" justify="center">
          <Text
            style={{
              fontSize: 26,
              color: theme.colors.white,
              fontFamily: 'Avenir Next',
              fontWeight: '600',
            }}>
            Next
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={28}
            style={{marginLeft: theme.baseUnit * 1.5}}
            color={theme.colors.white}
          />
        </WContainer>
      </AnimatedGradientHelper>
    </Pressable>
  );
};

export default NextButton;
