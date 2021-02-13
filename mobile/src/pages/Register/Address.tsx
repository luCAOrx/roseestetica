import React, { useRef } from 'react'

import { Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import StepIndicator from 'react-native-step-indicator';

import { Input } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Select from '../../components/Select';
import Header from '../../components/Header';

export default function Address() {
  const formRef = useRef<FormHandles>(null);

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

  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <KeyboardAvoidingView>
          <View style={styles.container}>
              <Header title="Endereço" showIcon={false} fontSize={26} />
              <View style={{marginBottom: 40}}>
                <StepIndicator stepCount={3} customStyles={stepStyles} currentPosition={1}/>
              </View>
                <Select icon="location-city" placeholder="Cidade" modalHeight={220}/>

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

              <CustomButton 
                title="PRÓXIMO" 
                backgroundColor="#3A4498"
                height={50}
                fontSize={15}
                onPress={() => {
                  formRef.current?.submitForm();
                  handleNavigateToLoginData();
                }} 
              />
            </View>
        </KeyboardAvoidingView>
      </Form>
    </>
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

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
  },
});