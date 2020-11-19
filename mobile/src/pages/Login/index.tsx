import React from 'react';

import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.inputContainer}>
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
    flex: 1,
    // marginTop: 100,
    justifyContent: "center",
    backgroundColor: '#000',
  },
  logo: {
    marginTop: 50,
    width: Dimensions.get("window").width,
    resizeMode: 'contain',
  },
  inputContainer: {
    marginTop: 50
  },
  inputEmail: {
    // marginTop: 5,
  },
  inputPassword: {
    // marginTop: 5,
  },
  button: {
    marginTop: 10,
  },
  title: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#f0f0f5',
  },
  createAnAccount: {
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassowrd: {
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});