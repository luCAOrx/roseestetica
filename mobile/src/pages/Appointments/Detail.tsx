import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface HeaderCardProps {
  title: string;
}

function HeaderCard({title}: HeaderCardProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>  
  );
}

export default function Detail() {
  return (
    <>
      <ScrollView>
        <View style={styles.card}>
          <HeaderCard title="Data e hora"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Procedimento e preço"/>
          <View style={styles.detailChild}>
            <Text style={styles.text}>Limpeza de pele</Text>
            <Text style={styles.price}>R$ 30,00</Text>
          </View>

          <HeaderCard title="Data do agendamento"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Data do remarque"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>
        </View>

        <View style={styles.card}>
          <HeaderCard title="Data e hora"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Procedimento e preço"/>
          <View style={styles.detailChild}>
            <Text style={styles.text}>Limpeza de pele</Text>
            <Text style={styles.price}>R$ 30,00</Text>
          </View>

          <HeaderCard title="Data do agendamento"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Data do remarque"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Ainda não houve um remarque</Text>
          </View>
        </View>

        <View style={styles.card}>
          <HeaderCard title="Data e hora"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Procedimento e preço"/>
          <View style={styles.detailChild}>
            <Text style={styles.text}>Limpeza de pele</Text>
            <Text style={styles.price}>R$ 30,00</Text>
          </View>

          <HeaderCard title="Data do agendamento"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Data do remarque"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>
        </View>

        <View style={styles.card}>
          <HeaderCard title="Data e hora"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Procedimento e preço"/>
          <View style={styles.detailChild}>
            <Text style={styles.text}>Limpeza de pele</Text>
            <Text style={styles.price}>R$ 30,00</Text>
          </View>

          <HeaderCard title="Data do agendamento"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Data do remarque"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Ainda não houve um remarque</Text>
          </View>
        </View>

        <View style={styles.card}>
          <HeaderCard title="Data e hora"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Procedimento e preço"/>
          <View style={styles.detailChild}>
            <Text style={styles.text}>Limpeza de pele</Text>
            <Text style={styles.price}>R$ 30,00</Text>
          </View>

          <HeaderCard title="Data do agendamento"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Data do remarque"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>
        </View>

        <View style={styles.card}>
          <HeaderCard title="Data e hora"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Procedimento e preço"/>
          <View style={styles.detailChild}>
            <Text style={styles.text}>Limpeza de pele</Text>
            <Text style={styles.price}>R$ 30,00</Text>
          </View>

          <HeaderCard title="Data do agendamento"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Segunda 25/01/2021 ás 08:00 horas</Text>
          </View>

          <HeaderCard title="Data do remarque"/>
          <View style={styles.detail}>
            <Text style={styles.text}>Ainda não houve um remarque</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 350,
    margin: 20,

    borderRadius: 8,

    backgroundColor: "#272725"
  },

  header: {
    height: 28,

    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#3A4498"
  },

  text: {
    fontFamily: "Roboto_400Regular",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 18,

    color: "#D2D2E3"
  },

  detail: {
    marginTop: 20,
    marginBottom: 20,

    justifyContent: "center",
    alignItems: "center"
  },

  detailChild: {
    marginTop: 20,
    margin: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  price: {
    fontFamily: "Roboto_400Regular",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 18,

    color: "#248E54"
  },
});