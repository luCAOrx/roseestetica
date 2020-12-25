import React, { useRef } from 'react'

import { KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import StepIndicator from 'react-native-step-indicator';

import { Input } from '../../components/Form/index';
import Button from '../../components/Button';
import Select from '../../components/CustomPicker';

export default function Address() {
  const navigation = useNavigation();

  const city = [
    {label: "Natal", value: "natal"},
    {label: "Alto do Rodrigues", value: "alto do rodrigues"},
    {label: "Pendências", value: "pendências"},
    {label: "Assu", value: "assu"},
    {label: "Angicos", value: "angicos"},
  ]

  function handleNavigateToLoginData() {
    navigation.navigate("LoginData");
  }

  const formRef = useRef<FormHandles>(null);
  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <StepIndicator stepCount={3} customStyles={stepStyles} currentPosition={1}/>

        <View style={{marginTop: 40}}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Select icon="location-city" placeholder="Cidade" options={city}/>

            <Input 
              placeholder="Bairro"
              icon="map"
              autoCapitalize="words"
              returnKeyType="next"
              name="bairro"
            />

            <Input 
              placeholder="Logradouro"
              icon="home"
              autoCapitalize="words"
              returnKeyType="next"
              name="logradouro"
            />

            <Input 
              placeholder="Número" 
              icon="looks-5"
              keyboardType="numeric" 
              returnKeyType="next"
              name="numero"
            />

            <Input 
              placeholder="Complemento" 
              icon="domain" 
              autoCapitalize="words"
              returnKeyType="next"
              name="complemento"
            />
            
            <Input 
              placeholder="Cep" 
              icon="place" 
              keyboardType="number-pad"
              returnKeyType="send"
              name="complemento"
            />

            <Button 
              title="PRÓXIMO" 
              onPress={() => {
                formRef.current?.submitForm();
                handleNavigateToLoginData();
              }} 
            />
          </Form>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const stepStyles = {
  currentStepLabelColor: "#333333",

  stepStrokeCurrentColor: "#2FB86E",

  stepIndicatorLabelCurrentColor: "#333333",
  stepIndicatorCurrentColor: "#D2D2E3",
  stepIndicatorFinishedColor: "#2FB86E",
  stepIndicatorUnFinishedColor: "#D2D2E3",
  stepIndicatorLabelFinishedColor: "#333333",
  stepIndicatorLabelUnFinishedColor: "#333333",
  
  separatorFinishedColor: "#2FB86E",
  separatorUnFinishedColor: "#D2D2E3"
}