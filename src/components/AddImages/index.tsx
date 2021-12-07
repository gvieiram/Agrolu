import React, { useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';

import { AssetsSelector } from 'expo-images-picker';
import { Asset, MediaType } from 'expo-media-library';

import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Container } from './styles';

export function AddImages() {
  const theme = useTheme();
  const navigation = useNavigation();

  function onDone(data: Asset[]) {
    console.log(data);
  }

  const errors = useMemo(
    () => ({
      errorTextColor: 'black',
      errorMessages: {
        hasErrorWithPermissions:
          'Por favor, permita o acesso à galeria de mídia.',
        hasErrorWithLoading: 'Ocorreu um erro ao carregar as imagens.',
        hasErrorWithResizing: 'Ocorreu um erro ao carregar as imagens.',
        hasNoAssets: 'Nenhuma imagem encontrada.',
      },
    }),
    [],
  );

  const styles = useMemo(
    () => ({
      margin: 2,
      bgColor: 'white',
      spinnerColor: theme.colors.green_linear_dark_opaque,
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: theme.colors.cinza_apagado,
        size: 20,
      },
      selectedIcon: {
        Component: FontAwesome5,
        iconName: 'tractor',
        color: 'white',
        bg: '#004d3555',
        size: 26,
      },
    }),
    [],
  );

  const resize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: 'jpeg',
    }),
    [],
  );

  const textStyled = {
    color: theme.colors.white,
    fontFamily: theme.fonts.medium_500,
  };

  const buttonStyled = {
    backgroundColor: theme.colors.green_dark_main,
    borderRadius: 10,
  };

  const navigator = useMemo(
    () => ({
      Texts: {
        finish: 'Feito',
        back: 'Voltar',
        selected: 'selecionado',
      },
      midTextColor: 'black',
      minSelection: 1,
      buttonTextStyle: textStyled,
      buttonStyle: buttonStyled,
      onBack: () => navigation.goBack(),
      onSuccess: (data: Asset[]) => onDone(data),
    }),
    [],
  );

  return (
    <Container>
      <AssetsSelector
        Settings={{
          assetsType: [MediaType.photo],
          getImageMetaData: true,
          minSelection: 1,
          maxSelection: 6,
          initialLoad: 100,
          landscapeCols: 4,
          portraitCols: 4,
        }}
        Errors={errors}
        Styles={styles}
        Navigator={navigator}
        // Resize={resize}
      />
    </Container>
  );
}
