import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {screenWidth, useStyledTheme} from 'wStyled';
import {CategoryType} from 'wTypes';

interface Props {
  category: CategoryType;
  onPress: () => void;
}

const CategoryButton: React.FC<Props> = ({category, onPress}) => {
  const theme = useStyledTheme();

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[category.color, category.colorLight]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={{
          borderRadius: 10,
          width: screenWidth / 2 - 32,
          marginHorizontal: 8,
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{
            paddingVertical: theme.baseUnit * 2,
            paddingHorizontal: theme.baseUnit * 2,
            fontFamily: 'Avenir Next',
            color: theme.colors.white,
            fontSize: 22,
            lineHeight: 32,
            fontWeight: '600',
          }}>
          {category.title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default CategoryButton;
