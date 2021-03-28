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
  snapPoint: number;
  isGender: boolean;
}

interface Gender {
  id: number;
  sexo: string;
}

interface City {
  id: number;
  cidade: string;
}

export default function Select({
  icon, 
  placeholder, 
  modalHeight,
  snapPoint,
  isGender
}: SelectProps) {
  const modalizeRef = useRef<Modalize>(null);

  const [genders, setGenders] = useState<Gender[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  function handleSelectGender(sex: string) {
    setSelectedGender("");

    setSelectedGender(sex);
  }

  function handleSelectCity(city: string) {
    setSelectedCity("");

    setSelectedCity(city);
  }

  useEffect(() => {
    api.get('generos').then(response => {
      setGenders(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('cidades').then(response => {
      setCities(response.data);
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
        
        {isGender ? (
          <Text 
            style={
              selectedGender.length ? styles.selected : styles.placeholder
            }
          >
            {selectedGender.length ? selectedGender : placeholder}
          </Text>

        ) : (
          <Text 
            style={
              selectedCity.length ? styles.selected : styles.placeholder
            }
          >
            {selectedCity.length ? selectedCity : placeholder}
          </Text>
        )}

        <Icon 
          style={{margin: 10}} 
          name="keyboard-arrow-down"
          size={20} 
          color={"#D2D2E3"} 
        />
      </RectButton>

      <Modalize 
        ref={modalizeRef}
        snapPoint={snapPoint}
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
                handleSelectGender(gender.sexo);
                console.log(selectedGender);
              }}
            >
              <Text style={styles.itemTitle}>{gender.sexo}</Text>
            </RectButton>
          </View>
        ))}

        {!isGender && cities.map(city => (
          <View 
            style={styles.itemContainer}
            key={city.id}
          >
            <RectButton 
              style={styles.item}
              onPress={() => {
                onClose();
                handleSelectCity(city.cidade);
                console.log(selectedCity);
              }}
            >
              <Text style={styles.itemTitle}>{city.cidade}</Text>
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

  selected: {
    flex: 1,
    textAlign: "left",

    color: "#D2D2E3"
  }
});