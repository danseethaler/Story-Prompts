import ViewPager from '@react-native-community/viewpager';
import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {BothSafeArea, NextButton} from 'wComponents';
import {useGetColorsFromCards} from 'wHooks';
import Card from './Card';
import WContainer from './components/WContainer';
import cardData from './config/cardData';

const getRandomCardIndex = () => _.random(cardData.length - 1);

const initialRandomNumber = getRandomCardIndex();
const shuffledCards = _.shuffle(cardData);

const Dashboard: React.FC = () => {
  const [cardIndex, setCardIndex] = useState(initialRandomNumber);
  const [scrollUpdater, getColorsFromCards] = useGetColorsFromCards(
    shuffledCards,
  );
  const colors = getColorsFromCards(cardIndex);
  console.log('colorsasdfasf', colors);

  const viewPagerRef = useRef<ViewPager>();

  return (
    <BothSafeArea bottomColor="#1B1B24">
      <WContainer flex={1} stretch wPadding={[3, 0]}>
        <ViewPager
          ref={viewPagerRef as any}
          style={{flex: 1}}
          initialPage={0}
          onPageScroll={(event) => {
            scrollUpdater(event);
            if (cardIndex !== event.nativeEvent.position) {
              setCardIndex(event.nativeEvent.position);
            }
          }}>
          {_.map(shuffledCards, (card) => (
            <Card key={card.quote} {...card} />
          ))}
        </ViewPager>
        <WContainer align="center" stretch>
          <NextButton
            colors={colors}
            onPress={() => {
              viewPagerRef.current?.setPage(cardIndex + 1);
            }}
          />
        </WContainer>
      </WContainer>
    </BothSafeArea>
  );
};

export default Dashboard;
