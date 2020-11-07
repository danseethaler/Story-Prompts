import {
  hexToRgb,
  styled,
  themedMargin,
  themedPadding,
  ThemeMarginProps,
  ThemePaddingProps,
} from 'wStyled';

type ContainerComponentProps = ThemeMarginProps &
  ThemePaddingProps & {
    flex?: number;
    row?: boolean;
    stretch?: boolean;
    defaultBackground?: boolean;
    align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
    justify?:
      | 'space-between'
      | 'space-around'
      | 'center'
      | 'flex-start'
      | 'flex-end';
    show?: boolean;
  };

const WContainer = styled.View<ContainerComponentProps>(
  ({
    theme,
    flex,
    row = false,
    defaultBackground = false,
    align = 'flex-start',
    justify = 'flex-start',
    stretch = false,
    show = false,
  }) => [
    themedMargin,
    themedPadding,
    {
      flexDirection: row ? 'row' : 'column',
      alignItems: align,
      justifyContent: justify,
    },
    flex && {flex},
    stretch && {alignSelf: 'stretch'},
    defaultBackground && {backgroundColor: theme.colors.background100},
    show && {
      backgroundColor: hexToRgb(theme.colors.primary700, 0.5),
      borderWidth: 2,
      borderColor: theme.colors.orange300,
    },
  ],
);

export default WContainer;
