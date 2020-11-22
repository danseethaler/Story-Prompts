import _ from 'lodash';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {PartialModal, TopicButton, WContainer} from 'wComponents';
import {useAppContext} from 'wHooks';
import {ModalStackNavProps} from 'wTypes';
import {useStyledTheme} from './styled/styled';

type Props = ModalStackNavProps<'Topics'>;

const Topics: React.FC<Props> = ({navigation}) => {
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
        <Text
          style={{
            fontFamily: 'Avenir Next',
            fontWeight: '600',
            fontSize: 28,
            color: theme.colors.text400,
            padding: theme.baseUnit,
            paddingBottom: theme.baseUnit * 2.5,
          }}>
          Topics
        </Text>
        <WContainer row style={{flexWrap: 'wrap'}} justify="flex-start" stretch>
          {_.map(packData.topics, (topic) => (
            <TopicButton
              key={topic.key}
              topic={topic}
              onPress={() => {
                updateContext({
                  filter: topic.key,
                  cardIndex: 0,
                });
                navigation.pop();
              }}
            />
          ))}
        </WContainer>

        <Pressable
          style={{
            backgroundColor: theme.colors.background250,
            borderRadius: 60,
            margin: theme.baseUnit * 2,
          }}
          onPress={() => {
            updateContext({
              filter: null,
              cardIndex: 0,
            });
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

        <WContainer wPaddingBottom={4} />
      </WContainer>
    </PartialModal>
  );
};

export default Topics;
