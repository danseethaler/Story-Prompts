import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {Text} from 'react-native';
import {hexToRgb, useStyledTheme} from 'wStyled';
import {PackType} from 'wTypes';
import ScaleButton from './ScaleButton';
import WContainer from './WContainer';

interface Props {
  pack: PackType;
  onPress: () => void;
}

const PackButton: React.FC<Props> = ({pack, onPress}) => {
  const theme = useStyledTheme();

  return (
    <ScaleButton
      onPress={onPress}
      viewStyle={{
        alignSelf: 'stretch',
        marginBottom: 16,
        shadowColor: pack.color,
        shadowRadius: 8,
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.7,
      }}>
      <LinearGradient
        colors={[pack.color, pack.colorLight]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={{
          borderRadius: 10,
          marginHorizontal: 16,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{
            paddingVertical: theme.baseUnit * 2,
            paddingHorizontal: theme.baseUnit * 2,
            fontFamily: 'Avenir Next',
            color: theme.colors.white,
            fontSize: 22,
            lineHeight: 32,
            fontWeight: '600',
          }}>
          {pack.title}
        </Text>
        <WContainer
          wPadding={[1, 2]}
          wMarginRight={1}
          style={{
            borderRadius: 8,
            backgroundColor: hexToRgb(theme.colors.white, 0.9),
            shadowColor: pack.color,
            shadowRadius: 6,
            shadowOffset: {width: -4, height: 4},
            shadowOpacity: 0.5,
          }}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{
              fontFamily: 'Avenir Next',
              color: pack.color,
              fontSize: 22,
              lineHeight: 32,
              fontWeight: '600',
            }}>
            Play
          </Text>
        </WContainer>
      </LinearGradient>
    </ScaleButton>
  );
};

export default PackButton;
