import _ from 'lodash';
import {CategoryColorsType} from 'wStyled';
import {CardType, CategoryKeys, CategoryType} from 'wTypes';

export const categories: {
  [key in CategoryKeys]: CategoryType;
} = {
  emotional: {
    key: 'emotional',
    title: 'Emotional',
    color: '#FD3E7E',
    colorLight: '#F5A051',
  },
  environmental: {
    key: 'environmental',
    title: 'Environmental',
    color: '#00AD8E',
    colorLight: '#B1ED4A',
  },
  intellectual: {
    key: 'intellectual',
    title: 'Intellectual',
    color: '#024A97',
    colorLight: '#669EFF',
  },
  occupational: {
    key: 'occupational',
    title: 'Occupational',
    color: '#8F048F',
    colorLight: '#FF66A3',
  },
  physical: {
    key: 'physical',
    title: 'Physical',
    color: '#FA8638',
    colorLight: '#FBCA3A',
  },
  social: {
    key: 'social',
    title: 'Social',
    color: '#5329F0',
    colorLight: '#9B66DC',
  },
  spiritual: {
    key: 'spiritual',
    title: 'Spiritual',
    color: '#00998C',
    colorLight: '#7AFFE9',
  },
  wild: {
    key: 'wild',
    title: 'Wild',
    color: '#09A0CE',
    colorLight: '#EB00E3',
  },
};

export const categoryColors = _.reduce(
  categories,
  (prev, category, key) => ({...prev, [key]: category.color}),
  {},
) as CategoryColorsType;

export const categoryColorsLight = _.reduce(
  categories,
  (prev, category, key) => ({...prev, [key]: category.colorLight}),
  {},
) as CategoryColorsType;

