import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import Constants from 'expo-constants';
import {LinearGradient} from 'expo-linear-gradient';
import React, {useRef, useState} from 'react';
import {
  Animated,
  GestureResponderHandlers,
  Pressable,
  Share,
  Text,
} from 'react-native';
import {captureRef, releaseCapture} from 'react-native-view-shot';
import {LinearButton, WContainer} from 'wComponents';
import {APP_STORE_URL, categories} from 'wConfig';
import {screenHeight, screenWidth, useStyledTheme} from 'wStyled';
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
  source,
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

  const cardRef = useRef();
  const [isCapturing, setIsCapturing] = useState(false);

  const getMainCardStyle = (): any => {
    const width = Math.min(screenWidth * 0.9, 320);
    const height = Math.min(width * 1.5, screenHeight - 300);

    return {
      position: 'absolute',
      alignSelf: 'center',
      width,
      height,
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

        <Text
          style={{
            marginTop: 12,
            fontWeight: '500',
            fontFamily: 'Avenir Next',
            textAlign: 'center',
            fontSize: 18,
            color: theme.colors.white,
          }}>
          - {source}
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
              size={26}
              color={theme.colors.white}
            />
          </WContainer>
        </LinearButton>
      </WContainer>
    );
  }

  return (
    <Animated.View ref={cardRef} style={getMainCardStyle()} {...panHandlers}>
      <Animated.View style={{flex: 1, ...contentStyle}}>
        <WContainer flex={1} align="center" justify="space-around">
          {content}
        </WContainer>
      </Animated.View>

      {!finished && !isCapturing && (
        <Pressable
          hitSlop={16}
          style={{position: 'absolute', top: 12, right: 12}}
          onPress={async () => {
            // Hide the share icon before capturing a screenshot
            setIsCapturing(true);

            // Move the captureRef to the nextTick to allow a render cycle
            setTimeout(async () => {
              const fileUrl = await captureRef(cardRef, {
                result: 'tmpfile',
                quality: 1,
                format: 'png',
              });

              setIsCapturing(false);

              Share.share({
                url: fileUrl,
              }).finally(() => releaseCapture(fileUrl));
            });
          }}>
          <MaterialCommunityIcons
            name="share"
            size={26}
            color={theme.colors.background250}
          />
        </Pressable>
      )}
    </Animated.View>
  );
};

export default Card;
