import React from 'react';

import { AppLoading } from 'expo';

import { 
  Roboto_400Regular, 
  Roboto_900Black, 
  Roboto_700Bold, 
  useFonts 
} from '@expo-google-fonts/roboto';

import { Calligraffitti_400Regular } from '@expo-google-fonts/calligraffitti';

import Routes from './src/routes/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_900Black,
    Roboto_700Bold,
    Calligraffitti_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Routes />
      </>
    );
  }
}
