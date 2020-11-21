import * as Haptics from 'expo-haptics';
import _ from 'lodash';
import {useRef} from 'react';
import {Animated, PanResponderGestureState} from 'react-native';
import {CARD_DRAG_RANGE} from 'wConfig';
import {useStyledTheme} from 'wStyled';
import {CardType} from 'wTypes';

let previousOffset = 0;

const useGetColorsFromCards = (
  cards: CardType[],
): [
  (...args: any[]) => void,
  Animated.Value,
  () => Animated.AnimatedInterpolation[],
] => {
  const theme = useStyledTheme();

  const offsetValue = useRef(new Animated.Value(0)).current;

  const offSetMoveHandler = (e: PanResponderGestureState) => {
    const offset = Math.max(Math.abs(e.dx), Math.abs(e.dy));

    if (previousOffset < 75 && offset > 75) {
      Haptics.selectionAsync();
    }
    previousOffset = offset;

    return Animated.event([{offset: offsetValue}], {
      useNativeDriver: false,
    })({offset});
  };

  return [
    offSetMoveHandler,
    offsetValue,
    (): Animated.AnimatedInterpolation[] => {
      const card = _.last(cards) as CardType;
      const color = theme.topicColors[card.topic];
      const colorLight = theme.topicColorsLight[card.topic];
      const colorCenter = theme.topicColorsCenter[card.topic];

      const nextCard = cards[cards.length - 2] || card;
      const nextColor = theme.topicColors[nextCard.topic];
      const nextColorLight = theme.topicColorsLight[nextCard.topic];
      const nextColorCenter = theme.topicColorsCenter[nextCard.topic];

      const firstColors = [color, nextColor];
      const secondColors = [colorLight, nextColorLight];
      const centerColors = [colorCenter, nextColorCenter];

      const colorTransition = offsetValue.interpolate({
        inputRange: [0, CARD_DRAG_RANGE],
        outputRange: firstColors,
        extrapolate: 'clamp',
      });

      const colorTransition2 = offsetValue.interpolate({
        inputRange: [0, CARD_DRAG_RANGE],
        outputRange: secondColors,
        extrapolate: 'clamp',
      });

      const colorTransitionCenter = offsetValue.interpolate({
        inputRange: [0, CARD_DRAG_RANGE],
        outputRange: centerColors,
        extrapolate: 'clamp',
      });

      return [colorTransition, colorTransition2, colorTransitionCenter];
    },
  ];
};

export default useGetColorsFromCards;
