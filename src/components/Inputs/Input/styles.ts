import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const IconContainer = styled.View`
  height: ${RFValue(50)}px;
  width: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  margin-right: 2px;
`;

export const Container = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray_line_input};
  border-radius: 10px;

  margin-bottom: 8px;
`;

export const Text = styled(TextInput)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title_item_gray};

  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0 23px;
`;
