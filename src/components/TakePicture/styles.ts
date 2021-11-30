import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const CameraContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

export const CameraContent = styled.View`
  flex: 1;
  background-color: transparent;
  align-items: center;
`;

export const ItemsContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
`;

export const TakePictureIcon = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.white};

  border: 3px solid ${({ theme }) => theme.colors.gray_line_dark};
`;

export const GoBack = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 0 35px;
  margin-top: 40px;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 15px;
  justify-content: flex-end;
`;

export const BottomTab = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  color: ${({ theme }) => theme.colors.white};
`;
