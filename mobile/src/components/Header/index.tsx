import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string
}

export default function Header({title}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <MaterialIcons name="arrow-back" size={30} color="#D2D2E3"/>
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#181818',
    borderBottomWidth: 1,
    borderColor: '#181818',
    paddingTop: 50,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: "Roboto_700Bold",
    fontSize: 26,
    lineHeight: 42,

    marginRight: 75,

    color: '#D2D2E3',
  }
});