import ViewPager from '@react-native-community/viewpager';
import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button} from 'react-native';
import {BothSafeArea, NextButton} from 'wComponents';
import {useAppContext, useGetColorsFromCards} from 'wHooks';
import {ModalStackNavProps} from 'wTypes';
import Card from './Card';
import WContainer from './components/WContainer';
import cardData from './config/cardData';

const shuffledCards = _.shuffle(cardData);

type Props = ModalStackNavProps<'Dashboard'>;

const Dashboard: React.FC<Props> = ({navigation}) => {
  const {filter} = useAppContext();

  const [cards, setCards] = useState(shuffledCards);

  useEffect(() => {
    if (filter === null) {
      setCards(shuffledCards);
    } else {
      setCards(_.filter(shuffledCards, {category: filter}));
      viewPagerRef.current?.setPage(0);
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
        <Button
          onPress={() => {
            navigation.navigate('Categories');
          }}
          title="Show Categories"
        />
        <ViewPager
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
        </ViewPager>
        <WContainer align="center" stretch>
          <NextButton
            colors={colors}
            onPress={() => {
              const nextIndex = cards[cardIndex + 1] ? cardIndex + 1 : 0;
              viewPagerRef.current?.setPage(nextIndex);
            }}
          />
        </WContainer>
      </WContainer>
    </BothSafeArea>
  );
};

export default Dashboard;
