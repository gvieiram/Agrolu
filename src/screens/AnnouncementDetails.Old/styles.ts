import { RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import Icon from '../../assets/img/survey.svg';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.creme_background};
`;

export const Header = styled.View`
  width: 100%;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.green_dark_main};
  justify-content: flex-end;
  padding: 15px;
`;

export const HeaderContent = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_main};
`;

export const IconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Like = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.green_main};
  margin-right: 10px;
`;

export const Share = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.green_main};
`;

export const AnnouncementContent = styled.View`
  height: 100%;
  padding: 0 15px;

  margin-bottom: 60px;
`;

export const AnnouncementTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  color: ${({ theme }) => theme.colors.title_item_gray};

  margin: 15px 0;
`;

export const Price = styled.Text`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  color: ${({ theme }) => theme.colors.preto_titulo};
`;

export const Survey = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 25px 0 20px 0;
`;

export const SurveyIcon = styled(Icon)``;

export const SurveyTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.green_dark_3};
  margin-left: 6px;
`;

export const Information = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  margin: 0 3px;
`;

export const InformationText = styled.Text`
  background-color: ${({ theme }) => theme.colors.cinza};
  color: ${({ theme }) => theme.colors.green_dark_3};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};

  padding: 0 7px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const PublishedAt = styled.Text`
  color: ${({ theme }) => theme.colors.cinza_apagado};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  margin-top: 30px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray_line_dark};

  margin: 25px 0;
`;

export const Description = styled.View``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.preto_titulo};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  margin-bottom: 15px;
`;

export const DescriptionContent = styled.Text`
  color: ${({ theme }) => theme.colors.preto_titulo};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  line-height: ${RFValue(21)}px;
  flex-wrap: wrap;
`;

export const Details = styled.View``;

export const Location = styled.View``;

export const Type = styled.View`
  flex-direction: row;
`;

export const TitleType = styled.Text`
  color: ${({ theme }) => theme.colors.preto_titulo};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  width: 100px;
`;

export const DescriptionType = styled.Text`
  color: ${({ theme }) => theme.colors.preto_titulo};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  margin-left: 15px;
`;

export const Advertiser = styled.View`
  flex-wrap: wrap;

  border: 1px solid ${({ theme }) => theme.colors.gray_line_dark};
  border-radius: 10px;

  padding: 15px 20px;
  margin-bottom: 50px;
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.preto_titulo};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium_500};
`;

export const ProfileVerification = styled.View`
  flex-direction: row;
  margin-left: 7px;
  align-items: center;
`;

export const TextVerified = styled.Text`
  color: ${({ theme }) => theme.colors.cinza_apagado};
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  padding-top: 2px;
`;

export const Entered = styled.Text`
  color: ${({ theme }) => theme.colors.cinza_apagado};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};

  margin: 8px 0;
`;

export const Status = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StatusText = styled.Text`
  color: ${({ theme }) => theme.colors.cinza_apagado};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};

  margin-left: 5px;
`;
