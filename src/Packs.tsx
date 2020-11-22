import _ from 'lodash';
import React from 'react';
import {Image, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {PackButton, PartialModal, WContainer} from 'wComponents';
import {getShuffledCards, packsData} from 'wConfig';
import {useAppContext} from 'wHooks';
import {ModalStackNavProps} from 'wTypes';
import {screenWidth} from './styled/sizing';
import {useStyledTheme} from './styled/styled';

type Props = ModalStackNavProps<'Packs'>;

const Packs: React.FC<Props> = ({navigation}) => {
  const theme = useStyledTheme();
  const {updateContext, packData} = useAppContext();

  return (
    <PartialModal closeModal={() => navigation.pop()}>
      <WContainer
        align="center"
        justify="center"
        stretch
        wPadding={[0, 2]}
        style={{
          alignSelf: 'center',
          width: screenWidth,
          maxWidth: 500,
          borderRadius: 40,
          backgroundColor: theme.colors.background100,
        }}>
        <WContainer
          wPadding={0.5}
          wMargin={2}
          style={{
            borderRadius: 40,
            width: 80,
            backgroundColor: theme.colors.background300,
          }}
        />
        <ScrollView style={{alignSelf: 'stretch'}}>
          <WContainer
            wMarginTop={2}
            wPaddingBottom={2}
            wMarginBottom={1}
            row
            align="center"
            justify="center">
            <Image
              source={require('../assets/StoryPacksLogoTransparentStraight.png')}
              style={{width: 48, height: 48}}
            />
            <Text
              style={{
                paddingLeft: 6,
                paddingBottom: 4,
                fontFamily: 'Avenir Next',
                fontWeight: '700',
                fontSize: 32,
                color: theme.colors.text700,
                textAlignVertical: 'center',
              }}>
              Packs
            </Text>
          </WContainer>
          <WContainer
            stretch
            justify="center"
            align="center"
            wPaddingBottom={3}>
            {_.map(packsData, (pack) => {
              return (
                <PackButton
                  key={pack.key}
                  pack={pack}
                  onPress={() => {
                    const newPackSelected = pack.key !== packData.key;
                    if (newPackSelected) {
                      updateContext({
                        packData: pack,
                        filter: null,
                        availableCards: getShuffledCards(pack.cardData),
                        cardIndex: 0,
                      });
                    }

                    navigation.pop();
                  }}
                />
              );
            })}
          </WContainer>
        </ScrollView>
        <WContainer wPaddingBottom={4} />
      </WContainer>
    </PartialModal>
  );
};

export default Packs;
