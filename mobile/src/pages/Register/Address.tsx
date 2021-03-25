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

import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import StepIndicator from 'react-native-step-indicator';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import { Input, Select } from '../../components/Form/index';
import CustomButton from '../../components/Button';

interface ValidationErrors {
  [key: string]: string;
}

interface AdressDataProps {
  cidade: string[];
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
}

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

  async function handleSubmit(adressData: AdressDataProps) {
    try {
      const schema = Yup.object().shape({
        cidade: Yup.array().min(1, "O campo cidade é obrigatório!"),
        bairro: Yup.string().required("O campo bairro é obrigatório!")
          .min(5, "No mínimo 5 caracteres!")
          .max(90, "No máximo 90 caracteres!"),
        logradouro: Yup.string().required("O campo logradouro é obrigatório!")
          .min(5, "No mínimo 5 caracteres!")
          .max(90, "No máximo 90 caracteres!"),
        numero: Yup.string().required("O campo número é obrigatório!")
          .min(1, "No mínimo 1 caractere!")
          .max(6, "No máximo 6 caracteres!"),
        complemento: Yup.string().optional()
          .min(3, "No mínimo 3 caracteres!")
          .max(80, "No máximo 80 caracteres!"),
        cep: Yup.string().required("O campo CEP é obrigatório!")
        .min(8, "No mínimo 8 caracteres!")
        .max(8, "No máximo 8 caracteres!"),
      });

      await schema.validate(adressData, {
        abortEarly: false
      });

      formRef.current?.setErrors({});

      handleNavigateToLoginData();

      console.log(adressData);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: ValidationErrors = {};

        err.inner.forEach((error) => {
          validationErrors[`${error.path}`] = error.message;
        });
        
        formRef.current?.setErrors(validationErrors);
      }
    }
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
              placeholder="CEP" 
              icon="place" 
              name="cep"
              keyboardType="number-pad"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <CustomButton 
              title="PRÓXIMO" 
              backgroundColor="#3A4498"
              height={50}
              fontSize={15}
              onPress={() => {
                formRef.current?.submitForm();
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