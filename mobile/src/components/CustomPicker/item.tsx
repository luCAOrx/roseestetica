import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ItemProps {
  visible?: boolean;
  onClose: () => void;
  options: {value: string, label: string}[];
  radio: boolean;
}

export default function Item({visible, onClose, options, radio}: ItemProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <View style={styles.dropdown} >
        {options.map(({value, label}) => {
          const index = selectedValues.indexOf(value);
          const isSelected = index !== -1;
          
          return (

            <Pressable 
              style={styles.button} 
              key={value}
              onPress={() => {
                onClose();
                if (radio) {
                  setSelectedValues([value]);
                } else {
                  if (isSelected) {
                    selectedValues.splice(index, 1);
                  } else {
                    selectedValues.push(value);
                  }
                  setSelectedValues([...selectedValues]);
                };
                console.log(selectedValues);
              }}
              android_ripple={{color: "rgba(0,0,0,0.1)"}}
            >
              <Text style={{color: "#F2F3F5"}}>{label}</Text>
            </Pressable>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    elevation: 10,

    justifyContent: "center",
    alignItems: "center",
    
    backgroundColor: "#222325",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#181818",
  },
  dropdown: {
    position: "absolute",

    margin: 15,
    top: 215,
    left: 0,
    right: 0,
    zIndex: 2,
  }
});