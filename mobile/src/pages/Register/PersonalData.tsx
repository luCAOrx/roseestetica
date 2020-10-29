import React from 'react'
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import InputSelect from '../../components/InputSelect';

export default function PersonalData() {
  const navigation = useNavigation();

  const customStyles = {
    stepStrokeCurrentColor: "#2FB86E",
    stepIndicatorCurrentColor: "#f0f0f5",
    stepIndicatorFinishedColor: "#2FB86E",
    stepIndicatorUnFinishedColor: "#f0f0f5",
    stepIndicatorLabelFinishedColor: "#161616",
    stepIndicatorLabelUnFinishedColor: "#161616",
    separatorFinishedColor: "#2FB86E",
    separatorUnFinishedColor: "#f0f0f5"
  }

  function handleNavigateToAddress() {
    navigation.navigate('Address');
  }

  return (
    <View style={styles.container}>
      <StepIndicator stepCount={3} customStyles={customStyles}/>
      <View style={styles.input}>
        <Input 
          placeholder="Nome completo"
          icon="person"
          autoCapitalize="words"
          returnKeyType="next"
        />
      </View>
      <View style={styles.inputChildren}>
        <Input 
          placeholder="Cpf"
          icon="fingerprint"
          keyboardType="numeric"
          returnKeyType="next"
          />
      </View>
      <View style={styles.inputChildren}>
        <InputSelect placeholder="Sexo" icon="face"/>
      </View>
      <View style={styles.inputChildren}>
        <Input 
          placeholder="Número de telefone" 
          icon="local-phone" 
          keyboardType="number-pad"
          returnKeyType="next"
        />
      </View>
      <View style={styles.inputChildren}>
        <Input 
          placeholder="Número de celular" 
          icon="phone-android" 
          keyboardType="number-pad"
          returnKeyType="send"
        />
      </View>
      <View style={styles.button}>
        <Button title="PRÓXIMO" onPress={handleNavigateToAddress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  input: {
    marginTop: 40,
  },
  inputChildren: {
    // marginTop: 5,
  },
  icon: {
    marginLeft: 10
  },
  button: {
    marginTop: 60
  }
});