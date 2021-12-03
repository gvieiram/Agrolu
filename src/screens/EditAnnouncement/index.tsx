import React, { useState, useMemo, useEffect } from 'react';
import { Image as Images, ScrollView, View } from 'react-native';

import { AssetsSelector } from 'expo-images-picker';
import { Asset, MediaType } from 'expo-media-library';

import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';
import { useTheme } from 'styled-components';

import AlertError from '../../components/AlertError';
import ButtonGradient from '../../components/ButtonGradient';
import { Checkbox } from '../../components/Checkbox';
import { InputPicker } from '../../components/Inputs/InputPicker';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import {
  CategoryResponse,
  Type,
} from '../../dtos/response/CategoryResponseDTO';
import AnnouncementApi from '../../services/api/AnnouncementApi';
import CategoryApi from '../../services/api/CategoryApi';
import { InputPrice } from '../AddAnnouncement/styles';
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

interface Params {
  ad: AnnouncementResponse;
}

export function EditAnnouncement() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { ad } = route.params as Params;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [handleSelectPhotosIsOpen, setHandleSelectPhotosIsOpen] =
    useState(false);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [type_id, setType] = useState(null);
  const [need_transport, setNeedTransport] = useState(false);
  const [display_phone, setDisplayPhone] = useState(false);
  const [has_operator, setHasOperator] = useState(false);
  const [announcement, setAnnouncement] = useState<AnnouncementResponse>(null);
  const [available, setAvailable] = useState(false);
  const [price, setPrice] = useState('0');

  function handleBack() {
    navigation.goBack();
  }

  async function handleSelectPhotos() {
    navigation.dispatch(CommonActions.navigate('AddImages'));
  }

  function onDone(data) {
    setImages(data);
    setHandleSelectPhotosIsOpen(false);
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
      saveTo: 'png',
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
      onBack: () => setHandleSelectPhotosIsOpen(false),
      onSuccess: (e: any) => onDone(e),
    }),
    [],
  );

  const handleSubmit = async () => {
    AnnouncementApi.update(announcement.id, {
      title,
      description,
      type_id,
      need_transport: need_transport ? '1' : '0',
      display_phone: display_phone ? '1' : '0',
      has_operator: has_operator ? '1' : '0',
      available: available ? '1' : '0',
      price: '400.0',
    })
      .then(response =>
        navigation.dispatch(
          CommonActions.navigate({
            name: 'AnnouncementDetails',
            params: {
              ad: response.data,
            },
          }),
        ),
      )
      .catch(error => AlertError(error));
  };

  useEffect(() => {
    function getAnnouncementById() {
      AnnouncementApi.find(ad.id)
        .then(response => {
          const { data } = response;
          setAnnouncement(data);

          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price);
          setSelectedCategory(data.type.category_id);

          CategoryApi.all()
            .then(categoryResponse => {
              setCategories(categoryResponse.data);

              const category = categoryResponse.data.find(
                item => item.id == data.type.category_id,
              );
              setTypes(category.types);
              setType(data.type_id);
            })
            .catch(error => {
              if (error.response) {
                alert(error.response.data.message);
              }
            });

          setSelectedType(data.type_id);
          setNeedTransport(data.need_transport);
          setDisplayPhone(data.display_phone);
          setAvailable(data.available);
          setHasOperator(data.has_operator);
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    }

    getAnnouncementById();
  }, [ad]);

  if (announcement) {
    if (handleSelectPhotosIsOpen) {
      return (
        <ContainerImageSelection>
          <AssetsSelector
            Settings={{
              assetsType: [MediaType.photo],
              getImageMetaData: false,
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

            <HeaderTitle>Editar Anúncio</HeaderTitle>
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
              <CountImage>{images.length} / 6 Fotos</CountImage>
            </Image>

            <Title>Título do Anúncio *</Title>
            <InputTitle
              placeholder="Ex: Trator Novo"
              placeholderTextColor={theme.colors.input_text}
              value={title}
              onChangeText={text => setTitle(text)}
            />

            <Title>Descrição *</Title>
            <InputDescription
              multiline
              style={{ textAlignVertical: 'top' }}
              numberOfLines={8}
              underlineColorAndroid="transparent"
              placeholder="Ex: Trator novo com vistoria em dia, motor bom, pneus bons, ótimo para plantio de soja."
              placeholderTextColor={theme.colors.input_text}
              value={description}
              onChangeText={text => setDescription(text)}
            />

            <Title>Valor *</Title>
            <InputPrice
              type="money"
              value={price}
              maxLength={13}
              options={{
                unit: 'R$ ',
              }}
              includeRawValueInChangeText
              onChangeText={(maskedText, rawText) => {
                setPrice(rawText);
              }}
            />

            <Title>Categoria *</Title>
            <InputPicker
              selectedValue={selectedCategory}
              onValueChange={value => {
                setSelectedCategory(value);
                const category = categories.find(item => item.id == value);
                setTypes(category.types);
              }}
              labelDisable="Selecione uma categoria"
              items={
                categories
                  ? categories.map(item => {
                      return { label: item.name, value: item.id };
                    })
                  : []
              }
            />

            <Title>Tipo *</Title>
            <InputPicker
              selectedValue={selectedType}
              onValueChange={value => {
                setSelectedType(value);
                setType(value);
              }}
              labelDisable="Selecione um tipo"
              items={
                types
                  ? types.map(item => {
                      return { label: item.name, value: item.id };
                    })
                  : []
              }
            />

            <Checkbox
              text="Preciso de transporte para este anúncio"
              style={{ marginTop: 20 }}
              status={need_transport ? 'checked' : 'unchecked'}
              onPress={() => setNeedTransport(!need_transport)}
            />

            <Checkbox
              text="Exibir meu telefone neste anúncio"
              status={display_phone ? 'checked' : 'unchecked'}
              onPress={() => setDisplayPhone(!display_phone)}
            />

            <Checkbox
              text="Indicar disponibilidade"
              status={available ? 'checked' : 'unchecked'}
              onPress={() => setAvailable(!available)}
            />

            <Checkbox
              text="Operador disponível"
              style={{ marginBottom: 40 }}
              status={has_operator ? 'checked' : 'unchecked'}
              onPress={() => setHasOperator(!has_operator)}
            />

            <ButtonGradient
              title="Salvar alterações"
              onPress={() => handleSubmit()}
            />
          </ContainerContent>
        </ScrollView>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />
        </HeaderContent>
      </Header>
    </Container>
  );
}
