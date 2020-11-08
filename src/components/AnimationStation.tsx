import React from 'react';
import {Animated} from 'react-native';

type Props = {
  children: (
    startAnimation: () => void,
    resetAnimation: () => void,
  ) => React.ReactNode;
  animationKey: string;
  outputRange: string[] | number[];
  viewStyle?: any;
  duration?: number;
};

class AnimationStation extends React.Component<Props> {
  static defaultProps = {duration: 200, viewStyle: {}};
  animation = new Animated.Value(0);

  startAnimation = () => {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  resetAnimation = () => {
    Animated.timing(this.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const animationValue = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: this.props.outputRange,
    });

    return (
      <Animated.View
        style={{
          transform: [{[this.props.animationKey]: animationValue}],
          ...(this.props.viewStyle as any),
        }}>
        {this.props.children(this.startAnimation, this.resetAnimation)}
      </Animated.View>
    );
  }
}

export default AnimationStation;
