import React from 'react';

import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../images/light-logo.png';
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
        <Input 
          placeholder="E-mail"
          icon="email"
          autoCapitalize="words"
          keyboardType="email-address"
          returnKeyType="next"
        />
        <InputPassword 
          placeholder="Senha"
          icon="lock"
          returnKeyType="send"
        />
      </View>
      <View style={styles.button}>
        <Button title="ENTRAR"/>
      </View>
      <RectButton 
        style={styles.createAnAccount}
        onPress={handleNavigateToRegister}
      >
        <Text style={styles.buttonTitle}>Criar uma conta</Text>
      </RectButton>
      <RectButton style={styles.forgotPassowrd}>
        <Text style={styles.buttonTitle}>Esqueci minha senha</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 100,
    justifyContent: "center",
    backgroundColor: '#f0f0f5',
  },
  logo: {
    marginTop: 50,
    width: Dimensions.get("window").width,
    resizeMode: 'contain',
  },
  inputContainer: {
    marginTop: 50
  },
  button: {
    marginTop: 10,
  },
  buttonTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#333333',
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