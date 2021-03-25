import React, { useRef, useState } from 'react'

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

import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import { Input, Select } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';

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

export default function ChangeAddress() {
  const formRef = useRef<FormHandles>(null);
  const streetRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);
  const complementRef = useRef<TextInput>(null);
  const cepRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }

  async function handleSubmit(adressData: AdressDataProps) {
    try {
      const schema = Yup.object().shape({
        cidade: Yup.array().optional(),
        bairro: Yup.string().optional()
          .min(5, "No mínimo 5 caracteres!")
          .max(90, "No máximo 90 caracteres!"),
        logradouro: Yup.string().optional()
          .min(5, "No mínimo 5 caracteres!")
          .max(90, "No máximo 90 caracteres!"),
        numero: Yup.string().optional()
          .min(1, "No mínimo 1 caractere!")
          .max(6, "No máximo 6 caracteres!"),
        complemento: Yup.string().optional()
          .min(3, "No mínimo 3 caracteres!")
          .max(80, "No máximo 80 caracteres!"),
        cep: Yup.string().optional()
        .min(8, "No mínimo 8 caracteres!")
        .max(8, "No máximo 8 caracteres!"),
      });

      await schema.validate(adressData, {
        abortEarly: false
      });

      formRef.current?.setErrors({});

      setSucessMessage(true);

      setTimeout(() => {
        handleNavigateToChangeData();
      }, 3000);

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
            <Header title="Endereço" showIcon={true} fontSize={26} />
            <View style={{marginTop: 20}} />
            <Select 
              icon="location-city" 
              placeholder="Cidade" 
              name="cidade"
              modalHeight={455} 
              snapPoint={455}
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
              }}
            />

            <CustomButton 
              title="PRONTO" 
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
      <SucessScreen title="Cadastro atualizado!" show={sucessMessage}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    height: Dimensions.get("screen").height,
  },
});