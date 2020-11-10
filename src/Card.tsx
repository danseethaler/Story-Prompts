import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import Constants from 'expo-constants';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {Animated, GestureResponderHandlers, Share, Text} from 'react-native';
import {LinearButton, WContainer} from 'wComponents';
import {APP_STORE_URL, categories} from 'wConfig';
import {useStyledTheme} from 'wStyled';
import {CardType, ModalStackNavigation} from 'wTypes';

interface Props extends CardType {
  panHandlers: GestureResponderHandlers | null;
  style: any;
  contentStyle: any;
}

const Card: React.FC<Props> = ({
  panHandlers,
  prompt,
  quote,
  category,
  style,
  contentStyle,
  finished = false,
  song = false,
}) => {
  const navigation = useNavigation<ModalStackNavigation<'Dashboard'>>();
  const theme = useStyledTheme();
  const categoryColor = theme.categoryColors[category];
  const categoryColorLight = theme.categoryColorsLight[category];
  const {title} = categories[category];

  const getMainCardStyle = (): any => {
    return {
      position: 'absolute',
      alignSelf: 'center',
      width: 320,
      height: 460,
      backgroundColor: '#39394C',
      padding: 16,
      borderRadius: 12,
      ...style,
    };
  };

  let content = (
    <>
      <WContainer
        style={{
          borderRadius: 22,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[categoryColor, categoryColorLight]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={{
            paddingVertical: 4,
            paddingHorizontal: 16,
            backgroundColor: categoryColorLight,
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontFamily: 'Avenir Next',
              textAlign: 'center',
              fontSize: 18,
              color: theme.colors.white,
            }}>
            {title}
          </Text>
        </LinearGradient>
      </WContainer>

      <WContainer align="center">
        {song ? (
          <Ionicons
            name="ios-musical-notes"
            size={20}
            color={theme.colors.text100}
          />
        ) : (
          <FontAwesome
            name="quote-left"
            size={20}
            color={theme.colors.text100}
          />
        )}

        <Text
          style={{
            marginTop: 12,
            fontWeight: '600',
            fontFamily: 'Avenir Next',
            textAlign: 'center',
            fontSize: 24,
            color: theme.colors.white,
          }}>
          {quote}
        </Text>
      </WContainer>
      <Text
        style={{
          fontWeight: '500',
          fontFamily: 'Avenir Next',
          textAlign: 'center',
          fontSize: 18,
          color: theme.colors.white,
        }}>
        {prompt}
      </Text>
    </>
  );
  if (finished) {
    content = (
      <WContainer flex={1} align="center" stretch justify="space-around">
        <WContainer wMarginBottom={1} flex={1} align="center" justify="center">
          <Text
            style={{
              textAlign: 'center',
              fontSize: 38,
              marginBottom: 16,
            }}>
            🌱
          </Text>
          <Text
            style={{
              fontWeight: '600',
              fontFamily: 'Avenir Next',
              textAlign: 'center',
              fontSize: 28,
              color: theme.colors.white,
            }}>
            {/* {'Being connected\nfeels good.'} */}
            {'Those who tell stories rule society.'}
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontFamily: 'Avenir Next',
              textAlign: 'center',
              marginTop: 12,
              fontSize: 18,
              color: theme.colors.text100,
            }}>
            - Plato
          </Text>
        </WContainer>

        <LinearButton
          viewStyle={{
            borderRadius: 12,
            overflow: 'hidden',
            alignSelf: 'stretch',
            marginBottom: 16,
          }}
          touchStyle={{
            padding: 12,
            alignItems: 'center',
          }}
          onPress={() => {
            Share.share({
              message: `Stories reveal who we are but it can be tough to get started. Checkout this app that encourages sharing your story!\n\n${APP_STORE_URL}`,
            });
          }}
          gradientColor1={categoryColor as any}
          gradientColor2={categoryColorLight as any}>
          <WContainer row align="center">
            <Text
              style={{
                marginRight: 12,
                fontWeight: '600',
                fontFamily: 'Avenir Next',
                textAlign: 'center',
                fontSize: 22,
                color: theme.colors.white,
              }}>
              Share {Constants.manifest.name}
            </Text>
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={26}
              color={theme.colors.white}
            />
          </WContainer>
        </LinearButton>
        <LinearButton
          viewStyle={{
            borderRadius: 12,
            overflow: 'hidden',
            alignSelf: 'stretch',
          }}
          touchStyle={{
            padding: 12,
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('Categories');
          }}
          gradientColor1={categoryColor as any}
          gradientColor2={categoryColorLight as any}>
          <WContainer row align="center">
            <Text
              style={{
                marginRight: 12,
                fontWeight: '600',
                fontFamily: 'Avenir Next',
                textAlign: 'center',
                fontSize: 22,
                color: theme.colors.white,
              }}>
              New Category
            </Text>
            <MaterialCommunityIcons
              name="cards"
              size={30}
              color={theme.colors.white}
            />
          </WContainer>
        </LinearButton>
      </WContainer>
    );
  }

  return (
    <Animated.View style={getMainCardStyle()} {...panHandlers}>
      <Animated.View style={{flex: 1, ...contentStyle}}>
        <WContainer flex={1} align="center" justify="space-around">
          {content}
        </WContainer>
      </Animated.View>
    </Animated.View>
  );
};

export default Card;
