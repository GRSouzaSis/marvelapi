import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import api from '../../services/api';

import { Container,HeaderText } from './styles';

const Home: React.FC = () => {

  const [heros, setHeros] = useState([]);

  useEffect(() => {
    async function loadHeros() {
      const response = await fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=1bfb49ed278e2c63a57469b936f3ef01&hash=e3a42df4cd74cbf5a3fcb85dd58e6f8b')
      console.log("Response>>",response);
      const {data} = await response.json();
      console.log("data>>",data.results);

      setHeros(data.results);
    }
    // loadHeros();
    console.log("Heros", heros);
  }, [])

  return (
    <Container>
      <HeaderText>BUSCA MARVEL</HeaderText>
    </Container>);
}

export default Home;