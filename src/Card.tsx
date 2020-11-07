import {FontAwesome, Ionicons} from '@expo/vector-icons';
import React from 'react';
import {Text} from 'react-native';
import WContainer from './components/WContainer';
import {categories} from './config/cardData';
import {CardType} from './definitions';
import {useStyledTheme} from './styled/styled';
import {hexToRgb} from './styled/utils';

interface Props extends CardType {}

const Card: React.FC<Props> = ({quote, prompt, category, song = false}) => {
  const theme = useStyledTheme();
  const categoryColor = theme.categoryColors[category];
  const {title} = categories[category];

  return (
    <WContainer justify="space-between" align="center" stretch>
      <WContainer
        align="center"
        flex={1}
        wPadding={[6, 3]}
        justify="space-between"
        stretch>
        <WContainer
          wPadding={[0.5, 2]}
          style={{
            backgroundColor: theme.categoryColorsLight[category],
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

        <WContainer stretch row wPadding={[3, 0]}>
          {song ? (
            <Ionicons
              name="ios-musical-note"
              size={20}
              style={{alignSelf: 'flex-start'}}
              color={theme.colors.text100}
            />
          ) : (
            <FontAwesome
              name="quote-left"
              size={20}
              style={{alignSelf: 'flex-start'}}
              color={theme.colors.text100}
            />
          )}
          <WContainer align="center" flex={1} wPadding={2}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 32,
                color: theme.colors.white,
              }}>
              {quote}
            </Text>
          </WContainer>
          {song ? (
            <Ionicons
              name="ios-musical-notes"
              size={20}
              style={{alignSelf: 'flex-end'}}
              color={theme.colors.text100}
            />
          ) : (
            <FontAwesome
              name="quote-right"
              size={20}
              style={{alignSelf: 'flex-end'}}
              color={theme.colors.text100}
            />
          )}
        </WContainer>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontFamily: 'Avenir Next',
            fontWeight: '500',
            color: hexToRgb(categoryColor, 1, 3.5),
          }}>
          {prompt}
        </Text>
      </WContainer>
    </WContainer>
  );
};

export default Card;
