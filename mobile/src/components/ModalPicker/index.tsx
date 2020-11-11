import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import Modal from 'react-native-modal';

type ItemValue = string | number;

interface PickerItemProps {
	label?: string;
	value: ItemValue;
	color?: string;
	testID?: string;
}

interface ModalPickerProps {
  visible?: boolean;
  titlePrimary: string;
  titleSecondary: string;
  onClose: () => void;
  onValueChange?: (itemValue: ItemValue, itemIndex: number) => void;
  selectedValue?: ItemValue;
	value?: ItemValue;
}

export default function ModalPicker(
  {
    visible,
    titlePrimary,
    titleSecondary,
    selectedValue,
    onClose,
    onValueChange,
    value,
  }: ModalPickerProps) {
  return (
    <View style={styles.container}>
      <Modal 
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        isVisible={visible}
      >
        <View style={styles.pickerContainer}>
          <Pressable 
            style={styles.buttonContainer}
            android_ripple={{color: "#222"}} 
            onPress={onClose}
            {...selectedValue}
            {...onValueChange}
          >
            <Text style={styles.title} {...value}>{titlePrimary}</Text>
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