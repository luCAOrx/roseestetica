import React, { useRef } from 'react'

import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  View,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';

import * as Yup from 'yup';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import StepIndicator from 'react-native-step-indicator';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import { Input, InputMask, Select } from '../../components/Form/index';
import CustomButton from '../../components/Button';

interface ValidationErrors {
  [key: string]: string;
}

interface PersonalDataProps {
  nome: string;
  cpf: string;
  telefone: string;
  celular: string;
  sexo_id: number;
}

interface AdressDataProps {
  cidade_id: number;
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
  const route = useRoute();
  const params = route.params as PersonalDataProps;

  function handleNavigateToLoginData(
    params: PersonalDataProps,
    adressData: AdressDataProps,
  ) {
    const { nome, cpf, telefone, celular, sexo_id } = params;
    const { cidade_id, bairro, logradouro, numero, complemento, cep } = adressData;

    navigation.navigate("LoginData", { 
      nome, cpf, telefone, celular, sexo_id,
      cidade_id, bairro, logradouro, numero, complemento, cep
    });
  }

  async function handleSubmit(adressData: AdressDataProps) {
    const { nome, cpf, telefone, celular, sexo_id } = params;
    
    const { cidade_id, bairro, logradouro, numero, complemento, cep } = adressData;

    try {
      const schema = Yup.object().shape({
        cidade_id: Yup.array().min(1, "O campo cidade é obrigatório!"),
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

      handleNavigateToLoginData({
        nome, cpf, telefone, celular, sexo_id
      }, {
        cidade_id, bairro, logradouro, numero, complemento, cep
      });
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
              name="cidade_id"
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
              maxLength={6}
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
              placeholder="CEP" 
              icon="place" 
              name="cep"
              maxLength={9}
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