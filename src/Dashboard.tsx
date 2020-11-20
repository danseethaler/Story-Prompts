import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text} from 'react-native';
import {BothSafeArea, LinearButton, WContainer} from 'wComponents';
import {CARD_DRAG_RANGE, getShuffledCards} from 'wConfig';
import {useAppContext, useGetColorsFromCards} from 'wHooks';
import {CardType, ModalStackNavProps} from 'wTypes';
import CardStack from './CardStack';
import {screenWidth} from './styled/sizing';
import {useStyledTheme} from './styled/styled';

const shuffledCards = getShuffledCards();

type Props = ModalStackNavProps<'Dashboard'>;

const Dashboard: React.FC<Props> = ({navigation}) => {
  const theme = useStyledTheme();
  const {filter, filterVersion} = useAppContext();

  const [activeIndex, setActiveIndex] = useState(0);

  const [storedCards, setStoredCards] = useState(shuffledCards);

  useEffect(() => {
    setActiveIndex(0);

    const newStoredCards = _(shuffledCards)
      .filter((card) => !filter || card.category === filter)
      .value();

    setStoredCards(newStoredCards);
  }, [filter, filterVersion]);

  const cards = _(storedCards)
    .slice(activeIndex, activeIndex + 4)
    .reverse()
    .value();

  if (cards.length < 4) {
    cards.unshift({
      prompt: '',
      quote: '',
      source: '',
      // Use the most recent card category - this will make the color stay the
      // same between the second to last category and the last category
      category: (_.last(storedCards) as CardType).category,
      finished: true,
    });
  }

  const [
    offSetMoveHandler,
    offsetValue,
    getColorsFromCards,
  ] = useGetColorsFromCards(cards);
  const colors = getColorsFromCards();

  const cardPanValue = useRef(new Animated.ValueXY()).current;
  const cardPanMoveHandler = Animated.event(
    [null, {dx: cardPanValue.x, dy: cardPanValue.y}],
    {
      useNativeDriver: false,
    },
  );

  useEffect(() => {
    return () => {
      cardPanValue.x.removeAllListeners();
      cardPanValue.y.removeAllListeners();
      offsetValue.removeAllListeners();
    };
  }, []);

  let nextButtonOpacity: Number | Animated.AnimatedInterpolation = 1;
  if (cards.length === 2) {
    nextButtonOpacity = offsetValue.interpolate({
      inputRange: [0, CARD_DRAG_RANGE],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  } else if (cards.length === 1) {
    nextButtonOpacity = 0;
  }

  return (
    <BothSafeArea bottomColor={theme.colors.background250}>
      <WContainer flex={1} stretch wPadding={[3, 0]}>
        <WContainer align="flex-end" stretch wPaddingRight={4}>
          <LinearButton
            viewStyle={{
              borderRadius: 40,
              overflow: 'hidden',
            }}
            touchStyle={{
              padding: 12,
              align: 'center',
            }}
            gradientColor1={theme.colors.background100}
            gradientColor2={theme.colors.background100}
            onPress={() => {
              navigation.navigate('Categories');
            }}>
            <MaterialCommunityIcons
              name="cards"
              size={32}
              color={theme.colors.background700}
            />
          </LinearButton>
        </WContainer>

        <CardStack
          cards={cards}
          setActiveIndex={setActiveIndex}
          offSetMoveHandler={offSetMoveHandler}
          offsetValue={offsetValue}
          cardPanMoveHandler={cardPanMoveHandler}
          cardPanValue={cardPanValue}
        />

        <WContainer align="center" stretch>
          <Animated.View style={{opacity: nextButtonOpacity} as any}>
            <LinearButton
              viewStyle={{
                borderRadius: 40,
                overflow: 'hidden',
                opacity: cards.length === 1 ? 0 : 1,
              }}
              touchStyle={{
                paddingHorizontal: 100,
                paddingVertical: 14,
              }}
              disabled={cards.length === 1}
              gradientColor1={colors[0]}
              gradientColor2={colors[1]}
              onPress={() => {
                Haptics.selectionAsync();

                // This is the number of ms after the user releases the card that it
                // floats of the screen and the card is removed from the stack
                const exitDuration = 300;

                Animated.timing(cardPanValue, {
                  toValue: {
                    x: -(screenWidth + 100),
                    y: 0,
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

                  setActiveIndex((activeIndex) => activeIndex + 1);
                }, exitDuration);
              }}>
              <WContainer row align="center" justify="center">
                <Text
                  style={{
                    fontSize: 26,
                    color: theme.colors.white,
                    fontFamily: 'Avenir Next',
                    fontWeight: '600',
                  }}>
                  Next
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={28}
                  style={{marginLeft: theme.baseUnit * 1.5}}
                  color={theme.colors.white}
                />
              </WContainer>
            </LinearButton>
          </Animated.View>
        </WContainer>
      </WContainer>
    </BothSafeArea>
  );
};

export default Dashboard;
