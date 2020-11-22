import _ from 'lodash';
import packsData from './packsData';
import {getShuffledCards} from './packsData.utils';

const shuffledCards = getShuffledCards(packsData.quotes.cardData);

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

// Ensure no topics are sequential in shuffled list
test.each(topicPartners)('Partner Topics: (s%s, %s)', (topic1, topic2) => {
  expect(topic1).not.toEqual(topic2);
});

test('shuffledCards should include all card data', () => {
  expect(shuffledCards).toHaveLength(packsData.quotes.cardData.length);
});
