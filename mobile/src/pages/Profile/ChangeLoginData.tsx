import React, { useRef, useState } from 'react'

import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  View,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Input }  from '../../components/Form/index';
import CustomButton from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';
import Header from '../../components/Header';

export default function ChangeLoginData() {
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  const navigation = useNavigation();

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }
  
  function handleSubmit(data: any) {
    setSucessMessage(true);
    console.log(data);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Header title="Dados de Login" showIcon={true} fontSize={26} />
            <View style={{marginTop: 20}}/>
            <Input 
              placeholder="Email"
              icon="email"
              name="email"
              keyboardType="email-address"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
            />

            <Input 
              ref={passwordRef}
              placeholder="Senha"
              icon="lock"
              name="senha"
              isPassword
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
                setTimeout(() => {
                  handleNavigateToChangeData();
                }, 3000);
              }}
            />

            <CustomButton 
              title="PRONTO" 
              backgroundColor="#3A4498"
              height={50}
              fontSize={15}
              onPress={() => {
                formRef.current?.submitForm();
                setTimeout(() => {
                  handleNavigateToChangeData();
                }, 3000);
              }} 
            />
          </Form>
        </ScrollView>
      </TouchableWithoutFeedback>
      <SucessScreen title="Cadastro atualizado!" show={sucessMessage}/>
    </KeyboardAvoidingView>
  );
}