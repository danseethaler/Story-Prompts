import _ from 'lodash';
import cardData from './cardData';
import {getShuffledCards} from './cardData.utils';

const shuffledCards = getShuffledCards();

const topicPartners = _(shuffledCards)
  .map((card, index) => {
    const nextCard = shuffledCards[index + 1];

    if (!nextCard) {
      return null;
    }
    return [card.topic, nextCard.topic];
  })
  .filter()
  .value();

// Ensure no categories are sequential in shuffled list
test.each(topicPartners)('Partner Categories: (s%s, %s)', (topic1, topic2) => {
  expect(topic1).not.toEqual(topic2);
});

test('shuffledCards should include all card data', () => {
  expect(shuffledCards).toHaveLength(cardData.length);
});
