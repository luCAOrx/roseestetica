import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Checkbox from 'expo-checkbox';

interface CustomCheckboxProps {
  text: string;
  price: string;
}

export default function CustonCheckbox({text, price}: CustomCheckboxProps) {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
    <Checkbox
      style={styles.checkbox}
      value={isChecked}
      onValueChange={setChecked}
      color={isChecked ? '#D2D2E3' : "#D2D2E3"}
      onChange={() => {}}
    />
    <Text style={styles.text}>{text}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 20
  },

  checkbox: {
    marginLeft: 10
  },

  text: {
    flex: 1,
    textAlign: "left",
    fontFamily: "Roboto_400Regular",
    lineHeight: 18,
    fontSize: 15,

    color: "#D2D2E3"
  },

  price: {
    marginRight: 20,

    fontFamily: "Roboto_400Regular",
    fontSize: 15,

    color: "#248E54"
  }
});