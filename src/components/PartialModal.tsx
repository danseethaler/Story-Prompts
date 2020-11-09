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
    <Pressable style={{flex: 1, width: screenWidth}} onPress={closeModal} />
    {children}
  </WContainer>
);

export default PartialModal;
