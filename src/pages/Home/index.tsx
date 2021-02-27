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
  Keyboard
} from 'react-native';
import api from '../../services/api';
import palette from '../../theme/palette';
import { PaginationHome, ResultsDTO } from './types';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [heros, setHeros] = useState<ResultsDTO[]>([]);
  const [searchHero, setSearchHero] = useState<ResultsDTO[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [buttons, setButtons] = useState<PaginationHome[]>([])
  //--- Paginação
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(0);

  const navigate = useNavigation();
  
  let sliceInit = 2;
  let sliceFim = 5;

  async function loadHeros(pageNumber: number) {
    try {
      setLoading(true);
      const response = await api.get(`/characters?limit=${limit}&offset=${pageNumber}`);
      const data = await response.data.data.results;

      setHeros(data);
      setSearchHero(data);
      if(total === 0){
        setTotal(Math.floor(response.data.data.total / limit));
      }
      
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

  useEffect(()=>{
    loadHeros(page);
  },[page])

  useEffect(() => {
    loadHeros(page);
    initTotalPages(); 
  }, [])

  async function searchHeros() {
    try {
      Keyboard.dismiss();
      setLoading(true);
      if (search) {
        const response = await api.get(`/characters?name=${search}`);
        const data = await response.data.data.results;
        if (!!data) {
          setSearchHero(data);
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

  function initTotalPages() {
    let aux:PaginationHome[] = [];
      for (let index = 0; index < total; index++) {        
        aux.push({check: false, offset: index+1})        
      }
    setButtons(aux);      
  }

  function nextPage() {
    if(page < total){
      setPage(page + 1)
      if(sliceFim !== page){
        sliceFim++;
        sliceInit++;
      }
    }
   
  }

  function backPage() {
    if(page > 0){
      setPage(page - 1)
     
    }
  }

  function selectedPage(item:PaginationHome) {
    setPage(item.offset);
    // setButtons(!item[].check)
  }


  return (
    <>
      <View style={{ backgroundColor: palette.white, paddingBottom: 12, paddingTop: 12, paddingLeft: 32 }}>
        <View style={{}} >
          {/* <View style={{ backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }}> */}
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
      </View>

      <View style={{ backgroundColor: palette.primary }}>
        <Text style={{ color: palette.white, fontSize: 16, margin: 8, textAlign: 'center' }}>Nome</Text>
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
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => { navigate.navigate('SuperTrunfo', { id: item.id })}}
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
            )}
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
        position: 'relative',
        zIndex: 2,
        padding: 30,
        borderTopWidth: 1,
        borderColor: palette.primary,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <TouchableOpacity
          onPress={() => backPage()}
          style={{
            backgroundColor: palette.primary,
            width: 20,
            height: 20,
            marginRight: 60,
          }}>
        </TouchableOpacity>

        {buttons.slice(sliceInit,sliceFim).map((item, i) => (
          <TouchableOpacity
            onPress={()=>selectedPage(item)}
            key={i}
            style={{
              backgroundColor: item.check ? palette.primary : palette.white,
              width: 40,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: palette.primary,
              marginRight: 8,
            }}
          >
            <Text style={{
              color: item.check ? palette.white : palette.primary,
              fontSize: 16,
            }}>{item.offset}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => nextPage()}
          style={{
            backgroundColor: palette.primary,
            width: 20,
            height: 20,
            marginLeft: 60,
            marginRight: 30,
          }}>
        </TouchableOpacity>
        <View style={{ height: 16, backgroundColor: palette.primary }} />
      </View>
    </>
  );
}

export default Home;
