import React, { useRef, useState } from 'react'

import { BackHandler, KeyboardAvoidingView, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Input, InputPassword } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';
import Header from '../../components/Header';

export default function ChangeLoginData() {
  const formRef = useRef<FormHandles>(null);

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  const navigation = useNavigation();

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }
  
  function handleSubmit(data: any) {
    setSucessMessage(true);
    console.log(data);
  }

  useFocusEffect(() => {
    const backAction = () => {
      navigation.navigate("ChangeData");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  return (
    <>
      <Header title="Dados de Login" showIcon={true} fontSize={26} />
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{marginTop: 40}}>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input 
                placeholder="Email"
                icon="email"
                autoCapitalize="words"
                returnKeyType="next"
                name="email"
              />

              <InputPassword 
                placeholder="Senha"
                icon="lock"
                name="senha"
                returnKeyType="send"
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <SucessScreen title="Cadastro atualizado!" show={sucessMessage}/>
    </>
  );
}