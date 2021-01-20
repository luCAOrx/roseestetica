import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from '../pages/Login';
import PersonalData from '../pages/Register/PersonalData';
import Address from '../pages/Register/Address';
import LoginData from '../pages/Register/LoginData';
import ForgotPassword from '../pages/ForgotPassword';
import RecoverPassword from '../pages/ForgotPassword/recoverPassword';

import Header from '../components/Header';
import Schedule from '../pages/Schedule';
import HomeTabs from './HomeTabs';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ 
          headerShown: false, 
          cardStyle: { backgroundColor: '#181818' }
        }}
      >

        <Screen 
          name="Login" 
          component={Login} 
        />

        <Screen 
          name="PersonalData" 
          component={PersonalData}
          options={{ headerShown: false }}
        />

        <Screen 
          name="Address" 
          component={Address}
          options={{ headerShown: false }}
        />

        <Screen 
          name="LoginData" 
          component={LoginData}
          options={{ headerShown: false }}
        />

        <Screen 
          name="ForgotMyPassword" 
          component={ForgotPassword}
          options={{
            headerShown: true,
            header: () => <Header title="Esqueci Minha Senha" showIcon={false}/>
          }}
        />
        
        <Screen 
          name="RecoverPassword" 
          component={RecoverPassword}
          options={{
            headerShown: true,
            header: () => <Header title="Recuperar Senha" showIcon={false}/>
          }}
        />

        <Screen 
          name="Schedule"
          component={Schedule}
          options={{ headerShown: false}}
        />

        <Screen name="Home" component={HomeTabs}/>
      </Navigator>
    </NavigationContainer>
  );
}