import * as _ from 'lodash';
import {TextStyle} from 'react-native';
import {scale} from './sizing';
import {ThemeProp} from './styled';
import {ColorKeys, FontWeightKeys, TextColorKeys} from './themes';

// Receives a number or array of numbers and returns an object with the
// corresponding margin properties
export interface ThemeMarginProps {
  wMargin?: number | number[];
  wMarginTop?: number;
  wMarginRight?: number;
  wMarginBottom?: number;
  wMarginLeft?: number;
}
export const themedMargin = ({
  theme,
  wMargin,
  wMarginTop = 0,
  wMarginRight = 0,
  wMarginBottom = 0,
  wMarginLeft = 0,
}: ThemeProp & ThemeMarginProps): {
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
} | null => {
  const margins = _.isUndefined(wMargin)
    ? [wMarginTop, wMarginRight, wMarginBottom, wMarginLeft]
    : _.castArray(wMargin);

  if (margins.length === 1) {
    return {margin: margins[0] * theme.baseUnit};
  }
  if (margins.length === 2) {
    return {
      marginVertical: margins[0] * theme.baseUnit,
      marginHorizontal: margins[1] * theme.baseUnit,
    };
  }
  if (margins.length === 4) {
    return {
      marginTop: margins[0] * theme.baseUnit,
      marginRight: margins[1] * theme.baseUnit,
      marginBottom: margins[2] * theme.baseUnit,
      marginLeft: margins[3] * theme.baseUnit,
    };
  }

  return null;
};

// Receives a number or array of numbers and returns an object with the
// corresponding padding properties
export interface ThemePaddingProps {
  wPadding?: number | number[];
  wPaddingTop?: number;
  wPaddingRight?: number;
  wPaddingBottom?: number;
  wPaddingLeft?: number;
}
export const themedPadding = ({
  theme,
  wPadding,
  wPaddingTop = 0,
  wPaddingRight = 0,
  wPaddingBottom = 0,
  wPaddingLeft = 0,
}: ThemeProp & ThemePaddingProps): {
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingBottom?: number;
  paddingRight?: number;
} | null => {
  const paddings = _.isUndefined(wPadding)
    ? [wPaddingTop, wPaddingRight, wPaddingBottom, wPaddingLeft]
    : _.castArray(wPadding);

  if (paddings.length === 1) {
    return {padding: paddings[0] * theme.baseUnit};
  }
  if (paddings.length === 2) {
    return {
      paddingVertical: paddings[0] * theme.baseUnit,
      paddingHorizontal: paddings[1] * theme.baseUnit,
    };
  }
  if (paddings.length === 4) {
    return {
      paddingTop: paddings[0] * theme.baseUnit,
      paddingRight: paddings[1] * theme.baseUnit,
      paddingBottom: paddings[2] * theme.baseUnit,
      paddingLeft: paddings[3] * theme.baseUnit,
    };
  }

  return null;
};

// Returns a dynamic font size based on the the theme fontUnit
export interface ThemeFontSizeProps {
  wFontSize?: number;
}
export const themedFontSize = ({
  theme,
  wFontSize = 4.5,
}: ThemeProp & ThemeFontSizeProps): {fontSize: number} => ({
  fontSize: scale(theme.fontUnit * wFontSize),
});

// Returns a font weight based on a named font weight. Font names must match the
// theme.fontWeight object
export interface ThemeFontWeightProps {
  wFontWeight?: FontWeightKeys;
}
export const themedFontWeight = ({
  theme,
  wFontWeight = 'medium',
}: ThemeProp & ThemeFontWeightProps): any => ({
  // Hack! For some reason typescript is not accepting a return type of
  // {fontWeight: FontWeightValues} - have to use "any"
  fontWeight: theme.fontWeight[wFontWeight],
});

// Returns a wTheme color
interface ThemeColorProps {
  wColor?: ColorKeys;
}
export const themedColors = ({
  theme,
  wColor = 'white',
}: ThemeProp & ThemeColorProps): {color: string} => ({
  color: theme.colors[wColor],
});

// Returns a wTheme color from the text color keys
export interface ThemeTextColorProps {
  wColor?: TextColorKeys;
}
export const themedTextColors = ({
  theme,
  wColor = 'text400',
}: ThemeProp & ThemeTextColorProps): {color: string} => ({
  color: theme.colors[wColor] || wColor,
});

// Returns alignment for text
export interface ThemeTextAlignProps {
  wAlign?: TextStyle['textAlign'];
}
export const themedTextAlign = ({
  wAlign = 'left',
}: ThemeProp & ThemeTextAlignProps): {textAlign: any} => ({
  // Hack! For some reason typescript is not accepting a return type of
  // {textAlign: TextStyle['textAlign']} - have to use "any"
  textAlign: wAlign,
});
