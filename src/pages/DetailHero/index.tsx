import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { ResultsDTO } from '../Home/types';
import api from '../../services/api';
import palette from '../../theme/palette';
import { RoutesProps } from '../../types';

const DetailHero: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [hero, setHero] = useState<ResultsDTO[]>([]);
  const route = useRoute<RouteProp<RoutesProps, 'Detail'>>();

  const id = route.params.idChar;

  async function loadHeros(Id: number) {
    try {
      setLoading(true);
      const response = await api.get(`/characters/${Id}`);
      const data = await response.data.data.results;
      setHero(data);
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  useEffect(() => {
    loadHeros(id);
  }, [])

  const detailHero = ({ item }: { item: ResultsDTO }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: palette.primary, }}>
          <Image style={{ width: "100%", height: 50, resizeMode: "repeat" }} source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/marvel-282124.png' }} />
        </View>
        <Image style={{ width: "100%", height: 300, resizeMode: "cover" }} source={{ uri: item.thumbnail.path.concat('.', item.thumbnail.extension) }} />
        <View style={{ backgroundColor: palette.primary, padding: 16 }}>
          <Text style={{ fontSize: 18, color: palette.white, fontWeight: 'bold' }}>{item.name}</Text>
        </View>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{
            letterSpacing: 2.3,
            lineHeight: 21,
            fontStyle: 'italic',
            fontSize: 16,
            textAlign: 'justify'
          }}>
            {item.description.length > 0 ? item.description : 'Has No Description to Display'}
          </Text>
          <View style={{ marginTop: 16 }}>
            <View style={{ backgroundColor: palette.primary, marginBottom: 12, padding: 8 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: palette.white,
                  fontWeight: 'bold'
                }}>
                {`COMICS - ${item.comics.items.length}`}
                </Text>

            </View>
            {item.comics.items.map((itemCard, i) => 
            <Text key={i}
              style={{lineHeight: 25, fontSize: 16, fontWeight: 'bold'}}
            >
              {itemCard.name}
            </Text>
            )}

          </View>

          <View style={{ marginTop: 16 }}>
            <View style={{ backgroundColor: palette.primary, marginBottom: 12, padding: 8 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: palette.white,
                  fontWeight: 'bold'
                }}>
                {`STORIES - ${item.stories.items.length}`}
                </Text>

            </View>
            {item.stories.items.map((itemCard, i) => 
            <Text key={i}
              style={{lineHeight: 25, fontSize: 16, fontWeight: 'bold'}}
            >
              {itemCard.name}
            </Text>
            )}

          </View>

          {/* <Text>####STORIES#####3</Text>
          {item.stories.items.map((itemCard, i) => <Text key={i}>{itemCard.name}</Text>)} */}

        </View>
      </View>

    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={hero}
        keyExtractor={card => String(card.id)}
        renderItem={(item) => (detailHero(item))}
      />
    </View>
  );
}

export default DetailHero;