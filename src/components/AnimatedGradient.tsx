import {LinearGradient, LinearGradientPoint} from 'expo-linear-gradient';
import React, {Component} from 'react';
import {Animated} from 'react-native';

interface Props {
  color1: string;
  color2: string;
  style?: any;
  start?: LinearGradientPoint | null;
  end?: LinearGradientPoint | null;
}

class GradientHelper extends Component<Props> {
  render() {
    const {
      color1,
      color2,
      style,
      start = {x: 0, y: 1},
      end = {x: 1, y: 1},
    } = this.props;

    return (
      <LinearGradient
        colors={[color1, color2]}
        start={start}
        end={end}
        style={style}>
        {this.props.children}
      </LinearGradient>
    );
  }
}

const AnimatedGradient = Animated.createAnimatedComponent(GradientHelper);

export default AnimatedGradient;
