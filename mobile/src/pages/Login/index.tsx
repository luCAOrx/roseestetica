import React from 'react';

import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../images/rose.png';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';

export default function Login() {
  const navigation = useNavigation();

  function handleNavigateToRegister() {
    navigation.navigate('PersonalData');
  }

  function handleNavigateToForgotMyPassword() {
    navigation.navigate('ForgotMyPassword');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.image} source={logoImg} />
        <Text style={styles.logoText}>Rose Estética</Text>
      </View>
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
      <Pressable 
        style={styles.buttonSecondary}
        onPress={handleNavigateToRegister}
      >
        <Text style={styles.buttonTitle}>Criar uma conta</Text>
      </Pressable>
      <Pressable 
        style={styles.buttonSecondary}
        onPress={handleNavigateToForgotMyPassword}
      >
        <Text style={styles.buttonTitle}>Esqueci minha senha</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#181818',
  },
  logo: {
    marginTop: 50,
    width: Dimensions.get("window").width,
    resizeMode: 'contain',

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  image: {
    marginLeft: 50
  },
  logoText: {
    marginRight: 70,

    fontFamily: "Calligraffitti_400Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 35,
    lineHeight: 55,

    alignItems: "center",
    textAlign: "center",
    
    borderStyle: "solid",
    borderColor: "#D2D2E3",
    color: "#D2D2E3"
  },
  inputContainer: {
    marginTop: 50
  },
  button: {
    marginTop: 10,
  },
  buttonTitle: {
    marginTop: 20,
    fontFamily: 'Roboto_700Bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#D2D2E3',
  },
  buttonSecondary: {
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});