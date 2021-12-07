// import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

import { BackButton as IconBack } from '../../components/BackButton';

interface Props {
  blogActivated?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.creme};
`;

export const Header = styled.View<Props>`
  width: 100%;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.green_dark_main};
  justify-content: flex-end;
  padding: 15px;

  ${props =>
    props.blogActivated
      ? css`
          margin-bottom: 0;
        `
      : css`
          margin-bottom: 17px;
        `}
`;

export const HeaderContent = styled.View`
  justify-content: center;
  flex-direction: row;
`;

export const BackButton = styled(IconBack)`
  position: absolute;
  z-index: 1;
  left: 3px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_main};
`;

export const BtnContainer = styled(TouchableOpacity)`
  padding: 0 16px;
  height: 55px;
  flex-direction: row;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray_line_dark};
`;

export const Description = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.preto_titulo};
  margin-left: 12px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray_line_dark};

  margin: 25px 0;
`;
