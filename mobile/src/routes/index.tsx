import React from 'react';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Loading from '../components/Loading';

export default function Routes() {
  const {cliente, loading} = useAuth();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View 
        style={{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: colors.background
        }}
      >
        <Loading />
      </View>
    )
  }

  return cliente ? <AppRoutes /> : <AuthRoutes />;
}