import {useRef} from 'react';
import {Animated} from 'react-native';
import {useStyledTheme} from 'wStyled';
import {CardType} from 'wTypes';

const useGetColorsFromCards = (
  cards: CardType[],
): [
  (...args: any[]) => void,
  (index: number) => Animated.AnimatedInterpolation[],
] => {
  const theme = useStyledTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const scrollUpdater = Animated.event(
    [{nativeEvent: {offset: animatedValue}}],
    {useNativeDriver: false},
  );

  return [
    scrollUpdater,
    (cardIndex: number): Animated.AnimatedInterpolation[] => {
      const card = cards[cardIndex];
      const color = theme.categoryColors[card.category];
      const colorLight = theme.categoryColorsLight[card.category];

      const nextCard = cards[cardIndex + 1] || card;
      const nextColor = theme.categoryColors[nextCard.category];
      const nextColorLight = theme.categoryColorsLight[nextCard.category];

      const prevCard = cards[cardIndex - 1] || card;
      const prevColor = theme.categoryColors[prevCard.category];
      const prevColorLight = theme.categoryColorsLight[prevCard.category];

      const firstColors = [prevColor, color, nextColor];
      const secondColors = [prevColorLight, colorLight, nextColorLight];

      const colorTransition = animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: firstColors,
        extrapolate: 'clamp',
      });

      const colorTransition2 = animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: secondColors,
        extrapolate: 'clamp',
      });

      return [colorTransition, colorTransition2];
    },
  ];
};

export default useGetColorsFromCards;
