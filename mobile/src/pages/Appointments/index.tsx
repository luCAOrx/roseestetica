import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Appointments() {
  return (
    <View>
      <Text style={styles.text}>Meus agendamentos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#181818"
  }
});