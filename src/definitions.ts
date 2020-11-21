import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface AppState {
  filter: null | TopicKeys;
  filterVersion: number;
}

export interface AppContextType extends AppState {
  updateContext: (state: Partial<AppContextType>) => void;
}

export type TopicKeys =
  | 'emotional'
  | 'environmental'
  | 'intellectual'
  | 'occupational'
  | 'physical'
  | 'social'
  | 'spiritual'
  | 'wild';

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

export type ModalStackParamList = {
  Dashboard: undefined;
  Topics: undefined;
};

export type ModalStackNavigation<
  T extends keyof ModalStackParamList
> = StackNavigationProp<ModalStackParamList, T>;

export interface ModalStackNavProps<T extends keyof ModalStackParamList> {
  navigation: ModalStackNavigation<T>;
  route: RouteProp<ModalStackParamList, T>;
}
