import styled from 'styled-components/native';

export const CameraContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

export const CameraContent = styled.View`
  flex: 1;
  background-color: transparent;
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
