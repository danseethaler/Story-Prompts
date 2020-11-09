import {MaterialCommunityIcons} from '@expo/vector-icons';
import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text} from 'react-native';
import {BothSafeArea, LinearButton} from 'wComponents';
import {CARD_DRAG_RANGE, getShuffledCards} from 'wConfig';
import {useAppContext, useGetColorsFromCards} from 'wHooks';
import {CardType, ModalStackNavProps} from 'wTypes';
import CardStack from './CardStack';
import WContainer from './components/WContainer';
import {screenWidth} from './styled/sizing';
import {useStyledTheme} from './styled/styled';

const shuffledCards = getShuffledCards();

type Props = ModalStackNavProps<'Dashboard'>;

const Dashboard: React.FC<Props> = ({navigation}) => {
  const theme = useStyledTheme();
  const {filter} = useAppContext();

  const [activeIndex, setActiveIndex] = useState(0);

  const [storedCards, setStoredCards] = useState(shuffledCards);

  useEffect(() => {
    setActiveIndex(0);

    const newStoredCards = _(shuffledCards)
      .filter((card) => !filter || card.category === filter)
      .value();

    setStoredCards(newStoredCards);
  }, [filter]);

  const cards = _(storedCards)
    .slice(activeIndex, activeIndex + 4)
    .reverse()
    .value();

  if (cards.length < 4) {
    cards.unshift({
      prompt: '',
      quote: '',
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

  return (
    <BothSafeArea bottomColor="#1B1B24">
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
            gradientColor1={colors[0]}
            gradientColor2={colors[1]}
            onPress={() => {
              navigation.navigate('Categories');
            }}>
            <MaterialCommunityIcons name="cards" size={32} color="#1B1B24" />
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
          <LinearButton
            viewStyle={{
              borderRadius: 40,
              overflow: 'hidden',
            }}
            touchStyle={{
              paddingHorizontal: 100,
              paddingVertical: 14,
            }}
            disabled={cards.length === 1}
            gradientColor1={colors[0]}
            gradientColor2={colors[1]}
            onPress={() => {
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
        </WContainer>
      </WContainer>
    </BothSafeArea>
  );
};

export default Dashboard;
