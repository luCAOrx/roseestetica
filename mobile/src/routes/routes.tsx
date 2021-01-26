import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppStack } from './AppStack';
import AppTabs from './AppTabs';

const Stack = createStackNavigator();

  export default function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator>

        <Stack.Screen name="Login" component={AppStack} options={{headerShown: false}} />  
        <Stack.Screen name="Home" component={AppTabs} options={{headerShown: false}} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }