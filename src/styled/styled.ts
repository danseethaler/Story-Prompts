import {useContext} from 'react';
import * as styledComponents from 'styled-components/native';
import {Theme} from './themes';

const {
  default: styled,
  css,
  ThemeProvider,
} = (styledComponents as unknown) as styledComponents.ReactNativeThemedStyledComponentsModule<
  // https://styled-components.com/docs/api#create-a-themeF
  Theme
>;

export interface ThemeProp {
  theme: Theme;
}

export const useStyledTheme = (): Theme => {
  return useContext(styledComponents.ThemeContext);
};

export * from './themedFunctions';
export {css, ThemeProvider};
export default styled;
