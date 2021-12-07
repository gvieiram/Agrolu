import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

interface Props {
  isErrored: boolean;
}

export const IconContainer = styled.View`
  height: ${RFValue(55)}px;
  width: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: 2px;
`;

export const Container = styled.View<Props>`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray_line_input};
  border-radius: 10px;

  margin-bottom: 8px;

  ${props =>
    props.isErrored &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.error_main};
    `}
`;

export const Text = styled(TextInput)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title_item_gray};

  padding: 0 23px;
`;

export const ChangePasswordVisibilityButton = styled.View`
  height: ${RFValue(55)}px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  padding-right: 12px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
