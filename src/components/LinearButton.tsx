import React from 'react';
import {Animated} from 'react-native';
import GradientHelper from './GradientHelper';
import ScaleButton, {ScaleButtonProps} from './ScaleButton';

interface LinearButtonProps extends ScaleButtonProps {
  children: React.ReactNode;
  gradientColor1: Animated.AnimatedInterpolation;
  gradientColor2: Animated.AnimatedInterpolation;
  touchStyle?: any;
}

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

const LinearButton = ({
  children,
  gradientColor1,
  gradientColor2,
  touchStyle,
  ...rest
}: LinearButtonProps) => (
  <ScaleButton {...rest}>
    <AnimatedGradientHelper
      style={touchStyle}
      color1={gradientColor1}
      color2={gradientColor2}>
      {children}
    </AnimatedGradientHelper>
  </ScaleButton>
);

export default LinearButton;
