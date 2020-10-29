import React, { useState } from 'react';

import { PickerProps, Pressable, StyleSheet, Text, View } from 'react-native';

import Modal from 'react-native-modal';

interface ModalPickerProps extends PickerProps {
  placeholder?: string;
  icon?: string;
  visible?: boolean;
  items?: string[];
  titlePrimary: string;
  titleSecondary: string;
  onClose?: () => void;
  onSelect?: (value: string) => void;
  iTemValue?: string;
}

export default function ModalPicker(
  {
    placeholder,
    icon,
    visible,
    items,
    titlePrimary,
    titleSecondary,
    iTemValue,
    onClose,
    onSelect,
    onValueChange,
    selectedValue
  }: ModalPickerProps) {
  return (
  <View style={styles.container}>
    <Modal 
      // animationType="slide"
      // visible={visible}
      // transparent
      // onRequestClose={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      isVisible={visible}
      
    >
      <View style={styles.pickerContainer}>
        <Pressable 
          style={styles.buttonContainer}
          android_ripple={{color: "#222"}} 
          onPress={onClose}
        >
          <Text style={styles.title}>{titlePrimary}</Text>
        </Pressable>
        <Pressable 
          style={styles.buttonContainer}
          android_ripple={{color: "#222"}} 
          onPress={onClose}
        >
          <Text style={styles.title}>{titleSecondary}</Text>
        </Pressable>
      </View>
    </Modal>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    // backgroundColor: "rgba(0,0,0,0.5)"
  },
  pickerContainer: {
    margin: 50,

    backgroundColor: "#222"
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