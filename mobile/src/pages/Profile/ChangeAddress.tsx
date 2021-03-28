import React, { useRef, useState } from 'react'

import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
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
import { Input, InputMask, Select } from '../../components/Form/index';
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
        cidade: Yup.array().min(1, "O campo cidade é obrigatório!"),
        bairro: Yup.string().strict(true)
          .trim("Não são permitidos espaços no começo ou no fim!")
          .matches(/^([a-zA-Zà-úÀ-Ú]|\s+)+$/, "O campo bairro só aceita letras!")
          .min(3, "No mínimo 3 caracteres!")
          .max(90, "No máximo 90 caracteres!")
          .required("O campo bairro é obrigatório!"),
        logradouro: Yup.string().strict(true)
          .trim("Não são permitidos espaços no começo ou no fim!")
          .matches(/^([a-zA-Zà-úÀ-Ú]|\s+)+$/, "O campo logradouro só aceita letras!")
          .min(5, "No mínimo 5 caracteres!")
          .max(90, "No máximo 90 caracteres!")
          .required("O campo logradouro é obrigatório!"),
        numero: Yup.string().strict(true)
          .trim("Não são permitidos espaços no começo ou no fim!")
          .min(1, "No mínimo 1 caractere!")
          .max(6, "No máximo 6 caracteres!")
          .required("O campo número é obrigatório!"),
        complemento: Yup.string().optional().strict(true)
          .trim("Não são permitidos espaços no começo ou no fim!")
          .min(3, "No mínimo 3 caracteres!")
          .max(90, "No máximo 90 caracteres!"),
        cep: Yup.string()
        .min(8, "No mínimo 8 caracteres!")
        .max(8, "No máximo 8 caracteres!")
        .required("O campo CEP é obrigatório!"),
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
      keyboardVerticalOffset={8}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Form style={{flexGrow: 1}} ref={formRef} onSubmit={handleSubmit}>
            <Header title="Endereço" showIcon={true} fontSize={26} />
            <View style={{marginTop: 20}} />
            <Select 
              icon="location-city" 
              placeholder="Cidade" 
              name="cidade"
              modalHeight={330} 
              snapPoint={390}
              isGender={false}
            />

            <Input 
              placeholder="Bairro"
              icon="map"
              name="bairro"
              maxLength={90}
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
              maxLength={90}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => numberRef.current?.focus()}
              blurOnSubmit={false}
            />

            <InputMask 
              ref={numberRef}
              type="only-numbers"
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
              maxLength={90}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => cepRef.current?.focus()}
              blurOnSubmit={false}
            />
            
            <InputMask 
              ref={cepRef}
              type="zip-code"
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