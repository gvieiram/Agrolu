import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.green_opaque};

  justify-content: center;
  flex-direction: column;
  padding: 0 ${RFValue(25)}px;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
`;

export const BackgroundImageRadial = styled.Image`
  position: absolute;
`;

export const Tractor = styled.View`
  left: ${RFValue(-90)}px;
  margin-top: ${RFValue(40)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.Marlin};
  font-size: ${RFValue(36)}px;
  margin: -5px 0 8px 0;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.light_300};
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(50)}px;
`;

export const SubtitleBold = styled.Text`
  font-weight: bold;
`;

export const ContainerNextPage = styled.View`
  display: flex;
  padding: 0 ${RFValue(10)}px;
`;

// export const Button = styled(TouchableOpacity)`
//   height: ${RFValue(50)}px;
//   padding: 0 32px;
//   border-radius: 4px;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: ${RFValue(20)}px;
// `;

// export const TitleBtn = styled.Text`
//   color: #fff;
//   font-family: ${({ theme }) => theme.fonts.medium_500};
// `;

export const DivText = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(20)}px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  margin-right: 6px;
`;

export const LinkCadastro = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  text-decoration-line: underline;
  margin-bottom: 30px;
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  height: ${RFValue(55)}px;
`;

export const Gradient = styled(LinearGradient)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const TitleBtn = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(15)}px;
`;
