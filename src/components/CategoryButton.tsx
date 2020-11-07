import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {screenWidth, useStyledTheme} from 'wStyled';
import {CategoryType} from 'wTypes';

interface Props {
  category: CategoryType;
}

const CategoryButton: React.FC<Props> = ({category}) => {
  const theme = useStyledTheme();

  return (
    <Pressable
      onPress={() => {
        console.log('Set category', category.key);
      }}>
      <LinearGradient
        colors={[category.color, category.colorLight]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={{
          borderRadius: 10,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          width: screenWidth / 2 - 48,
          marginHorizontal: 16,
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
