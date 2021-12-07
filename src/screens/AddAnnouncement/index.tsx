/* eslint-disable array-callback-return */
import React, { useState, useMemo, useEffect } from 'react';
import {
  Alert,
  Image as Images,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import AppLoading from 'expo-app-loading';
import * as DocumentPicker from 'expo-document-picker';
import { AssetsSelector } from 'expo-images-picker';
import { Asset, MediaType } from 'expo-media-library';

import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import {
  useFocusEffect,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import { useTheme } from 'styled-components';

import AlertError from '../../components/AlertError';
import ButtonGradient from '../../components/ButtonGradient';
import { Checkbox } from '../../components/Checkbox';
import { InputPicker } from '../../components/Inputs/InputPicker';
import {
  CategoryResponse,
  Type,
} from '../../dtos/response/CategoryResponseDTO';
import AnnouncementApi from '../../services/api/AnnouncementApi';
import CategoryApi from '../../services/api/CategoryApi';
import UserApi from '../../services/api/UserApi';
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
  InputPrice,
  DocumentContainer,
  DocText,
} from './styles';

interface InspectionsProps {
  uri: string;
  name: string;
  type: 'cancel' | 'success';
}

export function AddAnnouncement() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [handleSelectPhotosIsOpen, setHandleSelectPhotosIsOpen] =
    useState(false);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type_id, setType] = useState(null);
  const [need_transport, setNeedTransport] = useState(false);
  const [display_phone, setDisplayPhone] = useState(false);
  const [has_operator, setHasOperator] = useState(false);
  const [price, setPrice] = useState('0');
  const [uriInspection, setUriInspection] = useState(null);
  const [inspectionSelected, setInspectionSelected] =
    useState<InspectionsProps>(null);

  function handleBack() {
    navigation.goBack();
  }

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    });

    if (result.type === 'success') {
      setInspectionSelected(result);
    } else {
      setInspectionSelected(null);
    }
  };

  function onDone(data: React.SetStateAction<any[]>) {
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

  // const resize = useMemo(
  //   () => ({
  //     width: 720,
  //     compress: 0.7,
  //     base64: true,
  //     saveTo: 'png',
  //   }),
  //   [],
  // );

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
        selected: 'Fotos',
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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type_id', type_id);
    formData.append('need_transport', need_transport ? '1' : '0');
    // formData.append('display_phone', display_phone ? '1' : '0');
    formData.append('has_operator', has_operator ? '1' : '0');
    formData.append('price', price);
    images.map((image: Asset) => {
      const localUri = image.uri;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      formData.append('images[]', { uri: localUri, name: filename, type });
    });
    formData.append('inspections[]', {
      uri: inspectionSelected.uri,
      name: inspectionSelected.name,
      type: 'application/pdf',
    });

    AnnouncementApi.store(formData)
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

  useFocusEffect(
    React.useCallback(() => {
      function isVerified() {
        setIsLoading(true);

        UserApi.me().then(response => {
          const { data } = response;

          setIsLoading(false);

          if (!data.verified) {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'UserAccount',
              }),
            );

            Alert.alert(
              'Aviso',
              'Sua conta não é verificada!\nPor favor, verifique sua conta em "Verificar documento"',
            );
          }

          if (data.cep === null || data.city_id === null) {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'UserAccount',
              }),
            );

            Alert.alert(
              'Aviso',
              'Complete as informações de endereço do seu perfil em "Editar perfil"',
            );
          }
        });
      }

      isVerified();
    }, []),
  );

  useEffect(() => {
    function getCategories() {
      CategoryApi.all()
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    }
    getCategories();
  }, []);

  if (handleSelectPhotosIsOpen) {
    return (
      <ContainerImageSelection>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
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

  if (isLoading) {
    return <AppLoading />;
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
            <CountImage>{images.length} / 6 Fotos</CountImage>
          </Image>

          <Title>Título do Anúncio *</Title>
          <InputTitle
            placeholder="Ex: Trator Novo"
            placeholderTextColor={theme.colors.input_text}
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
              const category = categories.find(item => item.id === value);
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

          {/* <Checkbox
            text="Exibir meu telefone neste anúncio"
            status={display_phone ? 'checked' : 'unchecked'}
            onPress={() => setDisplayPhone(!display_phone)}
          /> */}

          <Checkbox
            text="Operador disponível"
            status={has_operator ? 'checked' : 'unchecked'}
            onPress={() => setHasOperator(!has_operator)}
          />

          <DocumentContainer
            activeOpacity={0.7}
            onPress={() => handlePickDocument()}
          >
            <MaterialIcons
              name="attach-file"
              size={24}
              color={theme.colors.green_main}
            />
            <DocText>Anexar vistoria de segurança</DocText>
          </DocumentContainer>

          <ButtonGradient title="Anunciar já" onPress={() => handleSubmit()} />
        </ContainerContent>
      </ScrollView>
    </Container>
  );
}
