import {LinearGradient} from 'expo-linear-gradient';
import React, {useEffect, useRef} from 'react';
import {Animated, PanResponder, Text} from 'react-native';
import {WContainer} from 'wComponents';
import {CardType} from 'wTypes';
import {categories} from './config/cardData';
import {screenWidth} from './styled/sizing';
import {useStyledTheme} from './styled/styled';

interface Props extends CardType {
  index: number;
  topFirstIndex: number;
  handleRemove: (index: number) => void;
}

const CardItem: React.FC<Props> = ({
  prompt,
  quote,
  category,
  song = false,
  index,
  topFirstIndex,
  handleRemove,
}) => {
  const theme = useStyledTheme();
  const categoryColor = theme.categoryColors[category];
  const categoryColorLight = theme.categoryColorsLight[category];
  const {title} = categories[category];

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, {vx, vy}) => {
        const value = pan.x._value;

        if (value < -150 || value > 150) {
          handleRemove(index);
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const getMainCardStyle = (): any => {
    const width = Math.min(screenWidth - 160, 300) - topFirstIndex * 30;
    const baseOpacity = 1 - topFirstIndex / 3;

    return {
      position: 'absolute',
      top: -(width * 1.3) / 2 + topFirstIndex * 65 - 60,
      alignSelf: 'center',
      width,
      height: width * 1.3,
      // backgroundColor: '#39394C',
      backgroundColor: categoryColor,
      padding: 16,
      borderRadius: 12,
      opacity: pan.x.interpolate({
        inputRange: [-150, 0, 150],
        outputRange: [0.5, baseOpacity, 0.5],
      }),
      transform: [
        {translateX: pan.x},
        {translateY: pan.y},
        {
          rotate: pan.x.interpolate({
            inputRange: [-150, 0, 150],
            outputRange: ['-20deg', '0deg', '20deg'],
          }),
        },
      ],
    };
  };

  useEffect(() => {
    return () => {
      pan.x.removeAllListeners();
      pan.y.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View
      style={getMainCardStyle()}
      {...(topFirstIndex === 0 ? panResponder.panHandlers : null)}>
      <WContainer flex={1} align="center" justify="space-around">
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
      </WContainer>
    </Animated.View>
  );
};

export default CardItem;
