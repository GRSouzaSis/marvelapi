// import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Text>Teste </Text>
    </NavigationContainer>
  );
};
export default App;
