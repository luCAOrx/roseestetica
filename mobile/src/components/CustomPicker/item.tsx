import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

type ItemValue = string | number;

interface PickerItemProps {
	label?: string;
	value?: ItemValue;
  onClose?: () => void;
}

export default function PickerItem({label, value, onClose}: PickerItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Pressable 
          style={styles.buttonContainer}
          android_ripple={{color: "#222"}} 
          onPress={onClose}
        >
          <Text style={styles.title}>{label}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 40,
    marginLeft: 40,

    backgroundColor: "#222",
  },
  pickerContainer: {
    margin: 1,
  },
  buttonContainer: {
    height: 70,

    backgroundColor: "#333",

    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#f0f0f5",
    lineHeight: 16,
  }
});