import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import CustomButton from '../../components/Button';

export default function RecoverPassword() {
  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }

  return (
    <ScrollView>
      <View style={styles.noticeContainer}>
        <View style={styles.title}>
          <MaterialIcons name="new-releases" size={20} color="#FD5151" />
          <Text style={{marginLeft: 5, color: "#FD5151"}}>ATENÇÃO</Text>
        </View>

        <Text style={styles.text}>
          Foi enviado ao seu e-mail cadastrado um código para recuperar sua senha, cheque sua caixa de entrada ou span, copie o código e depois cole-o no campo código.
        </Text>
      </View>

      <Input 
        placeholder="E-mail"
        icon="email"
        autoCapitalize="words"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <Input 
        placeholder="Código"
        icon="vpn-key"
        autoCapitalize="words"
        returnKeyType="done"
      />
      <InputPassword placeholder="Senha" icon="lock" />
      
      <CustomButton 
        title="RECUPERAR SENHA"
        backgroundColor="#3A4498"
        height={50}
        fontSize={15}
        onPress={handleNavigateToLogin} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noticeContainer: {
    margin: 15,
    height: 150,

    borderRadius: 15,
    
    backgroundColor: "#222325",
  },

  text: {
    marginTop: 10,
    margin: 10,

    color: "#D2D2E3"
  },

  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
});