import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  showIcon: boolean;
  fontSize: number;
}

export default function Header({title, showIcon, fontSize}: HeaderProps) {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      marginTop: 35,
      marginBottom: 15,
      
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    button: {
      marginLeft: 10,
    },
  
    title: {
      fontFamily: "Roboto_700Bold",
      fontSize: fontSize,
      lineHeight: 42,
  
      color: "#D2D2E3",
    }
  });

  return (
    <View style={styles.container}>
      {
        showIcon === true ?
        <BorderlessButton style={styles.button} onPress={navigation.goBack}>
          <MaterialIcons name="arrow-back" size={30} color="#D2D2E3"/>
        </BorderlessButton> : 
        <View />
      }

      <Text style={styles.title}>{title}</Text>
      
      <View />
    </View>
  );
}