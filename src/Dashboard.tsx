import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, LayoutAnimation, Text} from 'react-native';
import {
  AnimatedGradientChild,
  BothSafeArea,
  LinearButton,
  ScaleButton,
  WContainer,
} from 'wComponents';
import {CARD_DRAG_RANGE} from 'wConfig';
import {useAppContext, useGetColorsFromCards} from 'wHooks';
import {ModalStackNavProps} from 'wTypes';
import CardStack from './CardStack';
import {screenWidth} from './styled/sizing';
import {useStyledTheme} from './styled/styled';

type Props = ModalStackNavProps<'Dashboard'>;

const Dashboard: React.FC<Props> = ({navigation}) => {
  const theme = useStyledTheme();
  const {activeCards, setActiveCardIndex} = useAppContext();

  const [menuOpen, setMenuOpen] = useState(false);

  const [
    offSetMoveHandler,
    offsetValue,
    getColorsFromCards,
  ] = useGetColorsFromCards(activeCards);
  const colors = getColorsFromCards();

  const cardPanValue = useRef(new Animated.ValueXY()).current;
  const cardPanMoveHandler = Animated.event(
    [null, {dx: cardPanValue.x, dy: cardPanValue.y}],
    {
      useNativeDriver: false,
    },
  );

  useEffect(() => {
    return () => {
      cardPanValue.x.removeAllListeners();
      cardPanValue.y.removeAllListeners();
      offsetValue.removeAllListeners();
    };
  }, []);

  let nextButtonOpacity: Number | Animated.AnimatedInterpolation = 1;
  if (activeCards.length === 2) {
    nextButtonOpacity = offsetValue.interpolate({
      inputRange: [0, CARD_DRAG_RANGE],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  } else if (activeCards.length === 1) {
    nextButtonOpacity = 0;
  }

  return (
    <BothSafeArea bottomColor={theme.colors.background250}>
      <WContainer flex={1} align="center" stretch wPadding={[3, 0]}>
        {/* Top buttons */}
        <WContainer
          align="center"
          justify="center"
          stretch={menuOpen}
          wMargin={[0, 2]}
          style={{
            borderRadius: menuOpen ? 20 : 40,
            overflow: 'hidden',
          }}>
          <ScaleButton
            viewStyle={{
              borderRadius: menuOpen ? 0 : 40,
              backgroundColor: theme.colors.background100,
              alignSelf: 'stretch',
              alignItems: 'stretch',
            }}
            onPress={() => {
              LayoutAnimation.configureNext({
                ...LayoutAnimation.Presets.easeInEaseOut,
                duration: 150,
              });
              setMenuOpen(!menuOpen);
            }}>
            <WContainer
              row
              wMargin={[menuOpen ? 2 : 0, 1]}
              wPadding={1}
              align="center"
              justify="center">
              <WContainer row align="center" justify="center">
                <AnimatedGradientChild color1={colors[2]}>
                  {({colors: animatedColors}) => (
                    <MaterialCommunityIcons
                      name="menu-down"
                      size={32}
                      color={animatedColors[0]}
                    />
                  )}
                </AnimatedGradientChild>
                <Text
                  style={{
                    paddingLeft: 4,
                    paddingRight: 8,
                    fontSize: 20,
                    color: theme.colors.text600,
                    fontFamily: 'Avenir Next',
                    fontWeight: '600',
                  }}>
                  Starter Pack
                </Text>
              </WContainer>
            </WContainer>
          </ScaleButton>

          {menuOpen && (
            <WContainer stretch>
              <ScaleButton
                viewStyle={{
                  alignSelf: 'stretch',
                  backgroundColor: theme.colors.background300,
                }}
                onPress={() => {
                  LayoutAnimation.configureNext({
                    ...LayoutAnimation.Presets.easeInEaseOut,
                    duration: 150,
                  });
                  setMenuOpen(false);

                  navigation.navigate('Packs');
                }}>
                <WContainer stretch row wPadding={[2, 4]} align="center">
                  <AnimatedGradientChild color1={colors[2]}>
                    {({colors: animatedColors}) => (
                      <MaterialCommunityIcons
                        name="cards"
                        size={32}
                        color={animatedColors[0]}
                      />
                    )}
                  </AnimatedGradientChild>
                  <Text
                    style={{
                      paddingLeft: 12,
                      paddingRight: 8,
                      fontSize: 20,
                      color: theme.colors.text600,
                      fontFamily: 'Avenir Next',
                      fontWeight: '600',
                    }}>
                    Select a Pack
                  </Text>
                </WContainer>
              </ScaleButton>

              <ScaleButton
                viewStyle={{
                  alignSelf: 'stretch',
                  backgroundColor: theme.colors.background300,
                }}
                onPress={() => {
                  LayoutAnimation.configureNext({
                    ...LayoutAnimation.Presets.easeInEaseOut,
                    duration: 150,
                  });
                  setMenuOpen(false);

                  navigation.navigate('Topics');
                }}>
                <WContainer stretch row wPadding={[2, 4]} align="center">
                  <AnimatedGradientChild color1={colors[2]}>
                    {({colors: animatedColors}) => (
                      <MaterialCommunityIcons
                        name="checkbox-multiple-blank"
                        size={32}
                        color={animatedColors[0]}
                      />
                    )}
                  </AnimatedGradientChild>
                  <Text
                    style={{
                      paddingLeft: 12,
                      paddingRight: 8,
                      fontSize: 20,
                      color: theme.colors.text600,
                      fontFamily: 'Avenir Next',
                      fontWeight: '600',
                    }}>
                    Topics
                  </Text>
                </WContainer>
              </ScaleButton>
            </WContainer>
          )}
        </WContainer>

        {/* Card Stack */}
        <CardStack
          cards={activeCards}
          setActiveCardIndex={setActiveCardIndex}
          offSetMoveHandler={offSetMoveHandler}
          offsetValue={offsetValue}
          cardPanMoveHandler={cardPanMoveHandler}
          cardPanValue={cardPanValue}
        />

        {/* Next Button */}
        <WContainer align="center" stretch>
          <Animated.View style={{opacity: nextButtonOpacity} as any}>
            <LinearButton
              viewStyle={{
                borderRadius: 40,
                overflow: 'hidden',
                opacity: activeCards.length === 1 ? 0 : 1,
              }}
              touchStyle={{
                paddingHorizontal: 100,
                paddingVertical: 14,
              }}
              disabled={activeCards.length === 1}
              gradientColor1={colors[0]}
              gradientColor2={colors[1]}
              onPress={() => {
                Haptics.selectionAsync();

                // This is the number of ms after the user releases the card that it
                // floats of the screen and the card is removed from the stack
                const exitDuration = 300;

                Animated.timing(cardPanValue, {
                  toValue: {
                    x: -(screenWidth + 100),
                    y: 0,
                  },
                  duration: exitDuration,
                  useNativeDriver: false,
                }).start();

                Animated.timing(offsetValue, {
                  toValue: CARD_DRAG_RANGE,
                  duration: exitDuration,
                  useNativeDriver: false,
                }).start();

                setTimeout(() => {
                  Animated.timing(cardPanValue, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                  }).start();

                  Animated.timing(offsetValue, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                  }).start();

                  setActiveCardIndex((activeIndex) => activeIndex + 1);
                }, exitDuration);
              }}>
              <WContainer row align="center" justify="center">
                <Text
                  style={{
                    fontSize: 26,
                    color: theme.colors.white,
                    fontFamily: 'Avenir Next',
                    fontWeight: '600',
                  }}>
                  Next
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={28}
                  style={{marginLeft: theme.baseUnit * 1.5}}
                  color={theme.colors.white}
                />
              </WContainer>
            </LinearButton>
          </Animated.View>
        </WContainer>
      </WContainer>
    </BothSafeArea>
  );
};

export default Dashboard;
