import React from 'react';
import CornerRadius, {CornerRadiusProps} from './CornerRadius';
import ScaleButton from './ScaleButton';

interface Props extends CornerRadiusProps {
  onPress: () => void;
}

const CornerRadiusButton: React.FC<Props> = ({onPress, size = 60, ...rest}) => {
  return (
    <ScaleButton viewStyle={{height: size, width: size}} onPress={onPress}>
      <CornerRadius size={size} {...rest} />
    </ScaleButton>
  );
};

export default CornerRadiusButton;
