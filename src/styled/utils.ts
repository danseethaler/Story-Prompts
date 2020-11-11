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

// This approach comes from this article
// https://medium.com/@zubryjs/squircles-bringing-ios-7s-solution-to-rounded-rectangles-to-css-9fc35779aa65
export const getClipPathForCornerCircle = (size: number) => {
  const SQUIRCLE_SIZE = size / 2;

  const squircle = (radius: number) => (theta: number) => ({
    x:
      Math.pow(Math.abs(Math.cos(theta)), 2 / radius) *
        SQUIRCLE_SIZE *
        Math.sign(Math.cos(theta)) +
      SQUIRCLE_SIZE,
    y:
      Math.pow(Math.abs(Math.sin(theta)), 2 / radius) *
        SQUIRCLE_SIZE *
        Math.sign(Math.sin(theta)) +
      SQUIRCLE_SIZE,
  });

  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const cornerValues = new Array(360)
    .fill(0)
    .map((x, i) => i)
    .map(toRadians)
    .map(squircle(4)) // Border-radius of 4
    .map(({x, y}) => ({x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10})) // Round to the ones place
    .map(({x, y}) => `${x} ${y}`)
    .join(', ');

  return cornerValues;
};
