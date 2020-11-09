import _ from 'lodash';
import cardData from './cardData';
import {getShuffledCards} from './cardData.utils';

const shuffledCards = getShuffledCards();

const categoryPartners = _(shuffledCards)
  .map((card, index) => {
    const nextCard = shuffledCards[index + 1];

    if (!nextCard) {
      return null;
    }
    return [card.category, nextCard.category];
  })
  .filter()
  .value();

// Ensure no categories are sequential in shuffled list
test.each(categoryPartners)(
  'Partner Categories: (s%s, %s)',
  (category1, category2) => {
    expect(category1).not.toEqual(category2);
  },
);

test('shuffledCards should include all card data', () => {
  expect(shuffledCards).toHaveLength(cardData.length);
});
