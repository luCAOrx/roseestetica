import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export interface OptinonsProps {
  items?: [string];
  label?: string;
  value?: string;
  key?: number;
  selectedValue?: string;
  onValueChange?: (event: GestureResponderEvent) => void;
  onClose?: () => void;
}

export default function Optinons({
  onClose, 
  label, 
  value, 
  selectedValue, 
  items, 
  onValueChange
}: OptinonsProps) {

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.button} 
        android_ripple={{color: "rgba(0,0,0,0.1)"}}
        onPress={() => {
          onValueChange
          onClose
        }}
        {...value}
        {...onValueChange}
        {...items}
      >
        <TextInput style={styles.text} editable={false} > {label} </TextInput>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 25,
    marginLeft: 25,

    backgroundColor: "#222"
  },
  button: {
    marginTop: 1,
    height: 60,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#333"
  },
  text: {
    color: "#f0f0f5",
    lineHeight: 16
  }
});