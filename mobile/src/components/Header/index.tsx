import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  showIcon: boolean;
}

export default function Header({title, showIcon}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {
        showIcon === true ?
        <BorderlessButton onPress={navigation.goBack}>
          <MaterialIcons name="arrow-back" size={30} color="#D2D2E3"/>
        </BorderlessButton> : 
        <View />
      }

      <Text style={styles.title}>{title}</Text>
      
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 50,
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#181818",
  },

  title: {
    fontFamily: "Roboto_700Bold",
    fontSize: 26,
    lineHeight: 42,

    color: "#D2D2E3",
  }
});