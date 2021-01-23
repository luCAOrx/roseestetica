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
import Detail from '../pages/Appointments/Detail';
import Reschedule from '../pages/Appointments/Reschedule';
import ChangeProcedure from '../pages/Appointments/ChangeProcedure';
import ChangeData from '../pages/Profile/ChangeData';
import ChangePersonalData from '../pages/Profile/ChangePersonalData';
import ChangeAddress from '../pages/Profile/ChangeAddress';
import ChangeLoginData from '../pages/Profile/ChangeLoginData';

import Header from '../components/Header';

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
    </NavigationContainer>
  );
}