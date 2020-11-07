import _ from 'lodash';
import React from 'react';
import {Pressable} from 'react-native';
import {screenWidth} from 'wStyled';
import WContainer from './WContainer';

interface Props {
  children: React.ReactNode;
  closeModal: () => void;
  height?: number;
}

const PartialModal = ({children, closeModal, height = 300}: Props) => (
  <WContainer flex={1} style={{height}}>
    <Pressable
      style={{flex: 1, justifyContent: 'flex-end'}}
      onPress={closeModal}>
      <Pressable style={{width: screenWidth}} onPress={_.noop}>
        {children}
      </Pressable>
    </Pressable>
  </WContainer>
);

export default PartialModal;
