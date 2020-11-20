import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface DataProps {
  label: string;
  value?: string;
  key?: number;
  selectedValue?: string;
  onValueChange?: () => void;
}

interface OptinonsProps extends DataProps {
  onClose: () => void;
}

export default function Optinons({onClose, label, value}: OptinonsProps) {
  const [dataProps, setDataProps] = useState<DataProps[]>([]);

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.button} 
        android_ripple={{color: "rgba(0,0,0,0.1)"}}
        onPress={onClose}
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