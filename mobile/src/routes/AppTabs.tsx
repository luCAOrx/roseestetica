import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from '@expo/vector-icons';

import Schedule from '../pages/Schedule';

import { AppointmentsScreen, ProfileScreen } from './AppStack';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Navigator 
      tabBarOptions={{
        style: {
          borderTopColor: "#5C5C5C",
          height: 70,
        },

        tabStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },

        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },

        labelStyle: {
          fontFamily: "Roboto_400Regular",
          fontSize: 15,
        },

        inactiveBackgroundColor: "#181818",
        activeBackgroundColor: "#181818",
        inactiveTintColor: "#5C5C5C",
        activeTintColor: "#D2D2E3"
      }}
    >

      <Screen 
        name="Agendar" 
        component={Schedule}
        options={{
          tabBarLabel: "Agendar",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons name="control-point" size={size} color={focused ? "#D2D2E3" : color}/>
            );
          }
        }}
      />     

      <Screen 
        name="Agendamentos" 
        component={AppointmentsScreen}
        options={{
          tabBarLabel: "Agendamentos",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons name="event-available" size={size} color={focused ? "#D2D2E3" : color}/>
            );
          }
        }}
      />

      <Screen 
        name="Perfil" 
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons name="person" size={size} color={focused ? "#D2D2E3" : color}/>
            );
          }
        }}
      />     
    </Navigator>
  );
}