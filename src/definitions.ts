import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface AppState {
  filter: null | TopicKeys;
  packData: PackType;
  availableCards: CardType[];
  cardIndex: number;
}

export interface AppContextType extends AppState {
  activeCards: CardType[];
  goToNextCardIndex: () => void;
  updateContext: (
    state: Partial<AppContextType> | ((state: AppState) => AppState),
  ) => void;
}

export type TopicKeys =
  | 'emotional'
  | 'environmental'
  | 'intellectual'
  | 'occupational'
  | 'physical'
  | 'social'
  | 'spiritual'
  | 'wild'
  | 'career'
  | 'childhood'
  | 'finances';

export interface TopicType {
  key: TopicKeys;
  title: string;
  color: string;
  colorLight: string;
  colorCenter: string;
}

export interface CardType {
  quote: string;
  prompt: string;
  source: string;
  topic: TopicKeys;
  song?: true;
  finished?: true;
}

export interface PackType {
  key: string;
  title: string;
  color: string;
  colorLight: string;
  topics: {
    [key: string]: TopicType;
  };
  cardData: CardType[];
}

export type ModalStackParamList = {
  Dashboard: undefined;
  Topics: undefined;
  Packs: undefined;
};

export type ModalStackNavigation<
  T extends keyof ModalStackParamList
> = StackNavigationProp<ModalStackParamList, T>;

export interface ModalStackNavProps<T extends keyof ModalStackParamList> {
  navigation: ModalStackNavigation<T>;
  route: RouteProp<ModalStackParamList, T>;
}
