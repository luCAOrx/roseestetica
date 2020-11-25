import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import Optinons from './options';

export interface OptinonsProps {
  label?: string;
  value?: string;
  key?: number;
  onValueChange: () => void;
}

export default function CustomPicker(value: OptinonsProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any>("");

  const Options = ({label, onValueChange, value, key}: OptinonsProps) => {

    return (
      <View style={styles.buttonContainer}>
      <Pressable 
        style={styles.button} 
        android_ripple={{color: "rgba(0,0,0,0.1)"}}
        onPress={() => {setVisible(!visible), onValueChange()}}
      >
        <TextInput style={styles.text} editable={false} > {label} </TextInput>
      </Pressable>
    </View>
    )
  }

  return (
    <View>
      <Pressable onPress={() => setVisible(!visible)}>
        <View style={styles.input} >
          <MaterialIcons style={styles.icon} name="face" size={20} color={'#f0f0f5'} />
          <TextInput 
            style={{flex: 1}}
            placeholder={selectedValue ? selectedValue : "Sexo"}
            placeholderTextColor={selectedValue ? "#f0f0f5" : "#7a7a7a"}
            editable={false} 
          />
        </View>
      </Pressable>
      <Modal
        backdropColor="rgba(0,0,0,0.9)"
        useNativeDriver={true}
        onBackButtonPress={() => setVisible(!visible)}
        onBackdropPress={() => setVisible(!visible)}
        isVisible={visible}
      >
        <Options label="Masculino" value="Masculino" onValueChange={() => {setSelectedValue("Masculino"), console.log(selectedValue)}} />    
        <Options label="Feminino" value="Feminino" onValueChange={() => {setSelectedValue("Feminino"), console.log(selectedValue)}} />    
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 50,

    backgroundColor: '#1e222b',
    color: "#f0f0f5",

    borderRadius: 8,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 10
  },
  buttonContainer: {
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