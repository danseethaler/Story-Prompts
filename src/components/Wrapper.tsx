import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyledTheme} from 'wStyled';

interface Props {
  backgroundColor?: string;
}

export const TopSafeArea: React.FC<Props> = ({children, backgroundColor}) => {
  const theme = useStyledTheme();

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
        backgroundColor: backgroundColor || theme.colors.background100,
      }}>
      {children}
    </SafeAreaView>
  );
};

export const BottomSafeArea: React.FC = ({children}) => {
  const theme = useStyledTheme();

  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left']}
      style={{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: theme.colors.background100,
      }}>
      {children}
    </SafeAreaView>
  );
};

export const BothSafeArea: React.FC<{
  bottomColor?: string;
}> = ({children, bottomColor}) => {
  const theme = useStyledTheme();

  return (
    <SafeAreaView
      edges={['right', 'top', 'bottom', 'left']}
      style={{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: bottomColor || theme.colors.background100,
      }}>
      {children}
    </SafeAreaView>
  );
};
