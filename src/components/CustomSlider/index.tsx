import React from 'react';

import Slider, { SliderProps } from '@react-native-community/slider';

import theme from '../../global/styles/theme';
import { Container } from './styles';

interface Props extends SliderProps {
  ss?: (value: number) => void;
}

export const CustomSlider = ({ ss, ...rest }: Props) => {
  return (
    <Container>
      <Slider
        style={{ height: 40, width: '100%' }}
        minimumValue={0}
        step={100}
        maximumValue={10000}
        minimumTrackTintColor={theme.colors.green_main}
        maximumTrackTintColor="# 000000"
        thumbImage={require('../../assets/img/tractor.png')}
        {...rest}
      />
    </Container>
  );
};
