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

import AppTabs from './AppTabs';

import Appointments from '../pages/Appointments';
import Detail from '../pages/Appointments/Detail';
import Reschedule from '../pages/Appointments/Reschedule';
import ChangeProcedure from '../pages/Appointments/ChangeProcedure';

import Profile from '../pages/Profile';
import ChangeData from '../pages/Profile/ChangeData';
import ChangePersonalData from '../pages/Profile/ChangePersonalData';
import ChangeAddress from '../pages/Profile/ChangeAddress';
import ChangeLoginData from '../pages/Profile/ChangeLoginData';

import Header from '../components/Header';

function AppointmentsScreen() {
  return (
    <Navigator
      screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#181818' }
      }}
    >
      <Screen 
        name="Appointments"
        component={Appointments}
        options={{
          headerShown: false,
        }}
      />

      <Screen 
        name="Detail" 
        component={Detail}
        options={{
          headerShown: true,
          header: () => 
            <Header title="Detalhes do agendamento" showIcon={true} fontSize={23} />
        }}
      />

      <Screen 
        name="Reschedule" 
        component={Reschedule}
      />

      <Screen 
        name="ChangeProcedure" 
        component={ChangeProcedure}
      />
    </Navigator>
  );
}

function ProfileScreen() {
  return (
    <Navigator
      screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#181818' }
      }}
    >
      <Screen 
        name="Perfil" 
        component={Profile}
      />
      <Screen 
        name="ChangeData"
        component={ChangeData}
        options={{
          headerShown: true,
          header: () => 
            <Header title="Alterar dados" showIcon={true} fontSize={23} />
        }}
      />
  
      <Screen 
        name="ChangePersonalData"
        component={ChangePersonalData}
      />
  
      <Screen 
        name="ChangeAddress"
        component={ChangeAddress}
      />
  
      <Screen 
        name="ChangeLoginData"
        component={ChangeLoginData}
      />
    </Navigator>
  );
}

function AppStack() {
  return (
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
            header: () => 
              <Header title="Esqueci Minha Senha" showIcon={false} fontSize={26}/>
          }}
        />
        
        <Screen 
          name="RecoverPassword" 
          component={RecoverPassword}
          options={{
            headerShown: true,
            header: () => 
              <Header title="Recuperar Senha" showIcon={false} fontSize={26} />
          }}
        />

        <Screen 
          name="Schedule" 
          component={AppTabs}
        />
      </Navigator>
  );
}

export {AppStack, AppointmentsScreen, ProfileScreen};