import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import ModalPicker from '../ModalPicker'; 
import Select from './SexPicker/select';

interface InputSelectProps {
  placeholder: string;
  icon: string;
}

export default function CustomPicker({placeholder, icon}: InputSelectProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [male, setMale] = useState<string>("Masculino");
  const [feminine, setFeminine] = useState<string>("Feminino");

  return (
    <View style={styles.container}>
      <RectButton 
        style={styles.buttonContainer} 
        onPress={() => setVisible(!visible)}
      >
        <MaterialIcons style={styles.iconFace} name={icon} size={20} color="#f0f0f5" />
        <Text style={styles.placeholder} >{<Text style={styles.title}>{male}</Text>}</Text>
      </RectButton>
      <Select 
        visible={visible}
        onClose={() => setVisible(!visible)}
        // selectedValue={selectedValue}
        // onValueChange={(itemValue, itemIndex) => setMale(male)}
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
  iconArroDown: {
    marginRight: 15
  },
  buttonContainer: {
    height: 50,
    width: 382,
    flexDirection: "row",
    alignItems: "center"
  },
  placeholder: {
    color: "#7a7a7a",

    marginRight: 276
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