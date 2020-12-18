import React from 'react';

import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  placeholder?: string;
  icon?: string | any;
}

export default function Input({ placeholder, icon, ...rest}: InputProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons 
        style={{margin: 10}} 
        name={icon} 
        size={20} 
        color={"#D2D2E3"} 
      />
      
      <TextInput 
        style={{flex: 1, color: "#D2D2E3"}}
        placeholder={placeholder}
        placeholderTextColor="#7A7A7A"
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: 50,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 8,

    backgroundColor: "#222325",
  },
});