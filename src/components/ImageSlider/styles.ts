import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

interface ImageIndexProps {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ImageIndexes = styled.View`
  position: absolute;
  z-index: 1;
  top: 235px;
  height: 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.chumbo};

  flex-direction: row;
  align-items: center;
  align-self: center;

  padding: 0 8px 0 3px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 7px;
  height: 7px;
  border-radius: 4px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.green_linear_light : theme.colors.cinza};

  margin-left: 5px;
`;

export const ImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 265px;

  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 100%;
  height: 265px;
`;
