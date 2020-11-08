import React from 'react';
import {Animated, Pressable} from 'react-native';
import AnimationStation from './AnimationStation';
import GradientHelper from './GradientHelper';

export interface ScaleButtonProps {
  children: React.ReactNode;
  scaleRange?: number[];
  gradientColor1: Animated.AnimatedInterpolation;
  gradientColor2: Animated.AnimatedInterpolation;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  viewStyle?: any;
  touchStyle?: any;
}

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

const LinearButton = ({
  onPress,
  onLongPress,
  children,
  gradientColor1,
  gradientColor2,
  viewStyle,
  touchStyle,
  scaleRange = [1, 0.95],
  disabled = false,
}: ScaleButtonProps) => (
  <AnimationStation
    viewStyle={{
      opacity: disabled ? 0.7 : 1,
      ...viewStyle,
    }}
    animationKey="scale"
    outputRange={scaleRange}>
    {(startAnimation, resetAnimation) => (
      <Pressable
        disabled={disabled}
        onPressIn={startAnimation}
        onPressOut={resetAnimation}
        onPress={onPress}
        onLongPress={onLongPress}>
        <AnimatedGradientHelper
          style={touchStyle}
          color1={gradientColor1}
          color2={gradientColor2}>
          {children}
        </AnimatedGradientHelper>
      </Pressable>
    )}
  </AnimationStation>
);

export default LinearButton;
