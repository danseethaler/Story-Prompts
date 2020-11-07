export type Categories =
  | 'emotional'
  | 'environmental'
  | 'intellectual'
  | 'occupational'
  | 'physical'
  | 'social'
  | 'spiritual'
  | 'wild';

export interface CardType {
  quote: string;
  prompt: string;
  category: Categories;
  song?: true;
}
