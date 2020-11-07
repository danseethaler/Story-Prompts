import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

const fullScaleRatio =
  (width + height) / (guidelineBaseWidth + guidelineBaseHeight);
const halfRatio = (fullScaleRatio - 1) / 2;
const scaleRatio = 1 + halfRatio;

export const scale = (size: number) => scaleRatio * size;

export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;

export const screenWidth = width;
export const screenHeight = height;

export const percentOfHeight = (percent: number) => height * (percent / 100);
export const percentOfWidth = (percent: number) => width * (percent / 100);
