/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity } from 'react-native';

import Slider from '@react-native-community/slider';
import {
  useFocusEffect,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import axios from 'axios';
import { useTheme } from 'styled-components';

import Announcement from '../../components/Announcement';
import { CustomSlider } from '../../components/CustomSlider';
import { InputPicker } from '../../components/Inputs/InputPicker';
import { Load } from '../../components/Load';
import { SearchBar } from '../../components/Search';
import { Params } from '../../dtos/request/AnnouncementRequestDTO';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import {
  CategoryResponse,
  Type,
} from '../../dtos/response/CategoryResponseDTO';
import AnnouncementApi from '../../services/api/AnnouncementApi';
import CategoryApi from '../../services/api/CategoryApi';
import { convertToSlug } from '../../utils/Regex';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {
  Container,
  Header,
  HeaderContent,
  IconsContainer,
  Like,
  Filter,
  AnnouncementList,
  TextEndItems,
  FiltersButtons,
  FiltersContent,
  FiltersTitle,
  FilterText,
} from './styles';

const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function Home() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [announcements, setAnnouncements] = useState<AnnouncementResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState<Params>({ page: 1 } as Params);
  const [endItems, setEndItems] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filtersScreen, setFiltersScreen] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [type_id, setType] = useState(null);
  const [price, setPrice] = useState(0);

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  const handleChangeParams = (name, value) => {
    setParams(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // async function getAnnouncements(isPaginate = false) {
  //   AnnouncementApi.all(params)
  //     .then(response => {
  //       if (isPaginate) {
  //         setAnnouncements([...announcements, ...response.data.data]);
  //       } else {
  //         setAnnouncements(response.data.data);
  //       }

  //       if (response.data.next_page_url === null) {
  //         handleChangeParams('page', params.page);
  //         setEndItems(true);
  //       } else {
  //         handleChangeParams('page', params.page + 1);
  //         setEndItems(false);
  //       }
  //     })
  //     .catch(error => console.log(error.response))
  //     .finally(() => setLoading(false));
  // }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    setAnnouncements([]);
    setParams({ page: 1 });

    wait(2000).then(() => setRefreshing(false));
  }, []);

  function loadMore() {
    if (endItems) {
      return <TextEndItems>Não há mais anúncios</TextEndItems>;
    }
    return <Load />;
  }

  function handleAnnouncementDetails(ad: AnnouncementResponse) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AnnouncementDetails',
        params: {
          ad,
        },
      }),
    );
  }

  const handleSearch = (s: string) => {
    setAnnouncements([]);
    handleChangeParams('page', 1);
    handleChangeParams('name', s);
  };

  const handleEndReached = () => {
    if (!endItems) {
      handleChangeParams('page', params.page + 1);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      async function getAnnouncements() {
        setLoading(true);

        AnnouncementApi.all(params)
          .then(response => {
            setAnnouncements([...announcements, ...response.data.data]);

            if (response.data.next_page_url === null) {
              setEndItems(true);
            } else {
              setEndItems(false);
            }

            CategoryApi.all()
              .then(categoryResponse => {
                setCategories(categoryResponse.data);

                const category = categoryResponse.data.find(item => item.types);
                setTypes(category.types);
              })
              .catch(error => {
                if (error.response) {
                  alert(error.response.data.message);
                }
              });
          })
          .catch(error => console.log(error.response))
          .finally(() => setLoading(false));
      }

      getAnnouncements();

      return () => {
        setAnnouncements([]);
        axios.CancelToken.source().cancel();
      };
    }, [params.name, params.page]),
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <SearchBar
            platform="ios"
            placeholder="Procurar"
            onCancel={() => setParams({ page: 1 })}
            onChangeText={text => handleSearch(text)}
            value={params.name}
          />

          <IconsContainer>
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'AnnouncementSaved',
                  }),
                )
              }
            >
              <Like name="favorite-border" size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setFiltersScreen(!filtersScreen)}
            >
              <Filter name="filter-outline" size={24} />
            </TouchableOpacity>
          </IconsContainer>
        </HeaderContent>
      </Header>

      {!filtersScreen ? (
        loading ? (
          <Load />
        ) : (
          <AnnouncementList
            data={announcements}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Announcement
                data={item}
                onPress={() => handleAnnouncementDetails(item)}
                visitorsActive
                iconActive
              />
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0}
            ListFooterComponent={!loading ? loadMore : null}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.green_linear_dark_opaque}
                colors={[theme.colors.green_linear_dark_opaque]}
              />
            }
          />
        )
      ) : (
        <FiltersContent>
          <FiltersTitle>Categoria</FiltersTitle>
          <FiltersButtons>
            <InputPicker
              selectedValue={selectedCategory}
              onValueChange={value => {
                setSelectedCategory(value);
                const category = categories.find(item => item.id === value);
                setTypes(category.types);
              }}
              labelDisable="Todos"
              items={
                categories
                  ? categories.map(item => {
                      return { label: item.name, value: item.id };
                    })
                  : []
              }
            />
          </FiltersButtons>

          <FiltersTitle>Tipo</FiltersTitle>
          <FiltersButtons>
            <InputPicker
              selectedValue={selectedType}
              onValueChange={value => {
                setSelectedType(value);

                setType(value);
              }}
              labelDisable="Todos"
              items={
                types
                  ? types.map(item => {
                      return { label: item.name, value: item.id };
                    })
                  : []
              }
            />
          </FiltersButtons>

          <FiltersTitle>Valor</FiltersTitle>
          <Text>{`Até ${priceFormatted}`}</Text>
          <CustomSlider onValueChange={value => setPrice(value)} />
        </FiltersContent>
      )}
    </Container>
  );
}
