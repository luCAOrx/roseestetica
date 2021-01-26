import React, { useRef, useState } from 'react'

import { KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Input } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Select from '../../components/CustomPicker';
import Header from '../../components/Header';
import SucessScreen from '../../components/SucessScreen';

export default function ChangeAddress() {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  const city = [
    {label: "Natal", value: "natal"},
    {label: "Alto do Rodrigues", value: "alto do rodrigues"},
    {label: "Pendências", value: "pendências"},
    {label: "Assu", value: "assu"},
    {label: "Angicos", value: "angicos"},
  ]

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }

  function handleSubmit(data: any) {
    setSucessMessage(true);
    console.log(data);
  }

  return (
    <>
      <Header title="Alterar Endereço" showIcon={true} fontSize={26} />
      <KeyboardAvoidingView>
        <ScrollView>
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