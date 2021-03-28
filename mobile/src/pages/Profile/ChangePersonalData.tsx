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

interface PersonalDataProps {
  nome: string;
  cpf: string;
  telefone: string;
  celular: string;
  sexo: string[];
}

export default function ChangePersonalData() {
  const formRef = useRef<FormHandles>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const cellPhoneNumberInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }

  async function handleSubmit(personalData: PersonalDataProps) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().strict(true)
        .trim("Não são permitidos espaços no começo ou no fim!")
        .matches(/^([a-zA-Zà-úÀ-Ú]|\s+)+$/, "O campo nome completo só aceita letras!")
        .min(5, "No mínimo 5 caracteres!")
        .max(90, "No máximo 90 caracteres!")
        .required("O campo nome é obrigatório!"),
        telefone: Yup.string().optional()
          .min(10, "No mínimo 10 caracteres!")
          .max(10, "No máximo 10 caracteres!"),
        celular: Yup.string().required("O campo número de celular é obrigatório!")
          .min(11, "No mínimo 11 caracteres!")
          .max(11, "No máximo 11 caracteres!"),
        sexo: Yup.array().min(1, "O campo sexo é obrigatório!")
      });

      await schema.validate(personalData, {
        abortEarly: false
      });

      formRef.current?.setErrors({});

      setSucessMessage(true);

      setTimeout(() => {
        handleNavigateToChangeData();
      }, 3000);
      
      console.log(personalData);
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
            <Header title="Dados pessoais" showIcon={true} fontSize={26}/>
            <View style={{marginTop: 20}}/>
            <Input 
              placeholder="Nome completo"
              icon="person"
              name="nome"
              maxLength={90}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
              blurOnSubmit={false}
            />

            <Input 
              placeholder="CPF"
              icon="fingerprint"
              name="cpf"
              editable={false}
              keyboardType="numeric"
              returnKeyType="next"
            />

            <InputMask 
              ref={phoneNumberInputRef}
              type="cel-phone"
              placeholder="Número de telefone (opcional)" 
              icon="local-phone" 
              name="telefone"
              keyboardType="number-pad"
              returnKeyType="next"
              onSubmitEditing={() => cellPhoneNumberInputRef.current?.focus()}
              blurOnSubmit={false}
            />
            
            <InputMask 
              ref={cellPhoneNumberInputRef}
              type="cel-phone"
              placeholder="Número de celular" 
              icon="phone-android" 
              name="celular"
              keyboardType="number-pad"
            />

            <Select 
              icon="face" 
              placeholder="Sexo" 
              name="sexo"
              modalHeight={130} 
              snapPoint={190}
              isGender
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