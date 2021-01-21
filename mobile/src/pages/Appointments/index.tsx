import React from 'react'

import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import Button from '../../components/Button';

export default function Appointments() {
  const navigation = useNavigation();

  function handleNavigateToDetail() {
    navigation.navigate("Detail");
  }

  function handleNavigateToReschedule() {
    navigation.navigate("Reschedule");
  }

  function handleNavigateToChangeProcedure() {
    navigation.navigate("ChangeProcedure");
  }

  return (
    <>
      <ScrollView style={{backgroundColor: "#181818"}} >
        <Header title="Meus agendamentos" showIcon={false} fontSize={26} />

        <View style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name="event-available" size={20} color="#D2D2E3"/>
            <Text style={styles.text}>Segunda 25/09/2021 ás 08:00 horas</Text>
          </View>
          <Button 
            title="VER DETALHES" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToDetail}
          />
          <Button 
            title="REMARCAR" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToReschedule}
          />
          <Button 
            title="ALTERAR PROCEDIMENTO" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToChangeProcedure}
          />
          <Button title="CANCELAR" backgroundColor="#AB1010" />
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name="event-available" size={20} color="#D2D2E3"/>
            <Text style={styles.text}>Segunda 25/09/2021 ás 08:00 horas</Text>
          </View>
          <Button 
            title="VER DETALHES" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToDetail}
          />
          <Button 
            title="REMARCAR" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToReschedule}
          />
          <Button 
            title="ALTERAR PROCEDIMENTO" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToChangeProcedure}
          />
          <Button title="CANCELAR" backgroundColor="#AB1010" />
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name="event-available" size={20} color="#D2D2E3"/>
            <Text style={styles.text}>Segunda 25/09/2021 ás 08:00 horas</Text>
          </View>
          <Button 
            title="VER DETALHES" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToDetail}
          />
          <Button 
            title="REMARCAR" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToReschedule}
          />
          <Button 
            title="ALTERAR PROCEDIMENTO" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToChangeProcedure}
          />
          <Button title="CANCELAR" backgroundColor="#AB1010" />
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name="event-available" size={20} color="#D2D2E3"/>
            <Text style={styles.text}>Segunda 25/09/2021 ás 08:00 horas</Text>
          </View>
          <Button 
            title="VER DETALHES" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToDetail}
          />
          <Button 
            title="REMARCAR" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToReschedule}
          />
          <Button 
            title="ALTERAR PROCEDIMENTO" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToChangeProcedure}
          />
          <Button title="CANCELAR" backgroundColor="#AB1010" />
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name="event-available" size={20} color="#D2D2E3"/>
            <Text style={styles.text}>Segunda 25/09/2021 ás 08:00 horas</Text>
          </View>
          <Button 
            title="VER DETALHES" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToDetail}
          />
          <Button 
            title="REMARCAR" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToReschedule}
          />
          <Button 
            title="ALTERAR PROCEDIMENTO" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToChangeProcedure}
          />
          <Button title="CANCELAR" backgroundColor="#AB1010" />
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name="event-available" size={20} color="#D2D2E3"/>
            <Text style={styles.text}>Segunda 25/09/2021 ás 08:00 horas</Text>
          </View>
          <Button 
            title="VER DETALHES" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToDetail}
          />
          <Button 
            title="REMARCAR" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToReschedule}
          />
          <Button 
            title="ALTERAR PROCEDIMENTO" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToChangeProcedure}
          />
          <Button title="CANCELAR" backgroundColor="#AB1010" />
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <MaterialIcons name="event-available" size={20} color="#D2D2E3"/>
            <Text style={styles.text}>Segunda 25/09/2021 ás 08:00 horas</Text>
          </View>
          <Button 
            title="VER DETALHES" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToDetail}
          />
          <Button 
            title="REMARCAR" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToReschedule}
          />
          <Button 
            title="ALTERAR PROCEDIMENTO" 
            backgroundColor="#3A4498" 
            onPress={handleNavigateToChangeProcedure}
          />
          <Button title="CANCELAR" backgroundColor="#AB1010" />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 400,
    margin: 20,

    borderRadius: 8,

    backgroundColor: "#272725"
  },

  header:{
    margin: 17,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  
  text: {
    flex:1,
    
    fontFamily: "Roboto_400Regular",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",

    color: "#D2D2E3"
  }
});