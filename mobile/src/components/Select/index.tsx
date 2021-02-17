import React, { useRef } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

interface SelectProps {
  icon: string;
  placeholder: string;
  modalHeight: number;
}

export default function Select({icon, placeholder, modalHeight}: SelectProps) {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <>
      <RectButton 
        style={styles.container} 
        onPress={onOpen}
      >
        <Icon 
          style={{margin: 10}} 
          name={icon} 
          size={20} 
          color={"#D2D2E3"} 
        />
        
        <Text style={styles.placeholder}>{placeholder}</Text>

        <Icon 
          style={{margin: 10}} 
          name="keyboard-arrow-down"
          size={20} 
          color={"#D2D2E3"} 
        />
      </RectButton>

      <Modalize 
        ref={modalizeRef}
        snapPoint={280}
        modalHeight={modalHeight}
        modalStyle={styles.modal}
      >
        <View style={styles.itemContainer}>
          <RectButton 
            style={styles.item}
            onPress={onClose}
          >
            <Text style={styles.itemTitle}>Masculino</Text>
          </RectButton>

          <View style={styles.line}/>

          <RectButton 
            style={styles.item}
            onPress={onClose}
          >
            <Text style={styles.itemTitle}>Feminino</Text>
          </RectButton>
        </View>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: 50,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: 8,

    backgroundColor: "#222325",
  },

  placeholder: {
    flex: 1,
    textAlign: "left",

    color: "#7A7A7A"
  },

  modal: {
    backgroundColor: "#333333"
  },

  itemContainer: {
    marginTop: 10, 
    marginBottom: 10, 
  },

  item: {
    height: 65,

    justifyContent: "center",
    alignItems: "center",
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,

    color: "#D2D2E3"
  },

  line: {
    height: 2,
    marginTop: 10, 
    marginBottom: 10, 
    backgroundColor: "#222222"
  }
});