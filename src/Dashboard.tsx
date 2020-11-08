import {MaterialCommunityIcons} from '@expo/vector-icons';
import ViewPager from '@react-native-community/viewpager';
import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text} from 'react-native';
import {BothSafeArea, LinearButton} from 'wComponents';
import {useAppContext, useGetColorsFromCards} from 'wHooks';
import {ModalStackNavProps} from 'wTypes';
import CardStack from './CardStack';
import WContainer from './components/WContainer';
import cardData from './config/cardData';
import {useStyledTheme} from './styled/styled';

const shuffledCards = _.shuffle(cardData);

type Props = ModalStackNavProps<'Dashboard'>;

let firstRun = true;

const Dashboard: React.FC<Props> = ({navigation}) => {
  const theme = useStyledTheme();
  const {filter} = useAppContext();

  const [cards, setCards] = useState(shuffledCards);

  useEffect(() => {
    if (firstRun) {
      firstRun = false;
      return;
    }

    viewPagerRef.current?.setPage(0);

    if (filter === null) {
      setCards(shuffledCards);
    } else {
      setCards(_.filter(shuffledCards, {category: filter}));
    }
  }, [filter]);

  const [cardIndex, setCardIndex] = useState(0);
  const [scrollUpdater, getColorsFromCards] = useGetColorsFromCards(cards);
  const colors = getColorsFromCards(cardIndex);

  const viewPagerRef = useRef<ViewPager>();

  const animatedPositionValue = useRef(new Animated.Value(0)).current;
  const scrollPositionUpdater = Animated.event(
    [{offset: animatedPositionValue}],
    {useNativeDriver: false},
  );

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

        <CardStack />

        {/* <ViewPager
          ref={viewPagerRef as any}
          style={{flex: 1}}
          initialPage={0}
          onPageScroll={(event) => {
            scrollUpdater(event);

            const fullOffset =
              event.nativeEvent.position + event.nativeEvent.offset;
            scrollPositionUpdater({offset: fullOffset});

            if (cardIndex !== event.nativeEvent.position) {
              setCardIndex(event.nativeEvent.position);
            }
          }}>
          {_.map(cards, (card, cardIndex) => {
            const positionTransform = animatedPositionValue.interpolate({
              inputRange: [cardIndex - 1, cardIndex, cardIndex + 1],
              outputRange: [50, 0, 50],
              extrapolate: 'clamp',
            });
            const scaleTransform = animatedPositionValue.interpolate({
              inputRange: [cardIndex - 1, cardIndex, cardIndex + 1],
              outputRange: [0.9, 1, 0.9],
              extrapolate: 'clamp',
            });

            const transforms = [
              {translateY: positionTransform},
              {scale: scaleTransform},
            ];

            return <Card key={card.quote} transforms={transforms} {...card} />;
          })}
        </ViewPager> */}
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
            gradientColor1={colors[0]}
            gradientColor2={colors[1]}
            onPress={() => {
              const nextIndex = cards[cardIndex + 1] ? cardIndex + 1 : 0;
              viewPagerRef.current?.setPage(nextIndex);
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
