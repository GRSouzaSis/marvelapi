import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';

const AppRoutes = createStackNavigator();

const Routes = () => {
  return (
  <NavigationContainer>
    <AppRoutes.Navigator 
    headerMode="none"    
    screenOptions={{
      headerShown: false,
      cardStyle:{
        backgroundColor:"white",
      },
    }}
    >
      <AppRoutes.Screen name="Home" component={Home} initialParams={Home}/>
    </AppRoutes.Navigator>
  </NavigationContainer>)
}

export default Routes;