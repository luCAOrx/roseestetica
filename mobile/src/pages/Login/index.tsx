import React from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../images/rose.png';

import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';

export default function Login() {
  const { navigate } = useNavigation();

  function handleNavigateToRegister() {
    navigate("PersonalData");
  }

  function handleNavigateToForgotMyPassword() {
    navigate("ForgotMyPassword");
  }

  function handleNavigateToSchedule() {
    navigate("Home");
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logoImg} />
        <Text style={styles.logoText}>Rose Estética</Text>
      </View>

      <View style={{marginTop: 50}}>
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

      <View style={{marginTop: 10}}>
        <Button 
          title="ENTRAR" 
          backgroundColor="#3A4498"
          onPress={handleNavigateToSchedule}
        />
      </View>

      <Pressable 
        style={styles.button}
        onPress={handleNavigateToRegister}
      >
        <Text style={styles.buttonTitle}>Criar uma conta</Text>
      </Pressable>

      <Pressable 
        style={styles.button}
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

    backgroundColor: "#181818",
  },

  logo: {
    marginTop: 50,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  logoText: {
    marginLeft: 20,

    fontFamily: "Calligraffitti_400Regular",
    fontSize: 35,

    color: "#D2D2E3"
  },

  buttonTitle: {
    marginTop: 20,

    fontFamily: "Roboto_700Bold",
    fontSize: 15,
    lineHeight: 18,

    color: "#D2D2E3",
  },
  
  button: {
    height: 50,
    marginTop: 10,
    
    justifyContent: "center",
    alignItems: "center",
  }
});