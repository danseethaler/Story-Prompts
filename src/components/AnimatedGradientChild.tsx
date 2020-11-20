import {Component} from 'react';
import {Animated} from 'react-native';

interface Props {
  color1: string;
  color2: string;
  children: (props: {colors: string[]}) => React.ReactNode;
}

class GradientHelper extends Component<Props> {
  render() {
    const {color1, color2} = this.props;

    return this.props.children({colors: [color1, color2]});
  }
}

const AnimatedGradientChild = Animated.createAnimatedComponent(GradientHelper);

export default AnimatedGradientChild;
