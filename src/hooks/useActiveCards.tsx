import _ from 'lodash';
import {useEffect, useState} from 'react';
import {getShuffledCards} from 'wConfig';
import {AppState, CardType} from 'wTypes';

const shuffledCards = getShuffledCards();

const useActiveCards = ({filter, filterVersion}: AppState) => {
  const [activeIndex, setActiveCardIndex] = useState(0);

  const [storedCards, setStoredCards] = useState(shuffledCards);

  useEffect(() => {
    setActiveCardIndex(0);

    const newStoredCards = _(shuffledCards)
      .filter((card) => !filter || card.topic === filter)
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
      // Use the most recent card topic - this will make the color stay the
      // same between the second to last topic and the last topic
      topic: (_.last(storedCards) as CardType).topic,
      finished: true,
    });
  }

  return {activeCards: cards, setActiveCardIndex};
};

export default useActiveCards;
