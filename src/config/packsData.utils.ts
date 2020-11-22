import _ from 'lodash';
import {CardType} from 'wTypes';

export const getShuffledCards = (cards: CardType[]) => {
  const shuffledCards = _.shuffle(cards);
  const groups = _.groupBy(shuffledCards, 'topic');
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
