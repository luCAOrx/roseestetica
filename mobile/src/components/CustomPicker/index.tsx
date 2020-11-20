import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Optinons from './options';

export default function CustomPicker() {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <View>
      <Pressable onPress={() => setVisible(!visible)}>
        <View style={styles.input} >
          <MaterialIcons style={styles.icon} name="face" size={20} color={'#f0f0f5'} />
          <TextInput 
            style={{flex: 1}}
            placeholder={`${selectedValue ? selectedValue : "Sexo"}`}
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
        <Optinons onClose={() => setVisible(!visible)} label="Masculino" />    
        <Optinons onClose={() => setVisible(!visible)} label="Feminino" />    
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
});