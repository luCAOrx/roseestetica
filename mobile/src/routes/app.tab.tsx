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
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 70,
        },

        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },

        tabBarIconStyle: {
          flex: 0,
          width: 25,
          height: 25,
        },

        tabBarLabelStyle: {
          fontFamily: "Roboto_400Regular",
          fontSize: 15,
        },

        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.border,

        headerShown: false
      }}

      initialRouteName='Schedule'
    >

      <AppTab.Screen 
        name="ScheduleTab" 
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
        name="AppointmentsTab" 
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
        name="ProfileTab" 
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