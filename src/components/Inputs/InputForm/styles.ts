import { TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

interface Props {
  isEditable: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

// export const  = styled(TextInput)`
//   flex: 1;
//   background-color: ${({ theme }) => theme.colors.white};
//   font-family: ${({ theme }) => theme.fonts.regular_400};
//   font-size: ${RFValue(15)}px;
//   color: ${({ theme }) => theme.colors.title_item_gray};

//   border-bottom-right-radius: 10px;
//   border-top-right-radius: 10px;
//   padding: 0 23px;
// `;

export const InputText = styled(TextInput)<Props>`
  ${props =>
    props.isEditable
      ? css`
          background-color: ${({ theme }) => theme.colors.white};
          color: ${({ theme }) => theme.colors.preto_titulo};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.cinza};
          color: ${({ theme }) => theme.colors.cinza_apagado};
        `}
  height: 50px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(15)}px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border_input};
  padding: 0 11px;
`;

export const InputMask = styled(TextInputMask)<Props>`
  ${props =>
    props.isEditable
      ? css`
          background-color: ${({ theme }) => theme.colors.white};
          color: ${({ theme }) => theme.colors.preto_titulo};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.cinza};
          color: ${({ theme }) => theme.colors.cinza_apagado};
        `}
  height: 50px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(15)}px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border_input};
  padding: 0 11px;
`;
