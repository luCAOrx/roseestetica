import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';


export default function Select() {
  // const [visible, setVisible] = useState<boolean>(false);
  // const [selected, setSelected] = useState<string>("");

  // const Item = () => {
  //   return (
  //       <View style={styles.dropdown}>
  //         <Pressable 
  //           style={styles.button} 
  //           onPress={() => {setVisible(!visible), setSelected("Masculino"), console.log(selected)}}
  //           android_ripple={{color: "rgba(0,0,0,0.1)"}}
  //         >
  //           <Text style={{color: "#F2F3F5"}}>Masculino</Text>
  //         </Pressable>
  //         <Pressable 
  //           style={styles.button} 
  //           onPress={() => {setVisible(!visible),setSelected("Feminino"), console.log(selected)}}
  //           android_ripple={{color: "rgba(0,0,0,0.1)"}}
  //         >
  //           <Text style={{color: "#F2F3F5"}}>Feminino</Text>
  //         </Pressable>
  //       </View>
  //   );
  // }

  return(
    <>
      <View style={styles.container}>
        <MaterialIcons 
          style={styles.icon} 
          name="face" 
          size={20} 
          color="#F2F3F5" 
        />
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={{}}
          items={[
            { label: 'Masculino', value: 'masculino' },
            { label: 'Feminino', value: 'feminino' },
          ]}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 13,
              right: -15,
            },
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return (
              <MaterialIcons 
                style={styles.iconArrow} 
                name="keyboard-arrow-down" 
                size={20} 
                color="#F2F3F5" 
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
          placeholder={selected ? selected : "Sexo"} 
          placeholderTextColor={selected ? "#F2F3F5" : "#7A7A7A"}
          style={{flex: 1}} 
        />
        <MaterialIcons 
          style={styles.iconArrow} 
          name="keyboard-arrow-down" 
          size={20} 
          color="#F2F3F5" 
        />
      </Pressable>
      {visible && ( <Item /> )} */}
    </>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroidContainer: {
    paddingVertical: 10,
    // backgroundColor: "#fff",
    width: 338
  },
  
  inputAndroid: {
    color: "#F2F3F5"
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