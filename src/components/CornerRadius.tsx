import React from 'react';
import Svg, {Defs, LinearGradient, Polygon, Stop} from 'react-native-svg';
import {getClipPathForCornerCircle} from 'wStyled';
import WContainer from './WContainer';

export interface CornerRadiusProps {
  size?: number;
  color1: string;
  color2: string;
}

const CornerRadius: React.FC<CornerRadiusProps> = ({
  color1,
  color2,
  children,
  size = 60,
}) => {
  const cornerValues = getClipPathForCornerCircle(size);

  return (
    <WContainer
      style={{height: size, width: size}}
      align="center"
      justify="center">
      <Svg height={size} width={size}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="1" x2="1" y2="1">
            <Stop offset="0" stopColor={color1} stopOpacity="1" />
            <Stop offset="1" stopColor={color2} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Polygon points={cornerValues} fill="url(#grad)" />
      </Svg>
      {children}
    </WContainer>
  );
};

export default CornerRadius;
