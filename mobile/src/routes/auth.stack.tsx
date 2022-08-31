import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Header from '../components/Header'
import ForgotPassword from '../pages/SignIn/ForgotPassword'
import RecoverPassword from '../pages/SignIn/ForgotPassword/recoverPassword'
import Address from '../pages/SignIn/Register/Address'
import LoginData from '../pages/SignIn/Register/LoginData'
import PersonalData from '../pages/SignIn/Register/PersonalData'

const AuthStack = createStackNavigator()

const RegisterScreen = () => (
  <AuthStack.Navigator
    screenOptions={{ headerShown: false }}
  >

    <AuthStack.Screen
      name="PersonalData"
      component={PersonalData}
      options={{ headerShown: false }}
    />

    <AuthStack.Screen
      name="Address"
      component={Address}
      options={{ headerShown: false }}
    />

    <AuthStack.Screen
      name="LoginData"
      component={LoginData}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
)

const ForgotPasswordScreen = () => (

  <AuthStack.Navigator
    screenOptions={{ headerShown: false }}
  >
    <AuthStack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPassword}
      options={{
        headerShown: true,
        header: () =>
          <Header title="Esqueci Minha Senha" showIcon fontSize={26} />
      }}
    />

    <AuthStack.Screen
      name="RecoverPassword"
      component={RecoverPassword}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
)

export { RegisterScreen, ForgotPasswordScreen }
