import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import Item from './item';

interface SelectProps {
  icon: string;
  placeholder: string;
  options: {label: string, value: string}[];
}

export default function Select({icon, placeholder, options}: SelectProps) {
  // const [visible, setVisible] = useState<boolean>(false);
  // const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // const genders = [
  //   {value: "masculino", label: "Masculino"},
  //   {value: "feminino", label: "Feminino"},
  // ]

  // function Item({visible, onClose, options, radio}: ItemProps) {
  
  //   return (
  //     <View style={styles.dropdown} >
  //       {options.map(({value, label}) => {
  //         const index = selectedValues.indexOf(label);
  //         const isSelected = index !== -1;
          
  //         return (
  //           <Pressable 
  //             style={styles.button} 
  //             key={value}
  //             onPress={() => {
  //               onClose();
  //               if (radio) {
  //                 setSelectedValues([label]);
  //               } else {
  //                 if (isSelected) {
  //                   selectedValues.splice(index, 1);
  //                 } else {
  //                   selectedValues.push(label);
  //                 }
  //                 setSelectedValues([...selectedValues]);
  //               };
  //               console.log(selectedValues);
  //             }}
  //             android_ripple={{color: "rgba(0,0,0,0.1)"}}
  //           >
  //             <Text style={{color: "#F2F3F5"}}>{label}</Text>
  //           </Pressable>
  //         );
  //       })}
  //     </View>
  //   );
  // }

  return(
    <>
      <View style={styles.container}>
        <MaterialIcons 
          style={styles.icon} 
          name={icon} 
          size={20} 
          color="#D2D2E3" 
        />
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={{label: `${placeholder}`, value: "", color: "#7A7A7A"}}
          items={options}
          style={{...pickerSelectStyles}}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return (
              <MaterialIcons 
                style={styles.iconArrow} 
                name="keyboard-arrow-down" 
                size={20} 
                color="#D2D2E3" 
              />
            );
          }}
        />
      </View>
      {/* <Pressable style={styles.container} onPress={() => setVisible(!visible)}>
        <MaterialIcons 
          style={styles.icon} 
          name="face" 
          size={20} 
          color="#F2F3F5" 
        />
        <TextInput 
          editable={false} 
          placeholder={`${selectedValues ? selectedValues : "Sexo"}`} 
          placeholderTextColor={selectedValues ? "#F2F3F5" : "#7A7A7A"}
          style={{flex: 1}} 
        />
        <MaterialIcons 
          style={styles.iconArrow} 
          name="keyboard-arrow-down" 
          size={20} 
          color="#F2F3F5" 
        />
      </Pressable>
      {visible && ( <Item options={genders} onClose={() => setVisible(!visible)} radio/> )} */}
    </>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputAndroidContainer: {
    paddingVertical: 10,
    width: 338
  },
  placeholder: {
    color: "#7a7a7a"
  },
  inputAndroid: {
    color: "#F2F3F5"
  },
  iconContainer: {
    top: 13,
    right: -15,
  },
});

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: 50,

    backgroundColor: '#222325',
    borderRadius: 8,
    
    flexDirection: "row",

    alignItems: "center",
  },
  icon: {
    margin: 10
  },
  iconArrow: {
    marginRight: 20
  },
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