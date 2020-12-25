import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from './pages/Login';
import PersonalData from './pages/Register/PersonalData';
import Address from './pages/Register/Address';
import LoginData from './pages/Register/LoginData';
import ForgotMyPassword from './pages/ForgotPassword';
import RecoverPassword from './pages/ForgotPassword/recoverPassword';

import Header from './components/Header';

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

        <Screen 
          name="ForgotMyPassword" 
          component={ForgotMyPassword}
          options={{
            headerShown: true,
            header: () => <Header title="Esqueci Minha Senha"/>
          }}
        />
        
        <Screen 
          name="RecoverPassword" 
          component={RecoverPassword}
          options={{
            headerShown: true,
            header: () => <Header title="Recuperar Senha"/>
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}