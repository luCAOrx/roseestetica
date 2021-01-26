import React from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

interface SucessScreenProps {
  show: Boolean;
  title: string;
}

export default function SucessScreen({title, show}: SucessScreenProps) {
  return show && (
    <View style={styles.container}>
      <Feather name="check-circle" color="#34CB79" size={50}/>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    height: Dimensions.get("screen").height,

    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,

    backgroundColor: "rgba(18, 18, 18, 0.8)"
  },

  text: {
    fontFamily: "Roboto_900Black",
    fontSize: 25,

    color: "#D2D2E3"
  }
});