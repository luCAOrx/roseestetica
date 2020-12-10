import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from './pages/Login';
import PersonalData from './pages/Register/PersonalData';
import Address from './pages/Register/Address';
import Header from './components/Header';
import LoginData from './pages/Register/LoginData';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ 
          headerShown: false, 
          cardStyle: { backgroundColor: '#181818' }
        }}>
        <Screen 
          name="Login" 
          component={Login} 
        />
        <Screen 
          name="PersonalData" 
          component={PersonalData}
          options={{
            headerShown: true,
            header: () => <Header title="Dados pessoais"/>
          }}
        />
        <Screen 
          name="Address" 
          component={Address}
          options={{
            headerShown: true,
            header: () => <Header title="Endereço"/>
          }}
        />
        <Screen 
          name="LoginData" 
          component={LoginData}
          options={{
            headerShown: true,
            header: () => <Header title="Dados de Login"/>
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}