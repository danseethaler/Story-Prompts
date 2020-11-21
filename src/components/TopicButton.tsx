import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {screenWidth, useStyledTheme} from 'wStyled';
import {TopicType} from 'wTypes';

interface Props {
  topic: TopicType;
  onPress: () => void;
}

const TopicButton: React.FC<Props> = ({topic, onPress}) => {
  const theme = useStyledTheme();

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[topic.color, topic.colorLight]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={{
          borderRadius: 10,
          width: Math.min(screenWidth, 500) / 2 - 32,
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
          {topic.title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default TopicButton;
