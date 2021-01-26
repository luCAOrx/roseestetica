import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';

import PersonalData from '../pages/Register/PersonalData';
import Address from '../pages/Register/Address';
import LoginData from '../pages/Register/LoginData';

import ForgotPassword from '../pages/ForgotPassword';
import RecoverPassword from '../pages/ForgotPassword/recoverPassword';

import Schedule from '../pages/Schedule';

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

const { Navigator, Screen } = createStackNavigator();

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
        name="Register"
        component={RegisterScreen}
      />

      <Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </Navigator>
  );
}

function RegisterScreen() {
  return (
    <Navigator
      screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#181818' }
      }}
    >

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
    </Navigator>
  );
}

function ForgotPasswordScreen() {
  return (
    <Navigator
      screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#181818' }
      }}
    >
      <Screen 
        name="ForgotPassword" 
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
    </Navigator>
  );
}

function ScheduleScreen() {
  return (
    <Navigator>
      <Screen 
        name="Schedule" 
        component={Schedule}
        options={{headerShown: false}}
      />
    </Navigator>
  );
}

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
        options={{ headerShown: false }}
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

export {
  AppStack, 
  RegisterScreen, 
  ForgotPasswordScreen, 
  ScheduleScreen, 
  AppointmentsScreen, 
  ProfileScreen
};