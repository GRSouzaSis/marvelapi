import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ResultsDTO } from '../Home/types';
import api from '../../services/api';
import { RoutesProps } from './types';

const SuperTrunfo: React.FC = () => {
  const [id, setId] = useState<RoutesProps>();
  const [loading, setLoading] = useState(false);
  const [heros, setHeros] = useState<ResultsDTO[]>([]);

  const route = useRoute();

  async function loadHeros() {
    try {
      setLoading(true);
      const response = await api.get(`/characters/${id}`);
      const data = await response.data.data.results;
      setHeros(data);
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  useEffect(() => {
    // loadHeros();
  }, [])

  return (
    <View >

    </View>
  );
}

export default SuperTrunfo;