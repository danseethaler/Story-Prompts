import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {Animated, GestureResponderHandlers, Text} from 'react-native';
import {WContainer} from 'wComponents';
import {categories} from 'wConfig';
import {useStyledTheme} from 'wStyled';
import {CardType} from 'wTypes';

interface Props extends CardType {
  panHandlers: GestureResponderHandlers | null;
  style: any;
  contentStyle: any;
}

const Card: React.FC<Props> = ({
  panHandlers,
  prompt,
  quote,
  category,
  style,
  contentStyle,
  finished = false,
  song = false,
}) => {
  const theme = useStyledTheme();
  const categoryColor = theme.categoryColors[category];
  const categoryColorLight = theme.categoryColorsLight[category];
  const {title} = categories[category];

  const getMainCardStyle = (): any => {
    return {
      position: 'absolute',
      alignSelf: 'center',
      width: 320,
      height: 460,
      backgroundColor: '#39394C',
      padding: 16,
      borderRadius: 12,
      ...style,
    };
  };

  let content = (
    <>
      <WContainer
        style={{
          borderRadius: 22,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[categoryColor, categoryColorLight]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={{
            paddingVertical: 4,
            paddingHorizontal: 16,
            backgroundColor: categoryColorLight,
          }}>
          <Text
            style={{
              fontWeight: '600',
              letterSpacing: 1.4,
              fontFamily: 'Avenir Next',
              textAlign: 'center',
              fontSize: 18,
              color: theme.colors.white,
            }}>
            {title}
          </Text>
        </LinearGradient>
      </WContainer>

      {song ? (
        <Ionicons
          name="ios-musical-notes"
          size={20}
          color={theme.colors.text100}
        />
      ) : (
        <FontAwesome name="quote-left" size={20} color={theme.colors.text100} />
      )}

      <Text
        style={{
          fontWeight: '600',
          letterSpacing: 1.4,
          fontFamily: 'Avenir Next',
          textAlign: 'center',
          fontSize: 18,
          color: theme.colors.white,
        }}>
        {quote}
      </Text>
      <Text
        style={{
          fontWeight: '500',
          letterSpacing: 1.4,
          fontFamily: 'Avenir Next',
          textAlign: 'center',
          fontSize: 18,
          color: theme.colors.white,
        }}>
        {prompt}
      </Text>
    </>
  );

  if (finished) {
    content = (
      <>
        <WContainer
          style={{
            borderRadius: 22,
            overflow: 'hidden',
          }}>
          <LinearGradient
            colors={[categoryColor, categoryColorLight]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={{
              paddingVertical: 4,
              paddingHorizontal: 16,
              backgroundColor: categoryColorLight,
            }}>
            <Text
              style={{
                fontWeight: '600',
                letterSpacing: 1.4,
                fontFamily: 'Avenir Next',
                textAlign: 'center',
                fontSize: 18,
                color: theme.colors.white,
              }}>
              Finished
            </Text>
          </LinearGradient>
        </WContainer>
      </>
    );
  }

  return (
    <Animated.View style={getMainCardStyle()} {...panHandlers}>
      <WContainer
        flex={1}
        align="center"
        justify="space-around"
        style={contentStyle}>
        {content}
      </WContainer>
    </Animated.View>
  );
};

export default Card;
