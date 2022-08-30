import 'react-native-gesture-handler'

import React, { useState, useCallback } from 'react'

import * as SplashScreen from 'expo-splash-screen'

import {
  Roboto_400Regular,
  Roboto_900Black,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto'

import { Calligraffitti_400Regular } from '@expo-google-fonts/calligraffitti'

import { AuthProvider } from './src/contexts/auth'

import ToggleThemeContext from './src/contexts/toogleTheme'

import { SuccessScreenProvider } from './src/contexts/successScreen'

import { NavigationContainer } from '@react-navigation/native'

import Routes from './src/routes'

import usePersistedState from './src/hooks/usePersistedState'

import { dark } from './src/themes/dark'
import { light } from './src/themes/light'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const [theme, setTheme] = usePersistedState('theme', dark)

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode)

    setTheme(isDarkMode ? dark : light)
  }, [theme])

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_900Black,
    Roboto_700Bold,
    Calligraffitti_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  SplashScreen.hideAsync()

  return (
    <AuthProvider>
      <ToggleThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
        <SuccessScreenProvider>
          <NavigationContainer theme={theme}>
            <Routes />
          </NavigationContainer>
        </SuccessScreenProvider>
      </ToggleThemeContext.Provider>
    </AuthProvider>
  )
}
