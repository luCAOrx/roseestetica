import 'react-native-gesture-handler'

import React, { useState, useCallback } from 'react'

import { Calligraffitti_400Regular } from '@expo-google-fonts/calligraffitti'
import {
  Roboto_400Regular,
  Roboto_900Black,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'

import { AuthProvider } from './src/contexts/auth'
import { SuccessScreenProvider } from './src/contexts/successScreen'
import ToggleThemeContext from './src/contexts/toogleTheme'
import usePersistedState from './src/hooks/usePersistedState'
import Routes from './src/routes'
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
