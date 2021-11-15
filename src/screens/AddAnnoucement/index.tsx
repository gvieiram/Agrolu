import React, { useState, useMemo } from 'react';
import { Image as Images, ScrollView, View } from 'react-native';

import { AssetsSelector } from 'expo-images-picker';
import { Asset, MediaType } from 'expo-media-library';

import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import ButtonGradient from '../../components/ButtonGradient';
import { Checkbox } from '../../components/Checkbox';
import { InputPicker } from '../../components/Inputs/InputPicker';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  ContainerContent,
  Header,
  HeaderContent,
  BackButton,
  HeaderTitle,
  Image,
  TextImage,
  CountImage,
  Title,
  InputTitle,
  InputDescription,
  ContainerImageSelection,
} from './styles';

export function AddAnnouncement() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [images, setImages] = useState([] as Asset[]);
  const [handleSelectPhotosIsOpen, setHandleSelectPhotosIsOpen] =
    useState(false);

  function handleBack() {
    navigation.goBack();
  }

  async function handleSelectPhotos() {
    navigation.dispatch(CommonActions.navigate('AddImages'));
  }

  function onDone(data) {
    try {
      setImages(data);
      console.log('###############', images);

      setHandleSelectPhotosIsOpen(false);
    } catch (error) {
      console.log(error);
    }
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
      onSuccess: (data: Asset) => onDone(data),
    }),
    [],
  );

  if (handleSelectPhotosIsOpen) {
    return (
      <ContainerImageSelection>
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
      </ContainerImageSelection>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Inserir Anúncio</HeaderTitle>
        </HeaderContent>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ContainerContent>
          <Image
            activeOpacity={0.7}
            onPress={() => setHandleSelectPhotosIsOpen(true)}
          >
            <MaterialIcons
              name="add-a-photo"
              size={32}
              color={theme.colors.green_dark_3}
            />
            <TextImage>Adicionar Fotos</TextImage>
            <CountImage>0 / 6 Fotos</CountImage>
          </Image>

          <View
            style={{
              width: 180,
              height: 180,

              marginTop: 48,
              backgroundColor: theme.colors.gray_background,
            }}
          >
            {/* {!!images && (
              <Images
                source={{ uri: images }}
                style={{
                  width: 180,
                  height: 180,
                }}
              />
            )} */}
          </View>

          <Title>Título do Anúncio *</Title>
          <InputTitle
            placeholder="Ex: Trator Novo"
            placeholderTextColor={theme.colors.input_text}
          />

          <Title>Descrição *</Title>
          <InputDescription
            multiline
            style={{ textAlignVertical: 'top' }}
            numberOfLines={8}
            underlineColorAndroid="transparent"
            placeholder="Ex: Trator novo com vistoria em dia, motor bom, pneus bons, ótimo para plantio de soja."
            placeholderTextColor={theme.colors.input_text}
          />

          <Title>Categoria *</Title>
          <InputPicker
            selectedValue={selectedCategory}
            onValueChange={(itemValue: string, itemIndex) =>
              setSelectedCategory(itemValue)
            }
            labelDisable="Selecione uma categoria"
            items={[
              { label: 'Trator', value: 'trator' },
              { label: 'Tobata', value: 'tobata' },
              { label: 'Colheitadeira', value: 'colheitadeira' },
            ]}
          />

          <Title>Tipo *</Title>
          <InputPicker
            selectedValue={selectedType}
            onValueChange={(itemValue: string, itemIndex) =>
              setSelectedType(itemValue)
            }
            labelDisable="Selecione um tipo"
            items={[
              { label: 'Tipo 1', value: 'tipo1' },
              { label: 'Tipo 2', value: 'tipo2' },
              { label: 'Tipo 3', value: 'tipo3' },
            ]}
          />

          <Checkbox
            text="Preciso de transporte para este anúncio"
            style={{ marginTop: 20 }}
          />

          <Checkbox
            text="Exibir meu telefone neste anúncio"
            style={{ marginBottom: 40 }}
          />

          <ButtonGradient title="Anunciar já" />
        </ContainerContent>
      </ScrollView>
    </Container>
  );
}
