import React, { useRef } from 'react'

import { 
  Dimensions, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  View,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import StepIndicator from 'react-native-step-indicator';
import { ScrollView } from 'react-native-gesture-handler';

import { Input, Select } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Header from '../../components/Header';

export default function Address() {
  const formRef = useRef<FormHandles>(null);
  const streetRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);
  const complementRef = useRef<TextInput>(null);
  const cepRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  function handleNavigateToLoginData() {
    navigation.navigate("LoginData");
  }

  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Form style={styles.form} ref={formRef} onSubmit={handleSubmit}>
            <Header title="Endereço" showIcon={false} fontSize={26} />
            <StepIndicator 
              customStyles={stepStyles} 
              stepCount={3} 
              currentPosition={1}
            />
            <View style={{marginTop: 20}} />
            <Select 
              icon="location-city" 
              placeholder="Cidade" 
              name="cidade"
              modalHeight={390} 
              snapPoint={390}
              isGender={false}
            />

            <Input 
              placeholder="Bairro"
              icon="map"
              name="bairro"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => streetRef.current?.focus()}
              blurOnSubmit={false}
            />

            <Input 
              ref={streetRef}            
              placeholder="Logradouro"
              icon="home"
              name="logradouro"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => numberRef.current?.focus()}
              blurOnSubmit={false}
            />

            <Input 
              ref={numberRef}
              placeholder="Número" 
              icon="looks-5"
              name="numero"
              keyboardType="numeric" 
              returnKeyType="next"
              onSubmitEditing={() => complementRef.current?.focus()}
              blurOnSubmit={false}
            />

            <Input 
              ref={complementRef}
              placeholder="Complemento (opcional)" 
              icon="domain" 
              name="complemento"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => cepRef.current?.focus()}
              blurOnSubmit={false}
            />
            
            <Input 
              ref={cepRef}
              placeholder="Cep" 
              icon="place" 
              name="cep"
              keyboardType="number-pad"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
                handleNavigateToLoginData();
              }}
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
          </Form>
        </ScrollView>
      </TouchableWithoutFeedback>
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

const styles = StyleSheet.create({
  form: {
    height: Dimensions.get("screen").height,
  },
});