import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '@react-navigation/native';

import { MaterialIcons as Icon } from '@expo/vector-icons';

import { ScheduleStack, AppointmentsStack, ProfileStack } from './app.stack';

const AppTab = createBottomTabNavigator();

export default function Dashboard() {
  const {colors} = useTheme();

  return (
    <AppTab.Navigator 
      tabBarOptions={{
        style: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
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

        activeTintColor: colors.text,
        inactiveTintColor: colors.border
      }}

      initialRouteName='Schedule'
    >

      <AppTab.Screen 
        name="Schedule" 
        component={ScheduleStack}
        options={{
          tabBarLabel: "Agendar",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon 
                name="control-point" 
                size={size} 
                color={focused ? colors.text : color}
              />
            );
          },
          unmountOnBlur: true
        }}
      />     

      <AppTab.Screen 
        name="Appointments" 
        component={AppointmentsStack}
        options={{
          tabBarLabel: "Agendamentos",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon 
                name="event-available" 
                size={size} 
                color={focused ? colors.text : color}
              />
            );
          }
        }}
      />

      <AppTab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon 
                name="person" 
                size={size} 
                color={focused ? colors.text : color}
              />
            );
          }
        }}
      />     
    </AppTab.Navigator>
  );
};