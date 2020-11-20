import {
  categories,
  categoryColors,
  categoryColorsCenter,
  categoryColorsLight,
} from '../config/cardData';
import {screenHeight} from './sizing';

const TRANSITION_DURATION = 300;
export const TRANSITION_ALL = `all ${TRANSITION_DURATION}ms ease`;

const lightTextColors = {
  white: '#FFFFFF',
  text20: '#FFFFFF',
  text50: '#d8d8e4',
  text100: '#b4b4cc',
  text200: '#9196b5',
  text300: '#7383A5',
  text400: '#6A799A',
  text600: '#5A6681',
  text700: '#454E63',

  textOpposite600: '#5A6681',

  success500: '#24CC97',
  warning500: '#FF4578',
};

type TextColorTheme = {[key in keyof typeof lightTextColors]: string};
export type TextColorKeys = keyof TextColorTheme;

const lightThemeColors = {
  ...lightTextColors,

  blue100: '#F2F8FC',
  blue200: '#BDD4E5',
  blue300: '#7AA0BD',

  primary100: '#033553',
  primary200: '#074A74',
  primary300: '#1080C6',
  primary400: '#4ebdfb',
  primary500: '#68C4FD',
  primary600: '#B0DFFD',
  primary700: '#EBF7FF',
  primary750: '#F5FAFF',

  success200: '#DBFFF4',

  orange300: '#FF7847',
  orange500: '#FF7744',

  yellow200: '#FFF6D7',
  yellow500: '#FFCC66',
  yellow700: '#B39500',

  purpleShadow: '#E0D6FF',
  purple300: '#4A46A7',
  purple350: '#857DE3',
  purple400: '#9071E0',
  purple500: '#8364d4',
  purple600: '#A5A3D4',
  purple800: '#E0D6FF',
  purple850: '#E2E1FF',

  background100: '#FFFFFF',
  background200: '#F8F9FB',
  background250: '#EBEEF3',
  background300: '#E5E9EF',
  background400: '#C7CCD4',
  background500: '#AAB3C1',
  background600: '#5B636D',
  background700: '#3D4144',
};

const darkTextColors = {
  white: '#FFFFFF',
  text20: '#191830',
  text50: '#38364E',
  text100: '#6E7996',
  text200: '#9AA4BC',
  text300: '#B7BDCC',
  text400: '#CED4E8',
  text600: '#DEE2ED',
  text700: '#FFFFFF',

  textOpposite600: '#38364E',

  success500: '#24CC97',
  warning500: '#FF4578',
};

const darkThemeColors: ColorTheme = {
  ...darkTextColors,

  blue100: '#2A2848',
  blue200: '#2C516D',
  blue300: '#274F6D',

  primary100: '#F5FAFF',
  primary200: '#EBF7FF',
  primary300: '#1080C6',
  primary400: '#1080C6',
  primary500: '#4ebdfb',
  primary600: '#1080C6',
  primary700: '#074A74',
  primary750: '#033553',

  success200: '#1D352C',

  orange300: '#F06C38',
  orange500: '#FF7744',

  yellow200: '#FFF6D7',
  yellow500: '#FFCC66',
  yellow700: '#B39500',

  purpleShadow: '#3F3C90',
  purple300: '#4A46A7',
  purple350: '#857DE3',
  purple400: '#9071E0',
  purple500: '#8364d4',
  purple600: '#A5A3D4',
  purple800: '#E0D6FF',
  purple850: '#E2E1FF',

  background100: '#1B1B24',
  background200: '#1F1E39',
  background250: '#2E2E3D',
  background300: '#39394C',
  background400: '#696789',
  background500: '#9F9EAE',
  background600: '#C9C8D5',
  background700: '#EAEAF1',
};

const fontFamily = 'System';
// 'Avenir Next'

const fontWeight: FontWeightType = {
  light: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
};

const constantColors = {
  applePodcastPurple: '#9071e0',
  spotifyGreen: '#1db954',
  success100: '#f4fffa',
  blue100: '#f4f7ff',
  gray400: '#777777',
  gray500: '#737373',
  gray600: '#5c5c5c',
};

type ConstantColorTheme = {[key in keyof typeof constantColors]: string};

const baseTheme = {
  baseUnit: 8,
  fontUnit: 4,
  fontWeight,
  fontFamily,
  constantColors,
  categoryColors,
  categoryColorsLight,
  categoryColorsCenter,
};

export type ColorTheme = {[key in keyof typeof lightThemeColors]: string};
export type ColorKeys = keyof ColorTheme;

interface FontWeightType {
  light: '400';
  medium: '500';
  semibold: '600';
  bold: '700';
  heavy: '800';
}

export type FontWeightKeys = keyof FontWeightType;

interface ShadowObject {
  shadowColor?: string;
  shadowRadius?: number;
  shadowOffset?: {width: number; height: number};
  shadowOpacity?: number;
}

export type CategoryColorsType = {[key in keyof typeof categories]: string};

export interface Theme {
  darkMode: boolean;
  baseUnit: number;
  fontUnit: number;
  fontFamily: string;

  outerShadow: ShadowObject;
  innerShadow: ShadowObject;
  fontWeight: FontWeightType;
  colors: ColorTheme;
  constantColors: ConstantColorTheme;
  categoryColors: CategoryColorsType;
  categoryColorsLight: CategoryColorsType;
  categoryColorsCenter: CategoryColorsType;
  transition: string;
  isSmallerScreen: boolean;
}

interface Themes {
  light: Theme;
  dark: Theme;
}

const themes: Themes = {
  dark: {
    ...baseTheme,
    outerShadow: {},
    innerShadow: {},
    darkMode: true,
    colors: darkThemeColors,
    transition: TRANSITION_ALL,
    isSmallerScreen: screenHeight <= 800,
  },
  light: {
    ...baseTheme,
    outerShadow: {
      shadowColor: lightThemeColors.background300,
      shadowRadius: 6,
      shadowOffset: {width: -4, height: 4},
      shadowOpacity: 0.5,
    },
    innerShadow: {
      shadowColor: lightThemeColors.background300,
      shadowRadius: 2,
      shadowOffset: {width: -1, height: 1},
      shadowOpacity: 1,
    },
    darkMode: false,
    colors: lightThemeColors,
    transition: TRANSITION_ALL,
    isSmallerScreen: screenHeight <= 800,
  },
};

export default themes;
