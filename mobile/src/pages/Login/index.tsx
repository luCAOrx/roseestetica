import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../images/logo.png';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';

export default function Login() {
  const navigation = useNavigation();

  function handleNavigateToRegister() {
    navigation.navigate('PersonalData');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImg} />
      <View style={styles.inputEmail}>
        <Input 
          autoCapitalize='words'
          keyboardType='email-address'
          returnKeyType='next'
          placeholder='E-mail'
          icon='email'
        />
      </View>
      <View style={styles.inputPassword}>
        <InputPassword 
          returnKeyType='send'
          placeholder='Senha'
          icon='lock'
        />
      </View>
      <View style={styles.button}>
        <Button title="ENTRAR"/>
      </View>
      <RectButton 
        style={styles.createAnAccount}
        onPress={handleNavigateToRegister}
      >
        <Text style={styles.title}>Criar uma conta</Text>
      </RectButton>
      <RectButton style={styles.forgotPassowrd}>
        <Text style={styles.title}>Esqueci minha senha</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    marginTop: 50,
    backgroundColor: '#000',
    // justifyContent: 'center',
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: 80
  },
  inputEmail: {
    marginTop: 100,
  },
  inputPassword: {
    marginTop: 20,
  },
  button: {
    marginTop: 50,
  },
  title: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#f0f0f5',
  },
  createAnAccount: {
    height: 50,
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassowrd: {
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});