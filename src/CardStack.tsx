import _ from 'lodash';
import React, {useRef} from 'react';
import {Animated, PanResponder, PanResponderGestureState} from 'react-native';
import {CARD_DRAG_RANGE} from 'wConfig';
import {useAppContext} from 'wHooks';
import {CardType} from 'wTypes';
import Card from './Card';
import WContainer from './components/WContainer';
import {screenHeight, screenWidth} from './styled/sizing';

interface Props {
  cards: CardType[];
  offsetValue: Animated.Value;
  offSetMoveHandler: (e: PanResponderGestureState) => void;
  cardPanValue: Animated.ValueXY;
  cardPanMoveHandler: (...args: any[]) => void;
}

const CardStack: React.FC<Props> = ({
  cards,
  cardPanMoveHandler,
  cardPanValue,
  offSetMoveHandler,
  offsetValue,
}) => {
  const {goToNextCardIndex} = useAppContext();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        cardPanValue.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (e, state) => {
        cardPanMoveHandler(e, state);
        offSetMoveHandler(state);
      },
      onPanResponderRelease: (e, {vx, vy}) => {
        const offsetThreshold = 75;

        const offset = (offsetValue as any)._value;
        if (offset > offsetThreshold) {
          // This is the number of ms after the user releases the card that it
          // floats of the screen and the card is removed from the stack
          const exitDuration = 300;

          const valueX = (cardPanValue.x as any)._value;
          const valueY = (cardPanValue.y as any)._value;

          // screenHeight is used here to get the number of pixels needed to
          // ensure we're moving the card all the way off the screen before it
          // disappears
          const xMultiplier = Math.abs(screenHeight / valueX);
          const yMultiplier = Math.abs(screenHeight / valueY);
          const multiplier = Math.min(xMultiplier, yMultiplier);

          Animated.timing(cardPanValue, {
            toValue: {
              x: valueX * multiplier,
              y: valueY * multiplier,
            },
            duration: exitDuration,
            useNativeDriver: false,
          }).start();

          Animated.timing(offsetValue, {
            toValue: CARD_DRAG_RANGE,
            duration: exitDuration,
            useNativeDriver: false,
          }).start();

          setTimeout(() => {
            Animated.timing(cardPanValue, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }).start();

            Animated.timing(offsetValue, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }).start();

            goToNextCardIndex();
          }, exitDuration);
        } else {
          Animated.spring(cardPanValue, {
            toValue: 0,
            useNativeDriver: false,
          }).start();

          Animated.spring(offsetValue, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const cardWidth = Math.min(screenWidth * 0.9, 320);
  const cardHeight = Math.min(cardWidth * 1.5, screenHeight - 400);
  // The 300 in this number is just a loose number based on the 400px offset
  // above
  const pushFromTopAmount = (screenHeight - cardHeight - 300) / 2;

  return (
    <WContainer flex={1} wMarginTop={pushFromTopAmount / 8} stretch>
      {_.map(cards, (card, index) => {
        const topFirstIndex = cards.length - index - 1;
        const isPrimaryCard = topFirstIndex === 0;
        const isSecondCard = topFirstIndex === 1;
        const isThirdCard = topFirstIndex === 2;
        const isFourthCard = topFirstIndex === 3;

        const style: any = {
          opacity: 1,
          width: cardWidth,
          height: cardHeight,
        };

        const contentStyle: any = {};

        const baseOffset = 65;

        if (isPrimaryCard) {
          style.top = 0;

          style.transform = [
            {translateX: cardPanValue.x},
            {translateY: cardPanValue.y},
            {
              rotate: cardPanValue.x.interpolate({
                inputRange: [-CARD_DRAG_RANGE, 0, CARD_DRAG_RANGE],
                outputRange: ['-20deg', '0deg', '20deg'],
                extrapolate: 'clamp',
              }),
            },
          ];

          style.opacity = offsetValue.interpolate({
            inputRange: [0, CARD_DRAG_RANGE - 50, CARD_DRAG_RANGE],
            outputRange: [1, 0.9, 0.5],
            extrapolate: 'clamp',
          });
        } else if (isSecondCard) {
          style.transform = [
            {
              scale: offsetValue.interpolate({
                inputRange: [0, CARD_DRAG_RANGE],
                outputRange: [0.85, 1],
                extrapolate: 'clamp',
              }),
            },
          ];

          style.top = offsetValue.interpolate({
            inputRange: [0, CARD_DRAG_RANGE],
            outputRange: [baseOffset, 0],
            extrapolate: 'clamp',
          });

          style.opacity = offsetValue.interpolate({
            inputRange: [0, CARD_DRAG_RANGE],
            outputRange: [0.6, 1],
            extrapolate: 'clamp',
          });

          contentStyle.opacity = offsetValue.interpolate({
            inputRange: [0, CARD_DRAG_RANGE],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });
        } else if (isThirdCard) {
          style.transform = [
            {
              scale: offsetValue.interpolate({
                inputRange: [0, CARD_DRAG_RANGE],
                outputRange: [0.65, 0.85],
                extrapolate: 'clamp',
              }),
            },
          ];

          style.top = offsetValue.interpolate({
            inputRange: [0, CARD_DRAG_RANGE],
            outputRange: [baseOffset * 2 + 12, baseOffset],
            extrapolate: 'clamp',
          });

          style.opacity = offsetValue.interpolate({
            inputRange: [0, CARD_DRAG_RANGE],
            outputRange: [0.3, 0.6],
            extrapolate: 'clamp',
          });

          contentStyle.opacity = 0;
        } else if (isFourthCard) {
          style.transform = [
            {
              scale: offsetValue.interpolate({
                inputRange: [0, CARD_DRAG_RANGE],
                outputRange: [0.5, 0.65],
                extrapolate: 'clamp',
              }),
            },
          ];

          style.top = offsetValue.interpolate({
            inputRange: [0, CARD_DRAG_RANGE],
            outputRange: [baseOffset * 3, baseOffset * 2 + 12],
            extrapolate: 'clamp',
          });

          style.opacity = offsetValue.interpolate({
            inputRange: [0, CARD_DRAG_RANGE],
            outputRange: [0, 0.3],
            extrapolate: 'clamp',
          });

          contentStyle.opacity = 0;
        }

        let panHandlers = null;
        if (topFirstIndex === 0 && !card.finished) {
          panHandlers = panResponder.panHandlers;
        }

        return (
          <Card
            key={card.quote}
            style={style}
            contentStyle={contentStyle}
            panHandlers={panHandlers}
            {...card}
          />
        );
      })}
    </WContainer>
  );
};

export default CardStack;
