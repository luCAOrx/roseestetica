import React, { useEffect, useRef, useState } from 'react'

import { BackHandler, Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Input, Select } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Header from '../../components/Header';
import SucessScreen from '../../components/SucessScreen';

export default function ChangeAddress() {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("ChangeData");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }

  function handleSubmit(data: any) {
    setSucessMessage(true);
    console.log(data);
  }

  return (
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
      <SucessScreen title="Cadastro atualizado!" show={sucessMessage}/>
    </Form>
  );
}

const styles = StyleSheet.create({
  form: {
    height: Dimensions.get("screen").height,
  },
});