import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import ModalPicker from '../ModalPicker';

interface InputSelectProps {
  placeholder: string;
  icon: string;
  titlePrimary?: string;
  titleSecondary?: string;
  onClose?: () => void;
  // visible: boolean;
  // items: string[];
  // title: string;
  // onClose: () => void;
  // onSelect: (value: string) => void;
  // value?: string;
}

export default function InputSelect({placeholder,icon,titlePrimary,titleSecondary}: InputSelectProps) {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  function closeModal() {
    setVisible(!visible)
  }

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
      {/* <Modal 
        animationType="fade"
        visible={visible}
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <RectButton style={styles.buttonPickerContainer} onPress={closeModal}>
              <Text style={styles.title} >Masculino</Text>
            </RectButton>
            <RectButton style={styles.buttonPickerContainer}>
              <Text style={styles.title}>{titleSecondary}</Text>
            </RectButton>
          </View>
        </View>
      </Modal> */}
      <ModalPicker 
        visible={visible} 
        titlePrimary="Masculino" 
        titleSecondary="Feminino" 
        onClose={() => { setVisible(!visible) }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      />
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