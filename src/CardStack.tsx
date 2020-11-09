import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, PanResponderGestureState} from 'react-native';
import CardItem from './CardItem';
import WContainer from './components/WContainer';
import cardData from './config/cardData';
import useAppContext from './hooks/useAppContext';
import {screenHeight, screenWidth} from './styled/sizing';

interface Props {}

const shuffledCards = _.shuffle(cardData);

const CardStack: React.FC<Props> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {filter} = useAppContext();

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  const cards = _(shuffledCards)
    // .filter((card) => !filter || card.category === filter)
    .slice(activeIndex, activeIndex + 4)
    .reverse()
    .value();

  const handleRemove = () => setActiveIndex((activeIndex) => activeIndex + 1);

  const pan = useRef(new Animated.ValueXY()).current;
  const offsetValue = useRef(new Animated.Value(0)).current;

  const panMoveHandler = Animated.event([null, {dx: pan.x, dy: pan.y}], {
    useNativeDriver: false,
  });

  const offSetMoveHandler = (e: PanResponderGestureState) => {
    const offset = Math.max(Math.abs(e.dx), Math.abs(e.dy));

    return Animated.event([{offset: offsetValue}], {
      useNativeDriver: false,
    })({offset});
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (e, state) => {
        panMoveHandler(e, state);
        offSetMoveHandler(state);
      },
      onPanResponderRelease: (e, {vx, vy}) => {
        const valueX = (pan.x as any)._value;
        const valueY = (pan.y as any)._value;
        const offset = offsetValue._value;

        // screenHeight is used here to get the number of pixels needed to
        // ensure we're moving the card all the way off the screen before it
        // disappears
        const xMultiplier = Math.abs(screenHeight / valueX);
        const yMultiplier = Math.abs(screenHeight / valueY);
        const multiplier = Math.min(xMultiplier, yMultiplier);

        const offsetThreshold = 75;

        if (offset > offsetThreshold) {
          // This is the number of ms after the user releases the card that it
          // floats of the screen and the card is removed from the stack
          const exitDuration = 2000;

          Animated.timing(pan, {
            toValue: {
              x: valueX * multiplier,
              y: valueY * multiplier,
            },
            duration: exitDuration,
            useNativeDriver: false,
          }).start();

          Animated.timing(offsetValue, {
            toValue: 250,
            duration: exitDuration,
            useNativeDriver: false,
          }).start();

          setTimeout(() => {
            Animated.timing(pan, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }).start();

            Animated.timing(offsetValue, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }).start();

            handleRemove();
          }, exitDuration);
        } else {
          Animated.spring(pan, {
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

  useEffect(() => {
    return () => {
      pan.x.removeAllListeners();
      pan.y.removeAllListeners();
      offsetValue.removeAllListeners();
    };
  }, []);

  const width = Math.min(screenWidth - 80, 300);

  return (
    <WContainer
      flex={1}
      justify="center"
      align="center"
      style={{
        width: screenWidth,
      }}>
      <WContainer
        style={{
          width,
          height: width * 1.3,
        }}>
        {_.map(cards, (card, index) => {
          const topFirstIndex = cards.length - index - 1;
          const baseOpacity = 1 - topFirstIndex / 3;
          const isPrimaryCard = topFirstIndex === 0;
          const isSecondCard = topFirstIndex === 1;
          const isThirdCard = topFirstIndex === 2;
          const isFourthCard = topFirstIndex === 3;

          const style: any = {
            opacity: baseOpacity,
          };

          const contentStyle: any = {};

          const baseOffset = 65;
          const xBounds = 250;

          if (isPrimaryCard) {
            style.top = -baseOffset;

            style.transform = [
              {translateX: pan.x},
              {translateY: pan.y},
              {
                rotate: pan.x.interpolate({
                  inputRange: [-xBounds, 0, xBounds],
                  outputRange: ['-20deg', '0deg', '20deg'],
                  extrapolate: 'clamp',
                }),
              },
            ];

            style.opacity = offsetValue.interpolate({
              inputRange: [0, xBounds - 50, xBounds],
              outputRange: [1, 0.9, 0.5],
              extrapolate: 'clamp',
            });
          } else if (isSecondCard) {
            style.transform = [
              {
                scale: offsetValue.interpolate({
                  inputRange: [0, xBounds],
                  outputRange: [0.85, 1],
                  extrapolate: 'clamp',
                }),
              },
            ];

            style.top = offsetValue.interpolate({
              inputRange: [0, xBounds],
              outputRange: [0, -baseOffset],
              extrapolate: 'clamp',
            });

            style.opacity = offsetValue.interpolate({
              inputRange: [0, xBounds],
              outputRange: [0.5, 1],
              extrapolate: 'clamp',
            });
          } else if (isThirdCard) {
            style.transform = [
              {
                scale: offsetValue.interpolate({
                  inputRange: [0, xBounds],
                  outputRange: [0.65, 0.85],
                  extrapolate: 'clamp',
                }),
              },
            ];

            style.top = offsetValue.interpolate({
              inputRange: [0, xBounds],
              outputRange: [baseOffset, 0],
              extrapolate: 'clamp',
            });

            style.opacity = offsetValue.interpolate({
              inputRange: [0, xBounds],
              outputRange: [0.2, 0.5],
              extrapolate: 'clamp',
            });

            contentStyle.opacity = 0;
          } else if (isFourthCard) {
            style.transform = [
              {
                scale: offsetValue.interpolate({
                  inputRange: [0, xBounds],
                  outputRange: [0.5, 0.65],
                  extrapolate: 'clamp',
                }),
              },
            ];

            style.top = offsetValue.interpolate({
              inputRange: [0, xBounds],
              outputRange: [baseOffset * 2, baseOffset],
              extrapolate: 'clamp',
            });

            style.opacity = offsetValue.interpolate({
              inputRange: [0, xBounds],
              outputRange: [0, 0.2],
              extrapolate: 'clamp',
            });

            contentStyle.opacity = 0;
          }

          return (
            <CardItem
              key={card.quote}
              style={style}
              contentStyle={contentStyle}
              panHandlers={
                topFirstIndex === 0 ? panResponder.panHandlers : null
              }
              {...card}
            />
          );
        })}
      </WContainer>
    </WContainer>
  );
};

export default CardStack;