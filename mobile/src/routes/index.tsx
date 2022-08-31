import React from 'react'
import { View } from 'react-native'

import { useTheme } from '@react-navigation/native'

import Loading from '../components/Loading'
import { useAuth } from '../contexts/auth'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

export default function Routes() {
  const { cliente, loading } = useAuth()
  const { colors } = useTheme()

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

  return cliente ? <AppRoutes /> : <AuthRoutes />
}
