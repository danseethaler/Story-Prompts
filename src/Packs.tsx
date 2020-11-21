import _ from 'lodash';
import React from 'react';
import {Image, Pressable, Text} from 'react-native';
import {TopicButton, PartialModal, WContainer} from 'wComponents';
import {categories} from 'wConfig';
import {useAppContext} from 'wHooks';
import {ModalStackNavProps} from 'wTypes';
import {useStyledTheme} from './styled/styled';

type Props = ModalStackNavProps<'Packs'>;

const Packs: React.FC<Props> = ({navigation}) => {
  const theme = useStyledTheme();
  const {updateContext} = useAppContext();

  return (
    <PartialModal closeModal={() => navigation.pop()}>
      <WContainer
        align="center"
        justify="center"
        stretch
        wPadding={[0, 2]}
        style={{
          alignSelf: 'center',
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
        <WContainer wPadding={1} row align="center" justify="center">
          <Image
            source={require('../assets/StoryPacksLogoTransparentStraight.png')}
            style={{width: 48, height: 48}}
          />
          <Text
            style={{
              paddingLeft: 6,
              paddingBottom: 4,
              fontFamily: 'Avenir Next',
              fontWeight: '600',
              fontSize: 42,
              color: theme.colors.text400,
              textAlignVertical: 'center',
            }}>
            Packs
          </Text>
        </WContainer>
        <WContainer row style={{flexWrap: 'wrap'}} justify="center" stretch>
          {_.map(categories, (topic) => {
            return (
              <TopicButton
                key={topic.key}
                topic={topic}
                onPress={() => {
                  updateContext({
                    filter: topic.key,
                    filterVersion: Date.now(),
                  });
                  navigation.pop();
                }}
              />
            );
          })}

          <Pressable
            style={{
              backgroundColor: theme.colors.background250,
              borderRadius: 60,
              margin: theme.baseUnit * 2,
            }}
            onPress={() => {
              updateContext({filter: null, filterVersion: Date.now()});
              navigation.pop();
            }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                paddingVertical: theme.baseUnit * 2,
                paddingHorizontal: theme.baseUnit * 8,
                fontFamily: 'Avenir Next',
                color: theme.colors.text400,
                fontSize: 22,
                lineHeight: 32,
                fontWeight: '600',
              }}>
              Show All
            </Text>
          </Pressable>
        </WContainer>
        <WContainer wPaddingBottom={4} />
      </WContainer>
    </PartialModal>
  );
};

export default Packs;
