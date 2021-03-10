import React, { useEffect, useState } from 'react';

import { Animated, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../images/logo.png';

import Input from '../../components/Input';
import CustomButton from '../../components/Button';

export default function Login() {
  const { navigate } = useNavigation();

  const [logo] = useState(new Animated.ValueXY({
    x: 350, y: 55
  }));

  function handleNavigateToRegister() {
    navigate("Register");
  }

  function handleNavigateToForgotPassword() {
    navigate("ForgotPassword");
  }

  function handleNavigateToSchedule() {
    navigate("Home");
  }

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        useNativeDriver: false,
        toValue: 240,
        duration: 100
      }),
      Animated.timing(logo.y, {
        useNativeDriver: false,
        toValue: 30,
        duration: 100
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        useNativeDriver: false,
        toValue: 340,
        duration: 100
      }),
      Animated.timing(logo.y, {
        useNativeDriver: false,
        toValue: 55,
        duration: 100
      }),
    ]).start();
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', keyboardDidHide
    );
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logo}>
        <Animated.Image 
          style={{
           height: logo.y, 
           width: logo.x,
          }} 
          source={logoImg} 
        />
      </View>
      
      <Input 
        placeholder="E-mail"
        icon="email"
        autoCapitalize="words"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <Input 
        placeholder="Senha"
        icon="lock"
        isPassword
        returnKeyType="send"
      />

      <CustomButton 
        title="ENTRAR" 
        backgroundColor="#3A4498"
        height={50}
        fontSize={15}
        onPress={handleNavigateToSchedule}
      />

      <CustomButton 
        title="Criar uma conta" 
        backgroundColor="transparent"
        height={50}
        fontSize={15}
        onPress={handleNavigateToRegister}
      />

      <CustomButton 
        title="Esqueci minha senha" 
        backgroundColor="transparent"
        height={50}
        fontSize={15}
        onPress={handleNavigateToForgotPassword}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },

  logo: {
    marginTop: 80,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center"
  },
});