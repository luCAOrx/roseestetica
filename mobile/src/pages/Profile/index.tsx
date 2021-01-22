import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import logoImg from '../../images/rose.png';

import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function Profile() {
  return (
    <>
      <ScrollView style={{backgroundColor: "#181818"}} >
        <View style={styles.headerContainer} >
          <RectButton style={styles.header} >
            <Image 
              style={styles.image}
              source={logoImg}
            />
            <View style={styles.textContainer} >
              <Text style={styles.name}>Lucas Matheus</Text>
              <Text style={styles.description}>Meu perfil</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" color="#858585" size={28} />
          </RectButton>
        </View>

        <View style={styles.buttonContainer} >
          <RectButton style={styles.button} >
            <Feather name="toggle-right" color="#D2D2E3" size={22} />
            <Text style={styles.themeMode}>Modo noturno</Text>
          </RectButton>

          <RectButton style={styles.button} >
            <MaterialIcons name="local-phone" color="#4CAF50" size={22} />
            <Text style={styles.phone}>Entrar em contato</Text>
          </RectButton>

          <RectButton style={styles.button} >
            <MaterialIcons name="power-settings-new" color="#FD5151" size={22} />
            <Text style={styles.exit}>Sair</Text>
          </RectButton>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: "#5C5C5C",
    borderBottomWidth: 0.3
  },

  header: {
    margin: 20,
    marginTop: 50,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomColor: "#fff",

    backgroundColor: "#181818"
  },

  image: {
    borderRadius: 20
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",

    marginLeft: 21
  },

  name: {
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 29,

    color: "#D2D2E3"
  },

  description: {
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 14,

    color: "#858585"
  },

  buttonContainer: {
    margin: 32,
    marginTop: 80
  },

  button: {
    marginBottom: 50,

    flexDirection: "row",
  },

  themeMode: {
    marginLeft: 10,
    color: "#D2D2E3"
  },

  phone: {
    marginLeft: 10,
    color: "#4CAF50"
  },

  exit: {
    marginLeft: 10,
    color: "#FD5151"
  }
});