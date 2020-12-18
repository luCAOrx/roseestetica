import React from 'react';

import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

export default function ForgotMyPassword() {
  const navigation = useNavigation();

  function handleNavigateToRecoverPassword() {
    navigation.navigate("RecoverPassword");
  }

  return (
    <>
      <Input 
        placeholder="E-mail"
        icon="email"
        autoCapitalize="words"
        keyboardType="email-address"
        returnKeyType="next"
      />
      
      <Button 
        title="PRÓXIMO" 
        onPress={handleNavigateToRecoverPassword}
      />
    </>
  );
}