import _ from 'lodash';
import {AppState, CardType} from 'wTypes';

const useActiveCards = ({availableCards, cardIndex, filter}: AppState) => {
  const filteredCards = _.filter(
    availableCards,
    (card) => !filter || card.topic === filter,
  );

  const cards = _(filteredCards)
    .slice(cardIndex, cardIndex + 4)
    .reverse()
    .value();

  if (cards.length < 4) {
    cards.unshift({
      prompt: '',
      quote: '',
      source: '',
      // Use the most recent card topic - this will make the color stay the
      // same between the second to last topic and the last topic
      topic: (_.last(filteredCards) as CardType).topic,
      finished: true,
    });
  }

  return cards;
};

export default useActiveCards;
