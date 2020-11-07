import _ from 'lodash';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {CategoryButton, PartialModal, WContainer} from 'wComponents';
import {categories} from 'wConfig';
import {ModalStackNavProps} from 'wTypes';
import {useStyledTheme} from './styled/styled';

type Props = ModalStackNavProps<'Categories'>;

const Categories: React.FC<Props> = ({navigation}) => {
  const theme = useStyledTheme();

  return (
    <PartialModal closeModal={() => navigation.pop()}>
      <WContainer
        align="center"
        justify="center"
        stretch
        wPadding={[0, 2]}
        style={{borderRadius: 40, backgroundColor: '#1B1B24'}}>
        <WContainer
          wPadding={0.5}
          wMargin={2}
          style={{borderRadius: 40, width: 80, backgroundColor: '#39394C'}}
        />
        <Text
          style={{
            fontFamily: 'Avenir Next',
            fontWeight: '600',
            fontSize: 28,
            color: theme.colors.white,
            padding: theme.baseUnit,
            paddingBottom: theme.baseUnit * 2.5,
          }}>
          Categories
        </Text>
        <WContainer row style={{flexWrap: 'wrap'}} justify="center" stretch>
          {_.map(categories, (category) => {
            return <CategoryButton key={category.key} category={category} />;
          })}

          <Pressable
            style={{
              backgroundColor: '#2E2E3D',
              borderRadius: 60,
              margin: theme.baseUnit * 2,
            }}
            onPress={() => {
              console.log('setit');
            }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                paddingVertical: theme.baseUnit * 2,
                paddingHorizontal: theme.baseUnit * 8,
                fontFamily: 'Avenir Next',
                color: theme.colors.white,
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

export default Categories;
