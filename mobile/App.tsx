import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading } from 'expo';

import { 
  Roboto_400Regular, 
  Roboto_900Black, 
  Roboto_700Bold, 
  useFonts 
} from '@expo-google-fonts/roboto';

import Routes from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_900Black,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Routes />
        <StatusBar style="dark" backgroundColor="#f0f0f5" />
      </>
    );
  }
}
