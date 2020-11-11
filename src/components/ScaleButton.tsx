import React from 'react';
import {Pressable} from 'react-native';
import AnimationStation from './AnimationStation';

export interface ScaleButtonProps {
  children: React.ReactNode;
  scaleRange?: number[];
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  viewStyle?: any;
}

const ScaleButton = ({
  onPress,
  onLongPress,
  children,
  viewStyle,
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
        {children}
      </Pressable>
    )}
  </AnimationStation>
);

export default ScaleButton;
