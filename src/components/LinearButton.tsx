import React from 'react';
import {Animated} from 'react-native';
import AnimatedGradient from './AnimatedGradient';
import ScaleButton, {ScaleButtonProps} from './ScaleButton';

interface LinearButtonProps extends ScaleButtonProps {
  children: React.ReactNode;
  gradientColor1: Animated.AnimatedInterpolation;
  gradientColor2: Animated.AnimatedInterpolation;
  touchStyle?: any;
}

const LinearButton = ({
  children,
  gradientColor1,
  gradientColor2,
  touchStyle,
  ...rest
}: LinearButtonProps) => (
  <ScaleButton {...rest}>
    <AnimatedGradient
      style={touchStyle}
      color1={gradientColor1}
      color2={gradientColor2}>
      {children}
    </AnimatedGradient>
  </ScaleButton>
);

export default LinearButton;
