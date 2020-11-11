import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import Item from '../item';

type ItemValue = string | number;

interface SelectProps {
  visible: boolean;
  onClose: () => void;
  onValueChange?: (itemValue: ItemValue, itemIndex: number) => void;
  selectedValue?: ItemValue;
}

export default function Select({
  visible, 
  onClose, 
  onValueChange, 
  selectedValue
}: SelectProps) {
  return (
    <View style={styles.container}>
      <Modal 
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        isVisible={visible}
      >
        <Item onClose={onClose} label="Masculino" value="Masculino"/>
        <Item onClose={onClose} label="Feminino" value="Feminino"/>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
})