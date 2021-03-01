import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  ScrollView,
} from 'react-native';
import api from '../../services/api';
import palette from '../../theme/palette';
import { PaginationHome, ResultsDTO } from './types';


const Home: React.FC = () => {
  const navigate = useNavigation();
  const [loading, setLoading] = useState(false);
  const [heros, setHeros] = useState<ResultsDTO[]>([]);
  const [searchHero, setSearchHero] = useState<ResultsDTO[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  //---Filtro
  const [search, setSearch] = useState('');
  //--- Paginação
  const LIMIT = 4;
  const [buttons, setButtons] = useState<PaginationHome[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);


  async function loadHeros(pageNumber: number) {
    try {
      setLoading(true);
      let offeset = ((pageNumber) * LIMIT);
      const response = await api.get(`/characters?limit=${LIMIT}&offset=${offeset}`);

      const data = await response.data.data.results;

      setHeros(data);
      setSearchHero(data);

    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);
    await loadHeros(0);
    setRefreshing(false);
  }

  useEffect(() => {
    loadHeros(page);
  }, [page])

  useEffect(() => {
    async function firstLoad(pageNumber: number) {
      let offeset = ((pageNumber) * LIMIT);
      try {
        setLoading(true);
        const response = await api.get(`/characters?limit=${LIMIT}&offset=${offeset}`);
        const data = await response.data.data.results;

        setHeros(data);
        setSearchHero(data);

        const itens = Math.floor(response.data.data.total / LIMIT);
        initTotalPages(itens);
        setTotal(itens);

      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }

    firstLoad(page);
  }, [])

  async function searchHeros() {
    try {
      Keyboard.dismiss();
      setLoading(true);
      if (search) {
        const response = await api.get(`/characters?&nameStartsWith=${search}`);
        const data = await response.data.data.results;
        if (!!data) {
          setSearchHero(data);
          setSearch('');
        }
      }
      else {
        setSearchHero(heros)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  function initTotalPages(itens: number) {
    let aux: PaginationHome[] = [];
    aux.push({ check: true, offset: 0 + 1 })
    for (let index = 1; index < itens; index++) {
      aux.push({ check: false, offset: index + 1 })
    }
    setButtons(aux);
  }

  function nextPage() {
    if (page < total) {
      buttons[page].check = false;
      buttons[page + 1].check = true;
      setButtons([...buttons]);
      setPage(page + 1)
    }
  }

  function backPage() {
    if (page > 0) {
      buttons[page].check = false;
      buttons[page - 1].check = true;
      setButtons([...buttons]);
      setPage(page - 1)
    }
  }

  function selectedPage(i: number) {
    if (buttons[page].offset !== buttons[i].offset) {
      buttons[page].check = false;
      buttons[i].check = true;
      setButtons([...buttons]);
      setPage(i);
    }
  }

  const renderHero = ({ item }: { item: ResultsDTO }) => {
    return (
      <TouchableOpacity
        onPress={() => { navigate.navigate('DetailHero', { idChar: item.id }) }}
        key={item.id}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1.2,
          borderColor: palette.primary,
          alignItems: 'center',
          padding: 18
        }}>
        <Image style={{ width: 52, height: 52, borderRadius: 28, resizeMode: "cover" }} source={{ uri: item.thumbnail.path.concat('.', item.thumbnail.extension) }} />
        <Text style={{ fontSize: 16, marginLeft: 16, flex: 1 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View style={{ backgroundColor: palette.white, paddingBottom: 12, paddingTop: 12, paddingLeft: 32 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{
            borderBottomColor: palette.primary,
            borderBottomWidth: 1.2,
            borderColor: palette.primary
          }}
          >
            <Text style={{
              fontFamily: 'Roboto-Black',
              fontSize: 16,
              fontWeight: 'bold',
              color: palette.primary,
            }}>BUSCA</Text>
          </View>
          <Text style={{
            fontFamily: 'Roboto-Black',
            fontSize: 16,
            fontWeight: 'bold',
            color: palette.primary,
            marginLeft: 5,
          }}>
            MARVEL
           </Text>
          <Text style={{
            fontFamily: 'Roboto-Black',
            fontSize: 16,
            color: palette.primary,
            marginLeft: 5,
          }}>
            TESTE FRONT-END
           </Text>
        </View>

        <View style={{ width: '90%', marginBottom: 12, marginTop: 12 }}>
          <Text style={{
            fontFamily: 'Roboto-Black',
            fontSize: 16,
            color: palette.primary,
          }}>
            Nome do Personagem
          </Text>
          <TextInput
            onChangeText={setSearch}
            value={search}
            placeholder="Nome do personagem"
            maxLength={100}
            returnKeyType="search"
            onEndEditing={searchHeros}
            style={{
              borderWidth: 1,
              borderRadius: 8,
            }}
          />
        </View>
      </View>

      <View style={{ backgroundColor: palette.primary, paddingLeft: 76 }}>
        <Text style={{ color: palette.white, fontSize: 16, margin: 8 }}>Nome</Text>
      </View>
      {
        loading ?
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={32} color={palette.primary} style={{ marginTop: 16 }} />
          </View>
          :
          <FlatList
            data={searchHero}
            keyExtractor={card => String(card.id)}
            refreshing={refreshing}
            onRefresh={refreshList}
            renderItem={(item) => (renderHero(item))}
            ListEmptyComponent={() => {
              if (loading) return null;
              return (
                <Text
                  style={{
                    marginTop: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333',
                  }}
                >
                  Nenhum resultado encontrado
                </Text>
              );
            }}
          />
      }

      <View style={{
        bottom: 0,
        paddingLeft: 30,
        paddingRight: 30,
        borderTopWidth: 1,
        borderColor: palette.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
      >
        <TouchableOpacity
          onPress={() => backPage()}
          style={{
            backgroundColor: palette.primary,
            width: 28,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
          }}>
          <Text style={{
            color: palette.white,
            fontSize: 26,
          }}>{`<`}</Text>
        </TouchableOpacity>

        <ScrollView
          horizontal={true}
          style={{
            flexDirection: 'row',
            marginBottom: 24,
            marginTop: 18,
            marginLeft: 40,
            marginRight: 40,
          }}>

          {buttons.map((item, i) => (
            <TouchableOpacity
              onPress={() => selectedPage(i)}
              key={i}
              style={{
                backgroundColor: item.check ? palette.primary : palette.white,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: palette.primary,
                margin: 8,
              }}
            >
              <Text style={{
                color: item.check ? palette.white : palette.primary,
                fontSize: 20,
              }}>{item.offset}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => nextPage()}
          style={{
            backgroundColor: palette.primary,
            width: 28,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
          }}>
          <Text style={{
            color: palette.white,
            fontSize: 26,
          }}>
            {`>`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 16, backgroundColor: palette.primary }} />
    </>
  );
}

export default Home;

