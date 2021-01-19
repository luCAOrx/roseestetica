import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import CustomCalendar from '../../components/Calendar';

export default function Schedule() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View />
        <Text style={styles.title}>Selecione o dia</Text>        
        <View />
      </View>

      <CustomCalendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181818"
  },

  titleContainer: {
    padding: 24,
    paddingTop: 50,
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "Roboto_700Bold",
    fontSize: 26,
    lineHeight: 42,

    color: "#D2D2E3",
  }
});