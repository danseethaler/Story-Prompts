import _ from 'lodash';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {CardType} from 'wTypes';
import CardItem from './CardItem';
import cardData from './config/cardData';
import {screenWidth} from './styled/sizing';

interface Props {}

const CardStack: React.FC<Props> = () => {
  const [cards, setCards] = useState<CardType[]>(
    _.slice(_.shuffle(cardData), 0, 3),
  );

  const handleRemove = (index: number) => {
    let start = cards.slice(0, index);
    let end = cards.slice(index + 1);
    setCards(start.concat(end));
  };

  return (
    <FlatList
      style={{overflow: 'visible'}}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
      }}
      data={cards}
      renderItem={({item, index}) => (
        <CardItem
          index={index}
          topFirstIndex={3 - index - 1}
          handleRemove={handleRemove}
          {...item}
        />
      )}
      keyExtractor={(item) => item.prompt}
      scrollEnabled={false}
    />
  );
};

export default CardStack;
