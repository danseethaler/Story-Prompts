import _ from 'lodash';
import {CardType} from 'wTypes';
import cardData from './cardData';

export const getShuffledCards = () => {
  const shuffledCards = _.shuffle(cardData);
  const groups = _.groupBy(shuffledCards, 'category');
  const uniqueKeys = _.keys(groups);

  const shuffledSeparatedCards: CardType[] = [];

  let foundMatch;

  do {
    foundMatch = false;
    _.forEach(uniqueKeys, (cateegory) => {
      const card = groups[cateegory].pop();
      if (card) {
        foundMatch = true;
        shuffledSeparatedCards.push(card);
      }
    });
  } while (foundMatch);

  return shuffledSeparatedCards;
};
