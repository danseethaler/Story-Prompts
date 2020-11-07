import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type CategoryKeys =
  | 'emotional'
  | 'environmental'
  | 'intellectual'
  | 'occupational'
  | 'physical'
  | 'social'
  | 'spiritual'
  | 'wild';

export interface CategoryType {
  key: CategoryKeys;
  title: string;
  color: string;
  colorLight: string;
}

export interface CardType {
  quote: string;
  prompt: string;
  category: CategoryKeys;
  song?: true;
}

export type ModalStackParamList = {
  Dashboard: undefined;
  Categories: undefined;
};

export type ModalStackNavigation<
  T extends keyof ModalStackParamList
> = StackNavigationProp<ModalStackParamList, T>;

export interface ModalStackNavProps<T extends keyof ModalStackParamList> {
  navigation: ModalStackNavigation<T>;
  route: RouteProp<ModalStackParamList, T>;
}
