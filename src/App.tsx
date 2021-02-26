import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import api from './services/api';

const App: React.FC = () => {  

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Text>Teste </Text>
    </NavigationContainer>
  );
};
export default App;
