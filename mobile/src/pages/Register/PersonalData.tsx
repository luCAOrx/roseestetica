import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import {Input} from '../../components/Form/index';
import Button from '../../components/Button';

export default function PersonalData() {
  const navigation = useNavigation();

  function handleNavigateToAddress() {
    navigation.navigate('Address');
  }

  const formRef = useRef<FormHandles>(null);
  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <StepIndicator stepCount={3} customStyles={stepStyles}/>
        <View style={styles.inputContainer}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input 
              placeholder="Nome completo"
              icon="person"
              autoCapitalize="words"
              returnKeyType="next"
              name="nome"
            />
            <Input 
              placeholder="Cpf"
              icon="fingerprint"
              keyboardType="numeric"
              returnKeyType="next"
              name="cpf"
              />
            <Input 
              placeholder="Número de telefone" 
              icon="local-phone" 
              keyboardType="number-pad"
              returnKeyType="next"
              name="telefone"
            />
            <Input 
              placeholder="Número de celular" 
              icon="phone-android" 
              keyboardType="number-pad"
              returnKeyType="send"
              name="celular"
            />
            <Button title="PRÓXIMO" onPress={() => {
              formRef.current?.submitForm()
              handleNavigateToAddress()
            }} />
          </Form>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    marginTop: 40,
  }
});

const stepStyles = {
  currentStepLabelColor: '#333333',
  stepStrokeCurrentColor: "#2FB86E",
  stepIndicatorLabelCurrentColor: '#333333',
  stepIndicatorCurrentColor: "#D2D2E3",
  stepIndicatorFinishedColor: "#2FB86E",
  stepIndicatorUnFinishedColor: "#D2D2E3",
  stepIndicatorLabelFinishedColor: "#333333",
  stepIndicatorLabelUnFinishedColor: "#333333",
  separatorFinishedColor: "#2FB86E",
  separatorUnFinishedColor: "#D2D2E3"
}