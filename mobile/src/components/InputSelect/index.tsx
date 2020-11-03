import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import ModalPicker from '../ModalPicker'; 


interface InputSelectProps {
  placeholder: string;
  icon: string;
  // titlePrimary?: string;
  // titleSecondary?: string;
  onClose?: () => void;
  // visible: boolean;
  // items: string[];
  // title: string;
  // onClose: () => void;
  onSelect?: (value: string) => void;
  // value?: string;
}

export default function InputSelect({placeholder,icon}: InputSelectProps) {
  const [visible, setVisible] = useState(false);
  const [selectedMasculino, setSelectedMasculino] = useState(false);
  const [selectedFeminino, setSelectedFeminino] = useState(false);

  return (
    <View style={styles.container}>
      <MaterialIcons style={styles.iconFace} name="face" size={20} color="#f0f0f5" />
      <RectButton 
        style={styles.buttonContainer} 
        onPress={() => { setVisible(!visible) }}
      >
        <Text style={styles.placeholder} >Sexo</Text>
        <MaterialIcons 
          style={styles.iconArrowDown} 
          name="keyboard-arrow-down" 
          size={20} 
          color="#f0f0f5" 
        />
      </RectButton>
      <Modal 
        onBackButtonPress={() => setVisible(!visible)}
        onBackdropPress={() => setVisible(!visible)}
        isVisible={visible}
        
      >
        <View style={styles.pickerContainer}>
          <Pressable 
            style={styles.buttonPickerContainer}
            android_ripple={{color: "#222"}} 
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.title} >Masculino</Text>
          </Pressable>
          <Pressable 
            style={styles.buttonPickerContainer}
            android_ripple={{color: "#222"}} 
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.title}>Feminino</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: 8,
    backgroundColor: "#1e222b"
  },
  iconFace: {
    margin: 10
  },
  buttonContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  placeholder: {
    color: "#7a7a7a",

    marginRight: 276
  },
  iconArrowDown: {
    marginRight: 10
  },
  modalContainer: {
    flex: 1,

    justifyContent: "center",

    backgroundColor: "rgba(0,0,0,0.5)"
  },
  pickerContainer: {
    margin: 50,

    backgroundColor: "#222"
  },
  buttonPickerContainer: {
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