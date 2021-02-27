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
import { ResultsDTO } from './types';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [heros, setHeros] = useState<ResultsDTO[]>([]);
  const [searchHero, setSearchHero] = useState<ResultsDTO[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([
    {
      num: 1,
      check: true,
    },
    {
      num: 2,
      check: false,
    },
    {
      num: 3,
      check: false,
    },
  ])
  // const newPage = reset ? 1 : page + 1;
  const params = {
    limit: 4,
    offset: 10,
    name: '',
  }

  useEffect(() => {
    async function loadHeros() {
      try {        
        setLoading(true);
        const response = await api.get('/characters');
        const data = await response.data.data.results;
        setHeros(data);
        setSearchHero(data);
        
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }
    loadHeros();
   
  }, [])

  async function searchHeros() {
    try {   
      Keyboard.dismiss();  
      setLoading(true);      
      if(search){             
        const response = await api.get(`/characters?name=${search}`);
        const data = await response.data.data.results;
        if(!!data){
          setSearchHero(data);
        }
      }
      else{
        setSearchHero(heros)
      }
    } catch (error) {
      console.log(error)
    }
   setLoading(false);
  }
  

  return (<>
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

    <FlatList
      data={searchHero}
      keyExtractor={card => String(card.id)}
      renderItem={({ item }) => (
        <TouchableOpacity key={item.id} style={{
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
      // ListFooterComponent={() => {
      //   if (!loadingMore) return null;
      //   return (
      //     <ActivityIndicator
      //       style={{ marginTop: 10, marginBottom: 30 }}
      //       size={24}
      //       color="red"
      //     />
      //   );
      // }}
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

    <View style={{
      bottom: 0,
      position: 'relative',
      zIndex: 2,
      padding: 30,
      borderTopWidth: 1,
      borderColor: palette.primary,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <TouchableOpacity style={{
        backgroundColor: palette.primary,
        width: 20,
        height: 20,
        marginRight: 60,
      }}>
      </TouchableOpacity>

      {pages.map((item, i) => (
        <TouchableOpacity key={i} style={{
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
          }}>{item.num}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={{
        backgroundColor: palette.primary,
        width: 20,
        height: 20,
        marginLeft: 60,
        marginRight: 30,
      }}>
      </TouchableOpacity>
    </View>
    <View style={{ height: 16, backgroundColor: palette.primary }} />
  </>
  );
}

export default Home;
