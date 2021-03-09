import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CustomButton from '../../components/Button';

import logoImg from '../../images/logo.png';

export default function ChangePersonalData() {
  const navigation = useNavigation();

  function handleNavigateToChangePersonalData() {
    navigation.navigate("ChangePersonalData");
  }

  function handleNavigateToChangeAddress() {
    navigation.navigate("ChangeAddress");
  }

  function handleNavigateToChangeLoginData() {
    navigation.navigate("ChangeLoginData");
  }

  return (
    <>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image}
            source={logoImg}
          />

          <CustomButton 
            title="Alterar foto do perfil" 
            backgroundColor="#3A4498"
            height={35}
            width={170}
            fontSize={15}
            marginBottom={50}
          />
        </View>

        <CustomButton 
          title="ALTERAR DADOS PESSOAIS" 
          backgroundColor="#3A4498"
          height={50}
          fontSize={15}
          onPress={handleNavigateToChangePersonalData}
        />
        <CustomButton 
          title="ALTERAR ENDEREÇO" 
          backgroundColor="#3A4498"
          height={50}
          fontSize={15}
          onPress={handleNavigateToChangeAddress}
        />
        <CustomButton 
          title="ALTERAR DADOS DE LOGIN" 
          backgroundColor="#3A4498"
          height={50}
          fontSize={15}
          onPress={handleNavigateToChangeLoginData}
        />
        <CustomButton 
          title="DELETAR CONTA" 
          backgroundColor="#AB1010"
          height={50}
          fontSize={15}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#fff"
  },

});