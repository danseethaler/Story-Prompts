import {Image} from 'react-native';
import {percentOfWidth} from './sizing';

export const hexToRgb = (hex: string, opacity = 1, brightness = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    throw new Error('Invalid hex provided');
  }

  // Remove '#'
  result.shift();

  return `rgba(${result
    .map((value) => Math.round(parseInt(value, 16) * brightness))
    .join(', ')}, ${opacity})`;
};

export const getDisplayDimensionsFromImageSource = (
  source: any,
  percent: number,
) => {
  const {width, height} = Image.resolveAssetSource(source);
  const viewWidth = percentOfWidth(percent);
  const factor = width / viewWidth;
  const viewHeight = height / factor;

  return {
    width: viewWidth,
    height: viewHeight,
  };
};
