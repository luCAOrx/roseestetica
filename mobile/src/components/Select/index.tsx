import React, { useEffect, useRef, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import api from '../../services/api';

interface SelectProps {
  icon: string;
  placeholder: string;
  modalHeight: number;
  isGender: boolean;
}

interface Gender {
  id: number;
  sexo: string;
}

export default function Select({
  icon, 
  placeholder, 
  modalHeight,
  isGender
}: SelectProps) {
  const modalizeRef = useRef<Modalize>(null);

  const [genders, setGenders] = useState<Gender[]>([]);
  const [selectedGender, setSelectedGender] = useState<number[]>([]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  function handleSelectGender(id: number) {
      selectedGender.pop();
      selectedGender.push(id);

      setSelectedGender(selectedGender);
      
  }

  useEffect(() => {
    api.get('generos').then(response => {
      setGenders(response.data);
    });
  }, []);

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
        {isGender && genders.map(gender => (
          <View 
            style={styles.itemContainer}
            key={gender.id}
          >
            <RectButton 
              style={styles.item}
              onPress={() => {
                onClose();
                handleSelectGender(gender.id);
                console.log(selectedGender);
              }}
            >
              <Text style={styles.itemTitle}>{gender.sexo}</Text>
            </RectButton>
          </View>
        ))}
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

    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 1
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

  selectedGender: {
    flex: 1,
    textAlign: "left",

    fontFamily: "Roboto_400Regular",
    fontSize: 16,

    color: "#D2D2E3"
  }
});