const cardData: CardType[] = [
  {
    quote: 'When memories fade, songs will make you remember.',
    prompt:
      'Share a story about a song with special meaning to you because of the memories associated with it.',
    category: 'emotional',
  },
  {
    quote: 'Sometimes the fear of striking out keeps us from playing the game.',
    prompt:
      'Share a story about a time you wish you had been more confident in yourself.',
    category: 'emotional',
  },
  {
    quote: 'Pam. Um, are you free for dinner tonight?',
    prompt: 'Share a story about a time someone made your day.',
    category: 'emotional',
  },
  {
    quote:
      "It's the possibility of having a dream come true that makes life interesting.",
    prompt: 'Share a story from the graveyard of your childhood dreams.',
    category: 'emotional',
  },
  {
    quote: 'If you want the rainbow, you gotta put up with the rain.',
    prompt: 'Share a story from a difficult phase of your life.',
    category: 'emotional',
  },
  {
    quote: 'A coward dies a thousand deaths, the brave only once.',
    prompt: 'Share a story about something that keeps you up at night.',
    category: 'emotional',
  },

  {
    quote: 'Some people feel the rain, others just get wet.',
    prompt: 'Share a story about a memory that involves the weather.',
    category: 'environmental',
  },
  {
    quote: 'Merry Christmas, ya filthy animal.',
    prompt: 'Share a story about one of your holiday memories.',
    category: 'environmental',
  },
  {
    quote: "We'll always have Paris.",
    prompt:
      'Share a story about a place that is special to you because of the memories created there.',
    category: 'environmental',
  },
  {
    quote: 'Get your ugly, yella, no-good keister off my property!',
    prompt:
      "Share a story about a time you were somewhere you didn't feel comfortable.",
    category: 'environmental',
  },
  {
    quote: 'When you get caught between the moon and New York City…',
    prompt: 'Share a story of a memory you made far from home.',
    category: 'environmental',
    song: true,
  },
  {
    quote: "There's no place like home. There's no place like home.",
    prompt: 'Share a story of how a move impacted you.',
    category: 'environmental',
  },
  {
    quote:
      'Do not take too much advice, think for yourself. Independence will add vigor and inspiration to your labors.',
    prompt: 'Share a story about something you taught yourself how to do.',
    category: 'intellectual',
  },
  {
    quote:
      'You think the people of this country exist to provide you with position. I think your position exists to provide those people with freedom.',
    prompt:
      'Share a story about how a movie influenced the way you see the world.',
    category: 'intellectual',
  },
  {
    quote:
      'The more sand has escaped from the hourglass of our life, the clearer we should see through it.',
    prompt:
      'Share a story about something you wish you learned when you were younger.',
    category: 'intellectual',
  },
  {
    quote:
      'How many a man has dated a new era in his life from the reading of a book.',
    prompt: 'Share a story about a book that changed your trajectory.',
    category: 'intellectual',
  },
  {
    quote: 'You need a mother very, very badly!',
    prompt: 'Share a story about a lesson your parents taught you.',
    category: 'intellectual',
  },
  {
    quote: 'Even the smallest person can change the course of the future.',
    prompt:
      'Share a story from your past that everyone could learn a life lesson from.',
    category: 'intellectual',
  },
  {
    quote:
      'Choose a job you love, and you will never have to work a day in your life.',
    prompt: 'Share a story about how you were hired for a job.',
    category: 'occupational',
  },
  {
    quote: 'I have nothing to offer but blood, toil, tears and sweat.',
    prompt: 'Share a story about something you put a lot of effort into.',
    category: 'occupational',
  },
  {
    quote: "No, I can't come back to Neverland again...",
    song: true,
    prompt:
      'Share a story about what it was like to close a chapter of your life and move on.',
    category: 'occupational',
  },
  {
    quote: "I know you can fight, but it's our wits that make us men.",
    prompt: 'Share a story about your teenage ambitions.',
    category: 'occupational',
  },
  {
    quote: "I don't gotta go home, but I gotta get the heck out of here.",
    prompt: 'Share a story about leaving a job.',
    category: 'occupational',
  },
  {
    quote: 'Fools rush in where angels fear to tread.',
    prompt:
      "Share a story about a skill you've developed that people wouldn't guess you have.",
    category: 'occupational',
  },
  {
    quote: 'Doctor, doctor, give me the news...',
    prompt: 'Share a story about a change you made to improve your health.',
    category: 'physical',
    song: true,
  },
  {
    quote: 'For love of the game.',
    prompt: 'Share a story from the sport you played most.',
    category: 'physical',
  },
  {
    quote: "You're not dying. You just can't think of anything good to do.",
    prompt: 'Share a story about a time you were sick.',
    category: 'physical',
  },
  {
    quote:
      "A gold medal is a wonderful thing, but if you're not enough without it, you'll never be enough with it.",
    prompt:
      'Share a story about a physical goal you set and how you pursued it.',
    category: 'physical',
  },
  {
    quote: 'Hunger makes a thief of any man.',
    prompt:
      'Share a story about a time you were really hungry or really thirsty.',
    category: 'physical',
  },
  {
    quote:
      'Let the bells ring and the children cry, determined to make a day of it.',
    prompt: 'Share a story about a time you had to wake up really early.',
    category: 'physical',
  },
  {
    quote: "I still get butterflies even though I've seen you a hundred times.",
    prompt: 'Share a story of the moment you met someone.',
    category: 'social',
  },
  {
    quote: 'This is NOT a gymnasium! Were you born in a barn?',
    prompt: 'Share a story about growing up at your house.',
    category: 'social',
  },
  {
    quote:
      "Of all the gin joints in all the towns in all the world, I wish they'd walk into mine.",
    prompt:
      'Share a story about someone from your past you wish was part of your present.',
    category: 'social',
  },
  {
    quote: 'We are the products of the lives that have touched ours.',
    prompt: 'Share a story that makes you proud of your parents.',
    category: 'social',
  },
  {
    quote:
      'But tomorrow comes and tomorrow goes, and the distance between us grows and grows.',
    prompt: "Share a story about someone you've lost touch with.",
    category: 'social',
  },
  {
    quote: "I always think there's a band, kid.",
    prompt: 'Share a story about a memorable conversation.',
    category: 'social',
  },
  {
    quote: 'A season of faiths imperfections.',
    prompt:
      'Share a story about something you believed when you were younger but no longer believe.',
    category: 'spiritual',
  },
  {
    quote:
      'Some books are to be tasted, others to be swallowed, and some few to be chewed and digested.',
    prompt: 'Share a story about a scripture or quote you treasure.',
    category: 'spiritual',
  },
  {
    quote: 'My strength is as the strength of ten because my heart is pure.',
    prompt: 'Share a story about a spiritually defining moment for you.',
    category: 'spiritual',
  },
  {
    quote: 'Because I knew you, I have been changed, for good...',
    prompt:
      'Share a story about how a book, play, song, or movie inspired you to improve your behavior.',
    category: 'spiritual',
    song: true,
  },
  {
    quote: "It doesn't matter. He believes in you.",
    prompt: 'Share a story about the evidence you have to believe in God.',
    category: 'spiritual',
  },
  {
    quote: 'Draw nigh to God, and he will draw nigh to you.',
    prompt: 'Share a story about a time you felt close to God.',
    category: 'spiritual',
  },
  {
    quote: 'Taxation IS theft.',
    prompt: 'Share a story about ____________.',
    category: 'wild',
  },
  {
    quote: 'There is no greater agony than bearing an untold story inside you.',
    prompt: 'Share a story about ____________.',
    category: 'wild',
  },
  {
    quote:
      'If you want to be happy, set a goal that commands your thoughts, liberates your energy, and inspires your hope.',
    prompt: 'Share a story about ____________.',
    category: 'wild',
  },
  // {
  //   quote: 'The lady doth protest too much, methinks.',
  //   prompt: 'Share a story about ____________.',
  //   category: 'wild',
  // },
  // {
  //   quote:
  //     'Never let a problem to be solved become more important than a person to be loved.',
  //   prompt: 'Share a story about ____________.',
  //   category: 'wild',
  // },
  {
    quote:
      'The joy we feel has little to do with the circumstances of our lives and everything to do with the focus of our lives.',
    prompt: 'Share a story about ____________.',
    category: 'wild',
  },
  // {
  //   quote:
  //     'Stories are the one sure way to touch the heart and change the world.',
  //   prompt: 'Share a story about ____________.',
  //   category: 'wild',
  // },
  {
    quote:
      'All we have to decide is what to do with the time that is given to us.',
    prompt: 'Share a story about ____________.',
    category: 'wild',
  },
  {
    quote:
      "But you have to try, cause if you haven't tried, you haven't lived.",
    prompt: 'Share a story about ____________.',
    category: 'wild',
  },
  {
    quote:
      'Strength comes not from frantic activity but from being settled on a firm foundation of truth and light.',
    prompt: 'Share a story about ____________.',
    category: 'wild',
  },
];

export default cardData;
