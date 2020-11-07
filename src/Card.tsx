import {FontAwesome, Ionicons} from '@expo/vector-icons';
import React from 'react';
import {Animated, Text} from 'react-native';
import WContainer from './components/WContainer';
import {categories} from './config/cardData';
import {CardType} from './definitions';
import {useStyledTheme} from './styled/styled';
import {hexToRgb} from './styled/utils';

interface Props extends CardType {
  transforms: any;
}

const Card: React.FC<Props> = ({
  quote,
  prompt,
  category,
  transforms,
  song = false,
}) => {
  const theme = useStyledTheme();
  const categoryColor = theme.categoryColors[category];
  const categoryColorLight = theme.categoryColorsLight[category];
  const {title} = categories[category];

  return (
    <WContainer justify="space-between" align="center" stretch>
      <Animated.View style={{transform: transforms}}>
        <WContainer
          align="center"
          flex={1}
          wPadding={[6, 3]}
          justify="space-between"
          stretch>
          <WContainer
            wPadding={[0.5, 2]}
            style={{
              backgroundColor: categoryColorLight,
              borderRadius: 22,
            }}>
            <Text
              style={{
                fontWeight: '600',
                letterSpacing: 1.4,
                fontFamily: 'Avenir Next',
                textAlign: 'center',
                fontSize: 18,
                color: '#1B1B24',
              }}>
              {title}
            </Text>
          </WContainer>

          <WContainer stretch align="center" justify="center" wPadding={[3, 0]}>
            {song ? (
              <Ionicons
                name="ios-musical-notes"
                size={20}
                color={theme.colors.text100}
              />
            ) : (
              <FontAwesome
                name="quote-left"
                size={20}
                color={theme.colors.text100}
              />
            )}
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: theme.baseUnit * 3,
                fontSize: 32,
                color: theme.colors.white,
              }}>
              {quote}
            </Text>
          </WContainer>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              fontFamily: 'Avenir Next',
              fontWeight: '500',
              color: categoryColorLight,
            }}>
            {prompt}
          </Text>
        </WContainer>
      </Animated.View>
    </WContainer>
  );
};

export default Card;
